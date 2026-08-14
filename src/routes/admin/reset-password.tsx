import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Recovery links land here; the session is created in the browser from the URL fragment.

export const Route = createFileRoute("/admin/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Set Studio Password — Habitat by Grayson" },
      { name: "description", content: "Set a new password for your Habitat by Grayson studio account." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Set Studio Password — Habitat by Grayson" },
      { property: "og:description", content: "Set a new password for your Habitat by Grayson studio account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminResetPassword,
});

function AdminResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data: sessionData }) => {
      if (sessionData.session) setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (password !== confirm) {
      setError("Passwords don’t match.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    navigate({ to: "/admin", replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
          Habitat by Grayson
        </p>
        <h1 className="mt-3 font-serif text-3xl text-foreground">Set your password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {ready
            ? "Choose a password for your studio account."
            : "Open this page from the link in your email to continue."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label htmlFor="password" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              New password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-border bg-transparent py-2 text-foreground outline-none transition-colors focus:border-foreground"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border-b border-border bg-transparent py-2 text-foreground outline-none transition-colors focus:border-foreground"
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <button
            type="submit"
            disabled={busy || !ready}
            className="w-full bg-foreground px-6 py-3 text-xs uppercase tracking-[0.25em] text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save password"}
          </button>
        </form>
      </div>
    </main>
  );
}
