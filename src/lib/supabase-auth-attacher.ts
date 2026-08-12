import { createMiddleware } from "@tanstack/react-start";

// Project-specific replacement for the generated `attachSupabaseAuth`.
//
// The generated version calls `supabase.auth.getSession()` on every client-side
// server-function call. That touches the lazily-created browser Supabase client,
// which THROWS if the VITE_SUPABASE_* values were not injected into the client
// bundle. Because that throw happens inside a post-hydration serverFn call, it
// escapes into the router/query error boundary and blanks an already-rendered
// page seconds after load.
//
// Attaching a bearer token is best-effort: if the client can't be created, we
// simply send the request without an Authorization header.
export const attachSupabaseAuthSafe = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    let token: string | undefined;
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase.auth.getSession();
      token = data.session?.access_token;
    } catch (error) {
      console.warn("[auth] Skipping bearer token attachment:", error);
    }
    return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} });
  },
);
