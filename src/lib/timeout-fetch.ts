/**
 * supabase-js sets no timeout on its fetch, so a stalled request inside the
 * Worker hangs the SSR render until the 60s worker lifetime kills it (502, no
 * stack). This wrapper aborts at 8s and logs duration so a stall surfaces as a
 * named, timed error instead of an anonymous render timeout.
 */
export function timedFetch(label: string, timeoutMs = 8000): typeof fetch {
  return async (input, init) => {
    const started = Date.now();
    try {
      const response = await fetch(input as RequestInfo, {
        ...init,
        signal: AbortSignal.timeout(timeoutMs),
      });
      console.info(`[${label}] ok in ${Date.now() - started}ms`);
      return response;
    } catch (error) {
      console.error(`[${label}] failed after ${Date.now() - started}ms`, error);
      throw error;
    }
  };
}
