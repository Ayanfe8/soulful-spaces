import { Link } from "@tanstack/react-router";
import { FaInstagram, FaPinterestP, FaWhatsapp } from "react-icons/fa";
import logoAsset from "@/assets/HBG_LOGO.png.asset.json";
import type { Database } from "@/integrations/supabase/types";

const logo = logoAsset.url;

type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];

interface SiteFooterProps {
  settings?: Pick<
    SiteSettingsRow,
    "contact_email" | "instagram_url" | "pinterest_url" | "whatsapp_url"
  > | null;
}

const labelClass = "text-bone/45 text-[11px] uppercase tracking-[0.28em]";
const linkClass = "w-fit text-bone hover:text-terracotta transition-colors";
const socialClass =
  "flex size-11 items-center justify-center rounded-full border border-bone/35 text-bone transition-colors hover:border-terracotta hover:text-terracotta";
const inactiveSocialClass =
  "flex size-11 cursor-not-allowed items-center justify-center rounded-full border border-bone/15 text-bone/25";

export function SiteFooter({ settings }: SiteFooterProps) {
  const contactEmail = settings?.contact_email ?? "hello@habitatbygrayson.com";
  const instagramUrl = settings?.instagram_url;
  const pinterestUrl = settings?.pinterest_url;
  const whatsappUrl = settings?.whatsapp_url;

  return (
    <>
      <section
        aria-labelledby="footer-invitation"
        className="bg-umber px-6 py-20 text-bone md:px-12 md:py-28"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center lg:items-start">
          <img
            src={logo}
            alt="Habitat by Grayson — Spaces that tell your story"
            className="mb-8 h-auto w-24 object-contain md:mb-10 md:w-32"
            width={512}
            height={512}
            loading="lazy"
          />
          <h2
            id="footer-invitation"
            className="mb-8 max-w-[22ch] text-balance text-center font-serif text-3xl font-light leading-[1.06] md:mb-10 md:text-5xl lg:text-left"
          >
            Ready to create a space that feels like{" "}
            <em className="italic text-clay">you?</em>
          </h2>
          <Link
            to="/book"
            className="inline-block bg-bone px-9 py-4 text-xs uppercase tracking-[0.25em] text-charcoal transition-colors hover:bg-terracotta hover:text-bone"
          >
            Book a consultation
          </Link>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-8 inline-block border-b border-bone/20 pb-1.5 font-serif text-base italic transition-colors hover:text-terracotta"
          >
            {contactEmail}
          </a>
        </div>
      </section>

      <footer id="contact" className="bg-charcoal px-6 pb-10 pt-16 text-bone md:px-12 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-14 pb-16 md:grid-cols-3 md:gap-12 lg:gap-24 lg:pb-20">
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={logo}
                  alt=""
                  aria-hidden="true"
                  className="size-14 shrink-0 object-contain"
                  width={512}
                  height={512}
                  loading="lazy"
                />
                <span className="font-serif text-xl leading-tight">Habitat by Grayson</span>
              </div>
              <p className={`${labelClass} mt-6`}>Spaces that tell your story</p>
              <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-bone/80">
                Soulful, intentional interiors shaped by modern African living, personal heritage,
                and everyday wellbeing.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <h2 className={labelClass}>Quick Links</h2>
              <div className="mt-6 flex flex-col gap-4 text-sm">
                <Link to="/" className={linkClass}>Home</Link>
                <Link to="/portfolio" className={linkClass}>Portfolio</Link>
                <Link to="/services/styling" className={linkClass}>Services</Link>
                <Link to="/book" className={linkClass}>Book</Link>
              </div>
            </nav>

            <div>
              <h2 className={labelClass}>Connect With Us</h2>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-6 block w-fit text-sm text-bone transition-colors hover:text-terracotta"
              >
                {contactEmail}
              </a>
              <div className="mt-7 flex items-center gap-4">
                {instagramUrl ? (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="Instagram">
                    <FaInstagram className="size-5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className={inactiveSocialClass} aria-label="Instagram unavailable" title="Instagram unavailable">
                    <FaInstagram className="size-5" aria-hidden="true" />
                  </span>
                )}
                {whatsappUrl ? (
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="WhatsApp">
                    <FaWhatsapp className="size-5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className={inactiveSocialClass} aria-label="WhatsApp unavailable" title="WhatsApp unavailable">
                    <FaWhatsapp className="size-5" aria-hidden="true" />
                  </span>
                )}
                {pinterestUrl ? (
                  <a href={pinterestUrl} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="Pinterest">
                    <FaPinterestP className="size-5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className={inactiveSocialClass} aria-label="Pinterest unavailable" title="Pinterest unavailable">
                    <FaPinterestP className="size-5" aria-hidden="true" />
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-bone/10 pt-8 text-center text-[11px] uppercase tracking-[0.22em] text-bone/45">
            © {new Date().getFullYear()} Habitat by Grayson
          </div>
        </div>
      </footer>
    </>
  );
}
