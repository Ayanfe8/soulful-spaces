import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ServicePage } from "@/components/ServicePage";
import { serviceQueryOptions } from "@/lib/services-data";
import heroImg from "@/assets/service-styling.jpg";

export const Route = createFileRoute("/services/styling")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(serviceQueryOptions("styling")),
  head: () => ({
    meta: [
      { title: "Interior Styling — Habitat by Grayson" },
      {
        name: "description",
        content:
          "Spatial storytelling and interior styling for residences, shortlets, and hospitality. Outcomes, process, and deliverables.",
      },
      { property: "og:title", content: "Interior Styling — Habitat by Grayson" },
      {
        property: "og:description",
        content:
          "Thoughtfully curated interiors designed around your lifestyle, personality, and the rhythm of how you live.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  errorComponent: ({ error }) => (
    <div role="alert" className="p-12">{error.message}</div>
  ),
  notFoundComponent: () => <div className="p-12">Service not found.</div>,
  component: StylingRoute,
});

function StylingRoute() {
  const { data } = useSuspenseQuery(serviceQueryOptions("styling"));
  return <ServicePage {...data} />;
}
