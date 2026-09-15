# Rebuild the shared site footer

## What will change
- Move the existing logo, invitation heading, consultation button, and email into a distinct full-width CTA section immediately above the footer on every public page where the footer appears.
- Replace the footer content with three responsive columns: Brand, Quick Links, and Connect.
- Keep desktop columns side by side with generous gutters; stack Brand → Quick Links → Connect on mobile.
- Add Instagram, inactive WhatsApp, and Pinterest icon controls, using brighter contrast for real links/body text and muted styling only for labels or unavailable items.
- Finish with a thin divider and centered copyright line.

## Content and data
- Add nullable `whatsapp_url` to the existing single-row site settings table, preserving its public-read/authenticated-write security pattern.
- Populate the supplied Instagram and Pinterest URLs, and leave WhatsApp empty.
- Extend the shared site-settings read so every footer receives all three social fields.

## Technical details
- Reuse the current logo asset, existing semantic colors, typography, button styling, and shared footer placement.
- Keep the footer's `contact` anchor so current page links and back-to-top collision behavior continue to work.
- Use existing internal routes; “Services” will link to the Styling service page because the site has no general `/services` page.
- Verify the migration, responsive layout, links, inactive WhatsApp state, and page rendering after the update.
