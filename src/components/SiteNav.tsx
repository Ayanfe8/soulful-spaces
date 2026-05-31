import { Link } from "@tanstack/react-router";

export function SiteNav({ variant = "solid" }: { variant?: "solid" | "overlay" }) {
  const overlay = variant === "overlay";
  return (
    <nav
      className={
        overlay
          ? "fixed top-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-end mix-blend-difference"
          : "sticky top-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center bg-bone/85 backdrop-blur-md border-b border-charcoal/5"
      }
    >
      <Link
        to="/"
        className={`font-serif text-2xl font-medium tracking-tight ${
          overlay ? "text-bone" : "text-charcoal"
        }`}
      >
        Habitat<span className="text-terracotta">.</span>
      </Link>
      <div
        className={`hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] ${
          overlay ? "text-bone" : "text-charcoal"
        }`}
      >
        <Link to="/services/styling" className="hover:opacity-60 transition-opacity">Styling</Link>
        <Link to="/services/wellness" className="hover:opacity-60 transition-opacity">Wellness</Link>
        <Link to="/services/heritage" className="hover:opacity-60 transition-opacity">Heritage</Link>
        <Link to="/portfolio" className="hover:opacity-60 transition-opacity">Portfolio</Link>
        <Link
          to="/book"
          className={`px-4 py-2 border transition-colors ${
            overlay
              ? "border-bone hover:bg-bone hover:text-charcoal"
              : "border-charcoal hover:bg-charcoal hover:text-bone"
          }`}
        >
          Book
        </Link>
      </div>

    </nav>
  );
}
