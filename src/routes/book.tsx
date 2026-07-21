import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import {
  TIME_SLOTS,
  SERVICES,
  formatTimeLabel,
  type TimeSlot,
  type ServiceValue,
} from "@/lib/bookings";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Habitat by Grayson" },
      {
        name: "description",
        content:
          "Reserve a consultation with Habitat by Grayson. Choose a date and time that suits you — we'll confirm by email.",
      },
      { property: "og:title", content: "Book a Consultation — Habitat by Grayson" },
      {
        property: "og:description",
        content:
          "Begin your journey toward a soulful, intentional home. Book a consultation with our studio.",
      },
    ],
  }),
  component: BookPage,
});

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  service: z.enum(["styling", "wellness", "heritage", "consultation"]),
  notes: z.string().trim().max(2000).optional(),
});

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d: Date) {
  const n = new Date(d);
  n.setHours(0, 0, 0, 0);
  return n;
}

function BookPage() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [service, setService] = useState<ServiceValue>("consultation");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    date: string;
    time: string;
    service: string;
  } | null>(null);

  // Build the next 28 weekdays grid
  const dateOptions = useMemo(() => {
    const out: Date[] = [];
    const cursor = new Date(today);
    while (out.length < 28) {
      const day = cursor.getDay();
      if (day !== 0 && day !== 6) out.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return out;
  }, [today]);

  async function pickDate(d: Date) {
    setSelectedDate(d);
    setSelectedTime(null);
    setLoadingSlots(true);
    const iso = toISODate(d);
    const { data, error: rpcError } = await supabase.rpc("get_booked_slots", {
      target_date: iso,
    });
    if (rpcError) {
      console.error(rpcError);
      setBookedSlots([]);
    } else {
      setBookedSlots(((data ?? []) as { booking_time: string }[]).map((r) => r.booking_time));
    }
    setLoadingSlots(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!selectedDate || !selectedTime) {
      setError("Choose a date and time.");
      return;
    }
    const parsed = bookingSchema.safeParse({ name, email, phone, service, notes });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check your details.");
      return;
    }

    setSubmitting(true);
    const iso = toISODate(selectedDate);

    const { error: insertError } = await supabase.from("bookings").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      service: parsed.data.service,
      booking_date: iso,
      booking_time: selectedTime,
      notes: parsed.data.notes || null,
    });

    setSubmitting(false);

    if (insertError) {
      if (insertError.code === "23505") {
        setError("That time slot was just taken. Please choose another.");
        await pickDate(selectedDate);
      } else {
        console.error(insertError);
        setError("Could not save your booking. Please try again.");
      }
      return;
    }

    const serviceLabel = SERVICES.find((s) => s.value === parsed.data.service)?.label ?? "";
    setSuccess({
      date: selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: formatTimeLabel(selectedTime),
      service: serviceLabel,
    });
  }

  if (success) {
    return (
      <div className="min-h-screen bg-bone text-charcoal">
        <SiteNav variant="solid" />
        <main className="max-w-3xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <span className="uppercase tracking-[0.3em] text-xs opacity-60">Confirmed</span>
          <h1 className="font-serif text-5xl md:text-6xl mt-6 font-light text-balance">
            Thank you, <em className="italic text-clay">{name.split(" ")[0]}</em>.
          </h1>
          <p className="mt-8 font-serif text-2xl md:text-3xl font-light leading-relaxed">
            Your consultation is held for{" "}
            <span className="text-terracotta">{success.date}</span> at{" "}
            <span className="text-terracotta">{success.time}</span>.
          </p>
          <div className="mt-12 border-t border-charcoal/15 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <div className="uppercase tracking-[0.2em] text-[10px] opacity-50 mb-2">Focus</div>
              <div>{success.service}</div>
            </div>
            <div>
              <div className="uppercase tracking-[0.2em] text-[10px] opacity-50 mb-2">Next</div>
              <div className="opacity-80">
                A confirmation will arrive at {email}. Our studio will be in touch within
                one business day to confirm details.
              </div>
            </div>
          </div>
          <div className="mt-16 flex gap-6">
            <Link
              to="/"
              className="text-xs uppercase tracking-[0.25em] border-b border-charcoal pb-1 hover:text-terracotta"
            >
              Back to studio
            </Link>
            <Link
              to="/portfolio"
              className="text-xs uppercase tracking-[0.25em] border-b border-charcoal/30 pb-1 hover:text-terracotta"
            >
              View portfolio
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone text-charcoal">
      <SiteNav variant="solid" />
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-24">
        <header className="max-w-3xl mb-16 md:mb-24">
          <span className="uppercase tracking-[0.3em] text-xs opacity-60">
            Begin Your Project
          </span>
          <h1 className="font-serif text-5xl md:text-7xl mt-6 font-light text-balance leading-[1.02]">
            Book a <em className="italic text-clay">consultation</em>.
          </h1>
          <p className="mt-8 text-base md:text-lg opacity-75 max-w-xl leading-relaxed">
            A focused conversation to understand your space, your story, and how we
            might shape a home that feels deeply your own.
          </p>
        </header>

        <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16">
          {/* LEFT: Date + Time */}
          <div>
            <Section number="01" label="Choose a date">
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-6">
                {dateOptions.map((d) => {
                  const isSelected =
                    selectedDate && toISODate(selectedDate) === toISODate(d);
                  return (
                    <button
                      type="button"
                      key={toISODate(d)}
                      onClick={() => pickDate(d)}
                      className={`flex flex-col items-center justify-center aspect-square border text-center transition-all ${
                        isSelected
                          ? "bg-charcoal text-bone border-charcoal"
                          : "border-charcoal/15 hover:border-charcoal"
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-[0.15em] opacity-70">
                        {d.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                      <span className="font-serif text-2xl mt-1 font-light">
                        {d.getDate()}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.15em] opacity-60">
                        {d.toLocaleDateString("en-US", { month: "short" })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Section>

            <Section number="02" label="Choose a time">
              {!selectedDate && (
                <p className="mt-6 text-sm opacity-60 italic">
                  Select a date to see available times.
                </p>
              )}
              {selectedDate && (
                <div className="mt-6">
                  {loadingSlots ? (
                    <p className="text-sm opacity-60">Checking availability…</p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((t) => {
                        const taken = bookedSlots.includes(t);
                        const isSelected = selectedTime === t;
                        return (
                          <button
                            type="button"
                            key={t}
                            disabled={taken}
                            onClick={() => setSelectedTime(t)}
                            className={`py-4 border text-sm tracking-wide transition-all ${
                              taken
                                ? "border-charcoal/10 text-charcoal/30 line-through cursor-not-allowed"
                                : isSelected
                                  ? "bg-terracotta text-bone border-terracotta"
                                  : "border-charcoal/15 hover:border-charcoal"
                            }`}
                          >
                            {formatTimeLabel(t)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </Section>
          </div>

          {/* RIGHT: Details */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Section number="03" label="Your details">
              <div className="mt-6 flex flex-col gap-5">
                <Field
                  label="Focus"
                  input={
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value as ServiceValue)}
                      className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal text-base"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  }
                />
                <Field
                  label="Name"
                  input={
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      maxLength={120}
                      className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal"
                    />
                  }
                />
                <Field
                  label="Email"
                  input={
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      maxLength={255}
                      className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal"
                    />
                  }
                />
                <Field
                  label="Phone (optional)"
                  input={
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={40}
                      className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal"
                    />
                  }
                />
                <Field
                  label="Tell us about your space (optional)"
                  input={
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      maxLength={2000}
                      rows={4}
                      className="w-full bg-transparent border-b border-charcoal/30 py-3 focus:outline-none focus:border-charcoal resize-none"
                    />
                  }
                />
              </div>

              {error && (
                <p className="mt-6 text-sm text-terracotta border-l-2 border-terracotta pl-4">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !selectedDate || !selectedTime}
                className="mt-10 w-full bg-charcoal text-bone py-5 uppercase tracking-[0.25em] text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-terracotta transition-colors"
              >
                {submitting ? "Reserving…" : "Reserve consultation"}
              </button>
              <p className="mt-4 text-[11px] opacity-50 leading-relaxed">
                By booking, you agree to be contacted by our studio about your
                consultation.
              </p>
            </Section>
          </div>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16 md:mb-20">
      <div className="flex items-baseline gap-4 border-b border-charcoal/15 pb-3">
        <span className="font-serif italic text-clay text-lg">{number}</span>
        <h2 className="uppercase tracking-[0.25em] text-xs">{label}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, input }: { label: string; input: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block uppercase tracking-[0.2em] text-[10px] opacity-60 mb-1">
        {label}
      </span>
      {input}
    </label>
  );
}
