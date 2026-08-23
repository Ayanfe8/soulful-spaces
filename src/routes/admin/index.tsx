import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { getBrowserSupabase } from "@/lib/supabase-browser";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Studio Dashboard — Habitat by Grayson" },
      { name: "description", content: "Private admin dashboard for managing Habitat by Grayson content and bookings." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Studio Dashboard — Habitat by Grayson" },
      { property: "og:description", content: "Private admin dashboard for managing Habitat by Grayson content and bookings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  beforeLoad: async () => {
    const { data, error } = await (await getBrowserSupabase()).auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
    return { adminUser: data.user };
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const { adminUser } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await (await getBrowserSupabase()).auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
          Habitat by Grayson — Studio
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">Dashboard</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Signed in as <span className="text-foreground">{adminUser.email}</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/admin/bookings"
            className="border border-border px-6 py-3 text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            View bookings
          </Link>
          <button
            onClick={handleSignOut}
            className="border border-border px-6 py-3 text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
}
