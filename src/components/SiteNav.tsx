"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/habitat-logo.jpeg.asset.json";
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

      {/* Desktop nav */}
      <div
        className={`hidden md:flex items-center gap-8 ${
          overlay ? "text-bone" : "text-charcoal"
        }`}
      >
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to} className={linkBase}>
            {link.label}
          </Link>
        ))}
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

      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className={`md:hidden p-2 -mr-2 transition-opacity hover:opacity-60 ${
              overlay ? "text-bone" : "text-charcoal"
            }`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className={`w-full sm:max-w-sm border-none p-0 ${
            overlay ? "bg-charcoal text-bone" : "bg-bone text-charcoal"
          }`}
        >
          <div className="flex flex-col h-full px-8 py-20">
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <SheetClose key={link.to} asChild>
                  <Link
                    to={link.to}
                    className={`${linkBase} text-lg ${
                      overlay ? "text-bone" : "text-charcoal"
                    }`}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  to="/book"
                  className={`mt-4 px-6 py-3 text-center text-xs uppercase tracking-[0.2em] border transition-colors ${
                    overlay
                      ? "border-bone text-bone hover:bg-bone hover:text-charcoal"
                      : "border-charcoal text-charcoal hover:bg-charcoal hover:text-bone"
                  }`}
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
