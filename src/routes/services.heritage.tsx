import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import heroImg from "@/assets/service-heritage.jpg";
import g1 from "@/assets/portfolio-2.jpg";
import g2 from "@/assets/portfolio-5.jpg";
import g3 from "@/assets/portfolio-3.jpg";

export const Route = createFileRoute("/services/heritage")({
  head: () => ({
    meta: [
      { title: "Modern Heritage — Habitat by Grayson" },
      {
        name: "description",
        content:
          "Modern African heritage interiors. Global sophistication meets ancestral warmth — sculptural form, refined finishes, and pieces that carry meaning.",
      },
      { property: "og:title", content: "Modern Heritage — Habitat by Grayson" },
      {
        property: "og:description",
        content:
          "Interiors where contemporary global aesthetics meet the rich, soulful texture of African living.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="Service — 03"
      title="Modern Heritage & Luxury Curation."
      intro="A dialogue between contemporary form and the textures of the continent. We curate interiors that feel globally fluent and unmistakably rooted — refined enough to last decades, soulful enough to belong to one person."
      heroImg={heroImg}
      heroAlt="Sculptural carved wood chair and ceramic vase in bone-toned room"
      outcomes={[
        {
          title: "An interior that earns longevity.",
          body: "Heritage materials and considered silhouettes that won't read as 'last year' in five years.",
        },
        {
          title: "Cultural depth, not pastiche.",
          body: "African influence translated with restraint — texture, craft, and form rather than motif.",
        },
        {
          title: "A collectable home.",
          body: "Investment pieces, commissioned craft, and quietly luxurious finishes that build over time.",
        },
        {
          title: "Hospitality-grade refinement.",
          body: "Equally suited to a private residence, a luxury shortlet, or a creative hospitality concept.",
        },
      ]}
      process={[
        {
          n: "01",
          title: "Brand & Identity Brief",
          body: "We articulate your personal or property identity — the references, heritage, and tone the space needs to embody.",
        },
        {
          n: "02",
          title: "Heritage Material Library",
          body: "A curated library of stone, wood, plaster, brass, textile, and craft — sourced from African and global makers.",
        },
        {
          n: "03",
          title: "Commission & Curation",
          body: "Bespoke furniture commissions, sourced art, and acquired vintage. We work with a network of makers across the continent.",
        },
        {
          n: "04",
          title: "Install, Document & Steward",
          body: "Full install, archival photography, and an ongoing relationship to evolve the space as your collection grows.",
        },
      ]}
      deliverables={[
        "Identity & references brief",
        "Heritage material & finishes library",
        "Bespoke furniture commission management",
        "Sourced art, vintage & collectable pieces",
        "Full spatial design & lighting plan",
        "Archival project photography",
        "Provenance documentation for every piece",
        "Ongoing collection stewardship",
      ]}
      galleryImgs={[
        { src: g1, alt: "Dining room with carved wood table and sculptural pendant" },
        { src: g2, alt: "Hospitality lobby with carved screen and brass sconces" },
        { src: g3, alt: "Lounge with curated African art and brass coffee table" },
      ]}
      nextLink={{ to: "/services/styling", label: "Interior Styling" }}
    />
  ),
});
