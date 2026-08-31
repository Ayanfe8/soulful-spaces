import { restSelect } from "@/lib/public-supabase";

const SERVICE_SELECT = [
  "slug",
  "eyebrow",
  "title",
  "intro",
  "hero_image_path",
  "hero_alt",
  "next_service_slug",
  "service_outcomes(title,body,sort_order)",
  "service_process_steps(step_number,title,body)",
  "service_deliverables(text,sort_order)",
  "service_gallery_images(image_path,alt,sort_order)",
].join(",");

export type ServiceRow = {
  slug: string;
  eyebrow: string | null;
  title: string;
  intro: string | null;
  hero_image_path: string | null;
  hero_alt: string | null;
  next_service_slug: string | null;
  service_outcomes: { title: string; body: string | null; sort_order: number }[];
  service_process_steps: { step_number: number; title: string; body: string | null }[];
  service_deliverables: { text: string; sort_order: number }[];
  service_gallery_images: { image_path: string | null; alt: string | null; sort_order: number }[];
};

export async function getServiceBySlug({ data }: { data: { slug: string } }) {
  const rows = await restSelect<ServiceRow>(
    `service:${data.slug}`,
    `services?select=${encodeURIComponent(SERVICE_SELECT)}&slug=eq.${encodeURIComponent(data.slug)}&limit=1`,
  );
  const service = rows[0];
  if (!service) throw new Error(`Service "${data.slug}" not found`);
  return service;
}
