import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-interior.jpg";
import stylingImg from "@/assets/service-styling.jpg";
import wellnessImg from "@/assets/service-wellness.jpg";
import heritageImg from "@/assets/service-heritage.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Habitat by Grayson — Spaces That Tell Your Story" },
      {
        name: "description",
        content:
          "Habitat by Grayson is a modern African interior and lifestyle brand creating intentional, soulful homes that blend global luxury with African warmth.",
      },
      { property: "og:title", content: "Habitat by Grayson — Spaces That Tell Your Story" },
      {
        property: "og:description",
        content:
          "Modern African interior design. Wellness-inspired, story-driven spaces that feel like you.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:ital,wght@0,400..600;1,400..600&display=swap",
      },
    ],
  }),
  component: Index,
});

const services = [
  {
    n: "01",
    title: "Interior Styling",
    caption: "Spatial Storytelling",
    body: "Thoughtfully curated interiors designed around your lifestyle, personality, and the rhythm of how you live.",
    img: stylingImg,
  },
  {
    n: "02",
    title: "Wellness-Inspired Living",
    caption: "Architectural Soul",
    body: "Environments engineered for restoration — natural light, sustainable materials, and considered stillness.",
    img: wellnessImg,
  },
  {
    n: "03",
    title: "Modern Heritage",
    caption: "Heritage Modern",
    body: "Global sophistication meets African warmth. Refined finishes, sculptural form, and pieces that carry meaning.",
    img: heritageImg,
  },
];

const experienceRow1 = ["Peace", "Belonging", "Soul", "Comfort"];
const experienceRow2 = ["Identity", "Refined", "Heritage", "Home"];

function Index() {
  return (
    <div className="bg-bone text-charcoal font-sans selection:bg-terracotta/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-end mix-blend-difference">
        <a href="#top" className="font-serif text-2xl font-medium tracking-tight text-bone">
          Habitat<span className="text-terracotta">.</span>
        </a>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] text-bone">
          <a href="#philosophy" className="hover:opacity-60 transition-opacity">Philosophy</a>
          <a href="#services" className="hover:opacity-60 transition-opacity">Services</a>
          <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="relative h-screen w-full flex items-end overflow-hidden bg-umber">
        <img
          src={heroImg}
          alt="Sun-drenched modern African villa interior with clay walls and carved wood furniture"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-charcoal/30" />
        <div className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 text-bone/60 text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl] rotate-180">
          Modern African Interiors — Est. Lagos
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:px-12 animate-reveal">
          <span className="block uppercase tracking-[0.3em] text-bone/70 text-xs mb-8">
            Habitat by Grayson
          </span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-bone leading-[0.95] text-balance max-w-[18ch] font-light">
            Spaces That Tell <em className="italic font-normal text-clay">Your Story.</em>
          </h1>
          <p className="mt-10 max-w-md text-bone/75 leading-relaxed">
            A modern African interior and lifestyle brand. We design intentional homes that
            reflect identity, hold memory, and feel undeniably like you.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium mb-6 block">
              The Philosophy
            </span>
            <div className="h-px w-16 bg-terracotta" />
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-serif text-4xl md:text-6xl mb-12 leading-[1.05] text-balance font-light">
              We design interiors that serve as the physical manifestation of your journey.
            </h2>
            <p className="text-lg md:text-xl text-umber/85 leading-relaxed text-pretty max-w-[56ch] mb-8">
              Blending global sophistication with African warmth, we curate environments that are
              timeless, wellness-inspired, and undeniably memorable. A home should carry identity,
              not imitation.
            </p>
            <p className="text-base text-umber/70 leading-relaxed max-w-[56ch] mb-12">
              Every texture, color, object, and detail is intentionally chosen to create harmony
              between beauty, comfort, functionality, and the soul of the people who live within.
            </p>
            <a
              href="#services"
              className="group inline-flex items-center bg-charcoal text-bone pl-2 pr-5 py-2 rounded-full ring-1 ring-charcoal transition-transform hover:scale-[1.02]"
            >
              <span className="size-9 bg-terracotta rounded-full flex items-center justify-center mr-3">
                <svg className="size-4 fill-bone" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10.5 8L6.5 4v8z" />
                </svg>
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em]">
                The Experience
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Experience marquee */}
      <section className="py-24 md:py-32 bg-clay/25 overflow-hidden">
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="flex whitespace-nowrap gap-12 marquee-l">
            {[...experienceRow1, ...experienceRow1, ...experienceRow1].map((w, i) => (
              <span
                key={`r1-${i}`}
                className={`font-serif text-7xl md:text-[10rem] lg:text-[12rem] leading-none ${
                  i % 2 === 0 ? "italic text-terracotta/15" : "text-charcoal"
                }`}
              >
                {w}
              </span>
            ))}
          </div>
          <div className="flex whitespace-nowrap gap-12 marquee-r">
            {[...experienceRow2, ...experienceRow2, ...experienceRow2].map((w, i) => (
              <span
                key={`r2-${i}`}
                className={`font-serif text-7xl md:text-[10rem] lg:text-[12rem] leading-none ${
                  i % 2 === 0 ? "text-charcoal" : "italic text-terracotta/15"
                }`}
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h3 className="font-serif text-5xl md:text-6xl text-balance max-w-[16ch] leading-[1.05] font-light">
              How We Shape Your World
            </h3>
            <p className="max-w-[40ch] text-umber/70 text-pretty">
              Through spatial storytelling and wellness-centered design, we help you create a
              sanctuary — for private residences, shortlet apartments, and hospitality spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {services.map((s, idx) => (
              <article
                key={s.n}
                className={`flex flex-col gap-8 ${
                  idx === 1 ? "md:mt-12 lg:mt-24" : idx === 2 ? "lg:mt-12" : ""
                }`}
              >
                <div className="w-full aspect-[4/5] overflow-hidden rounded-sm bg-clay/30 outline-1 -outline-offset-1 outline-black/5">
                  <img
                    src={s.img}
                    alt={s.caption}
                    loading="lazy"
                    width={960}
                    height={1200}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]"
                  />
                </div>
                <div className="flex gap-6">
                  <span className="font-serif text-2xl text-terracotta">{s.n}</span>
                  <div>
                    <h4 className="font-serif text-2xl mb-3 font-medium">{s.title}</h4>
                    <p className="text-sm text-umber/75 leading-relaxed max-w-[40ch] text-pretty">
                      {s.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Habitat — quote block */}
      <section className="py-32 md:py-40 px-6 md:px-12 bg-umber text-bone">
        <div className="max-w-5xl mx-auto text-center">
          <span className="uppercase tracking-[0.3em] text-xs text-clay mb-10 block">
            Why Habitat
          </span>
          <p className="font-serif text-3xl md:text-5xl leading-[1.15] italic font-light text-balance">
            “Even faith speaks of prepared spaces. We design with soul — because when a space
            truly reflects who you are, it becomes part of your story.”
          </p>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 max-w-3xl mx-auto text-xs uppercase tracking-[0.2em] text-bone/70">
            <span>Modern African Luxury</span>
            <span>Wellness-Centered</span>
            <span>Sustainable Thinking</span>
            <span>Functional Elegance</span>
            <span>Intentional Design</span>
            <span>Story-Driven Spaces</span>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer id="contact" className="bg-charcoal text-bone py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="uppercase tracking-[0.3em] text-xs opacity-50 mb-12">
            Start Your Project
          </span>
          <h2 className="font-serif text-5xl md:text-7xl mb-16 text-balance max-w-[20ch] font-light">
            Ready to create a space that feels like <em className="italic text-clay">you?</em>
          </h2>
          <a
            href="mailto:hello@habitatbygrayson.com"
            className="text-2xl md:text-4xl font-serif italic border-b border-bone/20 pb-4 hover:text-terracotta transition-colors"
          >
            hello@habitatbygrayson.com
          </a>

          <div className="w-full mt-32 pt-8 border-t border-bone/10 flex flex-col md:flex-row justify-between gap-6 text-[11px] uppercase tracking-[0.25em] opacity-50">
            <span>Habitat by Grayson &copy; {new Date().getFullYear()}</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-terracotta">Instagram</a>
              <a href="#" className="hover:text-terracotta">Pinterest</a>
              <a href="#" className="hover:text-terracotta">Journal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
