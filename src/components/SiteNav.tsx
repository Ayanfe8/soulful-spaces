import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/habitat-logo.jpeg.asset.json";

const logo = logoAsset.url;

export function SiteNav({ variant = "solid" }: { variant?: "solid" | "overlay" }) {
  const overlay = variant === "overlay";
  return (
    <nav
      className={
        overlay
          ? "fixed top-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference"
          : "sticky top-0 w-full z-50 px-6 py-5 md:px-12 flex justify-between items-center bg-bone/85 backdrop-blur-md border-b border-charcoal/5"
      }
    >
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Habitat by Grayson"
          className={`h-10 md:h-12 w-auto object-contain rounded-sm ${overlay ? "ring-1 ring-bone/20 shadow-lg" : ""}`}
          width={256}
          height={256}
        />
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
