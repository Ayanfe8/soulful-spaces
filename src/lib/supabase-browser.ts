import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { getPublicSupabaseConfig } from "@/lib/public-config.functions";

/**
 * Resilient browser Supabase client.
 *
 * Prefers the build-time baked VITE_* values; if a chunk was built without
 * them (see public-config.functions.ts), it falls back to fetching the public
 * config from the server at runtime instead of throwing.
 */
let clientPromise: Promise<SupabaseClient<Database>> | undefined;

export function getBrowserSupabase(): Promise<SupabaseClient<Database>> {
  if (!clientPromise) {
    clientPromise = (async () => {
      let url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
      let key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

      if (!url || !key) {
        const config = await getPublicSupabaseConfig();
        url = config.url || undefined;
        key = config.publishableKey || undefined;
      }

      if (!url || !key) {
        throw new Error("Supabase public configuration is unavailable.");
      }

      return createClient<Database>(url, key, {
        auth: {
          storage: typeof window !== "undefined" ? localStorage : undefined,
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    })().catch((error) => {
      clientPromise = undefined;
      throw error;
    });
  }
  return clientPromise;
}
