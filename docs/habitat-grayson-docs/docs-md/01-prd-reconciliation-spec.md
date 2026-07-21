**HABITAT BY GRAYSON**

*PRD Reconciliation & Build Spec --- v1.0*

**Prepared by:** Ayanfe

**Date:** 14 July 2026

**Sources reconciled:** Internal PRD v1.0 (this doc\'s predecessor) × audit of the soulful-spaces repository (github.com/Ayanfe8/soulful-spaces)

**Purpose:** To align what has already been built in Lovable against the agreed PRD, flag gaps and conflicts, and set a single spec that governs all future development --- replacing ad hoc prompting.

**1. How To Read This Document**

The original PRD defined what the site should do based on brand documentation. The codebase audit showed what has actually been built so far. This document reconciles the two: where they agree, where they conflict, and where a decision is needed before more code gets written. From this point forward, this document --- not the Lovable chat history --- is the source of truth for development.

**2. Executive Summary**

-   The existing build is a strong foundation, not a rebuild situation. Visual identity, tone, and a reusable service-page template are already well executed.

-   The single biggest gap is that there is no CMS. All content (services, portfolio, testimonials, FAQ) is hardcoded in .tsx files and requires a code deploy to change --- this directly contradicts the confirmed requirement that Grace can self-serve content updates.

-   The booking system has real backend logic (Supabase, double-booking protection, RLS) but makes a promise it doesn\'t keep: confirmation emails are referenced in the UI but not implemented.

-   There are two overlapping ways the site currently describes "services" (3 nav-level pages vs. 5 homepage packages) that need a single resolved taxonomy.

-   Footer links to Instagram, Pinterest, and Journal are dead placeholders.

**3. Reconciliation Table**

Status legend: Met = matches PRD as built. Partial = exists but incomplete or inconsistent. Gap = required by PRD but not present. New = exists in build but wasn\'t specified in PRD (not necessarily bad, but needs a decision).

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **PRD Requirement**                                                                   **Current State In Build**                                                                                                                                                **Status**
  ------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -----------------------------
  Brand-aligned marketing site (Home, About/Philosophy, Services, Portfolio, Contact)   Home, 3x Service pages, Portfolio, Book all built and on-brand. No standalone About/Philosophy page --- content is folded into Home.                                      Partial

  Contact / consultation request form (no online payment)                               Full date+time booking flow with live availability checking, not a simple form.                                                                                           New / Exceeds scope

  Easy CMS so client can self-manage content                                            No CMS. All content hardcoded in source files.                                                                                                                            Gap

  Mobile-responsive design                                                              Tailwind responsive classes used throughout.                                                                                                                              Met

  Basic SEO (titles, meta, sitemap)                                                     Per-route meta titles/descriptions and og tags present; sitemap.xml route exists.                                                                                         Met

  Reusable, consistent page structure for services                                      ServicePage component shared across all 3 service routes.                                                                                                                 Met

  Single, clear services taxonomy                                                       Two parallel lists: 3 nav services (Styling/Wellness/Heritage) vs. 5 homepage packages (Home Edit/Room Story/Move-In Ready/Shortlet & Airbnb/Signature Transformation).   Partial / needs decision

  Booking confirmation communication                                                    UI promises an email confirmation; no email-sending logic exists anywhere in the codebase.                                                                                Gap

  Client visibility into incoming bookings                                              No admin view; bookings only visible via direct Supabase access.                                                                                                          Gap

  Working social/journal links                                                          Instagram, Pinterest, and Journal footer links are placeholder \'#\' anchors.                                                                                             Gap

  Portfolio imagery reflects real project work                                          Currently uses bundled stock/placeholder imagery.                                                                                                                         To be confirmed with client
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**4. Decisions Needed**

**4.1 Services Taxonomy**

Two structures currently coexist and use overlapping language (e.g. "Shortlet & Airbnb" appears in both lists with different meanings). Recommend resolving to one clear model before further content work:

-   Option A --- Keep both, but relabel: 3 nav pages become "Design Approaches" (the how/philosophy), 5 homepage cards stay as "Engagement Packages" (the how much/scope). Add a short explanatory line so visitors understand the difference.

-   Option B --- Collapse to one taxonomy: fold the 5 packages into the 3 service pages as pricing/scope tiers within each, removing the standalone homepage section.

-   Option C --- Keep as-is, but rename the overlapping term (e.g. homepage \'Shortlet & Airbnb Styling\' package → something scope-specific like \'Shortlet Launch Package\') to remove the naming collision.

Recommendation: Option A is lowest-effort and preserves work already done; worth a quick gut-check with Grace on the wording.

**4.2 Content Management (CMS)**

Needs to be scoped concretely rather than left as a general requirement. Proposed minimum editable content set:

-   Portfolio: add / edit / remove / reorder projects (image, title, location, year, category).

-   Service pages: edit outcomes, process steps, and deliverables text per service.

-   Homepage: edit hero copy, testimonials, FAQ entries.

-   Site-wide: contact email, social links.

Options to evaluate: a headless CMS layered on top of the existing Supabase backend (e.g. Supabase tables + a simple authenticated admin UI built into the app), or migrating content ownership to a dedicated CMS product (e.g. Sanity, or a Lovable-compatible CMS). Given the site already uses Supabase for bookings, extending Supabase with content tables plus a lightweight authenticated \`/admin\` route is likely the lowest-friction path --- but this is a build decision worth confirming before starting.

**4.3 Booking Flow --- Emails & Admin Visibility**

-   Decide whether booking confirmation emails are in scope for this phase; if yes, needs a transactional email provider (e.g. Resend, Postmark) wired via a Supabase Edge Function triggered on insert.

-   Decide whether Grace needs an in-app admin view of bookings (list, mark confirmed/cancelled) or whether direct Supabase dashboard access is acceptable for now.

Recommendation: treat email confirmation as a near-term priority since the UI already promises it to visitors --- leaving it unfixed is a trust/credibility risk, not just a missing feature.

**4.4 Content & Link Cleanup**

-   Replace placeholder \'#\' links for Instagram, Pinterest, and Journal with real URLs, or remove them until they exist.

-   Decide whether a Journal/Blog is in scope for this phase (referenced in the footer but no route exists) or should be removed from the footer for now.

-   Confirm whether current portfolio images are placeholders to be swapped for real project photography before launch.

**5. Revised Sitemap (Reflecting Actual Build)**

  ---------------------------------------------------------------------------------------------------------------------------------------------
  **Page**                                       **Status**    **Notes**
  ---------------------------------------------- ------------- --------------------------------------------------------------------------------
  Home ( / )                                     Built         Includes philosophy content inline; no separate About page exists yet.

  Services --- Styling ( /services/styling )     Built         Shares ServicePage template.

  Services --- Wellness ( /services/wellness )   Built         Shares ServicePage template.

  Services --- Heritage ( /services/heritage )   Built         Shares ServicePage template.

  Portfolio ( /portfolio )                       Built         Filterable gallery; images likely placeholder.

  Book a Consultation ( /book )                  Built         Full scheduling flow; email confirmation not yet implemented.

  About / Philosophy (standalone)                Not built     PRD anticipated this as its own page; currently folded into Home.

  Journal / Blog                                 Not built     Referenced in footer only; decision needed on whether to build or remove link.

  Admin / CMS                                    Not built     Required for client self-service content and booking visibility.
  ---------------------------------------------------------------------------------------------------------------------------------------------

**6. Recommended Build Sequence**

Suggested order of work, prioritizing trust-affecting gaps first, then structural clarity, then new capability:

-   1\. Resolve services taxonomy naming (low effort, removes visitor confusion).

-   2\. Fix or remove dead footer links (Instagram, Pinterest, Journal).

-   3\. Implement booking confirmation emails (closes an existing broken promise to visitors).

-   4\. Scope and build the CMS layer (largest piece of work; unblocks Grace\'s independence from developer support).

-   5\. Decide on and build (or defer) a standalone About/Philosophy page and admin booking view.

-   6\. Swap placeholder portfolio imagery for real project photography, once available.

**7. Open Questions For Grace**

-   Are the two services lists (3 nav pages vs. 5 homepage packages) intentionally different concepts, or should they be unified?

-   Should booking confirmation emails and an admin view be part of this phase, or deferred?

-   Do Instagram/Pinterest accounts exist yet to link to, and is a Journal/Blog wanted now or later?

-   Is current portfolio imagery final, or a placeholder awaiting real project photography?

-   Should we keep the standalone About/Philosophy page from the original PRD, or is the philosophy content folded into Home sufficient?

**Appendix --- Technical Reference**

**Frontend:** TanStack Start (React 19), Tailwind v4, shadcn/ui

**Backend:** Supabase --- bookings table with RLS, unique (date, time) constraint, SECURITY DEFINER availability function

**Repository:** github.com/Ayanfe8/soulful-spaces

**Original build platform:** Lovable
