import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// Called by a Supabase Database Webhook (trigger + pg_net) on bookings INSERT.
// Sends two emails via Resend: a confirmation to the customer and a
// notification to the studio inbox (site_settings.contact_email).

const payloadSchema = z.object({
  type: z.literal("INSERT").optional(),
  record: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string().nullable().optional(),
    service: z.string(),
    booking_date: z.string(),
    booking_time: z.string(),
    notes: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
  }),
});

const SERVICE_LABELS: Record<string, string> = {
  styling: "Interior Styling",
  wellness: "Wellness-Inspired Living",
  heritage: "Modern Heritage",
  consultation: "General Consultation",
};

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y!, (m ?? 1) - 1, d ?? 1)).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = (h ?? 0) >= 12 ? "PM" : "AM";
  const hour12 = (((h ?? 0) + 11) % 12) + 1;
  return `${hour12}:${(m ?? 0).toString().padStart(2, "0")} ${period}`;
}

const shell = (inner: string) => `
<div style="font-family:Georgia,'Times New Roman',serif;background:#ffffff;padding:32px 24px;color:#2b2724;">
  <div style="max-width:560px;margin:0 auto;">
    <div style="letter-spacing:.28em;text-transform:uppercase;font-size:11px;color:#8a7a6c;font-family:Arial,sans-serif;">Habitat by Grayson</div>
    <div style="height:1px;background:#e5ded6;margin:16px 0 24px;"></div>
    ${inner}
    <div style="height:1px;background:#e5ded6;margin:28px 0 16px;"></div>
    <div style="font-size:12px;color:#8a7a6c;font-family:Arial,sans-serif;">Spaces that tell your story.</div>
  </div>
</div>`;

async function sendEmail(apiKey: string, body: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`[booking-email] Resend failed [${res.status}]: ${text}`);
  }
  return { ok: res.ok, status: res.status, body: text };
}

export const Route = createFileRoute("/api/public/booking-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env["BOOKING_WEBHOOK_KEY"];
        const provided = request.headers.get("x-webhook-secret") ?? "";
        if (!expected || !timingSafeEqual(provided, expected)) {
          return new Response("Invalid signature", { status: 401 });
        }

        const apiKey = process.env["RESEND_API_KEY"];
        if (!apiKey) return new Response("Email provider not configured", { status: 500 });

        let parsed;
        try {
          parsed = payloadSchema.parse(await request.json());
        } catch {
          return new Response("Invalid payload", { status: 400 });
        }
        const b = parsed.record;

        // Studio inbox from site_settings (service-role read, server-only).
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: settings } = await supabaseAdmin
          .from("site_settings")
          .select("contact_email")
          .limit(1)
          .maybeSingle();
        const studioInbox = settings?.contact_email ?? null;

        const from = "Habitat by Grayson <soulful_spaces@habitatbygrayson.com>";
        const serviceLabel = SERVICE_LABELS[b.service] ?? b.service;
        const when = `${formatDate(b.booking_date)} at ${formatTime(b.booking_time)}`;

        const details = `
          <table style="width:100%;font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#8a7a6c;width:120px;">Service</td><td style="padding:6px 0;">${serviceLabel}</td></tr>
            <tr><td style="padding:6px 0;color:#8a7a6c;">Date &amp; time</td><td style="padding:6px 0;">${when}</td></tr>
            <tr><td style="padding:6px 0;color:#8a7a6c;">Name</td><td style="padding:6px 0;">${b.name}</td></tr>
            <tr><td style="padding:6px 0;color:#8a7a6c;">Email</td><td style="padding:6px 0;">${b.email}</td></tr>
            ${b.phone ? `<tr><td style="padding:6px 0;color:#8a7a6c;">Phone</td><td style="padding:6px 0;">${b.phone}</td></tr>` : ""}
            ${b.notes ? `<tr><td style="padding:6px 0;color:#8a7a6c;">Notes</td><td style="padding:6px 0;">${b.notes}</td></tr>` : ""}
          </table>`;

        const customer = await sendEmail(apiKey, {
          from,
          to: [b.email],
          subject: `Your consultation is booked — ${when}`,
          html: shell(`
            <h1 style="font-size:26px;font-weight:400;margin:0 0 12px;">Thank you, ${b.name}.</h1>
            <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#4a423c;">
              Your consultation request has been received. Here are the details we have on file — we'll be in touch shortly to confirm.
            </p>
            ${details}
          `),
        });

        const studio = studioInbox
          ? await sendEmail(apiKey, {
              from,
              to: [studioInbox],
              reply_to: b.email,
              subject: `New booking — ${b.name}, ${when}`,
              html: shell(`
                <h1 style="font-size:24px;font-weight:400;margin:0 0 12px;">New consultation booking</h1>
                ${details}
              `),
            })
          : { ok: false, status: 0, body: "No contact_email in site_settings" };

        return Response.json({
          ok: customer.ok && studio.ok,
          customer: customer.status,
          studio: studio.status,
        });
      },
    },
  },
});
