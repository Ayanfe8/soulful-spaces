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
      <footer id="contact" className="bg-charcoal px-6 pb-10 pt-16 font-sans text-bone md:px-12 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-14 pb-16 md:grid-cols-4 md:gap-10 lg:gap-16 lg:pb-20">
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
                <Link to="/book" className={linkClass}>Book</Link>
              </div>
            </nav>

            <nav aria-label="Services navigation">
              <h2 className={labelClass}>Services</h2>
              <div className="mt-6 flex flex-col gap-4 text-sm">
                <Link to="/services/styling" className={linkClass}>Styling</Link>
                <Link to="/services/wellness" className={linkClass}>Wellness</Link>
                <Link to="/services/heritage" className={linkClass}>Heritage</Link>
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
  );
}
