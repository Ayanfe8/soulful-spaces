import { Link } from "@tanstack/react-router";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export interface ServicePageProps {
  eyebrow: string;
  title: string;
  intro: string;
  heroImg: string;
  heroAlt: string;
  outcomes: { title: string; body: string }[];
  process: { n: string; title: string; body: string }[];
  deliverables: string[];
  galleryImgs: { src: string; alt: string }[];
  nextLink: { to: string; label: string };
}

export function ServicePage(p: ServicePageProps) {
  return (
    <div className="bg-bone text-charcoal">
      <SiteNav variant="solid" />

      {/* Hero */}
      <header className="px-6 md:px-12 pt-16 md:pt-24 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-6">
            <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium mb-6 block">
              {p.eyebrow}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] font-light text-balance mb-8">
              {p.title}
            </h1>
            <p className="text-lg md:text-xl text-umber/85 leading-relaxed max-w-[52ch] text-pretty">
              {p.intro}
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="w-full aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={p.heroImg}
                alt={p.heroAlt}
                width={1280}
                height={1600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Outcomes */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-charcoal/10 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium mb-6 block">
              Outcomes
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-balance">
              What you walk into.
            </h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {p.outcomes.map((o) => (
              <div key={o.title}>
                <h3 className="font-serif text-2xl mb-3 font-medium">{o.title}</h3>
                <p className="text-umber/75 leading-relaxed text-pretty">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-clay/25">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="font-serif text-4xl md:text-6xl font-light text-balance max-w-[14ch] leading-[1.05]">
              How we work, step by step.
            </h2>
            <span className="uppercase tracking-[0.25em] text-xs text-terracotta">The Process</span>
          </div>
          <ol className="divide-y divide-charcoal/15">
            {p.process.map((s) => (
              <li
                key={s.n}
                className="grid grid-cols-12 gap-6 py-10 items-baseline"
              >
                <span className="col-span-2 md:col-span-1 font-serif text-2xl md:text-3xl text-terracotta">
                  {s.n}
                </span>
                <h3 className="col-span-10 md:col-span-4 font-serif text-2xl md:text-3xl font-medium">
                  {s.title}
                </h3>
                <p className="col-span-12 md:col-span-7 text-umber/80 leading-relaxed text-pretty">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium mb-6 block">
              Deliverables
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-balance">
              Tangible pieces you leave with.
            </h2>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {p.deliverables.map((d, i) => (
              <li
                key={d}
                className="flex items-baseline gap-4 border-b border-charcoal/10 py-4"
              >
                <span className="font-serif text-sm text-terracotta tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-charcoal/90">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Example gallery */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-light">
              From recent work
            </h2>
            <Link
              to="/portfolio"
              className="text-xs uppercase tracking-[0.25em] border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors"
            >
              See portfolio
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {p.galleryImgs.map((g, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-sm bg-clay/30 ${
                  i === 1 ? "md:mt-12" : ""
                }`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-[4/5] transition-transform duration-[1200ms] hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next service */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-umber text-bone">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
          <span className="uppercase tracking-[0.25em] text-xs text-clay">Continue</span>
          <Link
            to={p.nextLink.to}
            className="font-serif text-4xl md:text-6xl italic border-b border-bone/30 pb-3 hover:text-terracotta transition-colors text-right md:text-left"
          >
            {p.nextLink.label} →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
