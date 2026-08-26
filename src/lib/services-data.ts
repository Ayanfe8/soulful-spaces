import { queryOptions } from "@tanstack/react-query";
import { getServiceBySlug } from "@/lib/services.functions";
import { storageImageUrl } from "@/lib/storage";
import { degradeOnFailure } from "@/lib/degrade";

export function resolveImagePath(path: string | null | undefined): string {
  return storageImageUrl(path);
}

export interface ServicePageData {
  eyebrow: string;
  title: string;
  intro: string;
  heroImg: string;
  heroAlt: string;
  outcomes: { title: string; body: string }[];
  process: { n: string; title: string; body: string }[];
  deliverables: string[];
  galleryImgs: { src: string; alt: string }[];
  nextLink: { to: string; label: string };
}

const SLUG_LABELS: Record<string, string> = {
  styling: "Interior Styling",
  wellness: "Wellness-Inspired Living",
  heritage: "Modern Heritage",
};

async function fetchServiceBySlug(slug: string): Promise<ServicePageData> {
  const service = await getServiceBySlug({ data: { slug } });


  const outcomes = [...(service.service_outcomes ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((o) => ({ title: o.title, body: o.body ?? "" }));

  const process = [...(service.service_process_steps ?? [])]
    .sort((a, b) => a.step_number - b.step_number)
    .map((s) => ({
      n: String(s.step_number).padStart(2, "0"),
      title: s.title,
      body: s.body ?? "",
    }));

  const deliverables = [...(service.service_deliverables ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((d) => d.text);

  const galleryImgs = [...(service.service_gallery_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((g) => ({ src: resolveImagePath(g.image_path), alt: g.alt ?? "" }));

  const nextSlug = service.next_service_slug ?? "";
  return {
    eyebrow: service.eyebrow ?? "",
    title: service.title,
    intro: service.intro ?? "",
    heroImg: resolveImagePath(service.hero_image_path),
    heroAlt: service.hero_alt ?? "",
    outcomes,
    process,
    deliverables,
    galleryImgs,
    nextLink: {
      to: `/services/${nextSlug}`,
      label: SLUG_LABELS[nextSlug] ?? nextSlug,
    },
  };
}

export type ServiceResult = { service: ServicePageData | null; degraded: boolean };

export const serviceQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["service", slug],
    queryFn: (): Promise<ServiceResult> =>
      degradeOnFailure(
        `service:${slug}`,
        async () => ({ service: await fetchServiceBySlug(slug), degraded: false }),
        { service: null, degraded: true },
      ),
  });
