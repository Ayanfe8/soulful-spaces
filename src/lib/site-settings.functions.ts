import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  // Env is bound per-request on Workers — read it here, never at module scope.
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Supabase server environment is not configured.");

  const supabasePublic = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabasePublic
    .from("site_settings")
    .select("contact_email, instagram_url, pinterest_url, journal_enabled")
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
});
