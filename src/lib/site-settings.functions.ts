import { createServerFn } from "@tanstack/react-start";

type SiteSettingsPublic = {
  contact_email: string | null;
  instagram_url: string | null;
  pinterest_url: string | null;
  journal_enabled: boolean | null;
} | null;

/**
 * Instrumented + bounded: the previous implementation used supabase-js, whose
 * fetch has NO timeout. If that request stalled inside the Worker, the SSR
 * render sat on this await until the 60s worker lifetime killed it (502, no
 * stack). Now the request aborts at 8s and logs its duration, so a stall shows
 * up as a named, timed error instead of an anonymous render timeout.
 */
export const getSiteSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSettingsPublic> => {
    // Env is bound per-request on Workers — read it here, never at module scope.
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Supabase server environment is not configured.");

    const started = Date.now();
    const endpoint =
      `${url}/rest/v1/site_settings` +
      `?select=contact_email,instagram_url,pinterest_url,journal_enabled&limit=1`;

    try {
      const response = await fetch(endpoint, {
        headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        throw new Error(
          `site_settings fetch failed: ${response.status} ${await response.text()}`,
        );
      }

      const rows = (await response.json()) as NonNullable<SiteSettingsPublic>[];
      console.info(`[site-settings] ok in ${Date.now() - started}ms`);
      return rows[0] ?? null;
    } catch (error) {
      console.error(
        `[site-settings] failed after ${Date.now() - started}ms`,
        error,
      );
      throw error;
    }
  },
);
