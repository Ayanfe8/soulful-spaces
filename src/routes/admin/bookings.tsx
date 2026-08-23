import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import { formatTimeLabel } from "@/lib/bookings";

interface BookingRow {
  id: string;
  name: string;
  email: string;
  service: string;
  booking_date: string;
  booking_time: string;
  status: string;
}

export const Route = createFileRoute("/admin/bookings")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Bookings — Habitat by Grayson Studio" },
      { name: "description", content: "Private admin view of consultation bookings." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Bookings — Habitat by Grayson Studio" },
      { property: "og:description", content: "Private admin view of consultation bookings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  beforeLoad: async () => {
    const { data, error } = await (await getBrowserSupabase()).auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
    return { adminUser: data.user };
  },
  component: AdminBookings,
});

function AdminBookings() {
  const { data: bookings, isPending, error } = useQuery({
    queryKey: ["admin", "bookings"],
    queryFn: async (): Promise<BookingRow[]> => {
      const supabase = await getBrowserSupabase();
      const { data, error } = await supabase
        .from("bookings")
        .select("id, name, email, service, booking_date, booking_time, status")
        .neq("status", "cancelled")
        .order("booking_date", { ascending: true })
        .order("booking_time", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
          Habitat by Grayson — Studio
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-serif text-4xl text-foreground">Bookings</h1>
          <Link
            to="/admin"
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Dashboard
          </Link>
        </div>

        {isPending && (
          <p className="mt-10 text-sm text-muted-foreground">Loading bookings…</p>
        )}

        {error && (
          <p className="mt-10 text-sm text-destructive">
            Could not load bookings. Please sign out and back in, then try again.
          </p>
        )}

        {bookings && bookings.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">
            No upcoming bookings.
          </p>
        )}

        {bookings && bookings.length > 0 && (
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                  <th className="py-3 pr-4 font-normal">Date</th>
                  <th className="py-3 pr-4 font-normal">Time</th>
                  <th className="py-3 pr-4 font-normal">Name</th>
                  <th className="py-3 pr-4 font-normal">Email</th>
                  <th className="py-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-border/50">
                    <td className="py-3 pr-4 whitespace-nowrap text-foreground">
                      {b.booking_date}
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap text-foreground">
                      {formatTimeLabel(b.booking_time)}
                    </td>
                    <td className="py-3 pr-4 text-foreground">{b.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{b.email}</td>
                    <td className="py-3">
                      <span className="inline-block border border-border px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
