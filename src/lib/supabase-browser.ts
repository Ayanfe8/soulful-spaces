import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { resolvePublicConfig } from "@/lib/public-config";

/**
 * Resilient browser Supabase client — the ONLY way browser code should create
 * a Supabase client. Config comes from the shared resolver (SSR-injected
 * globals → VITE build vars → /api/public/config), never from a server
 * function, so it can't deadlock against the auth middleware.
 */
let clientPromise: Promise<SupabaseClient<Database>> | undefined;

export function getBrowserSupabase(): Promise<SupabaseClient<Database>> {
  if (!clientPromise) {
    clientPromise = (async () => {
      const { url, key } = await resolvePublicConfig();
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
