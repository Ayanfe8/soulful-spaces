CREATE TABLE public.homepage_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tag text,
  title text NOT NULL,
  body text,
  wide boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.homepage_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.homepage_packages TO authenticated;
GRANT ALL ON public.homepage_packages TO service_role;
ALTER TABLE public.homepage_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read homepage_packages" ON public.homepage_packages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can manage homepage_packages" ON public.homepage_packages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_homepage_packages_updated_at BEFORE UPDATE ON public.homepage_packages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  author_name text,
  author_detail text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faq_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faq_items TO authenticated;
GRANT ALL ON public.faq_items TO service_role;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read faq_items" ON public.faq_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can manage faq_items" ON public.faq_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_faq_items_updated_at BEFORE UPDATE ON public.faq_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.homepage_packages (tag, title, body, wide, sort_order) VALUES
('01 — Consultation', 'The Habitat Home Edit', 'A guided styling direction for people who want to shop and style themselves. Includes consultation, custom mood board, shopping list, and a written styling direction.', false, 1),
('02 — One Room', 'Room Story Styling', 'One room, fully styled and transformed. Perfect for a living room, bedroom, or reading nook that deserves its own moment.', false, 2),
('03 — New Homes', 'Move-In Ready Styling', 'For new homes and apartments. We prepare the space so it feels finished, personal, and warm from the day you walk in.', false, 3),
('04 — Hospitality', 'Shortlet & Airbnb Styling', 'Guest-ready interiors designed for beauty, comfort, and stronger booking appeal — spaces that photograph well and feel even better in person.', false, 4),
('05 — Full Home', 'Signature Habitat Transformation', 'Our most complete offering. A full home styling and curated interior experience — art, objects, textiles, and stories woven together with intention.', true, 5);

INSERT INTO public.testimonials (quote, author_name, author_detail, sort_order) VALUES
('Even faith speaks of prepared spaces. We design with soul — because when a space truly reflects who you are, it becomes part of your story.', 'Habitat by Grayson', 'Why Habitat', 1);

INSERT INTO public.faq_items (question, answer, sort_order) VALUES
('Can I start with just one room?', 'Absolutely. Room Story Styling was created for exactly that — a single space, fully considered and transformed. It''s one of the most beautiful ways to experience Habitat for the first time.', 1),
('Do you offer consultation only?', 'Yes. The Habitat Home Edit is a consultation-led package that includes a custom mood board, shopping list, and written styling direction — perfect if you''d like to style your space yourself with expert guidance.', 2),
('Can you style a shortlet or Airbnb?', 'Yes — this is one of our specialties. We design guest-ready interiors that photograph beautifully, feel warm on arrival, and give your property a stronger booking edge.', 3),
('Do you work with existing furniture?', 'Yes. We often blend heirloom pieces and existing furniture with new curation. Great design honours what''s already meaningful and edits with intention.', 4),
('Can I work with you if I am outside Lagos or outside Nigeria?', 'Yes. We work with diaspora homeowners across the world and offer remote consultations, virtual mood boards, and full project coordination for homes anywhere on the continent.', 5),
('How do I get started?', 'Book a discovery call or send us photos of your space. We''ll listen to your story, understand your vision, and recommend the Habitat service that fits you best.', 6);