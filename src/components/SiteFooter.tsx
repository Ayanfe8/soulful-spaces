"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoAsset from "@/assets/HBG_LOGO.png.asset.json";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import type { Database } from "@/integrations/supabase/types";

const logo = logoAsset.url;

type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];

interface SiteFooterProps {
  settings?: Pick<
    SiteSettingsRow,
    "contact_email" | "instagram_url" | "pinterest_url" | "journal_enabled"
  > | null;
}

const linkClass =
  "text-bone/80 hover:text-terracotta transition-colors w-fit text-left";
const labelClass = "text-bone/45 text-[11px] uppercase tracking-[0.28em]";

export function SiteFooter({ settings }: SiteFooterProps) {
  const contactEmail = settings?.contact_email ?? "hello@habitatbygrayson.com";
  const instagramUrl = settings?.instagram_url;
  const pinterestUrl = settings?.pinterest_url;
  const journalEnabled = settings?.journal_enabled ?? false;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value || status === "sending") return;

    setStatus("sending");
    try {
      const supabase = await getBrowserSupabase();
      const { error } = await supabase
        .from("subscribers")
        .insert({ email: value, source: "footer" });

      if (error) {
        // 23505 = that address is already on the list; no need to alarm anyone.
        if (error.code === "23505") {
          setStatus("done");
          setEmail("");
          return;
        }
        setStatus("error");
        return;
      }
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer
      id="contact"
      className="bg-charcoal text-bone px-6 md:px-12 pt-20 md:pt-28 pb-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 pb-16 md:pb-20 border-b border-bone/10">
          {/* Studio: identity, invitation, direct line */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <img
              src={logo}
              alt="Habitat by Grayson — Spaces that tell your story"
              className="w-20 md:w-28 h-auto object-contain mb-8 md:mb-10"
              width={512}
              height={512}
              loading="lazy"
            />
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.06] mb-8 md:mb-10 text-balance max-w-[22ch] font-light">
              Ready to create a space that feels like{" "}
              <em className="italic text-clay">you?</em>
            </h2>
            <Link
              to="/book"
              className="inline-block px-9 py-4 bg-bone text-charcoal uppercase tracking-[0.25em] text-xs hover:bg-terracotta hover:text-bone transition-colors"
            >
              Book a consultation
            </Link>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-8 text-base font-serif italic border-b border-bone/20 pb-1.5 hover:text-terracotta transition-colors"
            >
              {contactEmail}
            </a>
          </div>

          {/* Index: navigation and mailing list */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:pt-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-[13px] tracking-[0.14em] uppercase">
              <div className="flex flex-col gap-3">
                <span className={labelClass}>Studio</span>
                <Link to="/" className={linkClass}>Home</Link>
                <Link to="/portfolio" className={linkClass}>Portfolio</Link>
                <Link to="/book" className={linkClass}>Book</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className={labelClass}>Services</span>
                <Link to="/services/styling" className={linkClass}>Styling</Link>
                <Link to="/services/wellness" className={linkClass}>Wellness</Link>
                <Link to="/services/heritage" className={linkClass}>Heritage</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className={labelClass}>Connect</span>
                {instagramUrl ? (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Instagram
                  </a>
                ) : (
                  <span className="text-bone/35">Instagram</span>
                )}
                {pinterestUrl ? (
                  <a
                    href={pinterestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Pinterest
                  </a>
                ) : (
                  <span className="text-bone/35">Pinterest</span>
                )}
                {journalEnabled ? (
                  <a href="/journal" className={linkClass}>Journal</a>
                ) : (
                  <span className="text-bone/35">Journal</span>
                )}
              </div>
            </div>

            <div className="border-t border-bone/10 pt-8">
              <span className={labelClass}>Keep in touch</span>
              <form
                onSubmit={handleSubscribe}
                className="mt-4 flex items-center gap-3 border-b border-bone/25 focus-within:border-terracotta transition-colors"
              >
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email for occasional studio notes"
                  aria-label="Email address for occasional studio notes"
                  className="flex-1 min-w-0 bg-transparent py-3 text-sm tracking-normal normal-case text-bone placeholder:text-bone/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-label="Join the mailing list"
                  className="flex h-9 w-9 shrink-0 items-center justify-center text-bone hover:text-terracotta transition-colors disabled:opacity-40"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              <p
                className="mt-3 text-[12px] tracking-normal normal-case text-bone/50"
                role="status"
              >
                {status === "done" && "You're on the list — thank you."}
                {status === "error" &&
                  "That didn't go through. Email us directly instead."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-8 text-[11px] uppercase tracking-[0.28em] text-bone/45">
          <span>© {new Date().getFullYear()} Habitat by Grayson</span>
          <span>Modern African Living</span>
        </div>
      </div>
    </footer>
  );
}
