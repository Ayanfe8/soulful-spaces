import { restSelect } from "@/lib/public-supabase";

export type HomepagePackage = {
  id: string;
  tag: string | null;
  title: string;
  body: string | null;
  wide: boolean | null;
  sort_order: number;
};
export type Testimonial = {
  id: string;
  quote: string;
  author_name: string | null;
  author_detail: string | null;
  sort_order: number;
};
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};
export type SiteSettingsRow = {
  id: string;
  contact_email: string | null;
  instagram_url: string | null;
  pinterest_url: string | null;
  journal_enabled: boolean;
  hero_headline: string | null;
  hero_subhead: string | null;
  philosophy_quote: string | null;
};

export async function getHomepageContent() {
  const [packages, testimonials, faqs, settings] = await Promise.all([
    restSelect<HomepagePackage>(
      "homepage:packages",
      "homepage_packages?select=id,tag,title,body,wide,sort_order&order=sort_order.asc",
    ),
    restSelect<Testimonial>(
      "homepage:testimonials",
      "testimonials?select=id,quote,author_name,author_detail,sort_order&order=sort_order.asc",
    ),
    restSelect<FaqItem>(
      "homepage:faqs",
      "faq_items?select=id,question,answer,sort_order&order=sort_order.asc",
    ),
    restSelect<SiteSettingsRow>(
      "homepage:settings",
      "site_settings?select=id,contact_email,instagram_url,pinterest_url,journal_enabled,hero_headline,hero_subhead,philosophy_quote&limit=1",
    ),
  ]);

  return {
    packages,
    testimonials,
    faqs,
    settings: settings[0] ?? null,
  };
}
