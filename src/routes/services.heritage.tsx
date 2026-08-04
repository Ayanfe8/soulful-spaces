import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ServicePage } from "@/components/ServicePage";
import { serviceQueryOptions } from "@/lib/services-data";
import heroImg from "@/assets/service-heritage.jpg";

export const Route = createFileRoute("/services/heritage")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(serviceQueryOptions("heritage")),
  head: () => ({
    meta: [
      { title: "Modern Heritage — Habitat by Grayson" },
      {
        name: "description",
        content:
          "Modern African heritage interiors. Global sophistication meets ancestral warmth — sculptural form, refined finishes, and pieces that carry meaning.",
      },
      { property: "og:title", content: "Modern Heritage — Habitat by Grayson" },
      {
        property: "og:description",
        content:
          "Interiors where contemporary global aesthetics meet the rich, soulful texture of African living.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  errorComponent: ({ error }) => (
    <div role="alert" className="p-12">{error.message}</div>
  ),
  notFoundComponent: () => <div className="p-12">Service not found.</div>,
  component: HeritageRoute,
});

function HeritageRoute() {
  const { data } = useSuspenseQuery(serviceQueryOptions("heritage"));
  return <ServicePage {...data} />;
}
