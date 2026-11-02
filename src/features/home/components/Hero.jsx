"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  Star
} from "lucide-react";
import { NAV_CATEGORIES } from "../../../content/navigation";
import { Button } from "../../../components/ui/Button";
import { RegistrationMarks } from "../../../components/ui/Card";
import {
  openCommandPalette,
  usePlatformShortcut
} from "../../../components/layout/CommandPalette";
import {
  CATEGORY_DUOTONE_ICONS,
  StartupDuotoneIcon
} from "../../../components/ui/DuotoneIcons";

const CARD_THEMES = [
  {
    surface: "bg-white text-sp-ink border-sp-border-strong",
    heading: "text-sp-ink",
    eyebrow: "text-sp-primary",
    subcopy: "text-[#3B4254]",
    pill: "bg-[#F8F6F1] hover:bg-[#EAE0CF] border-sp-border text-sp-ink",
    pillNum: "text-sp-primary",
    iconBox: "bg-[#F8F6F1] border-sp-border",
    ctaClass: "bg-sp-navy text-white hover:bg-sp-primary border-sp-navy",
    linkClass: "text-sp-ink hover:text-sp-primary",
    marksVariant: "white",
    serviceCount: 4
  },
  {
    surface: "bg-[#111844] text-white border-[#4B5694]",
    heading: "text-white",
    eyebrow: "text-[#EAE0CF]",
    subcopy: "text-[#DCE4F2]",
    pill: "bg-[#1B2559] hover:bg-[#253275] border-[#4B5694]/60 text-white",
    pillNum: "text-[#EAE0CF]",
    iconBox: "bg-white border-white/20",
    ctaClass: "bg-[#EAE0CF] text-[#111844] hover:bg-white border-[#EAE0CF]",
    linkClass: "text-[#EAE0CF] hover:text-white",
    marksVariant: "navy",
    serviceCount: 4
  },
  {
    surface: "bg-[#EAE0CF] text-[#111844] border-[#C5B8A1]",
    heading: "text-[#111844]",
    eyebrow: "text-[#111844]",
    subcopy: "text-[#262E4D]",
    pill: "bg-white hover:bg-[#F8F6F1] border-[#D5C9B4] text-[#111844]",
    pillNum: "text-[#4B5694]",
    iconBox: "bg-white border-[#D5C9B4]",
    ctaClass: "bg-[#111844] text-white hover:bg-[#4B5694] border-[#111844]",
    linkClass: "text-[#111844] hover:text-[#4B5694]",
    marksVariant: "white",
    serviceCount: 4
  },
  {
    surface: "bg-[#3A447A] text-white border-[#7288AE]",
    heading: "text-white",
    eyebrow: "text-[#EAE0CF]",
    subcopy: "text-[#E8ECF7]",
    pill: "bg-[#111844] hover:bg-[#1B2559] border-[#7288AE]/50 text-white",
    pillNum: "text-[#EAE0CF]",
    iconBox: "bg-white border-white/20",
    ctaClass: "bg-[#EAE0CF] text-[#111844] hover:bg-white border-[#EAE0CF]",
    linkClass: "text-[#EAE0CF] hover:text-white",
    marksVariant: "navy",
    serviceCount: 4
  },
  {
    surface: "bg-white text-sp-ink border-sp-border-strong",
    heading: "text-sp-ink",
    eyebrow: "text-sp-primary",
    subcopy: "text-[#3B4254]",
    pill: "bg-[#F8F6F1] hover:bg-[#EAE0CF] border-sp-border text-sp-ink",
    pillNum: "text-sp-primary",
    iconBox: "bg-[#F8F6F1] border-sp-border",
    ctaClass: "bg-sp-navy text-white hover:bg-sp-primary border-sp-navy",
    linkClass: "text-sp-ink hover:text-sp-primary",
    marksVariant: "white",
    serviceCount: 4
  }
];

function Hero() {
  const shortcutLabel = usePlatformShortcut();

  return (
    <section className="relative bg-sp-bg border-b border-sp-border">
      {/* Main Hero Canvas — covers full viewport height (100vh minus 5rem header) on load */}
      <div className="relative min-h-[calc(100vh-5rem)] lg:h-[calc(100vh-5rem)] flex items-center py-5 lg:py-6 border-b border-sp-border sp-plus-grid overflow-hidden">
        {/* Soft Atmospheric Glow (at most one per viewport) */}
        <div
          className="absolute top-12 left-1/4 w-[480px] h-[300px] rounded-full bg-sp-tint/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Container aligned with TopNav (w-full px-4 sm:px-6 lg:px-6 xl:px-8) so right image edge aligns with Get Started button */}
        <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 h-full flex items-center relative z-10">
          <div className="relative w-full h-full min-h-[500px] lg:min-h-full flex items-center">
            {/* Right-Side Corporate Office Backdrop — rounded top-right & bottom-right corners, flowing S-curve wave on left */}
            <div
              id="hero-visual-frame"
              className="hidden lg:block absolute inset-y-0 right-0 w-[49%] xl:w-[50%] rounded-r-sp-lg pointer-events-none z-0 overflow-hidden"
              aria-hidden="true"
            >
              <Image
                src="/assets/images/hero-office.jpg"
                alt="Services Plus Corporate Headquarters"
                fill
                priority
                sizes="50vw"
                className="object-cover object-center"
              />

              {/* Sweeping S-Curve Wave Cutout with Double-Layered Translucent Rim */}
              <svg
                viewBox="0 0 340 800"
                preserveAspectRatio="none"
                className="absolute inset-y-0 -left-1 h-full w-[175px] xl:w-[200px]"
              >
                {/* Secondary translucent wave ribbon */}
                <path
                  d="M 0,0 L 165,0 C 200,130 185,230 105,360 C 25,490 35,640 220,800 L 0,800 Z"
                  fill="rgba(255, 255, 255, 0.48)"
                />
                {/* Delicate highlight rim along outer S-curve */}
                <path
                  d="M 165,0 C 200,130 185,230 105,360 C 25,490 35,640 220,800"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.85)"
                  strokeWidth="2"
                />
                {/* Primary solid page-background S-curve */}
                <path
                  d="M 0,0 L 138,0 C 175,130 160,230 78,360 C 5,490 10,640 190,800 L 0,800 Z"
                  fill="#F8F9FA"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center w-full relative z-10 py-6 lg:py-8">
              {/* LEFT COLUMN: Eyebrow + 3-Line H1 + Supporting Line + Single-Row Search/CTAs + Bottom Trust Row */}
              <div className="lg:col-span-7 space-y-5">
                {/* Plain-text Eyebrow with real rating (4.9/5 + 42,800+ customers globally) */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-sp-slate">
                  <span className="inline-flex items-center gap-1.5 font-bold text-sp-ink tabular-nums">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                    <span>4.9/5</span>
                  </span>
                  <span className="text-sp-primary font-semibold" aria-hidden="true">
                    +
                  </span>
                  <span className="tabular-nums font-medium">
                    42,800+ customers globally
                  </span>
                </div>

                {/* Full SEO H1 in at most 3 tight lines (line-height ~1.05), zero gap */}
                <h1 className="font-display font-bold text-sp-ink tracking-[-0.02em] leading-[1.05] text-[1.72rem] sm:text-[2.35rem] lg:text-[2.45rem] xl:text-[2.85rem]">
                  <span className="block">Empower Your Business</span>{" "}
                  <span className="block text-sp-primary">
                    Compliance &amp; Management
                  </span>{" "}
                  <span className="block">Made Easy With Us</span>
                </h1>

                {/* Single concrete supporting line (existing meta description) */}
                <p className="text-base sm:text-[17px] text-sp-slate leading-[1.6] max-w-[49ch]">
                  One Stop Platform for company registration, trademark filing, GST registration, TDS filing, Payroll, MSME registration and income tax filing in India.
                </p>

                {/* Search field + Get Started + WhatsApp on ONE row */}
                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-xl">
                  <button
                    type="button"
                    onClick={openCommandPalette}
                    className="w-full sm:w-auto sm:flex-1 min-w-0 h-12 shrink-0 px-3.5 bg-white hover:bg-sp-bg rounded-sp-btn border border-sp-border-strong hover:border-sp-primary shadow-sp-btn-outline flex items-center justify-between gap-2 text-left transition-colors group cursor-pointer"
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <Search className="w-4 h-4 text-sp-primary shrink-0" />
                      <span className="text-sm text-sp-slate group-hover:text-sp-ink whitespace-nowrap">
                        Search 100+ services...
                      </span>
                    </span>
                    <kbd
                      aria-hidden="true"
                      className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono bg-sp-bg rounded border border-sp-border text-sp-slate whitespace-nowrap shrink-0"
                    >
                      {shortcutLabel}
                    </kbd>
                  </button>

                  <Button
                    href="/user-register"
                    size="md"
                    showPlus
                    className="w-full sm:w-auto lg:px-5 xl:px-6"
                  >
                    Get Started
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Explorer — Clean Viewport-Fitted Cards on Same Plane with Centered Header */}
      <div
        id="category-explorer"
        className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 py-8 lg:py-12 relative z-20 bg-sp-bg border-t border-sp-border"
      >
        {/* Centered Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-sp-primary inline-flex items-center gap-1.5 mb-2">
            <span className="text-sp-accent" aria-hidden="true">
              +
            </span>
            <span>Practice Areas &amp; Statutory Filings</span>
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-sp-ink tracking-tight">
            Explore Services by Category
          </h2>
        </div>

        {/* 5 Cards on the Exact Same Plane (lg:grid-cols-5, equal height via items-stretch) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 xl:gap-4 items-stretch">
          {NAV_CATEGORIES.map((category, idx) => {
            const theme = CARD_THEMES[idx % CARD_THEMES.length];
            const Icon =
              CATEGORY_DUOTONE_ICONS[category.slug] || StartupDuotoneIcon;

            return (
              <div
                key={category.slug}
                id={`category-card-${category.slug}`}
                className="transition-transform duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:z-20 relative h-full"
              >
                <article
                  className={`relative rounded-sp-lg border p-4.5 sm:p-5 xl:p-5.5 shadow-sp-lift flex flex-col justify-between h-full min-h-[390px] xl:min-h-[415px] transition-all duration-300 ${theme.surface}`}
                >
                  <RegistrationMarks variant={theme.marksVariant} />

                  {/* Card Header: Index Badge + Category Title + Duotone Icon */}
                  <div>
                    <div className="flex items-start justify-between gap-2.5 mb-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`font-display text-xl xl:text-2xl font-bold tabular-nums tracking-tight ${theme.eyebrow}`}
                          >
                            0{idx + 1}
                          </span>
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider ${theme.subcopy}`}
                          >
                            / 05 Category
                          </span>
                        </div>
                        <h3
                          className={`font-display text-base xl:text-lg font-bold tracking-tight leading-snug ${theme.heading}`}
                        >
                          {category.title}
                        </h3>
                      </div>

                      <div
                        className={`w-10 h-10 xl:w-11 xl:h-11 rounded-sp-sm border flex items-center justify-center shrink-0 shadow-sp-xs ${theme.iconBox}`}
                      >
                        <Icon className="w-5 h-5 xl:w-5.5 xl:h-5.5" />
                      </div>
                    </div>

                    <p className={`text-[11px] xl:text-xs leading-relaxed line-clamp-2 mb-3.5 ${theme.subcopy}`}>
                      {category.description}
                    </p>

                    {/* Top Services (4 items per card) */}
                    <div className="space-y-1.5">
                      {category.topServices
                        .slice(0, theme.serviceCount)
                        .map((service, sIdx) => (
                          <Link
                            key={service.slug}
                            href={service.href}
                            className={`group/srv flex items-center justify-between px-2.5 py-1.5 xl:py-2 rounded-sp-sm border text-[11px] font-medium transition-all duration-150 ${theme.pill}`}
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span
                                className={`text-[10px] font-bold tabular-nums shrink-0 ${theme.pillNum}`}
                              >
                                0{sIdx + 1}
                              </span>
                              <span className="truncate">{service.title}</span>
                            </div>
                            <ArrowRight className="w-3 h-3 shrink-0 ml-1 transition-transform group-hover/srv:translate-x-0.5" />
                          </Link>
                        ))}
                    </div>
                  </div>

                  {/* Card Footer: Get a quote + Category link */}
                  <div className="pt-3.5 mt-4 border-t border-current/10 flex items-center justify-between gap-2">
                    <Link
                      href="/contact"
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-sp-sm text-xs font-semibold border transition-colors shrink-0 ${theme.ctaClass}`}
                    >
                      <span>Get a quote</span>
                      <span aria-hidden="true">+</span>
                    </Link>

                    <Link
                      href={category.href}
                      className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors truncate ${theme.linkClass}`}
                    >
                      <span className="truncate">
                        {category.slug === "certification-licensing"
                          ? "All Licenses"
                          : `All ${category.title}`}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { Hero };
