import { createFileRoute } from "@tanstack/react-router";

/**
 * Public, non-secret Supabase configuration, served at REQUEST time.
 *
 * Deliberately a plain HTTP route rather than a `createServerFn`: server
 * functions run through the client-side auth middleware, which needs a
 * Supabase client, which needs this config. That cycle deadlocks in the
 * browser. Only publishable values are returned.
 */
export const Route = createFileRoute("/api/public/config")({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          JSON.stringify({
            url: process.env["SUPABASE_URL"] ?? "",
            key: process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "",
          }),
          {
            headers: {
              "content-type": "application/json",
              "cache-control": "public, max-age=300",
            },
          },
        ),
    },
  },
});
