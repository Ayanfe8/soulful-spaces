import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// Client disconnects mid-SSR (ECONNRESET on the incoming socket) surface as
// "Error: aborted" and h3 escalates them to a 500 that blanks the page. They
// are harmless — the browser is already gone — so answer with an empty
// response instead of an error page or a log-worthy crash.
function isAbortedRequest(request: Request, error: unknown): boolean {
  if (request.signal?.aborted) return true;
  const err = error as { code?: string; message?: string; cause?: { code?: string } };
  return (
    err?.message === "aborted" ||
    err?.code === "ECONNRESET" ||
    err?.cause?.code === "ECONNRESET"
  );
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (request.signal?.aborted) {
        return new Response(null, { status: 499 });
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      if (request.signal?.aborted) {
        return new Response(null, { status: 499 });
      }
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      if (isAbortedRequest(request, error)) {
        return new Response(null, { status: 499 });
      }
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
