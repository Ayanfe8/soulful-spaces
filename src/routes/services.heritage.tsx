import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ServicePage } from "@/components/ServicePage";
import { ContentUnavailable } from "@/components/ContentUnavailable";
import { serviceQueryOptions } from "@/lib/services-data";
import { siteSettingsQueryOptions } from "@/lib/site-settings-data";
import { storageImageUrl } from "@/lib/storage";

export const Route = createFileRoute("/services/heritage")({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(serviceQueryOptions("heritage")),
      context.queryClient.ensureQueryData(siteSettingsQueryOptions()),
    ]),
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
      { property: "og:image", content: storageImageUrl("services/service-heritage.jpg") },
      { name: "twitter:image", content: storageImageUrl("services/service-heritage.jpg") },
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
  const { data: settings } = useSuspenseQuery(siteSettingsQueryOptions());
  if (data.degraded || !data.service) return <ContentUnavailable section="service page" />;
  return <ServicePage {...data.service} settings={settings} />;
}
