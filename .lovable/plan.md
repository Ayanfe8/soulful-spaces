# SEO fixes: the nine changes before they're applied

Site address used everywhere: `https://habitatbygrayson.com`

## 1. Sitemap: full addresses
The sitemap's base address is empty today, so it lists `/portfolio` and similar short paths. It will be set to `https://habitatbygrayson.com`, so every entry becomes a full address:
```text
<loc>https://habitatbygrayson.com/portfolio</loc>
```
This covers all six pages: home, portfolio, styling, wellness, heritage and book.

## 2. Canonical tag on every page
Each of the six pages gets its own tag pointing to itself, plus a matching og:url. Example for Portfolio:
```text
<link rel="canonical" href="https://habitatbygrayson.com/portfolio">
<meta property="og:url" content="https://habitatbygrayson.com/portfolio">
```
The shared site layout gets no canonical tag, so no page ends up with two.

## 3. robots.txt
```text
User-agent: *
Allow: /
Sitemap: https://habitatbygrayson.com/sitemap.xml
```

## 4. Homepage share image
The old picture's address is built for the app's internal files, so outside sites can't use it. The picture visitors actually see at the top of the homepage (the terracotta living room) will be saved as a 1200x630 copy, the standard size for link previews, in the site's public folder:
```text
og:image / twitter:image -> https://habitatbygrayson.com/og-home.jpg
```
Note: you said to keep the old image's tags unchanged in an earlier request. Fixing this means moving them to the current homepage picture. The old picture stays on the page wherever it is still shown.

## 5. Book page share image
The Book page reuses that same `og-home.jpg` for og:image and twitter:image. It also gets the summary_large_image card type.

## 6. Logo description
The footer logo's blank description becomes "Habitat by Grayson". The header logo will get the same text if it's blank too. This change is shared, so it covers all pages at once.

## 7. Homepage heading levels
- "How We Shape Your World": h3 becomes h2
- The three service card names: h4 becomes h3
Sizes and fonts stay exactly the same.

## 8. Footer column titles
"Quick Links", "Services" and "Connect With Us" stop being h2 headings and become plain text with the same styling. Nothing changes visually.

## 9. Book heading "consultation ."
The page text has no actual space ("consultation</em>."). The gap comes from the slanted italic word pushing into the full stop. The full stop will be tucked up against the word so it reads "consultation." on screen.

## Verification
- Load each of the six pages and check its canonical and share tags.
- Fetch the sitemap and robots.txt.
- Confirm each page has exactly one h1 and that the logo descriptions are filled in.
- Take a screenshot of the Book heading.
- Remind you that tag and robots changes reach the live site on the next publish.
