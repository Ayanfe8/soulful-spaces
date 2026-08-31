/**
 * Fail-fast + graceful degradation helpers.
 *
 * The SSR render must NEVER hang: if a content query fails or exceeds its
 * deadline we resolve with a `degraded` payload so the route can render an
 * honest "content temporarily unavailable" state instead of hanging (502) or
 * silently rendering an empty-looking page.
 */

export const CONTENT_DEADLINE_MS = 6000;

export async function withDeadline<T>(
  label: string,
  work: () => Promise<T>,
  timeoutMs = CONTENT_DEADLINE_MS,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`[${label}] deadline exceeded after ${timeoutMs}ms`)),
      timeoutMs,
    );
  });
  try {
    return await Promise.race([work(), deadline]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** Runs `work` under a deadline; on any failure returns `fallback` instead of throwing. */
export async function degradeOnFailure<T>(
  label: string,
  work: () => Promise<T>,
  fallback: T,
  timeoutMs = CONTENT_DEADLINE_MS,
): Promise<T> {
  try {
    return await withDeadline(label, work, timeoutMs);
  } catch (error) {
    console.error(`[${label}] degraded:`, error);
    return fallback;
  }
}
