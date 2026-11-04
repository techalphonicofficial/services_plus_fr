"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
import { NAV_CATEGORIES } from "../../content/navigation";

// Links come from the CMS header menu (service/headerService.js):
// navigation = { categories: [{ slug, title, href, icon, topServices, featured }], links, account, cta }.

const NAV_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.6
};

const DEFAULT_NAVIGATION = {
  categories: NAV_CATEGORIES.map((cat) => {
    const services = cat.topServices.map((s) => ({
      id: s.slug,
      label: s.title,
      href: s.href
    }));
    return {
      id: cat.slug,
      slug: cat.slug,
      title: cat.title,
      href: cat.href,
      icon: "",
      topServices: services,
      featured: services[0] || null
    };
  }),
  links: [
    { id: "blogs", label: "Blogs", href: "/blog" },
    { id: "contact", label: "Contact", href: "/contact" }
  ],
  account: {
    label: "Login",
    href: "/login",
    items: [
      { id: "login", label: "Client Login", href: "/login" },
      { id: "register", label: "Create Account", href: "/user-register" }
    ]
  },
  cta: {
    id: "get-started",
    label: "Get Started",
    href: "/user-register"
  }
};

const EMPTY_NAVIGATION = { categories: [], links: [], account: null, cta: null };

// Enrich CMS categories with additional curated services from NAV_CATEGORIES so the mega menu shows more options
function enrichCategories(cmsCategories) {
  if (!Array.isArray(cmsCategories) || cmsCategories.length === 0) {
    return DEFAULT_NAVIGATION.categories;
  }
  return cmsCategories.map((cat) => {
    const fallbackCat = NAV_CATEGORIES.find(
      (fc) =>
        fc.slug === cat.slug ||
        fc.title.toLowerCase() === String(cat.title || "").toLowerCase()
    );
    if (!fallbackCat) return cat;

    const existingSlugs = new Set(
      (cat.topServices || []).map(
        (s) => String(s.href || "").split("/").filter(Boolean).pop() || s.label
      )
    );
    const extraServices = fallbackCat.topServices
      .filter((s) => !existingSlugs.has(s.slug))
      .map((s) => ({
        id: s.slug,
        label: s.title,
        href: s.href
      }));

    const merged = [...(cat.topServices || []), ...extraServices];
    return {
      ...cat,
      topServices: merged,
      featured: cat.featured || merged[0] || null
    };
  });
}

// Horizontal alignment offset per category index so the 40% larger mega-menu panel stays cleanly within the viewport
function megaMenuPositionClass(catIdx) {
  if (catIdx === 0) return "left-0";
  if (catIdx === 1) return "-left-16";
  if (catIdx === 2) return "-left-36";
  if (catIdx === 3) return "-left-56";
  return "-left-80";
}

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
  const hasCmsNav = Array.isArray(navigation?.categories) && navigation.categories.length > 0;
  const categories = useMemo(
    () => enrichCategories(navigation?.categories),
    [navigation?.categories]
  );
  const links = hasCmsNav ? navigation.links || [] : DEFAULT_NAVIGATION.links;
  const account = hasCmsNav ? navigation.account : DEFAULT_NAVIGATION.account;
  const cta = hasCmsNav ? navigation.cta : DEFAULT_NAVIGATION.cta;

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

  // Lock background body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

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
    if (!header) return undefined;
    const write = () => document.documentElement.style.setProperty("--ta-header-h", `${header.offsetHeight}px`);
    write();
    window.addEventListener("resize", write, { passive: true });
    return () => window.removeEventListener("resize", write);
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
      {/* Main Header: Clean surface at top with smooth shadow elevation without layout shifts */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 h-[72px] transition-shadow duration-200 ${
          scrolled
            ? "bg-white/[0.98] lg:bg-white/95 lg:backdrop-blur-md border-b border-sp-border shadow-sp-soft"
            : "bg-white/[0.98] lg:bg-white/95 lg:backdrop-blur-sm border-b border-sp-border/70"
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

                    {/* Mega Menu Dropdown — 40% bigger panel with expanded service options */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.99, transition: { duration: 0.1 } }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute top-full pt-2.5 w-[860px] xl:w-[900px] max-w-[calc(100vw-2rem)] z-50 ${megaMenuPositionClass(catIdx)}`}
                        >
                          <div className="bg-white rounded-sp-md shadow-sp-lift border border-sp-border-strong p-7 grid grid-cols-12 gap-7 relative overflow-hidden">
                            {/* Corner Registration Marks */}
                            <span
                              className="absolute top-2.5 left-3 text-xs text-sp-primary/40 pointer-events-none"
                              aria-hidden="true"
                            >
                              +
                            </span>
                            <span
                              className="absolute top-2.5 right-3 text-xs text-sp-primary/40 pointer-events-none"
                              aria-hidden="true"
                            >
                              +
                            </span>

                            {/* Left 8 cols: Category + expanded services grid */}
                            <div
                              className={`${featured ? "col-span-8" : "col-span-12"} flex flex-col justify-between`}
                            >
                              <div>
                                <div className="flex items-start gap-3.5 pb-4 mb-3.5 border-b border-sp-border">
                                  <div className="w-11 h-11 rounded-sp-sm bg-sp-bg border border-sp-border flex items-center justify-center shrink-0">
                                    <CategoryIcon category={category} className="w-6 h-6" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2.5">
                                      <span className="text-sm font-semibold text-sp-primary tabular-nums">
                                        {String(catIdx + 1).padStart(2, "0")}
                                      </span>
                                      <p className="font-bold text-sp-ink text-base">
                                        {category.title}
                                      </p>
                                    </div>
                                    <p className="text-[13px] text-sp-slate line-clamp-1 mt-0.5">
                                      {category.topServices.length} services
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                                  {category.topServices.slice(0, 16).map((service) => (
                                    <Link
                                      key={service.id || service.href}
                                      href={service.href}
                                      target={service.target === "_blank" ? "_blank" : undefined}
                                      onClick={() => setActiveCategory(null)}
                                      className="group/item flex items-center justify-between px-3 py-2 rounded-sp-sm hover:bg-sp-bg transition-colors text-[13.5px]"
                                    >
                                      <span className="text-sp-ink group-hover/item:text-sp-primary font-medium truncate pr-2">
                                        {service.label}
                                      </span>
                                      <ArrowRight className="w-3.5 h-3.5 text-sp-slate opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-sp-primary transition-all shrink-0" />
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              {category.href !== "#" && (
                                <div className="pt-3.5 mt-3.5 border-t border-sp-border flex items-center justify-between">
                                  <Link
                                    href={category.href}
                                    onClick={() => setActiveCategory(null)}
                                    className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-sp-primary hover:underline whitespace-nowrap"
                                  >
                                    <span>Explore all {category.title} services</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </Link>
                                </div>
                              )}
                            </div>

                            {/* Right 4 cols: Featured service (the category's first link) */}
                            {featured && (
                              <div
                                className="col-span-4 bg-sp-bg rounded-sp-sm border border-sp-border p-5 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="text-xs font-semibold text-sp-primary mb-2.5 flex items-center justify-between">
                                    <span>Featured filing</span>
                                    <span className="tabular-nums text-sp-slate">{String(catIdx + 1).padStart(2, "0")}.A</span>
                                  </div>
                                  <h4 className="text-base font-bold text-sp-ink mb-2.5">
                                    {featured.label}
                                  </h4>
                                  <p className="text-[13px] text-sp-slate leading-relaxed mb-5">
                                    Expert-led, fully online {category.title.toLowerCase()} service with transparent pricing.
                                  </p>
                                </div>

                                <div className="space-y-2.5 pt-4 border-t border-sp-border">
                                  <Link
                                    href={featured.href}
                                    onClick={() => setActiveCategory(null)}
                                    className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-sp-sm bg-white border border-sp-border hover:border-sp-primary text-[13px] font-semibold text-sp-primary transition-colors whitespace-nowrap"
                                  >
                                    <span>View requirements</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </Link>
                                  <Link
                                    href="/contact"
                                    onClick={() => setActiveCategory(null)}
                                    className="block text-center text-[13px] text-sp-slate hover:text-sp-primary font-medium py-1.5 whitespace-nowrap"
                                  >
                                    Get a quote &rarr;
                                  </Link>
                                </div>
                              </div>
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
          className="fixed inset-0 z-50 lg:hidden bg-white flex flex-col overscroll-contain"
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
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 overscroll-contain">
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
