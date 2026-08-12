CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_email text,
  instagram_url text,
  pinterest_url text,
  journal_enabled boolean NOT NULL DEFAULT false,
  hero_headline text,
  hero_subhead text,
  philosophy_quote text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site_settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated can manage site_settings" ON public.site_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (contact_email, journal_enabled, philosophy_quote)
SELECT 'hello@habitatbygrayson.com', false,
  (SELECT quote FROM public.testimonials WHERE author_detail = 'Why Habitat' LIMIT 1);

DELETE FROM public.testimonials WHERE author_detail = 'Why Habitat';