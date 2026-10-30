"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  Shield,
  FileSpreadsheet,
  CheckCircle2,
  Award,
  ArrowRight,
  Search,
  MessageCircle,
  Star
} from "lucide-react";
import { NAV_CATEGORIES } from "../../../content/navigation";
import { Button } from "../../../components/ui/Button";
import { CommandPalette } from "../../../components/layout/CommandPalette";
const CATEGORY_ICONS = {
  startup: Rocket,
  trademark: Shield,
  taxes: FileSpreadsheet,
  compliance: CheckCircle2,
  "certification-licensing": Award
};
function Hero() {
  const [searchOpen, setSearchOpen] = useState(false);
  return <section className="relative pt-8 pb-20 md:pt-16 md:pb-28 overflow-hidden sp-plus-grid">
      {
    /* Soft blue glow in background */
  }
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] sp-hero-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {
    /* Rating and Announcement Strip */
  }
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sp-tint shadow-2xs font-mono text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-sp-ink">4.9 / 5.0</span>
            <span className="text-sp-slate">Rated by 42,800+ customers</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sp-tint text-sp-primary text-xs font-mono font-medium border border-sp-tint/80">
            <span className="w-2 h-2 rounded-full bg-sp-primary animate-pulse" />
            <span>Govt. Recognized Corporate Filing Platform</span>
          </div>
        </div>

        {
    /* Hero Title & Subcopy */
  }
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sp-ink tracking-tight mb-6">
            Empower Your Business{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sp-primary via-sp-accent to-sp-deep-1">
              Compliance &amp; Management
            </span>{" "}
            Made Easy With Us
          </h1>
          <p className="text-base sm:text-lg text-sp-slate leading-relaxed max-w-2xl mx-auto">
            One Stop Platform for company registration, trademark filing, GST registration, TDS filing, Payroll, MSME registration and income tax filing in India.
          </p>
        </div>

        {
    /* Hero Search Field & CTAs */
  }
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto mb-16">
          <button
    onClick={() => setSearchOpen(true)}
    className="w-full sm:w-auto flex-1 flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-sp-tint shadow-2xs hover:border-sp-primary/40 text-sp-slate text-sm transition-all"
  >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-sp-slate" />
              <span>Search 80+ services (e.g. GST, Private Limited)...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-sp-bg rounded border border-sp-tint text-sp-slate">
              ⌘K
            </kbd>
          </button>

          <Button href="/user-register" size="lg" showPlus>
            Get Started
          </Button>

          <Button
    href="https://wa.me/918800028794?text=Hi%2C%20I%20am%20interested%20in%20business%20registration%20and%20compliance%20services."
    variant="outline"
    size="lg"
    external
    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
  >
            <MessageCircle className="w-4 h-4 text-emerald-600 mr-1.5" />
            WhatsApp
          </Button>
        </div>

        {
    /* Bento-Style 5 Category Cards */
  }
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {NAV_CATEGORIES.map((category) => {
    const Icon = CATEGORY_ICONS[category.slug] || Rocket;
    return <div
      key={category.slug}
      className="group relative bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-sp-tint/90 shadow-sp-soft hover:shadow-sp-lift hover:-translate-y-1 hover:border-sp-primary/40 transition-all duration-300 flex flex-col justify-between"
    >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sp-tint/60 text-sp-primary flex items-center justify-center mb-4 group-hover:bg-sp-primary group-hover:text-white transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-sp-ink mb-1 group-hover:text-sp-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-sp-slate mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  <ul className="space-y-1.5 mb-4 text-xs text-sp-ink font-medium">
                    {category.topServices.slice(0, 4).map((service) => <li key={service.slug}>
                        <Link
      href={service.href}
      className="text-sp-slate hover:text-sp-primary flex items-center gap-1.5 transition-colors"
    >
                          <span className="text-sp-primary font-mono font-bold text-[10px]">+</span>
                          <span className="truncate">{service.title}</span>
                        </Link>
                      </li>)}
                  </ul>
                </div>

                <div className="pt-3 border-t border-sp-tint/60 flex items-center justify-between text-xs">
                  <span className="font-mono text-sp-primary font-semibold">Get a quote</span>
                  <Link
      href={category.href}
      className="inline-flex items-center gap-1 text-sp-slate group-hover:text-sp-primary font-medium transition-colors"
    >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>;
  })}
        </div>
      </div>

      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </section>;
}
export {
  Hero
};
