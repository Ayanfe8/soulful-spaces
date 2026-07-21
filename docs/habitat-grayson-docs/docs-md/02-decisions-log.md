**HABITAT BY GRAYSON**

*Decisions Log --- Response to PRD Reconciliation Spec v1.0*

**Prepared by:** Ayanfe

**Date:** 14 July 2026

**Source:** Open Questions section, Habitat By Grayson PRD Reconciliation & Build Spec v1.0

**Answered by:** Grace

**1. Purpose**

This log records Grace\'s answers to the open questions raised in the PRD Reconciliation Spec, converts each into a formal decision, and lists the resulting action items. These decisions now supersede the "open questions" marked in the v1.0 spec and become part of the governing spec for build work.

**2. Decisions & Resulting Actions**

**2.1 Services Taxonomy**

*Question: Are the two services lists (3 nav pages vs. 5 homepage packages) intentionally different concepts, or should they be unified?*

**Decision: Keep both. The 3 nav pages (Styling / Wellness / Heritage) and the 5 homepage packages (Home Edit / Room Story / Move-In Ready / Shortlet & Airbnb / Signature Transformation) represent two different axes --- design approach vs. engagement scope --- and both stay.**

-   Action: Add clear section labeling/copy distinguishing "how we design" (nav pages) from "ways to work with us" (homepage packages), so visitors understand these aren\'t duplicates.

-   Action: Review the "Shortlet & Airbnb Styling" naming collision specifically --- confirm with Grace whether this package should cross-reference the relevant service page(s) to avoid visitor confusion.

**2.2 Booking Emails & Admin Visibility**

*Question: Should booking confirmation emails and an admin view be part of this phase, or deferred?*

**Decision: Yes --- both are in scope for this phase.**

-   Action: Implement transactional booking confirmation emails, triggered on successful booking insert (closes the gap where the UI currently promises an email that never sends).

-   Action: Build a simple authenticated admin view for Grace to see and manage incoming bookings (list, status update), rather than relying on direct Supabase dashboard access.

*Note: Both of these were flagged in the reconciliation spec as real gaps against what the current UI already promises visitors, so this confirms they move to the front of the build sequence.*

**2.3 Social & Journal Links**

*Question: Do Instagram/Pinterest accounts exist yet to link to, and is a Journal/Blog wanted now or later?*

**Decision: Instagram and Pinterest accounts exist and should be linked. Journal/Blog is wanted, but later --- not in this phase.**

-   Action: Get the actual Instagram and Pinterest URLs from Grace and replace the placeholder \'#\' links in the footer.

-   Action: Keep the "Journal" footer link removed or clearly inactive for now, since there\'s no destination page yet --- avoid shipping a dead link.

-   Action: Log Journal/Blog as a confirmed future-phase item (not in current sitemap, revisit later).

**2.4 Portfolio Imagery**

*Question: Is current portfolio imagery final, or a placeholder awaiting real project photography?*

**Decision: Current imagery is a placeholder. Real project photography is still needed.**

-   Action: Treat portfolio image swap as a pre-launch checklist item, not a build task --- flag as blocked on Grace sourcing/providing real photography.

-   Action: Once the CMS is built, this becomes something Grace can update herself rather than needing a developer for each swap.

**2.5 Standalone About / Philosophy Page**

*Question: Should we keep the standalone About/Philosophy page from the original PRD, or is the philosophy content folded into Home sufficient?*

**Decision: Folding philosophy content into Home is sufficient. No standalone About/Philosophy page needed.**

-   Action: Remove "About/Philosophy (standalone)" from the sitemap as a pending item --- mark as resolved, not required.

-   Action: Update the original PRD\'s sitemap section to reflect this so it doesn\'t get re-flagged as a gap later.

**3. Updated Sitemap Status**

  -----------------------------------------------------------------------------------------------------------------------------------------------
  **Page**                                     **Status**
  -------------------------------------------- --------------------------------------------------------------------------------------------------
  Home ( / )                                   Built --- includes philosophy content; confirmed sufficient, no separate page needed.

  Services --- Styling / Wellness / Heritage   Built --- taxonomy confirmed as intentional, labeling update pending.

  Homepage Engagement Packages (5 cards)       Built --- confirmed as intentional, labeling update pending.

  Portfolio ( /portfolio )                     Built --- imagery placeholder, pending real photography from Grace.

  Book a Consultation ( /book )                Built --- confirmation emails and admin view now in scope for this phase.

  Journal / Blog                               Confirmed future phase --- not built now, link removed/inactive until it exists.

  Admin / CMS                                  Not built --- still the largest open item; unblocks self-service content and booking management.
  -----------------------------------------------------------------------------------------------------------------------------------------------

**4. What This Unblocks Next**

With these five decisions resolved, the two largest remaining pieces of work are:

-   Booking system completion --- confirmation emails + admin view.

-   CMS technical design --- still the single biggest gap, and now scoped clearly enough (portfolio, service page text, homepage copy, testimonials, FAQ, site-wide contact/social links) to move into a concrete technical spec.

Recommend tackling the CMS technical design next, since it\'s the largest and most foundational piece of remaining work, and the booking email/admin work can proceed in parallel as a smaller, self-contained task.
