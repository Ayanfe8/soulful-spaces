import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/hero-interior.jpg";
import stylingImg from "@/assets/service-styling.jpg";
import wellnessImg from "@/assets/service-wellness.jpg";
import heritageImg from "@/assets/service-heritage.jpg";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";

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
    body: "Thoughtfully curated interiors designed around your lifestyle, personality, and the rhythm of how you live.",
    img: stylingImg,
    to: "/services/styling" as const,
  },
  {
    n: "02",
    title: "Wellness-Inspired Living",
    body: "Environments engineered for restoration — natural light, sustainable materials, and considered stillness.",
    img: wellnessImg,
    to: "/services/wellness" as const,
  },
  {
    n: "03",
    title: "Modern Heritage",
    body: "Global sophistication meets African warmth. Refined finishes, sculptural form, and pieces that carry meaning.",
    img: heritageImg,
    to: "/services/heritage" as const,
  },
];

const experienceRow1 = ["Peace", "Belonging", "Soul", "Comfort"];
const experienceRow2 = ["Identity", "Refined", "Heritage", "Home"];

function Index() {
  return (
    <div className="bg-bone text-charcoal font-sans selection:bg-terracotta/20">
      <SiteNav variant="overlay" />

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
        <div className="hidden md:block absolute top-1/2 left-6 md:left-12 -translate-y-1/2 text-bone/60 text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl] rotate-180">
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
            <Link
              to="/portfolio"
              className="group inline-flex items-center bg-charcoal text-bone pl-2 pr-5 py-2 rounded-full ring-1 ring-charcoal transition-transform hover:scale-[1.02]"
            >
              <span className="size-9 bg-terracotta rounded-full flex items-center justify-center mr-3">
                <svg className="size-4 fill-bone" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10.5 8L6.5 4v8z" />
                </svg>
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em]">
                See the Portfolio
              </span>
            </Link>
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
              <Link
                key={s.n}
                to={s.to}
                className={`group flex flex-col gap-8 ${
                  idx === 1 ? "md:mt-12 lg:mt-24" : idx === 2 ? "lg:mt-12" : ""
                }`}
              >
                <div className="w-full aspect-[4/5] overflow-hidden rounded-sm bg-clay/30 outline-1 -outline-offset-1 outline-black/5">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    width={960}
                    height={1200}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex gap-6">
                  <span className="font-serif text-2xl text-terracotta">{s.n}</span>
                  <div>
                    <h4 className="font-serif text-2xl mb-3 font-medium group-hover:italic transition-all">
                      {s.title}
                    </h4>
                    <p className="text-sm text-umber/75 leading-relaxed max-w-[40ch] text-pretty">
                      {s.body}
                    </p>
                    <span className="inline-block mt-4 text-[11px] uppercase tracking-[0.25em] text-terracotta border-b border-terracotta/40 pb-0.5">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
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

      {/* What We Create — value cards */}
      <section className="py-32 md:py-40 px-6 md:px-12 bg-bone">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 max-w-2xl">
            <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium mb-6 block">
              What We Create
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.05] text-balance">
              Interiors with intention, <em className="italic text-terracotta">not just aesthetic.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10">
            {[
              { t: "Story-driven homes", b: "Spaces designed around your identity, rhythm, and the memories you're building." },
              { t: "Wellness-inspired living", b: "Rooms that restore — natural light, calm palettes, honest materials." },
              { t: "Modern African luxury", b: "Global sophistication grounded in African warmth, texture, and form." },
              { t: "Shortlet & Airbnb styling", b: "Guest-ready interiors that photograph beautifully and book consistently." },
              { t: "Move-in-ready styling", b: "New homes and apartments styled to feel finished from day one." },
              { t: "Intentional space refreshes", b: "Considered edits that transform how a familiar room feels and functions." },
            ].map((c) => (
              <div key={c.t} className="bg-bone p-10 flex flex-col gap-3 hover:bg-clay/20 transition-colors">
                <h3 className="font-serif text-2xl font-medium">{c.t}</h3>
                <p className="text-sm text-umber/75 leading-relaxed">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designed For The Way You Live */}
      <section className="py-32 md:py-40 px-6 md:px-12 bg-clay/25">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium mb-6 block">
              Who We Serve
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.05] text-balance">
              Designed For The Way <em className="italic">You Live.</em>
            </h2>
            <p className="mt-8 text-umber/80 leading-relaxed max-w-[42ch]">
              Habitat is built for people who want more than a beautifully decorated room. It's for
              those creating a home that reflects who they are — and where they're going.
            </p>
          </div>
          <ul className="lg:col-span-7 flex flex-col divide-y divide-charcoal/15">
            {[
              ["New homeowners", "Starting fresh and wanting to get it right the first time."],
              ["Diaspora homeowners", "Building or styling a home in Africa from anywhere in the world."],
              ["Shortlet & Airbnb investors", "Turning properties into stays guests remember and rebook."],
              ["Professionals & founders", "Time-poor, taste-rich — spaces that match the life you've built."],
              ["Families building intentional homes", "Rooms that grow with your people, your rituals, your story."],
              ["People who want spaces that feel like them", "Not just interiors that look good online — homes that feel true offline."],
            ].map(([t, b], i) => (
              <li key={t} className="py-6 flex gap-6 md:gap-10 items-baseline">
                <span className="font-serif text-terracotta text-lg tabular-nums shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-light mb-1">{t}</h3>
                  <p className="text-sm text-umber/75 leading-relaxed max-w-[52ch]">{b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Signature Services */}
      <section id="signature-services" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium mb-6 block">
                Signature Services
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.05] text-balance max-w-[18ch]">
                Ways to work with <em className="italic">Habitat.</em>
              </h2>
            </div>
            <p className="max-w-[38ch] text-umber/70 text-pretty">
              Every engagement is intimate and considered — from a single room to a full curated
              transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-charcoal/10 border border-charcoal/10">
            {[
              {
                tag: "01 — Consultation",
                title: "The Habitat Home Edit",
                body: "A guided styling direction for people who want to shop and style themselves. Includes consultation, custom mood board, shopping list, and a written styling direction.",
              },
              {
                tag: "02 — One Room",
                title: "Room Story Styling",
                body: "One room, fully styled and transformed. Perfect for a living room, bedroom, or reading nook that deserves its own moment.",
              },
              {
                tag: "03 — New Homes",
                title: "Move-In Ready Styling",
                body: "For new homes and apartments. We prepare the space so it feels finished, personal, and warm from the day you walk in.",
              },
              {
                tag: "04 — Hospitality",
                title: "Shortlet & Airbnb Styling",
                body: "Guest-ready interiors designed for beauty, comfort, and stronger booking appeal — spaces that photograph well and feel even better in person.",
              },
              {
                tag: "05 — Full Home",
                title: "Signature Habitat Transformation",
                body: "Our most complete offering. A full home styling and curated interior experience — art, objects, textiles, and stories woven together with intention.",
                wide: true,
              },
            ].map((s) => (
              <div
                key={s.title}
                className={`bg-bone p-10 md:p-12 flex flex-col gap-4 hover:bg-clay/20 transition-colors ${
                  s.wide ? "md:col-span-2" : ""
                }`}
              >
                <span className="uppercase tracking-[0.25em] text-[10px] text-terracotta">
                  {s.tag}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-light">{s.title}</h3>
                <p className="text-umber/75 leading-relaxed max-w-[62ch]">{s.body}</p>
                <Link
                  to="/book"
                  className="mt-4 inline-block text-[11px] uppercase tracking-[0.25em] text-charcoal border-b border-terracotta pb-1 self-start hover:text-terracotta transition-colors"
                >
                  Enquire →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Habitat Experience — process */}
      <section className="py-32 md:py-40 px-6 md:px-12 bg-charcoal text-bone">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 max-w-2xl">
            <span className="uppercase tracking-[0.25em] text-xs text-clay mb-6 block">
              Our Process
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.05] text-balance">
              The Habitat <em className="italic text-clay">Experience.</em>
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-6">
            {[
              { n: "01", t: "Discover Your Story", b: "We begin with a deep conversation about your life, values, and how you want your home to feel." },
              { n: "02", t: "Define the Mood", b: "A tailored mood board translates your story into palette, texture, and atmosphere." },
              { n: "03", t: "Curate the Details", b: "We source furniture, objects, and finishes with meaning — pieces chosen, not filled." },
              { n: "04", t: "Style the Space", b: "Installation day. Every layer placed with intention, from art to the smallest vessel." },
              { n: "05", t: "Reveal Your Habitat", b: "You come home to a space that feels unmistakably, quietly, beautifully like you." },
            ].map((step) => (
              <li key={step.n} className="flex flex-col gap-4 border-t border-bone/20 pt-6">
                <span className="font-serif text-4xl text-clay">{step.n}</span>
                <h3 className="font-serif text-xl font-medium">{step.t}</h3>
                <p className="text-sm text-bone/70 leading-relaxed">{step.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Founding Client Offer */}
      <section className="py-32 md:py-40 px-6 md:px-12 bg-terracotta text-bone">
        <div className="max-w-5xl mx-auto text-center">
          <span className="uppercase tracking-[0.3em] text-[11px] text-bone/70 mb-8 block">
            Founding Client Programme — Limited Spaces
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.1] text-balance max-w-[22ch] mx-auto">
            We are currently accepting a limited number of founding clients for our first Habitat
            transformations.
          </h2>
          <p className="mt-10 text-bone/85 leading-relaxed max-w-[58ch] mx-auto text-lg">
            Founding clients receive a more intimate styling experience, special introductory
            pricing, and the opportunity to be part of Habitat by Grayson's first documented
            transformations — the projects that will shape the brand's story.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="inline-block px-10 py-5 bg-bone text-charcoal uppercase tracking-[0.25em] text-xs hover:bg-charcoal hover:text-bone transition-colors"
            >
              Become a Founding Client
            </Link>
            <a
              href="https://wa.me/2340000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-5 border border-bone/50 text-bone uppercase tracking-[0.25em] text-xs hover:bg-bone/10 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio — The Habitat Moodboard preview */}
      <section id="moodboard" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium mb-6 block">
                Portfolio in Progress
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.05] text-balance max-w-[18ch]">
                The Habitat <em className="italic">Moodboard.</em>
              </h2>
            </div>
            <p className="max-w-[42ch] text-umber/75 text-pretty">
              Our first transformations are coming soon. For now, explore the mood, textures, and
              design direction shaping the Habitat aesthetic.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              { src: stylingImg, label: "Calm living rooms", span: "col-span-2 row-span-2 aspect-square" },
              { src: p1, label: "Modern African textures", span: "aspect-[3/4]" },
              { src: p2, label: "Styled bedrooms", span: "aspect-[3/4]" },
              { src: heritageImg, label: "Shortlet styling", span: "aspect-[3/4]" },
              { src: wellnessImg, label: "Natural materials", span: "col-span-2 aspect-[3/2]" },
              { src: p3, label: "Wellness corners", span: "aspect-[3/4]" },
              { src: heroImg, label: "Considered living", span: "col-span-2 aspect-[3/2]" },
            ].map((tile, i) => (
              <figure
                key={i}
                className={`relative overflow-hidden rounded-sm bg-clay/30 group ${tile.span}`}
              >
                <img
                  src={tile.src}
                  alt={tile.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-[10px] uppercase tracking-[0.25em] text-bone bg-gradient-to-t from-charcoal/70 to-transparent">
                  {tile.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/portfolio"
              className="inline-block text-xs uppercase tracking-[0.3em] border-b border-terracotta pb-1 hover:text-terracotta transition-colors"
            >
              See the full moodboard →
            </Link>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="py-32 md:py-40 px-6 md:px-12 bg-clay/25">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-3">
            <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium block">
              Founder's Note
            </span>
            <div className="h-px w-12 bg-terracotta mt-6" />
          </div>
          <div className="md:col-span-9">
            <p className="font-serif text-2xl md:text-3xl leading-[1.35] text-charcoal/90 font-light text-pretty">
              Habitat by Grayson was born from a desire to help people live in spaces that tell
              their story. Too many homes look beautiful but feel disconnected from the people who
              live in them. We are here to create spaces that feel like{" "}
              <em className="italic text-terracotta">peace, identity, beauty, and belonging.</em>
            </p>
            <p className="mt-10 text-sm uppercase tracking-[0.3em] text-umber/70">
              — Grayson, Founder
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium mb-6 block">
              Questions, Answered
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.05] text-balance">
              Before we <em className="italic">begin.</em>
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "Can I start with just one room?",
                a: "Absolutely. Room Story Styling was created for exactly that — a single space, fully considered and transformed. It's one of the most beautiful ways to experience Habitat for the first time.",
              },
              {
                q: "Do you offer consultation only?",
                a: "Yes. The Habitat Home Edit is a consultation-led package that includes a custom mood board, shopping list, and written styling direction — perfect if you'd like to style your space yourself with expert guidance.",
              },
              {
                q: "Can you style a shortlet or Airbnb?",
                a: "Yes — this is one of our specialties. We design guest-ready interiors that photograph beautifully, feel warm on arrival, and give your property a stronger booking edge.",
              },
              {
                q: "Do you work with existing furniture?",
                a: "Yes. We often blend heirloom pieces and existing furniture with new curation. Great design honours what's already meaningful and edits with intention.",
              },
              {
                q: "Can I work with you if I am outside Lagos or outside Nigeria?",
                a: "Yes. We work with diaspora homeowners across the world and offer remote consultations, virtual mood boards, and full project coordination for homes anywhere on the continent.",
              },
              {
                q: "How do I get started?",
                a: "Book a discovery call or send us photos of your space. We'll listen to your story, understand your vision, and recommend the Habitat service that fits you best.",
              },
            ].map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-charcoal/15"
              >
                <AccordionTrigger className="font-serif text-xl md:text-2xl font-light py-6 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-umber/80 leading-relaxed pb-6 max-w-[62ch]">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-umber text-bone">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-5xl md:text-8xl font-light leading-[1.02] text-balance">
            Your space should <em className="italic text-clay">feel like you.</em>
          </h2>
          <p className="mt-8 text-lg md:text-xl text-bone/80 max-w-[42ch] mx-auto">
            Let's create a home that tells your story.
          </p>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="inline-block px-10 py-5 bg-bone text-charcoal uppercase tracking-[0.25em] text-xs hover:bg-terracotta hover:text-bone transition-colors"
            >
              Book a Discovery Call
            </Link>
            <a
              href="mailto:hello@habitatbygrayson.com?subject=Photos%20of%20my%20space"
              className="inline-block px-10 py-5 border border-bone/50 text-bone uppercase tracking-[0.25em] text-xs hover:bg-bone/10 transition-colors"
            >
              Send Us Photos of Your Space
            </a>
          </div>

          <div className="mt-16 pt-10 border-t border-bone/15 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
            <a
              href="https://wa.me/2340000000000"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 hover:text-clay transition-colors"
            >
              <span className="uppercase tracking-[0.25em] text-[10px] text-bone/60">WhatsApp — Fastest</span>
              <span className="font-serif italic text-lg">Chat with us</span>
            </a>
            <a
              href="mailto:hello@habitatbygrayson.com"
              className="flex flex-col items-center gap-2 hover:text-clay transition-colors"
            >
              <span className="uppercase tracking-[0.25em] text-[10px] text-bone/60">Email</span>
              <span className="font-serif italic text-lg">hello@habitatbygrayson.com</span>
            </a>
            <a
              href="https://instagram.com/habitatbygrayson"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 hover:text-clay transition-colors"
            >
              <span className="uppercase tracking-[0.25em] text-[10px] text-bone/60">Instagram</span>
              <span className="font-serif italic text-lg">@habitatbygrayson</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
