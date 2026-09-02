/**
 * Isomorphic public (anon) Supabase REST reader.
 *
 * Content reads must NOT go through `createServerFn`: on the deployed Worker
 * the SSR render issues a subrequest back into the same Worker to invoke the
 * server function, which stalls until the render deadline. Reading PostgREST
 * directly with the publishable key works identically during SSR and in the
 * browser, and is bounded by an explicit abort timeout.
 */

import { resolvePublicConfig } from "@/lib/public-config";

export async function restSelect<T>(
  label: string,
  path: string,
  timeoutMs = 8000,
): Promise<T[]> {
  const { url, key } = await resolvePublicConfig();

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
