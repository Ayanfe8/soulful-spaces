import { restSelect } from "@/lib/public-supabase";

type SiteSettingsPublic = {
  contact_email: string | null;
  instagram_url: string | null;
  pinterest_url: string | null;
  whatsapp_url: string | null;
} | null;

/**
 * Read directly from PostgREST with the publishable key so the same code path
 * works during SSR and in the browser — no self-subrequest into the Worker.
 */
export async function getSiteSettings(): Promise<SiteSettingsPublic> {
  const rows = await restSelect<NonNullable<SiteSettingsPublic>>(
    "site-settings",
    "site_settings?select=contact_email,instagram_url,pinterest_url,whatsapp_url&limit=1",
  );
  return rows[0] ?? null;
}
