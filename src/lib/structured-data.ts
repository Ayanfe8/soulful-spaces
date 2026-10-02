const SITE = "https://habitatbygrayson.com";

type Socials = { instagram_url: string | null; pinterest_url: string | null } | null | undefined;

const services = [
  { name: "Interior Styling", path: "/services/styling" },
  { name: "Wellness-Inspired Living", path: "/services/wellness" },
  { name: "Modern Heritage & Luxury Curation", path: "/services/heritage" },
];

export function professionalServiceJsonLd(settings: Socials) {
  const sameAs = [settings?.instagram_url, settings?.pinterest_url].filter(
    (u): u is string => !!u,
  );
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/#business`,
    name: "Habitat by Grayson",
    description:
      "Habitat by Grayson is a modern African interior and lifestyle brand creating intentional, soulful homes that blend global luxury with African warmth.",
    url: SITE,
    logo: `${SITE}/logo.webp`,
    image: `${SITE}/og-home.jpg`,
    telephone: "+2348166714849",
    areaServed: { "@type": "Country", name: "Nigeria" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior Design Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `${SITE}${s.path}` },
      })),
    },
  };
}
