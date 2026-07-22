import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ServicePage } from "@/components/ServicePage";
import { serviceQueryOptions } from "@/lib/services-data";
import heroImg from "@/assets/service-wellness.jpg";

export const Route = createFileRoute("/services/wellness")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(serviceQueryOptions("wellness")),
  head: () => ({
    meta: [
      { title: "Wellness-Inspired Living — Habitat by Grayson" },
      {
        name: "description",
        content:
          "Wellness-centered interior design. Spaces engineered for rest, restoration, and balance through natural light and considered material.",
      },
      { property: "og:title", content: "Wellness-Inspired Living — Habitat by Grayson" },
      {
        property: "og:description",
        content:
          "Interiors that calm, heal, and energise. Designed around light, breath, and sustainable material.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  errorComponent: ({ error }) => (
    <div role="alert" className="p-12">{error.message}</div>
  ),
  notFoundComponent: () => <div className="p-12">Service not found.</div>,
  component: WellnessRoute,
});

function WellnessRoute() {
  const { data } = useSuspenseQuery(serviceQueryOptions("wellness"));
  return <ServicePage {...data} />;
}
