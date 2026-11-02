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
  ArrowRight
} from "lucide-react";
import { CommandPalette } from "./CommandPalette";
import { Button } from "../ui/Button";
import { ServicesPlusLogo } from "../ui/Logo";
import { CATEGORY_DUOTONE_ICONS, StartupDuotoneIcon } from "../ui/DuotoneIcons";

// Links come from the CMS header menu (service/headerService.js):
// navigation = { categories: [{ slug, title, href, icon, topServices, featured }], links, account, cta }.

const NAV_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.6
};

const EMPTY_NAVIGATION = { categories: [], links: [], account: null, cta: null };

// Icon of an account menu link, by where it goes.
function accountIcon(href) {
  if (/notification/i.test(href)) return Bell;
  if (/pay/i.test(href)) return CreditCard;
  return User;
}

/** A menu item's own icon (admin: emoji or image) or the category's duotone icon. */
function CategoryIcon({ category, className }) {
  if (category.icon) {
    return /^(https?:|\/)/.test(category.icon) ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={category.icon} alt="" className={`${className} object-contain`} />
    ) : (
      <span className="text-base leading-none" aria-hidden="true">{category.icon}</span>
    );
  }
  const Icon = CATEGORY_DUOTONE_ICONS[category.slug] || StartupDuotoneIcon;
  return <Icon className={className} />;
}

const isActive = (pathname, href) => Boolean(href && href !== "#" && href !== "/" && pathname?.startsWith(href));

function TopNav({ navigation = EMPTY_NAVIGATION }) {
  const { categories = [], links = [], account, cta } = navigation;
  const pathname = usePathname();
  const headerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState(categories[0]?.slug || null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // The CMS blocks keep sticky sidebars and #anchor jumps below the header (--ta-header-h).
  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof ResizeObserver === "undefined") return undefined;
    const write = () => document.documentElement.style.setProperty("--ta-header-h", `${header.offsetHeight}px`);
    write();
    const observer = new ResizeObserver(write);
    observer.observe(header);
    return () => observer.disconnect();
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
      {/* Main Header: Clean surface at top (80px / h-20), frosted + shadow + 64px (h-16) after 8px scroll */}
      <header
        ref={headerRef}
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
              {categories.map((category, catIdx) => {
                const featured = category.featured;
                const isOpen = activeCategory === category.slug;
                const isHovered = hoveredNav === category.slug || isOpen;
                const isActiveRoute = isActive(pathname, category.href);

                return (
                  <div
                    key={category.id || category.slug}
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

                            {/* Left 7 cols: Category + its services */}
                            <motion.div
                              key={`left-${category.slug}`}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className={`${featured ? "col-span-7" : "col-span-12"} flex flex-col justify-between`}
                            >
                              <div>
                                <div className="flex items-start gap-3 pb-3 mb-3 border-b border-sp-border">
                                  <div className="w-9 h-9 rounded-sp-sm bg-sp-bg border border-sp-border flex items-center justify-center shrink-0">
                                    <CategoryIcon category={category} className="w-5 h-5" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-semibold text-sp-primary tabular-nums">
                                        {String(catIdx + 1).padStart(2, "0")}
                                      </span>
                                      <p className="font-semibold text-sp-ink text-sm">
                                        {category.title}
                                      </p>
                                    </div>
                                    <p className="text-xs text-sp-slate line-clamp-1 mt-0.5">
                                      {category.topServices.length} services
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-1">
                                  {category.topServices.slice(0, 8).map((service) => (
                                    <Link
                                      key={service.id || service.href}
                                      href={service.href}
                                      target={service.target === "_blank" ? "_blank" : undefined}
                                      onClick={() => setActiveCategory(null)}
                                      className="group/item flex items-center justify-between px-2.5 py-2 rounded-sp-sm hover:bg-sp-bg transition-colors text-xs"
                                    >
                                      <span className="text-sp-ink group-hover/item:text-sp-primary font-medium truncate pr-2">
                                        {service.label}
                                      </span>
                                      <ArrowRight className="w-3 h-3 text-sp-slate opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-sp-primary transition-all shrink-0" />
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              {category.href !== "#" && (
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
                              )}
                            </motion.div>

                            {/* Right 5 cols: Featured service (the category's first link) */}
                            {featured && (
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
                                    <span className="tabular-nums text-sp-slate">{String(catIdx + 1).padStart(2, "0")}.A</span>
                                  </div>
                                  <h4 className="text-sm font-semibold text-sp-ink mb-2">
                                    {featured.label}
                                  </h4>
                                  <p className="text-xs text-sp-slate leading-relaxed mb-4">
                                    Expert-led, fully online {category.title.toLowerCase()} service with transparent pricing.
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
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {links.map((item) => {
                const key = item.id || item.href;
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={key}
                    href={item.href}
                    target={item.target === "_blank" ? "_blank" : undefined}
                    onMouseEnter={() => {
                      setActiveCategory(null);
                      setHoveredNav(key);
                    }}
                    className={`relative px-2 xl:px-2.5 py-2 text-xs xl:text-sm rounded-sp-sm transition-colors whitespace-nowrap z-10 ${
                      active
                        ? "font-semibold text-sp-navy"
                        : "font-medium text-sp-ink hover:text-sp-primary"
                    }`}
                  >
                    {hoveredNav === key && (
                      <motion.span
                        layoutId="topnav-hover-pill"
                        transition={NAV_SPRING}
                        className="absolute inset-0 rounded-sp-sm bg-[#EAE0CF]/55 -z-10"
                        aria-hidden="true"
                      />
                    )}
                    {active && (
                      <motion.span
                        layoutId="topnav-active-bar"
                        transition={NAV_SPRING}
                        className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-sp-navy"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Controls: Account Menu | Primary button */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
              {account && (
                <div className="relative" ref={accountRef}>
                  <button
                    onClick={() => setAccountMenuOpen((prev) => !prev)}
                    className="inline-flex items-center gap-1 xl:gap-1.5 h-9 xl:h-10 px-2 xl:px-3 rounded-sp-btn text-xs xl:text-sm font-medium text-sp-ink hover:text-sp-primary hover:bg-sp-tint/35 border border-transparent hover:border-sp-border transition-colors whitespace-nowrap"
                    aria-expanded={accountMenuOpen}
                    aria-haspopup="true"
                  >
                    <User className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-sp-primary shrink-0" />
                    <span>{account.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 xl:w-3.5 xl:h-3.5 text-sp-slate transition-transform duration-200 ${
                        accountMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {accountMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-sp-md shadow-sp-lift border border-sp-border-strong p-2 z-50">
                      {account.items.map((item) => {
                        const Icon = accountIcon(item.href);
                        return (
                          <Link
                            key={item.id || item.href}
                            href={item.href}
                            onClick={() => setAccountMenuOpen(false)}
                            className="flex items-center justify-between px-3 py-2.5 rounded-sp-sm hover:bg-sp-bg text-xs font-medium text-sp-ink hover:text-sp-primary transition-colors whitespace-nowrap"
                          >
                            <span className="inline-flex items-center gap-2">
                              <Icon className="w-4 h-4 text-sp-primary" />
                              {item.label}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-sp-slate" />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {cta && (
                <Button
                  href={cta.href}
                  size="sm"
                  showPlus
                  className="h-9 xl:h-10 px-3 xl:px-4 text-xs xl:text-sm"
                >
                  {cta.label}
                </Button>
              )}
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
            {categories.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-sp-slate px-1">
                  Service categories
                </p>
                <div className="divide-y divide-sp-border border-y border-sp-border">
                  {categories.map((category, idx) => {
                    const isExpanded = mobileExpandedCat === category.slug;
                    return (
                      <div key={category.id || category.slug} className="py-2">
                        <button
                          onClick={() =>
                            setMobileExpandedCat(isExpanded ? null : category.slug)
                          }
                          className="w-full flex items-center justify-between py-2.5 px-1 text-left font-semibold text-base text-sp-ink hover:text-sp-primary transition-colors"
                          aria-expanded={isExpanded}
                        >
                          <span className="inline-flex items-center gap-2.5">
                            <span className="text-xs text-sp-primary tabular-nums font-semibold">
                              {String(idx + 1).padStart(2, "0")}
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
                            {category.topServices.map((s) => (
                              <Link
                                key={s.id || s.href}
                                href={s.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-between py-1.5 text-sm text-sp-ink hover:text-sp-primary"
                              >
                                <span>{s.label}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-sp-slate" />
                              </Link>
                            ))}
                            {category.href !== "#" && (
                              <Link
                                href={category.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="inline-flex items-center gap-1 pt-2 text-xs font-semibold text-sp-primary"
                              >
                                <span>View all {category.title} services</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Direct Links */}
            <div className="grid grid-cols-2 gap-2.5">
              {[...links, ...(account?.items || []).filter((item) => !/login/i.test(item.href))].map((item) => {
                const Icon = account?.items.includes(item) ? accountIcon(item.href) : null;
                return (
                  <Link
                    key={item.id || item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-sp-sm bg-sp-bg border border-sp-border text-sm font-semibold text-sp-ink hover:text-sp-primary flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    {Icon && <Icon className="w-4 h-4 text-sp-primary" />}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-sp-border bg-sp-bg grid grid-cols-2 gap-3 shrink-0">
            {account && (
              <Button
                href={account.items.find((item) => /login/i.test(item.href))?.href || account.href}
                variant="outline"
                onClick={() => setMobileMenuOpen(false)}
              >
                {account.items.find((item) => /login/i.test(item.href))?.label || account.label}
              </Button>
            )}
            {cta && (
              <Button
                href={cta.href}
                showPlus
                onClick={() => setMobileMenuOpen(false)}
              >
                {cta.label}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpen={() => setSearchOpen(true)}
        categories={categories}
      />
    </>
  );
}

export { TopNav };
