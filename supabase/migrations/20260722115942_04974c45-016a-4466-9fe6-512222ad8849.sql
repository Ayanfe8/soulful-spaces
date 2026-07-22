
INSERT INTO public.services (slug, eyebrow, title, intro, hero_image_path, hero_alt, next_service_slug, sort_order)
VALUES
  ('styling', 'Service — 01', 'Interior Styling & Spatial Storytelling.',
   'We compose interiors that feel inhabited from the first day — a layered choreography of texture, color, light, and object. Every room is styled to hold your story, not perform it.',
   'services/service-styling.jpg',
   'Hand-woven African textiles and clay vessels in warm light',
   'wellness', 1),
  ('wellness', 'Service — 02', 'Wellness-Inspired Living Spaces.',
   'Homes are nervous systems. We design environments that lower your heart rate the moment you walk in — through light, air, organic material, and a deliberate quiet at the core of every room.',
   'services/service-wellness.jpg',
   'Carved arched window casting warm light on terracotta walls',
   'heritage', 2),
  ('heritage', 'Service — 03', 'Modern Heritage & Luxury Curation.',
   'A dialogue between contemporary form and the textures of the continent. We curate interiors that feel globally fluent and unmistakably rooted — refined enough to last decades, soulful enough to belong to one person.',
   'services/service-heritage.jpg',
   'Sculptural carved wood chair and ceramic vase in bone-toned room',
   'styling', 3)
ON CONFLICT (slug) DO NOTHING;

WITH s AS (SELECT id FROM public.services WHERE slug='styling')
INSERT INTO public.service_outcomes (service_id, title, body, sort_order)
SELECT s.id, v.title, v.body, v.so FROM s, (VALUES
  ('A home that feels lived-in immediately.', 'No staged showroom. Layered styling that softens new builds and refreshes the familiar.', 1),
  ('Cohesion across every room.', 'A through-line of palette, material, and mood — so the house reads as one body of work.', 2),
  ('Pieces with provenance.', 'Sourced craft, vintage, and modern African design — curated, not collected.', 3),
  ('Photo-ready surfaces.', 'Editorial-grade compositions on shelves, mantels, and side tables that hold up to close inspection.', 4)
) AS v(title, body, so)
WHERE NOT EXISTS (SELECT 1 FROM public.service_outcomes o WHERE o.service_id=s.id);

WITH s AS (SELECT id FROM public.services WHERE slug='styling')
INSERT INTO public.service_process_steps (service_id, step_number, title, body)
SELECT s.id, v.n, v.title, v.body FROM s, (VALUES
  (1, 'Discovery & Story', 'An intimate session about how you live, what you love, what you''ve outgrown, and what you want your home to give back to you.'),
  (2, 'Concept & Palette', 'We translate your story into a visual direction — mood, palette, material library, and a styling intent for every room.'),
  (3, 'Sourcing & Curation', 'Trade access to vintage, artisan-made, and modern African pieces. Nothing generic. Every object earns its place.'),
  (4, 'Install & Composition', 'We arrange, restyle, edit, and live with the space until it settles. Final composition photographs are delivered.')
) AS v(n, title, body)
WHERE NOT EXISTS (SELECT 1 FROM public.service_process_steps p WHERE p.service_id=s.id);

WITH s AS (SELECT id FROM public.services WHERE slug='styling')
INSERT INTO public.service_deliverables (service_id, text, sort_order)
SELECT s.id, v.text, v.so FROM s, (VALUES
  ('Personalised styling brief & mood direction', 1),
  ('Curated room-by-room palette guide', 2),
  ('Sourced furniture, textiles & accessories list', 3),
  ('Custom artwork & object curation', 4),
  ('On-site styling & final composition install', 5),
  ('Editorial-grade photography of the finished space', 6),
  ('Care, maintenance & seasonal restyling notes', 7)
) AS v(text, so)
WHERE NOT EXISTS (SELECT 1 FROM public.service_deliverables d WHERE d.service_id=s.id);

WITH s AS (SELECT id FROM public.services WHERE slug='styling')
INSERT INTO public.service_gallery_images (service_id, image_path, alt, sort_order)
SELECT s.id, v.path, v.alt, v.so FROM s, (VALUES
  ('portfolio/portfolio-1.jpg', 'Bedroom styled with woven headboard and linen drapes', 1),
  ('portfolio/portfolio-3.jpg', 'Lounge with curated African art and brass coffee table', 2),
  ('portfolio/portfolio-6.jpg', 'Sculptural ceramic still life on raw plaster shelf', 3)
) AS v(path, alt, so)
WHERE NOT EXISTS (SELECT 1 FROM public.service_gallery_images g WHERE g.service_id=s.id);

WITH s AS (SELECT id FROM public.services WHERE slug='wellness')
INSERT INTO public.service_outcomes (service_id, title, body, sort_order)
SELECT s.id, v.title, v.body, v.so FROM s, (VALUES
  ('Rooms that restore you.', 'Light, scent, sound, and temperature planned as carefully as the furniture itself.', 1),
  ('Sleep, focus, and rest zones.', 'Distinct atmospheres for unwinding, working, and gathering — each tuned to its purpose.', 2),
  ('Healthier material choices.', 'Low-VOC finishes, natural fibers, breathable plasters, and locally sourced wood where possible.', 3),
  ('Calm visual rhythm.', 'Edited palettes and considered negative space — the antidote to visual noise.', 4)
) AS v(title, body, so)
WHERE NOT EXISTS (SELECT 1 FROM public.service_outcomes o WHERE o.service_id=s.id);

WITH s AS (SELECT id FROM public.services WHERE slug='wellness')
INSERT INTO public.service_process_steps (service_id, step_number, title, body)
SELECT s.id, v.n, v.title, v.body FROM s, (VALUES
  (1, 'Lifestyle Audit', 'We map your daily rhythms — sleep, movement, work, recovery — and identify where your current space supports or resists them.'),
  (2, 'Sensory Brief', 'A wellness brief tuning light temperature, acoustics, scent, and tactile material to each room''s function.'),
  (3, 'Spatial Reconfiguration', 'We rethink layout, circulation, and zoning so the architecture itself starts working for your wellbeing.'),
  (4, 'Material & Light Install', 'Natural finishes, soft layered lighting, biophilic detail, and final calibration once you''ve moved in.')
) AS v(n, title, body)
WHERE NOT EXISTS (SELECT 1 FROM public.service_process_steps p WHERE p.service_id=s.id);

WITH s AS (SELECT id FROM public.services WHERE slug='wellness')
INSERT INTO public.service_deliverables (service_id, text, sort_order)
SELECT s.id, v.text, v.so FROM s, (VALUES
  ('Wellness lifestyle audit & report', 1),
  ('Sensory design brief (light, sound, scent, touch)', 2),
  ('Floor-plan reconfiguration & circulation study', 3),
  ('Lighting plan with layered scenes', 4),
  ('Curated natural material & finishes library', 5),
  ('Biophilic planting & air-quality plan', 6),
  ('Post-occupancy calibration visit (30 days)', 7)
) AS v(text, so)
WHERE NOT EXISTS (SELECT 1 FROM public.service_deliverables d WHERE d.service_id=s.id);

WITH s AS (SELECT id FROM public.services WHERE slug='wellness')
INSERT INTO public.service_gallery_images (service_id, image_path, alt, sort_order)
SELECT s.id, v.path, v.alt, v.so FROM s, (VALUES
  ('portfolio/portfolio-4.jpg', 'Reading nook with arched window and ceramic vessels', 1),
  ('portfolio/portfolio-6.jpg', 'Sculptural ceramic vessels in warm shadow light', 2),
  ('portfolio/portfolio-1.jpg', 'Calm bedroom with woven headboard and linen drapes', 3)
) AS v(path, alt, so)
WHERE NOT EXISTS (SELECT 1 FROM public.service_gallery_images g WHERE g.service_id=s.id);

WITH s AS (SELECT id FROM public.services WHERE slug='heritage')
INSERT INTO public.service_outcomes (service_id, title, body, sort_order)
SELECT s.id, v.title, v.body, v.so FROM s, (VALUES
  ('An interior that earns longevity.', 'Heritage materials and considered silhouettes that won''t read as ''last year'' in five years.', 1),
  ('Cultural depth, not pastiche.', 'African influence translated with restraint — texture, craft, and form rather than motif.', 2),
  ('A collectable home.', 'Investment pieces, commissioned craft, and quietly luxurious finishes that build over time.', 3),
  ('Hospitality-grade refinement.', 'Equally suited to a private residence, a luxury shortlet, or a creative hospitality concept.', 4)
) AS v(title, body, so)
WHERE NOT EXISTS (SELECT 1 FROM public.service_outcomes o WHERE o.service_id=s.id);

WITH s AS (SELECT id FROM public.services WHERE slug='heritage')
INSERT INTO public.service_process_steps (service_id, step_number, title, body)
SELECT s.id, v.n, v.title, v.body FROM s, (VALUES
  (1, 'Brand & Identity Brief', 'We articulate your personal or property identity — the references, heritage, and tone the space needs to embody.'),
  (2, 'Heritage Material Library', 'A curated library of stone, wood, plaster, brass, textile, and craft — sourced from African and global makers.'),
  (3, 'Commission & Curation', 'Bespoke furniture commissions, sourced art, and acquired vintage. We work with a network of makers across the continent.'),
  (4, 'Install, Document & Steward', 'Full install, archival photography, and an ongoing relationship to evolve the space as your collection grows.')
) AS v(n, title, body)
WHERE NOT EXISTS (SELECT 1 FROM public.service_process_steps p WHERE p.service_id=s.id);

WITH s AS (SELECT id FROM public.services WHERE slug='heritage')
INSERT INTO public.service_deliverables (service_id, text, sort_order)
SELECT s.id, v.text, v.so FROM s, (VALUES
  ('Identity & references brief', 1),
  ('Heritage material & finishes library', 2),
  ('Bespoke furniture commission management', 3),
  ('Sourced art, vintage & collectable pieces', 4),
  ('Full spatial design & lighting plan', 5),
  ('Archival project photography', 6),
  ('Provenance documentation for every piece', 7),
  ('Ongoing collection stewardship', 8)
) AS v(text, so)
WHERE NOT EXISTS (SELECT 1 FROM public.service_deliverables d WHERE d.service_id=s.id);

WITH s AS (SELECT id FROM public.services WHERE slug='heritage')
INSERT INTO public.service_gallery_images (service_id, image_path, alt, sort_order)
SELECT s.id, v.path, v.alt, v.so FROM s, (VALUES
  ('portfolio/portfolio-2.jpg', 'Dining room with carved wood table and sculptural pendant', 1),
  ('portfolio/portfolio-5.jpg', 'Hospitality lobby with carved screen and brass sconces', 2),
  ('portfolio/portfolio-3.jpg', 'Lounge with curated African art and brass coffee table', 3)
) AS v(path, alt, so)
WHERE NOT EXISTS (SELECT 1 FROM public.service_gallery_images g WHERE g.service_id=s.id);
