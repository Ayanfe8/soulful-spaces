**HABITAT BY GRAYSON**

*CMS & Admin --- Technical Design Spec v1.1*

**Prepared by:** Ayanfe

**Date:** 17 July 2026

**Scope basis:** Habitat By Grayson Decisions Log (14 July 2026) --- CMS content set + booking emails/admin confirmed in scope

**Repository:** github.com/Ayanfe8/soulful-spaces

**1. Approach**

The site already runs on Supabase for the booking flow, with row-level security and a working migrations pipeline. Rather than introduce a second CMS product, this spec extends the existing Supabase project with content tables plus a lightweight authenticated /admin section built directly into the TanStack Start app. This keeps the stack to one backend, one auth system, and one deploy target.

Two people need admin access: Grace (content, bookings) and Ayanfe (everything, plus technical maintenance). Both get individual Supabase Auth accounts --- no shared login.

**2. Data Model**

Six new content tables, plus one settings row. All content tables follow the same RLS pattern: public read (the site needs to render for anonymous visitors), authenticated write.

**2.1 portfolio_projects**

  ------------------------------------------------------------------------------------------------------------
  **Column**                **Type**      **Notes**
  ------------------------- ------------- --------------------------------------------------------------------
  id                        uuid, pk      default gen_random_uuid()

  title                     text          e.g. "The Earth Residence"

  location                  text          e.g. "Lagos, NG"

  year                      text          

  category                  text          check constraint: Residential \| Hospitality \| Wellness \| Detail

  ratio                     text          check constraint: tall \| wide \| square

  image_path                text          path in Supabase Storage, resolved to public URL at render

  sort_order                int           default 0, drives display order

  created_at / updated_at   timestamptz   defaults + trigger
  ------------------------------------------------------------------------------------------------------------

**2.2 services, service_outcomes, service_process_steps, service_deliverables, service_gallery_images**

One parent row per service (styling / wellness / heritage), with four child tables so each section of the ServicePage template is independently editable and orderable.

  -----------------------------------------------------------------------------------------------------------------------------
  **Table**                **Key Columns**
  ------------------------ ----------------------------------------------------------------------------------------------------
  services                 id, slug (unique), eyebrow, title, intro, hero_image_path, hero_alt, next_service_slug, sort_order

  service_outcomes         id, service_id (fk), title, body, sort_order

  service_process_steps    id, service_id (fk), step_number, title, body

  service_deliverables     id, service_id (fk), text, sort_order

  service_gallery_images   id, service_id (fk), image_path, alt, sort_order
  -----------------------------------------------------------------------------------------------------------------------------

**2.3 homepage_packages**

The 5 "Signature Services" cards (Home Edit, Room Story Styling, etc.) --- kept as their own table per the taxonomy decision to preserve both structures side by side.

  -----------------------------------------------------------------------------
  **Column**          **Type**      **Notes**
  ------------------- ------------- -------------------------------------------
  id                  uuid, pk      

  tag                 text          e.g. "01 --- Consultation"

  title               text          e.g. "The Habitat Home Edit"

  body                text          

  wide                boolean       controls the 2-column span, default false

  sort_order          int           default 0
  -----------------------------------------------------------------------------

**2.4 testimonials, faq_items**

  ----------------------------------------------------------------------------
  **Table**                **Key Columns**
  ------------------------ ---------------------------------------------------
  testimonials             id, quote, author_name, author_detail, sort_order

  faq_items                id, question, answer, sort_order
  ----------------------------------------------------------------------------

**2.5 site_settings**

Single-row table (or key/value pairs --- single row is simpler given the small, fixed field set).

  -------------------------------------------------------------------------------------------------------
  **Column**          **Type**      **Notes**
  ------------------- ------------- ---------------------------------------------------------------------
  contact_email       text          

  instagram_url       text          nullable until Grace provides it

  pinterest_url       text          nullable until Grace provides it

  journal_enabled     boolean       default false --- flips the footer link on when Journal ships later

  hero_headline       text          homepage hero

  hero_subhead        text          homepage hero
  -------------------------------------------------------------------------------------------------------

**3. Storage**

New Supabase Storage bucket, content-images, replacing the current pattern of bundling images as source imports. Folder structure:

content-images/\
portfolio/\
services/\
homepage/

-   Public read access (bucket policy), authenticated write.

-   Admin UI uploads directly to Storage, then saves the returned path in the relevant \*\_path column.

-   Existing bundled images (portfolio-1.jpg, service-styling.jpg, etc.) get uploaded once during migration and repointed --- see Section 6.

**4. Row-Level Security Pattern**

Every content table gets the same two policies:

\-- Public read\
CREATE POLICY \"Public can read \<table\>\"\
ON public.\<table\> FOR SELECT\
TO anon, authenticated\
USING (true);\
\
\-- Authenticated write\
CREATE POLICY \"Authenticated can manage \<table\>\"\
ON public.\<table\> FOR ALL\
TO authenticated\
USING (true)\
WITH CHECK (true);

The existing bookings table gets one additional policy, since it currently blocks all reads --- admin needs visibility Grace doesn\'t have today:

CREATE POLICY \"Authenticated can view and manage bookings\"\
ON public.bookings FOR SELECT\
TO authenticated\
USING (true);\
\
CREATE POLICY \"Authenticated can update booking status\"\
ON public.bookings FOR UPDATE\
TO authenticated\
USING (true)\
WITH CHECK (true);

**5. Admin Application**

**5.1 Routes**

  ----------------------------------------------------------------------------------------------
  **Route**                **Purpose**
  ------------------------ ---------------------------------------------------------------------
  /admin/login             Supabase Auth email/password sign-in

  /admin                   Dashboard: upcoming bookings at a glance, quick links

  /admin/bookings          List, filter, and update status of consultation bookings

  /admin/portfolio         CRUD list of portfolio projects, drag-to-reorder, image upload

  /admin/services/\$slug   Edit outcomes, process steps, deliverables, gallery for one service

  /admin/homepage          Edit hero copy, signature packages, testimonials, FAQ

  /admin/settings          Contact email, social links, journal toggle
  ----------------------------------------------------------------------------------------------

**5.2 Auth Guard**

A beforeLoad check on the /admin route tree verifies an active Supabase session and redirects to /admin/login if absent --- the same pattern already used for the public site\'s server-side data fetching, so no new auth library is introduced.

**6. Migration Plan**

1.  Write and run the SQL migration creating all new tables, RLS policies, and the content-images bucket.

2.  Seed migration: insert the current hardcoded content (service text, portfolio entries, homepage packages, testimonials, FAQ) as the initial rows, so the cutover doesn\'t lose any existing copy.

3.  Upload the current bundled images to Storage and record their paths against the corresponding seeded rows.

4.  Refactor index.tsx, services.\*.tsx, and portfolio.tsx to fetch content via route loaders instead of importing hardcoded arrays/images.

5.  Build the /admin CRUD screens against the same tables.

6.  Create Supabase Auth accounts for Grace and Ayanfe; remove any shared/test credentials.

7.  QA pass: confirm every page renders identically to the current hardcoded version before decommissioning the old arrays.

**7. Booking Confirmation Emails**

Confirmed in scope alongside the admin view. Proposed flow:

-   A Supabase Database Webhook on bookings INSERT calls a new Supabase Edge Function.

-   The Edge Function sends two emails via a transactional email provider: a confirmation to the customer, and a notification to Grace\'s studio inbox.

-   The provider API key is stored as a Supabase Edge Function secret --- never in .env or committed to the repo, given the earlier .env history cleanup.

*Provider: Resend (see Section 8 for reasoning).*

**8. Decisions (Resolved 17 July 2026)**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Decision**                         **Resolution**
  ------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Transactional email provider         Resend --- chosen for simple Edge Function integration, a free tier that comfortably covers expected booking volume, and native support for React-based templates if the confirmation email adopts the site\'s design system later. Postmark\'s main advantage (high-volume deliverability reputation management) isn\'t relevant at this scale.

  /admin login method                  Email/password via Supabase Auth.

  Cancelled bookings in admin view     Hidden --- not shown in the default admin bookings list.

  Portfolio image upload constraints   Proposed default: JPG/WebP/PNG only, max 8MB per file, minimum 1600px on the long edge. Flag if this should be stricter or looser.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

*These decisions are locked in for the build. The image constraint is a proposed default rather than an explicit confirmation --- revisit if it doesn\'t fit once real photography is being uploaded.*
