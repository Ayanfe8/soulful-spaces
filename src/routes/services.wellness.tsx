import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import heroImg from "@/assets/service-wellness.jpg";
import g1 from "@/assets/portfolio-4.jpg";
import g2 from "@/assets/portfolio-6.jpg";
import g3 from "@/assets/portfolio-1.jpg";

export const Route = createFileRoute("/services/wellness")({
  head: () => ({
    meta: [
      { title: "Wellness-Inspired Living — Habitat by Grayson" },
      {
        name: "description",
        content:
          "Wellness-centered interior design. Spaces engineered for rest, restoration, and balance through natural light and considered material.",
      },
      { property: "og:title", content: "Wellness-Inspired Living — Habitat by Grayson" },
      {
        property: "og:description",
        content:
          "Interiors that calm, heal, and energise. Designed around light, breath, and sustainable material.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="Service — 02"
      title="Wellness-Inspired Living Spaces."
      intro="Homes are nervous systems. We design environments that lower your heart rate the moment you walk in — through light, air, organic material, and a deliberate quiet at the core of every room."
      heroImg={heroImg}
      heroAlt="Carved arched window casting warm light on terracotta walls"
      outcomes={[
        {
          title: "Rooms that restore you.",
          body: "Light, scent, sound, and temperature planned as carefully as the furniture itself.",
        },
        {
          title: "Sleep, focus, and rest zones.",
          body: "Distinct atmospheres for unwinding, working, and gathering — each tuned to its purpose.",
        },
        {
          title: "Healthier material choices.",
          body: "Low-VOC finishes, natural fibers, breathable plasters, and locally sourced wood where possible.",
        },
        {
          title: "Calm visual rhythm.",
          body: "Edited palettes and considered negative space — the antidote to visual noise.",
        },
      ]}
      process={[
        {
          n: "01",
          title: "Lifestyle Audit",
          body: "We map your daily rhythms — sleep, movement, work, recovery — and identify where your current space supports or resists them.",
        },
        {
          n: "02",
          title: "Sensory Brief",
          body: "A wellness brief tuning light temperature, acoustics, scent, and tactile material to each room's function.",
        },
        {
          n: "03",
          title: "Spatial Reconfiguration",
          body: "We rethink layout, circulation, and zoning so the architecture itself starts working for your wellbeing.",
        },
        {
          n: "04",
          title: "Material & Light Install",
          body: "Natural finishes, soft layered lighting, biophilic detail, and final calibration once you've moved in.",
        },
      ]}
      deliverables={[
        "Wellness lifestyle audit & report",
        "Sensory design brief (light, sound, scent, touch)",
        "Floor-plan reconfiguration & circulation study",
        "Lighting plan with layered scenes",
        "Curated natural material & finishes library",
        "Biophilic planting & air-quality plan",
        "Post-occupancy calibration visit (30 days)",
      ]}
      galleryImgs={[
        { src: g1, alt: "Reading nook with arched window and ceramic vessels" },
        { src: g2, alt: "Sculptural ceramic vessels in warm shadow light" },
        { src: g3, alt: "Calm bedroom with woven headboard and linen drapes" },
      ]}
      nextLink={{ to: "/services/heritage", label: "Modern Heritage" }}
    />
  ),
});
