import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ServicePage } from "@/components/ServicePage";
import { ContentUnavailable } from "@/components/ContentUnavailable";
import { serviceQueryOptions } from "@/lib/services-data";
import { siteSettingsQueryOptions } from "@/lib/site-settings-data";
import { storageImageUrl } from "@/lib/storage";

export const Route = createFileRoute("/services/wellness")({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(serviceQueryOptions("wellness")),
      context.queryClient.ensureQueryData(siteSettingsQueryOptions()),
    ]),
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
      { property: "og:image", content: storageImageUrl("services/service-wellness.jpg") },
      { name: "twitter:image", content: storageImageUrl("services/service-wellness.jpg") },
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
  const { data: settings } = useSuspenseQuery(siteSettingsQueryOptions());
  if (data.degraded || !data.service) return <ContentUnavailable section="service page" />;
  return <ServicePage {...data.service} settings={settings} />;
}
