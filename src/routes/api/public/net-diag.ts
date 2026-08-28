import { createFileRoute } from "@tanstack/react-router";

/**
 * Diagnostic only: reports whether the server env is bound in this deployment
 * and how long raw outbound subrequests take. Never returns key material —
 * only presence, host, lengths and timings.
 */
async function probe(label: string, url: string, headers: Record<string, string> = {}) {
  const started = Date.now();
  try {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(5000) });
    return {
      label,
      ms: Date.now() - started,
      status: response.status,
      bytes: (await response.text()).length,
    };
  } catch (error) {
    return {
      label,
      ms: Date.now() - started,
      error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
    };
  }
}

export const Route = createFileRoute("/api/public/net-diag")({
  server: {
    handlers: {
      GET: async () => {
        const url = process.env["SUPABASE_URL"];
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"];

        const env = {
          hasUrl: Boolean(url),
          hasKey: Boolean(key),
          urlHost: url ? (() => { try { return new URL(url).host; } catch { return "unparseable"; } })() : null,
          keyLength: key ? key.length : 0,
          runtime: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
        };

        const probes = [await probe("external", "https://example.com/")];
        if (url && key) {
          probes.push(await probe("supabase-auth-health", `${url}/auth/v1/health`, { apikey: key }));
          probes.push(
            await probe("supabase-rest", `${url}/rest/v1/site_settings?select=id&limit=1`, {
              apikey: key,
              Authorization: `Bearer ${key}`,
              Accept: "application/json",
            }),
          );
        }

        return new Response(JSON.stringify({ env, probes }, null, 2), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
