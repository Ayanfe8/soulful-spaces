import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { siteSettingsQueryOptions } from "@/lib/site-settings-data";
import { portfolioQueryOptions } from "@/lib/portfolio-data";
import { storageImageUrl } from "@/lib/storage";

type Category = "All" | "Residential" | "Hospitality" | "Wellness" | "Detail";

interface Project {
  src: string;
  title: string;
  location: string;
  year: string;
  category: string;
  ratio: string;
}

const resolveImage = (path: string | null) => storageImageUrl(path);

const categories: Category[] = ["All", "Residential", "Hospitality", "Wellness", "Detail"];

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Habitat by Grayson" },
      {
        name: "description",
        content:
          "Selected interior design projects by Habitat by Grayson — residential, hospitality, wellness, and detail work across Africa and beyond.",
      },
      { property: "og:title", content: "Portfolio — Habitat by Grayson" },
      {
        property: "og:description",
        content: "Selected interiors. Residential, hospitality, and wellness work.",
      },
      { property: "og:image", content: storageImageUrl("portfolio/portfolio-2.jpg") },
      { name: "twitter:image", content: storageImageUrl("portfolio/portfolio-2.jpg") },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(siteSettingsQueryOptions()),
      context.queryClient.ensureQueryData(portfolioQueryOptions()),
    ]),
  errorComponent: ({ error }) => <div role="alert" className="p-12">{error.message}</div>,
  notFoundComponent: () => <div className="p-12">No projects found.</div>,
  component: PortfolioPage,
});

function PortfolioPage() {
  const { data: settings } = useSuspenseQuery(siteSettingsQueryOptions());
  const { data: rows } = useSuspenseQuery(portfolioQueryOptions());
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const projects: Project[] = rows.map((r) => ({
    src: resolveImage(r.image_path),
    title: r.title,
    location: r.location ?? "",
    year: r.year ?? "",
    category: r.category,
    ratio: r.ratio,
  }));

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-bone text-charcoal min-h-screen">
      <SiteNav variant="solid" />

      {/* Header */}
      <header className="px-6 md:px-12 pt-16 md:pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium mb-6 block">
            Selected Works — 2022 / 2024
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] font-light text-balance max-w-[16ch]">
            A portfolio of <em className="italic text-terracotta">prepared spaces.</em>
          </h1>
          <p className="mt-8 max-w-[58ch] text-lg text-umber/80 leading-relaxed">
            Residences, shortlets, and hospitality concepts shaped around the people they belong to.
            Quiet, considered, deeply personal.
          </p>
        </div>
      </header>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-40 bg-bone/90 backdrop-blur-md border-y border-charcoal/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex gap-2 md:gap-3 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] transition-colors border ${
                active === c
                  ? "bg-charcoal text-bone border-charcoal"
                  : "border-charcoal/20 text-charcoal/70 hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-ish grid */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 [column-fill:_balance]">
          {filtered.map((p, i) => (
            <button
              key={`${p.title}-${i}`}
              onClick={() => setLightbox(p)}
              className="block w-full mb-6 md:mb-8 break-inside-avoid text-left group cursor-pointer"
            >
              <div
                className={`overflow-hidden rounded-sm bg-clay/30 ${
                  p.ratio === "wide"
                    ? "aspect-[4/3]"
                    : p.ratio === "square"
                      ? "aspect-square"
                      : "aspect-[4/5]"
                }`}
              >
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex justify-between items-baseline mt-4 pb-2 border-b border-charcoal/10">
                <div>
                  <h3 className="font-serif text-xl group-hover:italic transition-all">
                    {p.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-umber/60 mt-1">
                    {p.category} · {p.location}
                  </p>
                </div>
                <span className="font-serif text-sm text-terracotta tabular-nums">{p.year}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="px-6 md:px-12 py-20 bg-clay/25">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <h2 className="font-serif text-3xl md:text-5xl font-light max-w-[20ch] text-balance">
            Have a space in mind? Let's prepare it together.
          </h2>
          <Link
            to="/services/styling"
            className="inline-flex items-center bg-charcoal text-bone pl-2 pr-6 py-2 rounded-full hover:bg-terracotta transition-colors"
          >
            <span className="size-9 bg-terracotta rounded-full mr-3" />
            <span className="text-xs font-medium uppercase tracking-[0.2em]">Explore services</span>
          </Link>
        </div>
      </section>

      <SiteFooter settings={settings} />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-reveal"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-6 right-6 size-10 rounded-full bg-bone/10 text-bone hover:bg-terracotta transition-colors flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="size-5 stroke-current fill-none" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <figure
            className="max-w-5xl w-full flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="w-full max-h-[80vh] object-contain rounded-sm"
            />
            <figcaption className="flex justify-between items-baseline text-bone">
              <div>
                <h3 className="font-serif text-2xl">{lightbox.title}</h3>
                <p className="text-[11px] uppercase tracking-[0.25em] text-bone/60 mt-1">
                  {lightbox.category} · {lightbox.location}
                </p>
              </div>
              <span className="font-serif text-clay">{lightbox.year}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
