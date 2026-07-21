
CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  eyebrow text,
  title text NOT NULL,
  intro text,
  hero_image_path text,
  hero_alt text,
  next_service_slug text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read services" ON public.services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can manage services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.service_outcomes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_outcomes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_outcomes TO authenticated;
GRANT ALL ON public.service_outcomes TO service_role;
ALTER TABLE public.service_outcomes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read service_outcomes" ON public.service_outcomes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can manage service_outcomes" ON public.service_outcomes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_service_outcomes_updated_at BEFORE UPDATE ON public.service_outcomes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.service_process_steps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  step_number integer NOT NULL,
  title text NOT NULL,
  body text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_process_steps TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_process_steps TO authenticated;
GRANT ALL ON public.service_process_steps TO service_role;
ALTER TABLE public.service_process_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read service_process_steps" ON public.service_process_steps FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can manage service_process_steps" ON public.service_process_steps FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_service_process_steps_updated_at BEFORE UPDATE ON public.service_process_steps FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.service_deliverables (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  text text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_deliverables TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_deliverables TO authenticated;
GRANT ALL ON public.service_deliverables TO service_role;
ALTER TABLE public.service_deliverables ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read service_deliverables" ON public.service_deliverables FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can manage service_deliverables" ON public.service_deliverables FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_service_deliverables_updated_at BEFORE UPDATE ON public.service_deliverables FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.service_gallery_images (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  image_path text NOT NULL,
  alt text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_gallery_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_gallery_images TO authenticated;
GRANT ALL ON public.service_gallery_images TO service_role;
ALTER TABLE public.service_gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read service_gallery_images" ON public.service_gallery_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can manage service_gallery_images" ON public.service_gallery_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_service_gallery_images_updated_at BEFORE UPDATE ON public.service_gallery_images FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
