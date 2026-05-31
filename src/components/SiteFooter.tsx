import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-charcoal text-bone py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="uppercase tracking-[0.3em] text-xs opacity-50 mb-12">
          Start Your Project
        </span>
        <h2 className="font-serif text-5xl md:text-7xl mb-16 text-balance max-w-[20ch] font-light">
          Ready to create a space that feels like{" "}
          <em className="italic text-clay">you?</em>
        </h2>
        <a
          href="mailto:hello@habitatbygrayson.com"
          className="text-2xl md:text-4xl font-serif italic border-b border-bone/20 pb-4 hover:text-terracotta transition-colors"
        >
          hello@habitatbygrayson.com
        </a>

        <div className="w-full mt-24 md:mt-32 pt-8 border-t border-bone/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px] uppercase tracking-[0.25em] opacity-60 text-left">
          <div className="flex flex-col gap-3">
            <span className="opacity-50">Studio</span>
            <Link to="/" className="hover:text-terracotta">Home</Link>
            <Link to="/portfolio" className="hover:text-terracotta">Portfolio</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="opacity-50">Services</span>
            <Link to="/services/styling" className="hover:text-terracotta">Styling</Link>
            <Link to="/services/wellness" className="hover:text-terracotta">Wellness</Link>
            <Link to="/services/heritage" className="hover:text-terracotta">Heritage</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="opacity-50">Connect</span>
            <a href="#" className="hover:text-terracotta">Instagram</a>
            <a href="#" className="hover:text-terracotta">Pinterest</a>
            <a href="#" className="hover:text-terracotta">Journal</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="opacity-50">© {new Date().getFullYear()}</span>
            <span>Habitat by Grayson</span>
            <span>Modern African Living</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
