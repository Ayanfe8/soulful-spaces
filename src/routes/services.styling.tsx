import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import heroImg from "@/assets/service-styling.jpg";
import g1 from "@/assets/portfolio-1.jpg";
import g2 from "@/assets/portfolio-3.jpg";
import g3 from "@/assets/portfolio-6.jpg";

export const Route = createFileRoute("/services/styling")({
  head: () => ({
    meta: [
      { title: "Interior Styling — Habitat by Grayson" },
      {
        name: "description",
        content:
          "Spatial storytelling and interior styling for residences, shortlets, and hospitality. Outcomes, process, and deliverables.",
      },
      { property: "og:title", content: "Interior Styling — Habitat by Grayson" },
      {
        property: "og:description",
        content:
          "Thoughtfully curated interiors designed around your lifestyle, personality, and the rhythm of how you live.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="Service — 01"
      title="Interior Styling & Spatial Storytelling."
      intro="We compose interiors that feel inhabited from the first day — a layered choreography of texture, color, light, and object. Every room is styled to hold your story, not perform it."
      heroImg={heroImg}
      heroAlt="Hand-woven African textiles and clay vessels in warm light"
      outcomes={[
        {
          title: "A home that feels lived-in immediately.",
          body: "No staged showroom. Layered styling that softens new builds and refreshes the familiar.",
        },
        {
          title: "Cohesion across every room.",
          body: "A through-line of palette, material, and mood — so the house reads as one body of work.",
        },
        {
          title: "Pieces with provenance.",
          body: "Sourced craft, vintage, and modern African design — curated, not collected.",
        },
        {
          title: "Photo-ready surfaces.",
          body: "Editorial-grade compositions on shelves, mantels, and side tables that hold up to close inspection.",
        },
      ]}
      process={[
        {
          n: "01",
          title: "Discovery & Story",
          body: "An intimate session about how you live, what you love, what you've outgrown, and what you want your home to give back to you.",
        },
        {
          n: "02",
          title: "Concept & Palette",
          body: "We translate your story into a visual direction — mood, palette, material library, and a styling intent for every room.",
        },
        {
          n: "03",
          title: "Sourcing & Curation",
          body: "Trade access to vintage, artisan-made, and modern African pieces. Nothing generic. Every object earns its place.",
        },
        {
          n: "04",
          title: "Install & Composition",
          body: "We arrange, restyle, edit, and live with the space until it settles. Final composition photographs are delivered.",
        },
      ]}
      deliverables={[
        "Personalised styling brief & mood direction",
        "Curated room-by-room palette guide",
        "Sourced furniture, textiles & accessories list",
        "Custom artwork & object curation",
        "On-site styling & final composition install",
        "Editorial-grade photography of the finished space",
        "Care, maintenance & seasonal restyling notes",
      ]}
      galleryImgs={[
        { src: g1, alt: "Bedroom styled with woven headboard and linen drapes" },
        { src: g2, alt: "Lounge with curated African art and brass coffee table" },
        { src: g3, alt: "Sculptural ceramic still life on raw plaster shelf" },
      ]}
      nextLink={{ to: "/services/wellness", label: "Wellness-Inspired Living" }}
    />
  ),
});
