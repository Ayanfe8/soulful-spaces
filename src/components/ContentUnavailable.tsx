import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

interface ContentUnavailableProps {
  /** What the visitor was trying to see, e.g. "portfolio". */
  section?: string;
}

/**
 * Honest degraded state: shown when content could not be loaded, so a visitor
 * never mistakes an outage for Habitat by Grayson having nothing to show.
 */
export function ContentUnavailable({ section = "content" }: ContentUnavailableProps) {
  return (
    <div className="bg-bone text-charcoal min-h-screen flex flex-col">
      <SiteNav variant="solid" />
      <main
        role="alert"
        className="flex-1 flex items-center justify-center px-6 py-24 md:py-32"
      >
        <div className="max-w-[52ch] text-center">
          <span className="uppercase tracking-[0.25em] text-xs text-terracotta font-medium mb-6 block">
            Temporarily unavailable
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-light leading-[1.05] text-balance">
            We couldn't load this {section} right now.
          </h1>
          <p className="mt-6 text-lg text-umber/80 leading-relaxed">
            This is a temporary connection issue on our side — not an empty studio. Our
            work is still here. Please try again in a moment.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-block px-8 py-4 bg-charcoal text-bone uppercase tracking-[0.25em] text-xs hover:bg-terracotta transition-colors rounded-full"
            >
              Try again
            </button>
            <a
              href="mailto:hello@habitatbygrayson.com"
              className="inline-block px-8 py-4 border border-charcoal/20 uppercase tracking-[0.25em] text-xs hover:border-terracotta hover:text-terracotta transition-colors rounded-full"
            >
              Email the studio
            </a>
          </div>
        </div>
      </main>
      <SiteFooter settings={null} />
    </div>
  );
}
