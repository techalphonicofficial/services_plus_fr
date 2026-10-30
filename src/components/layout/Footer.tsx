import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_CATEGORIES } from '../../content/navigation';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Star,
  ExternalLink,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-sp-navy text-white pt-16 pb-12 border-t border-sp-deep-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust & Rating Band */}
        <div className="pb-12 border-b border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-4">
            <div className="relative w-44 h-12">
              <Image
                src="/assets/images/logo-f-6b140866.png"
                alt="Services Plus"
                fill
                className="object-contain brightness-110"
              />
            </div>
            <div className="text-xs text-sp-sky leading-tight">
              India&apos;s leading legal tech, compliance, & corporate advisory platform.
            </div>
          </div>

          {/* Google Rating Badge */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-xs">
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src="/assets/images/google-rating-c9b95b9d.png"
                alt="Google Rating"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-white font-mono font-bold text-xs ml-1">4.9 / 5.0</span>
              </div>
              <p className="text-[11px] text-sp-sky">Rated by 42,800+ Verified Business Clients</p>
            </div>
          </div>

          {/* Accreditation Badges */}
          <div className="flex items-center gap-3 justify-start md:justify-end">
            <div className="flex items-center gap-2 text-xs text-sp-sky bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISO 9001:2015 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-sp-sky bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl font-mono">
              <ShieldCheck className="w-4 h-4 text-sp-accent" />
              <span>Startup India Registered</span>
            </div>
          </div>
        </div>

        {/* 5 Categories Grid */}
        <div className="py-12 border-b border-white/10 grid grid-cols-2 md:grid-cols-5 gap-8">
          {NAV_CATEGORIES.map(category => (
            <div key={category.slug} className="space-y-3">
              <h4 className="font-semibold text-sm text-white flex items-center gap-1.5">
                <span className="text-sp-sky font-mono font-bold">+</span>
                <Link
                  href={category.href}
                  className="hover:text-sp-sky transition-colors"
                >
                  {category.title}
                </Link>
              </h4>
              <ul className="space-y-2 text-xs text-sp-sky/90">
                {category.topServices.slice(0, 7).map(s => (
                  <li key={s.slug}>
                    <Link
                      href={s.href}
                      className="hover:text-white transition-colors block py-0.5"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={category.href}
                    className="text-sp-accent hover:underline text-[11px] font-mono block pt-1"
                  >
                    All {category.title} services &rarr;
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Office Locations & Contact Details */}
        <div className="py-12 border-b border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Head Office Noida */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sp-sky">
              <MapPin className="w-3.5 h-3.5 text-sp-accent" />
              <span>Head Office (Noida)</span>
            </div>
            <p className="text-xs text-sp-sky/90 leading-relaxed">
              Office No-418, 4th Floor, Ocean Plaza, Sector-18, Noida, Gautam Buddha Nagar, Uttar Pradesh — 201301
            </p>
          </div>

          {/* Branch Office Delhi */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sp-sky">
              <MapPin className="w-3.5 h-3.5 text-sp-accent" />
              <span>Corporate Desk (Delhi)</span>
            </div>
            <p className="text-xs text-sp-sky/90 leading-relaxed">
              Services Plus Corporate Desk, Connaught Place / Barakhamba Road, New Delhi — 110001
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sp-sky">
              <Phone className="w-3.5 h-3.5 text-sp-accent" />
              <span>Direct Helplines</span>
            </div>
            <div className="space-y-1 text-xs text-sp-sky/90">
              <div className="flex items-center gap-2">
                <span className="text-white font-mono font-medium">Sales:</span>
                <a href="tel:+918800028794" className="hover:text-white font-mono">
                  (+91) 88000 28794
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-mono font-medium">Support:</span>
                <a href="tel:+919899184918" className="hover:text-white font-mono">
                  (+91) 9899184918
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sp-accent" />
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
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sp-sky font-mono">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span>&copy; {new Date().getFullYear()} Services Plus. All rights reserved.</span>
            <span>•</span>
            <Link href="/policy/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/policy/terms-and-condition" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <span>•</span>
            <Link href="/payment" className="hover:text-white transition-colors">
              Payment
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/78746155/admin/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sp-sky hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/servicesplusin"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sp-sky hover:text-white transition-colors"
              aria-label="Twitter / X"
            >
              X (Twitter)
            </a>
            <a
              href="https://www.facebook.com/Inservicesplus"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sp-sky hover:text-white transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/servicesplusin/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sp-sky hover:text-white transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@servicesplus7003"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sp-sky hover:text-white transition-colors"
              aria-label="YouTube"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
