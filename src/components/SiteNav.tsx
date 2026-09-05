"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import logoAsset from "@/assets/HBG_LOGO.png.asset.json";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const logo = logoAsset.url;

const navLinks = [
  { label: "Styling", to: "/services/styling" },
  { label: "Wellness", to: "/services/wellness" },
  { label: "Heritage", to: "/services/heritage" },
  { label: "Portfolio", to: "/portfolio" },
];

export function SiteNav({ variant = "solid" }: { variant?: "solid" | "overlay" }) {
  const [open, setOpen] = useState(false);
  const overlay = variant === "overlay";

  const linkBase =
    "text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-60";

  // Overlay (homepage): transparent over the hero, sits in normal document
  // flow so it scrolls away with the page — never pinned.
  // Solid (portfolio / services / booking): opaque background, also in
  // normal document flow so it scrolls away with the page.
  const navClass = overlay
    ? "absolute top-0 w-full z-50 px-6 py-5 md:px-12 flex justify-between items-center text-bone"
    : "relative w-full z-50 px-6 py-5 md:px-12 flex justify-between items-center bg-bone border-b border-charcoal/10 shadow-sm text-charcoal";

  const borderColor = overlay ? "border-bone/60" : "border-charcoal";
  const bookHover = overlay
    ? "hover:bg-bone hover:text-charcoal"
    : "hover:bg-charcoal hover:text-bone";

  return (
    <nav className={navClass}>
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Habitat by Grayson"
          className="h-10 md:h-12 w-auto object-contain rounded-sm"
          width={256}
          height={256}
        />
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to} className={linkBase}>
            {link.label}
          </Link>
        ))}
        <Link
          to="/book"
          className={`px-4 py-2 border ${borderColor} transition-colors ${bookHover}`}
        >
          Book
        </Link>
      </div>

      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className={`md:hidden p-2 -mr-2 transition-opacity hover:opacity-60 ${overlay ? "text-bone" : "text-charcoal"}`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:max-w-sm border-none p-0 bg-bone text-charcoal"
        >
          <div className="flex flex-col h-full px-8 py-20">
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <SheetClose key={link.to} asChild>
                  <Link
                    to={link.to}
                    className={`${linkBase} text-lg text-charcoal`}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  to="/book"
                  className="mt-4 px-6 py-3 text-center text-xs uppercase tracking-[0.2em] border border-charcoal text-charcoal transition-colors hover:bg-charcoal hover:text-bone"
                >
                  Book
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
