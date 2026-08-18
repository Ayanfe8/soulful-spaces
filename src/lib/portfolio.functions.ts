import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { timedFetch } from "@/lib/timeout-fetch";

export const getPortfolioProjects = createServerFn({ method: "GET" }).handler(async () => {
  // Env is bound per-request on Workers — read it here, never at module scope.
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Supabase server environment is not configured.");

  const supabasePublic = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: { fetch: timedFetch("portfolio") },
  });

  const { data, error } = await supabasePublic
    .from("portfolio_projects")
    .select("id, title, location, year, category, ratio, image_path, sort_order")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
});
