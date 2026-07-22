import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import heritageHero from "@/assets/service-heritage.jpg";
import stylingHero from "@/assets/service-styling.jpg";
import wellnessHero from "@/assets/service-wellness.jpg";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

// Maps DB image_path values to bundled asset URLs. Storage buckets are not
// yet provisioned; until they are, images live in src/assets and are looked
// up here so the CMS can store stable logical paths.
const ASSET_MAP: Record<string, string> = {
  "services/service-heritage.jpg": heritageHero,
  "services/service-styling.jpg": stylingHero,
  "services/service-wellness.jpg": wellnessHero,
  "portfolio/portfolio-1.jpg": p1,
  "portfolio/portfolio-2.jpg": p2,
  "portfolio/portfolio-3.jpg": p3,
  "portfolio/portfolio-4.jpg": p4,
  "portfolio/portfolio-5.jpg": p5,
  "portfolio/portfolio-6.jpg": p6,
};

export function resolveImagePath(path: string | null | undefined): string {
  if (!path) return "";
  return ASSET_MAP[path] ?? path;
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
  const { data: service, error } = await supabase
    .from("services")
    .select(
      `
      slug, eyebrow, title, intro, hero_image_path, hero_alt, next_service_slug,
      service_outcomes(title, body, sort_order),
      service_process_steps(step_number, title, body),
      service_deliverables(text, sort_order),
      service_gallery_images(image_path, alt, sort_order)
      `,
    )
    .eq("slug", slug)
    .single();

  if (error || !service) {
    throw new Error(error?.message ?? `Service "${slug}" not found`);
  }

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

export const serviceQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["service", slug],
    queryFn: () => fetchServiceBySlug(slug),
  });
