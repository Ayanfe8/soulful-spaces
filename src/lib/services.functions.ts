import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const SERVICE_SELECT = `
  slug, eyebrow, title, intro, hero_image_path, hero_alt, next_service_slug,
  service_outcomes(title, body, sort_order),
  service_process_steps(step_number, title, body),
  service_deliverables(text, sort_order),
  service_gallery_images(image_path, alt, sort_order)
`;

export const getServiceBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ data }) => {
    // Env is bound per-request on Workers — read it here, never at module scope.
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Supabase server environment is not configured.");

    const supabasePublic = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const { data: service, error } = await supabasePublic
      .from("services")
      .select(SERVICE_SELECT)
      .eq("slug", data.slug)
      .single();

    if (error || !service) {
      throw new Error(error?.message ?? `Service "${data.slug}" not found`);
    }
    return service;
  });
