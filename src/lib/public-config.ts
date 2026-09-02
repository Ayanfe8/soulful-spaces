/**
 * Single source of truth for the PUBLIC (publishable) Supabase config.
 *
 * Resolution order — every browser-side call site MUST use this, never
 * `import.meta.env` directly, and never a server function:
 *
 *   1. `globalThis.__SB_PUBLIC__` — injected into the SSR HTML by __root.
 *   2. `import.meta.env.VITE_*` — baked in at build time (may be missing).
 *   3. `process.env.*` — server only.
 *   4. `GET /api/public/config` — plain `fetch`, no server function, no
 *      middleware. A server function CANNOT be used here: the client-side
 *      function middleware attaches a Supabase bearer token, which needs a
 *      Supabase client, which needs this config — a deadlock that hangs every
 *      content query until its deadline and triggers the degrade UI.
 */

export type PublicSupabaseConfig = { url: string; key: string };

const FALLBACK_URL = "https://rrybhxqsayenioprikon.supabase.co";

declare global {
  // eslint-disable-next-line no-var
  var __SB_PUBLIC__: PublicSupabaseConfig | undefined;
}

function trim(url: string) {
  return url.replace(/\/+$/, "");
}

export function readPublicConfigSync(): PublicSupabaseConfig | undefined {
  const injected = globalThis.__SB_PUBLIC__;
  if (injected?.url && injected?.key) {
    return { url: trim(injected.url), key: injected.key };
  }

  const url =
    (import.meta.env?.VITE_SUPABASE_URL as string | undefined) ||
    (typeof process !== "undefined" ? process.env?.["SUPABASE_URL"] : undefined) ||
    FALLBACK_URL;
  const key =
    (import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
    (typeof process !== "undefined" ? process.env?.["SUPABASE_PUBLISHABLE_KEY"] : undefined) ||
    "";

  return key ? { url: trim(url), key } : undefined;
}

let remotePromise: Promise<PublicSupabaseConfig> | undefined;

export async function resolvePublicConfig(): Promise<PublicSupabaseConfig> {
  const sync = readPublicConfigSync();
  if (sync) return sync;

  if (typeof window === "undefined") {
    throw new Error("Supabase publishable key is unavailable on the server.");
  }

  remotePromise ??= (async () => {
    const response = await fetch("/api/public/config", {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`[public-config] ${response.status}`);
    const data = (await response.json()) as { url?: string; key?: string };
    if (!data.url || !data.key) throw new Error("[public-config] incomplete payload");
    const config = { url: trim(data.url), key: data.key };
    globalThis.__SB_PUBLIC__ = config;
    return config;
  })().catch((error) => {
    remotePromise = undefined;
    throw error;
  });

  return remotePromise;
}
