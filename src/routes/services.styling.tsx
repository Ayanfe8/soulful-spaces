import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ServicePage } from "@/components/ServicePage";
import { serviceQueryOptions } from "@/lib/services-data";
import { siteSettingsQueryOptions } from "@/lib/site-settings-data";
import { storageImageUrl } from "@/lib/storage";

export const Route = createFileRoute("/services/styling")({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(serviceQueryOptions("styling")),
      context.queryClient.ensureQueryData(siteSettingsQueryOptions()),
    ]),
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
      { property: "og:image", content: storageImageUrl("services/service-styling.jpg") },
      { name: "twitter:image", content: storageImageUrl("services/service-styling.jpg") },
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
  const { data: settings } = useSuspenseQuery(siteSettingsQueryOptions());
  return <ServicePage {...data} settings={settings} />;
}
