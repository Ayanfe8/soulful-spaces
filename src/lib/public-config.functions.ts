import { createServerFn } from "@tanstack/react-start";

/**
 * Runtime fallback for the PUBLIC Supabase config.
 *
 * `import.meta.env.VITE_*` values are baked into client chunks at BUILD time.
 * If a build runs before the environment is propagated, those chunks ship with
 * `undefined` and the browser client throws on first use. This server function
 * serves the same public values at REQUEST time, so the browser can recover
 * without a rebuild. Only publishable (non-secret) values are returned.
 */
export const getPublicSupabaseConfig = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"] ?? "";
  const publishableKey = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
  return { url, publishableKey };
});
