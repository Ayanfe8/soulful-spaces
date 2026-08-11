import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const getHomepageContent = createServerFn({ method: "GET" }).handler(async () => {
  // Env is bound per-request on Workers — read it here, never at module scope.
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Supabase server environment is not configured.");

  const supabasePublic = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  const [packages, testimonials, faqs] = await Promise.all([
    supabasePublic
      .from("homepage_packages")
      .select("id, tag, title, body, wide, sort_order")
      .order("sort_order", { ascending: true }),
    supabasePublic
      .from("testimonials")
      .select("id, quote, author_name, author_detail, sort_order")
      .order("sort_order", { ascending: true }),
    supabasePublic
      .from("faq_items")
      .select("id, question, answer, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  const error = packages.error ?? testimonials.error ?? faqs.error;
  if (error) throw new Error(error.message);

  return {
    packages: packages.data ?? [],
    testimonials: testimonials.data ?? [],
    faqs: faqs.data ?? [],
  };
});
