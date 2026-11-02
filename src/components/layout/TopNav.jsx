"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  ChevronDown,
  Menu,
  X,
  CreditCard,
  User,
  ArrowRight,
  PhoneCall
} from "lucide-react";
import { NAV_CATEGORIES } from "../../content/navigation";
import { CommandPalette } from "./CommandPalette";
import { Button } from "../ui/Button";
import { ServicesPlusLogo } from "../ui/Logo";
import { CATEGORY_DUOTONE_ICONS, StartupDuotoneIcon } from "../ui/DuotoneIcons";

// Featured highlight per category for the Mega Menu right panel (using real services only)
const FEATURED_BY_CATEGORY = {
  startup: {
    title: "Private Limited Company",
    href: "/service/private-limited-company",
    summary:
      "Register a Private Limited Company online with expert help for documents, incorporation, MCA filing and registration process."
  },
  trademark: {
    title: "Trademark Registration",
    href: "/service/trademark-registration",
    summary:
      "Safeguard your brand name, logo, and intellectual property across all 45 trademark classes in India."
  },
  taxes: {
    title: "GST Registration & Filings",
    href: "/service/gst-registration",
    summary:
      "Complete GSTIN registration, monthly and annual return reconciliation, and input tax credit compliance."
  },
  compliance: {
    title: "Private Limited Compliance",
    href: "/service/private-limited-company-compliance",
    summary:
      "Statutory ROC annual filings (AOC-4, MGT-7), board resolutions, and director KYC maintenance."
  },
  "certification-licensing": {
    title: "FSSAI Food License",
    href: "/service/fssai-registration",
    summary:
      "Basic, State, and Central FSSAI FoSCoS licensing with complete dossier verification."
  }
};

const NAV_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.6
};

function TopNav() {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState("startup");
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(true);
  const accountRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const isPast = window.scrollY > 8;
      setScrolled((prev) => (prev !== isPast ? isPast : prev));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Dismissible Announcement Bar — shows ONLY real /notification data in regular type */}
      {!announcementDismissed && (
        <div className="bg-sp-navy text-white text-xs py-2 px-4 sm:px-6 lg:px-6 xl:px-8 border-b border-sp-sky/15 relative z-40">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-sp-sky font-semibold whitespace-nowrap">
                Notification:
              </span>
              <Link
                href="/notification"
                className="text-white/90 hover:text-white truncate transition-colors"
              >
                GST — The goods and services tax (GST) is a tax on goods and services sold domestically for consumption.
              </Link>
              <Link
                href="/notification"
                className="hidden sm:inline-flex items-center gap-1 text-sp-sky hover:text-white font-medium whitespace-nowrap shrink-0 underline underline-offset-2"
              >
                <span>View notice</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <a
                href="tel:+918800028794"
                className="hidden md:inline-flex items-center gap-1.5 text-sp-sky hover:text-white whitespace-nowrap tabular-nums transition-colors"
              >
                <PhoneCall className="w-3 h-3" />
                <span>(+91) 88000 28794</span>
              </a>
              <button
                onClick={() => setAnnouncementDismissed(true)}
                className="p-0.5 rounded text-sp-sky hover:text-white transition-colors"
                aria-label="Dismiss notification bar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header: Clean surface at top (80px / h-20), frosted + shadow + 64px (h-16) after 8px scroll */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-sp-border shadow-sp-soft h-16"
            : "bg-white/95 backdrop-blur-sm border-b border-sp-border/70 h-20"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 h-full">
          <div className="flex items-center justify-between h-full gap-1.5 xl:gap-3">
            {/* Brand Wordmark SVG */}
            <Link href="/" className="flex items-center shrink-0">
              <ServicesPlusLogo variant="light" />
            </Link>

            {/* Desktop Navigation Links — strict nowrap at 1024px+ with Huge Inc.-style sliding pill & morphing dropdown */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-0 xl:gap-0.5 shrink-0"
              onMouseLeave={() => {
                setActiveCategory(null);
                setHoveredNav(null);
              }}
            >
              {NAV_CATEGORIES.map((category, catIdx) => {
                const Icon = CATEGORY_DUOTONE_ICONS[category.slug] || StartupDuotoneIcon;
                const featured =
                  FEATURED_BY_CATEGORY[category.slug] || FEATURED_BY_CATEGORY.startup;
                const isOpen = activeCategory === category.slug;
                const isHovered = hoveredNav === category.slug || isOpen;
                const isActiveRoute = pathname?.startsWith(category.href);

                return (
                  <div
                    key={category.slug}
                    className="relative"
                    onMouseEnter={() => {
                      setActiveCategory(category.slug);
                      setHoveredNav(category.slug);
                    }}
                  >
                    <Link
                      href={category.href}
                      className={`relative inline-flex items-center gap-0.5 xl:gap-1 px-2 xl:px-2.5 py-2 text-xs xl:text-sm whitespace-nowrap rounded-sp-sm transition-colors duration-200 z-10 ${
                        isActiveRoute
                          ? "font-semibold text-sp-navy"
                          : isHovered
                          ? "font-medium text-sp-primary"
                          : "font-medium text-sp-ink hover:text-sp-primary"
                      }`}
                    >
                      {isHovered && (
                        <motion.span
                          layoutId="topnav-hover-pill"
                          transition={NAV_SPRING}
                          className="absolute inset-0 rounded-sp-sm bg-[#EAE0CF]/55 -z-10"
                          aria-hidden="true"
                        />
                      )}
                      {isActiveRoute && (
                        <motion.span
                          layoutId="topnav-active-bar"
                          transition={NAV_SPRING}
                          className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-sp-navy"
                          aria-hidden="true"
                        />
                      )}
                      <span>{category.title}</span>
                      <ChevronDown
                        className={`w-3 h-3 xl:w-3.5 xl:h-3.5 text-sp-slate transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-sp-primary" : ""
                        }`}
                      />
                    </Link>

                    {/* Mega Menu Dropdown — smooth morphing & directional content reveal when switching headings */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          layoutId="topnav-mega-panel"
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={NAV_SPRING}
                          className={`absolute top-full pt-2 w-[620px] xl:w-[640px] z-50 ${
                            catIdx >= 3 ? "right-0" : "left-0"
                          }`}
                        >
                          <div className="bg-white rounded-sp-md shadow-sp-lift border border-sp-border-strong p-5 grid grid-cols-12 gap-5 relative overflow-hidden">
                            {/* Corner Registration Marks */}
                            <span
                              className="absolute top-2 left-2.5 text-[10px] text-sp-primary/40 pointer-events-none"
                              aria-hidden="true"
                            >
                              +
                            </span>
                            <span
                              className="absolute top-2 right-2.5 text-[10px] text-sp-primary/40 pointer-events-none"
                              aria-hidden="true"
                            >
                              +
                            </span>

                            {/* Left 7 cols: Category description + Popular services */}
                            <motion.div
                              key={`left-${category.slug}`}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className="col-span-7 flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-start gap-3 pb-3 mb-3 border-b border-sp-border">
                                  <div className="w-9 h-9 rounded-sp-sm bg-sp-bg border border-sp-border flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-semibold text-sp-primary tabular-nums">
                                        0{catIdx + 1}
                                      </span>
                                      <p className="font-semibold text-sp-ink text-sm">
                                        {category.title}
                                      </p>
                                    </div>
                                    <p className="text-xs text-sp-slate line-clamp-1 mt-0.5">
                                      {category.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-1">
                                  {category.topServices.slice(0, 8).map((service) => (
                                    <Link
                                      key={service.slug}
                                      href={service.href}
                                      onClick={() => setActiveCategory(null)}
                                      className="group/item flex items-center justify-between px-2.5 py-2 rounded-sp-sm hover:bg-sp-bg transition-colors text-xs"
                                    >
                                      <span className="text-sp-ink group-hover/item:text-sp-primary font-medium truncate pr-2">
                                        {service.title}
                                      </span>
                                      <ArrowRight className="w-3 h-3 text-sp-slate opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-sp-primary transition-all shrink-0" />
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              <div className="pt-3 mt-3 border-t border-sp-border flex items-center justify-between">
                                <Link
                                  href={category.href}
                                  onClick={() => setActiveCategory(null)}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sp-primary hover:underline whitespace-nowrap"
                                >
                                  <span>Explore all {category.title} services</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </motion.div>

                            {/* Right 5 cols: Featured Service Panel */}
                            <motion.div
                              key={`right-${category.slug}`}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                              className="col-span-5 bg-sp-bg rounded-sp-sm border border-sp-border p-4 flex flex-col justify-between"
                            >
                              <div>
                                <div className="text-[11px] font-semibold text-sp-primary mb-2 flex items-center justify-between">
                                  <span>Featured filing</span>
                                  <span className="tabular-nums text-sp-slate">0{catIdx + 1}.A</span>
                                </div>
                                <h4 className="text-sm font-semibold text-sp-ink mb-2">
                                  {featured.title}
                                </h4>
                                <p className="text-xs text-sp-slate leading-relaxed mb-4">
                                  {featured.summary}
                                </p>
                              </div>

                              <div className="space-y-2 pt-3 border-t border-sp-border">
                                <Link
                                  href={featured.href}
                                  onClick={() => setActiveCategory(null)}
                                  className="flex items-center justify-between w-full px-3 py-2 rounded-sp-sm bg-white border border-sp-border hover:border-sp-primary text-xs font-semibold text-sp-primary transition-colors whitespace-nowrap"
                                >
                                  <span>View requirements</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <Link
                                  href="/contact"
                                  onClick={() => setActiveCategory(null)}
                                  className="block text-center text-xs text-sp-slate hover:text-sp-primary font-medium py-1 whitespace-nowrap"
                                >
                                  Get a quote &rarr;
                                </Link>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                href="/blog"
                onMouseEnter={() => {
                  setActiveCategory(null);
                  setHoveredNav("blog");
                }}
                className={`relative px-2 xl:px-2.5 py-2 text-xs xl:text-sm rounded-sp-sm transition-colors whitespace-nowrap z-10 ${
                  pathname?.startsWith("/blog")
                    ? "font-semibold text-sp-navy"
                    : "font-medium text-sp-ink hover:text-sp-primary"
                }`}
              >
                {hoveredNav === "blog" && (
                  <motion.span
                    layoutId="topnav-hover-pill"
                    transition={NAV_SPRING}
                    className="absolute inset-0 rounded-sp-sm bg-[#EAE0CF]/55 -z-10"
                    aria-hidden="true"
                  />
                )}
                {pathname?.startsWith("/blog") && (
                  <motion.span
                    layoutId="topnav-active-bar"
                    transition={NAV_SPRING}
                    className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-sp-navy"
                    aria-hidden="true"
                  />
                )}
                <span>Blogs</span>
              </Link>

              <Link
                href="/contact"
                onMouseEnter={() => {
                  setActiveCategory(null);
                  setHoveredNav("contact");
                }}
                className={`relative px-2 xl:px-2.5 py-2 text-xs xl:text-sm rounded-sp-sm transition-colors whitespace-nowrap z-10 ${
                  pathname?.startsWith("/contact")
                    ? "font-semibold text-sp-navy"
                    : "font-medium text-sp-ink hover:text-sp-primary"
                }`}
              >
                {hoveredNav === "contact" && (
                  <motion.span
                    layoutId="topnav-hover-pill"
                    transition={NAV_SPRING}
                    className="absolute inset-0 rounded-sp-sm bg-[#EAE0CF]/55 -z-10"
                    aria-hidden="true"
                  />
                )}
                {pathname?.startsWith("/contact") && (
                  <motion.span
                    layoutId="topnav-active-bar"
                    transition={NAV_SPRING}
                    className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-sp-navy"
                    aria-hidden="true"
                  />
                )}
                <span>Contact</span>
              </Link>
            </nav>

            {/* Right Action Controls: Account Menu (Login, Bell, Pay) | Primary Get Started */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
              {/* Account Menu (houses Login, Notifications Bell, and Pay) */}
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountMenuOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1 xl:gap-1.5 h-9 xl:h-10 px-2 xl:px-3 rounded-sp-btn text-xs xl:text-sm font-medium text-sp-ink hover:text-sp-primary hover:bg-sp-tint/35 border border-transparent hover:border-sp-border transition-colors whitespace-nowrap"
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="true"
                >
                  <User className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-sp-primary shrink-0" />
                  <span>Login</span>
                  <ChevronDown
                    className={`w-3 h-3 xl:w-3.5 xl:h-3.5 text-sp-slate transition-transform duration-200 ${
                      accountMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-sp-md shadow-sp-lift border border-sp-border-strong p-2 z-50">
                    <Link
                      href="/user-login"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-sp-sm hover:bg-sp-bg text-xs font-medium text-sp-ink hover:text-sp-primary transition-colors whitespace-nowrap"
                    >
                      <span className="inline-flex items-center gap-2">
                        <User className="w-4 h-4 text-sp-primary" />
                        Client Login
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-sp-slate" />
                    </Link>

                    <Link
                      href="/notification"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-sp-sm hover:bg-sp-bg text-xs font-medium text-sp-ink hover:text-sp-primary transition-colors whitespace-nowrap"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Bell className="w-4 h-4 text-sp-primary" />
                        Notifications
                      </span>
                      <span className="text-[11px] tabular-nums bg-sp-tint text-sp-primary px-1.5 py-0.5 rounded font-semibold">
                        1
                      </span>
                    </Link>

                    <Link
                      href="/payment"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-sp-sm hover:bg-sp-bg text-xs font-medium text-sp-ink hover:text-sp-primary transition-colors whitespace-nowrap"
                    >
                      <span className="inline-flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-sp-primary" />
                        Online Payment
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-sp-slate" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Single Primary CTA */}
              <Button
                href="/user-register"
                size="sm"
                showPlus
                className="h-9 xl:h-10 px-3 xl:px-4 text-xs xl:text-sm"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-1.5">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-sp-sm text-sp-ink hover:text-sp-primary hover:bg-sp-tint/40 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer with Accordions */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-white flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Drawer Header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-sp-border shrink-0">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <ServicesPlusLogo variant="light" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-sp-sm text-sp-ink hover:bg-sp-tint/40"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Accordion Content */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-sp-slate px-1">
                Service categories
              </p>
              <div className="divide-y divide-sp-border border-y border-sp-border">
                {NAV_CATEGORIES.map((category, idx) => {
                  const isExpanded = mobileExpandedCat === category.slug;
                  return (
                    <div key={category.slug} className="py-2">
                      <button
                        onClick={() =>
                          setMobileExpandedCat(isExpanded ? null : category.slug)
                        }
                        className="w-full flex items-center justify-between py-2.5 px-1 text-left font-semibold text-base text-sp-ink hover:text-sp-primary transition-colors"
                        aria-expanded={isExpanded}
                      >
                        <span className="inline-flex items-center gap-2.5">
                          <span className="text-xs text-sp-primary tabular-nums font-semibold">
                            0{idx + 1}
                          </span>
                          <span>{category.title}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-sp-slate transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-sp-primary" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="pl-7 pr-2 pb-3 pt-1 space-y-1.5">
                          <p className="text-xs text-sp-slate mb-2">
                            {category.description}
                          </p>
                          {category.topServices.map((s) => (
                            <Link
                              key={s.slug}
                              href={s.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between py-1.5 text-sm text-sp-ink hover:text-sp-primary"
                            >
                              <span>{s.title}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-sp-slate" />
                            </Link>
                          ))}
                          <Link
                            href={category.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="inline-flex items-center gap-1 pt-2 text-xs font-semibold text-sp-primary"
                          >
                            <span>View all {category.title} services</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Links */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-sp-sm bg-sp-bg border border-sp-border text-sm font-semibold text-sp-ink hover:text-sp-primary"
              >
                Blogs &amp; Guides
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-sp-sm bg-sp-bg border border-sp-border text-sm font-semibold text-sp-ink hover:text-sp-primary"
              >
                Contact Desk
              </Link>
              <Link
                href="/notification"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-sp-sm bg-sp-bg border border-sp-border text-sm font-semibold text-sp-ink hover:text-sp-primary flex items-center justify-between"
              >
                <span>Notifications</span>
                <Bell className="w-4 h-4 text-sp-primary" />
              </Link>
              <Link
                href="/payment"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-sp-sm bg-sp-bg border border-sp-border text-sm font-semibold text-sp-ink hover:text-sp-primary flex items-center justify-between"
              >
                <span>Online Payment</span>
                <CreditCard className="w-4 h-4 text-sp-primary" />
              </Link>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-sp-border bg-sp-bg grid grid-cols-2 gap-3 shrink-0">
            <Button
              href="/user-login"
              variant="outline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Client Login
            </Button>
            <Button
              href="/user-register"
              showPlus
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpen={() => setSearchOpen(true)}
      />
    </>
  );
}

export { TopNav };
