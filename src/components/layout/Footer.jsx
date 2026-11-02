import Link from "next/link";
import Image from "next/image";
import { ServicesPlusLogo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { MapPin, Phone, Mail, Star, ArrowRight, MessageCircle } from "lucide-react";

// Link columns, bottom-bar links and social buttons come from the CMS footer menu
// (service/footerService.js): menu = { columns: [{ title, href, links }], links, socials }.
const EMPTY_MENU = { columns: [], links: [], socials: [] };

// "All Startup" / "+12 more" links close a column with an arrow.
const isMoreLink = (label) => /^(all\b|\+|view all|see all)/i.test(String(label || "").trim());

function Footer({ menu = EMPTY_MENU }) {
  const { columns = [], links = [], socials = [] } = menu;
  return (
    <footer className="bg-sp-navy text-white pt-20 pb-24 lg:pb-14 border-t border-sp-deep-1 relative overflow-hidden">
      {/* Subtle masked plus pattern on dark navy */}
      <div className="absolute inset-0 sp-plus-pattern pointer-events-none opacity-40" />

      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 relative z-10">
        {/* Large Closing CTA Band inside Footer */}
        <div className="pb-16 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sp-sky mb-3">
              + Corporate Registration &amp; Statutory Filing Desk
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-[-0.02em] leading-[1.1]">
              Maximize your results while minimizing constraints with our solutions
            </h2>
            <p className="text-base text-white/70 mt-3 max-w-[58ch]">
              Connect with our chartered accountants, company secretaries, and trademark attorneys for structured business registration and annual compliance.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <Button
              href="/user-register"
              size="lg"
              showPlus
              className="bg-white text-sp-navy hover:bg-sp-tint border-white"
            >
              Get Started
            </Button>
            <Button
              href="https://wa.me/918800028794?text=Hi%2C%20I%20am%20looking%20for%20assistance%20with%20company%20registration%20or%20tax%20filing."
              variant="navy"
              size="lg"
              external
              className="border-sp-sky/35 hover:border-sp-sky"
            >
              <MessageCircle className="w-4 h-4 text-sp-sky" />
              <span>WhatsApp (+91 88000 28794)</span>
            </Button>
          </div>
        </div>

        {/* Brand Row + Real Rating + Monochrome Certificates */}
        <div className="py-10 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/" className="shrink-0">
              <ServicesPlusLogo variant="dark" />
            </Link>
            <p className="text-xs text-white/70 leading-relaxed max-w-xs sm:border-l sm:border-white/15 sm:pl-4">
              Online platform for business registration, trademark registration, GST, tax services, and legal compliance across India.
            </p>
          </div>

          {/* Google Rating (tabular numerals) */}
          <div className="lg:col-span-4 flex items-center gap-3.5">
            <div className="relative w-9 h-9 shrink-0 grayscale contrast-125 opacity-90">
              <Image
                src="/assets/images/google-rating-c9b95b9d.png"
                alt="Google Rating"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span className="text-white font-semibold text-sm tabular-nums">
                  4.9 / 5.0
                </span>
                <span className="text-xs text-white/65 ml-1 tabular-nums">
                  (42,800+ customers)
                </span>
              </div>
              <p className="text-xs text-white/65">
                12,000+ registered business users across India
              </p>
            </div>
          </div>

          {/* Existing Certificates in Monochrome */}
          <div className="lg:col-span-3 flex items-center gap-4 lg:justify-end">
            <div className="flex items-center gap-3 px-3.5 py-2 rounded-sp-sm bg-white/5 border border-white/10">
              <div className="relative w-12 h-9 shrink-0 grayscale brightness-125 contrast-125">
                <Image
                  src="/assets/images/certificate1-57e45752.png"
                  alt="Registration Certificate 1"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-12 h-9 shrink-0 grayscale brightness-125 contrast-125">
                <Image
                  src="/assets/images/certificate2-fd4642f9.png"
                  alt="Registration Certificate 2"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[11px] text-white/70 leading-tight">
                Verified
                <br />
                Certificates
              </span>
            </div>
          </div>
        </div>

        {/* Link Columns (CMS footer menu) */}
        {columns.length > 0 && (
          <div className="py-12 border-b border-white/10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {columns.map((column, idx) => (
              <div key={column.id || column.title} className="space-y-3.5">
                <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                  <span className="text-sp-sky text-xs tabular-nums">{String(idx + 1).padStart(2, "0")}</span>
                  {column.href ? (
                    <Link
                      href={column.href}
                      className="hover:text-sp-sky transition-colors whitespace-nowrap"
                    >
                      {column.title}
                    </Link>
                  ) : (
                    <span className="whitespace-nowrap">{column.title}</span>
                  )}
                </h3>
                <ul className="space-y-2 text-xs text-white/70">
                  {column.links.map((item) => (
                    <li key={item.id || item.href} className={isMoreLink(item.label) ? "pt-1" : undefined}>
                      {isMoreLink(item.label) ? (
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-1 text-white hover:text-sp-sky text-xs font-medium transition-colors whitespace-nowrap"
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ) : (
                        <Link
                          href={item.href}
                          target={item.target === "_blank" ? "_blank" : undefined}
                          className="hover:text-white transition-colors block py-0.5 leading-snug"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Both Real Offices & Direct Helplines */}
        <div className="py-12 border-b border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Office 1: Head Office (India) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <MapPin className="w-3.5 h-3.5 text-sp-sky shrink-0" />
              <span>Head Office (India)</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Office No-418, 4th Floor, Ocean Plaza, Sector-18, Noida, Gautam Buddha Nagar, Uttar Pradesh — 201301
            </p>
          </div>

          {/* Office 2: Alphonic India Private Limited (India) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <MapPin className="w-3.5 h-3.5 text-sp-sky shrink-0" />
              <span>Alphonic India Private Limited (India)</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Plot No C-203, C Block Rd, Block C, Sector 63, Noida, Uttar Pradesh — 201301
            </p>
          </div>

          {/* Direct Helplines & Emails */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Phone className="w-3.5 h-3.5 text-sp-sky shrink-0" />
              <span>Direct Helplines &amp; Desk</span>
            </div>
            <div className="space-y-1.5 text-xs text-white/70 tabular-nums">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">Sales:</span>
                <a href="tel:+918800028794" className="hover:text-white">
                  (+91) 88000 28794
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">Support:</span>
                <a href="tel:+919899184918" className="hover:text-white">
                  (+91) 9899184918
                </a>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Mail className="w-3.5 h-3.5 text-sp-sky shrink-0" />
                <a href="mailto:info@servicesplus.in" className="hover:text-white">
                  info@servicesplus.in
                </a>
                <span>/</span>
                <a href="mailto:operations@servicesplus.in" className="hover:text-white">
                  operations@servicesplus.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Policies, Socials & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="tabular-nums">
              &copy; {new Date().getFullYear()} Services Plus. All rights reserved.
            </span>
            {links.map((item) => (
              <span key={item.id || item.href} className="contents">
                <span>&middot;</span>
                <Link
                  href={item.href}
                  target={item.target === "_blank" ? "_blank" : undefined}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </div>

          {socials.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {socials.map((item) => (
                <a
                  key={item.id || item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-sp-sm bg-white/5 hover:bg-white/10 text-sp-sky hover:text-white transition-colors whitespace-nowrap"
                  aria-label={item.label}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export { Footer };
