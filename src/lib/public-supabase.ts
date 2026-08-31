/**
 * Isomorphic public (anon) Supabase REST reader.
 *
 * Content reads must NOT go through `createServerFn`: on the deployed Worker
 * the SSR render issues a subrequest back into the same Worker to invoke the
 * server function, which stalls until the render deadline. Reading PostgREST
 * directly with the publishable key works identically during SSR and in the
 * browser, and is bounded by an explicit abort timeout.
 */

const FALLBACK_URL = "https://rrybhxqsayenioprikon.supabase.co";

function readEnv(): { url: string; key: string } {
  const url =
    (import.meta.env?.VITE_SUPABASE_URL as string | undefined) ||
    (typeof process !== "undefined" ? process.env?.["SUPABASE_URL"] : undefined) ||
    FALLBACK_URL;
  const key =
    (import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
    (typeof process !== "undefined" ? process.env?.["SUPABASE_PUBLISHABLE_KEY"] : undefined) ||
    "";
  if (!key) throw new Error("Supabase publishable key is unavailable.");
  return { url: url.replace(/\/+$/, ""), key };
}

export async function restSelect<T>(
  label: string,
  path: string,
  timeoutMs = 8000,
): Promise<T[]> {
  const { url, key } = readEnv();
  const started = Date.now();
  try {
    const response = await fetch(`${url}/rest/v1/${path}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) {
      throw new Error(`[${label}] ${response.status}: ${await response.text()}`);
    }
    const rows = (await response.json()) as T[];
    console.info(`[${label}] ok in ${Date.now() - started}ms`);
    return rows;
  } catch (error) {
    console.error(`[${label}] failed after ${Date.now() - started}ms`, error);
    throw error;
  }
}
