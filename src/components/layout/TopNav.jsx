"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  CreditCard,
  User,
  PhoneCall
} from "lucide-react";
import { NAV_CATEGORIES } from "../../content/navigation";
import { CommandPalette } from "./CommandPalette";
import { Button } from "../ui/Button";
function TopNav() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  return <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sp-tint/80 shadow-2xs">
        {
    /* Top Announcement Bar */
  }
        <div className="bg-sp-navy text-white text-xs py-1.5 px-4 font-mono">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="bg-sp-primary text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                Update
              </span>
              <span className="text-sp-sky truncate">
                GST & ROC Annual Filing compliance dates active for FY 2026.
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sp-sky text-[11px] shrink-0">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-sp-sky" />
                Helpline: (+91) 88000 28794
              </span>
              <span className="text-white/20">|</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Govt. Recognized Corporate Advisory
              </span>
            </div>
          </div>
        </div>

        {
    /* Main Nav Bar */
  }
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {
    /* Logo */
  }
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="relative w-44 h-11">
                <Image
    src="/assets/images/logo-h-390c5c1a.png"
    alt="Services Plus"
    fill
    priority
    className="object-contain"
  />
              </div>
            </Link>

            {
    /* Desktop Navigation Links */
  }
            <nav className="hidden lg:flex items-center gap-1">
              {
    /* 5 MegaMenu Categories */
  }
              {NAV_CATEGORIES.map((category) => <div
    key={category.slug}
    className="relative group"
    onMouseEnter={() => setActiveCategory(category.slug)}
    onMouseLeave={() => setActiveCategory(null)}
  >
                  <Link
    href={category.href}
    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-sp-ink hover:text-sp-primary rounded-lg transition-colors group-hover:bg-sp-tint/40"
  >
                    <span>{category.title}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-sp-slate group-hover:text-sp-primary transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  {
    /* Mega Menu Dropdown */
  }
                  {activeCategory === category.slug && <div className="absolute top-full left-0 w-96 bg-white rounded-2xl shadow-xl border border-sp-tint p-4 animate-in fade-in zoom-in-95 duration-150 z-50">
                      <div className="mb-3 pb-2 border-b border-sp-tint/60 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sp-ink text-sm">{category.title}</p>
                          <p className="text-xs text-sp-slate">{category.description}</p>
                        </div>
                        <Link
    href={category.href}
    className="text-xs font-mono text-sp-primary font-bold hover:underline shrink-0"
  >
                          View All &rarr;
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 gap-1 max-h-80 overflow-y-auto pr-1">
                        {category.topServices.map((service) => <Link
    key={service.slug}
    href={service.href}
    className="flex items-center justify-between p-2 rounded-lg hover:bg-sp-bg transition-colors text-xs group/item"
  >
                            <span className="text-sp-ink group-hover/item:text-sp-primary font-medium">
                              {service.title}
                            </span>
                            {service.isPopular && <span className="text-[10px] font-mono bg-sp-tint text-sp-primary px-1.5 py-0.5 rounded font-semibold">
                                Popular
                              </span>}
                          </Link>)}
                      </div>
                    </div>}
                </div>)}

              <Link
    href="/blog"
    className="px-3 py-2 text-sm font-medium text-sp-ink hover:text-sp-primary rounded-lg transition-colors"
  >
                Blogs
              </Link>

              <Link
    href="/contact"
    className="px-3 py-2 text-sm font-medium text-sp-ink hover:text-sp-primary rounded-lg transition-colors"
  >
                Contact
              </Link>
            </nav>

            {
    /* Right Action Icons & Auth */
  }
            <div className="hidden lg:flex items-center gap-2.5">
              {
    /* Search Pill Trigger */
  }
              <button
    onClick={() => setSearchOpen(true)}
    className="flex items-center gap-2 px-3 py-1.5 text-xs text-sp-slate bg-sp-bg hover:bg-sp-tint/60 border border-sp-tint rounded-xl transition-all font-mono"
    title="Search (Cmd+K)"
  >
                <Search className="w-3.5 h-3.5 text-sp-slate" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 text-[10px] bg-white rounded border border-sp-tint shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {
    /* Notification Bell */
  }
              <Link
    href="/notification"
    className="relative p-2 rounded-xl text-sp-slate hover:text-sp-primary hover:bg-sp-tint/40 transition-colors"
    title="Notifications"
  >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </Link>

              {
    /* Payment Link */
  }
              <Link
    href="/payment"
    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-sp-primary bg-sp-tint/60 hover:bg-sp-tint border border-sp-tint rounded-xl transition-all"
    title="Pay Online"
  >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pay</span>
              </Link>

              {
    /* Login / Register */
  }
              <Link
    href="/user-login"
    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-sp-ink hover:text-sp-primary transition-colors"
  >
                <User className="w-3.5 h-3.5 text-sp-slate" />
                <span>Login</span>
              </Link>

              <Button href="/user-register" size="sm" showPlus>
                Get Started
              </Button>
            </div>

            {
    /* Mobile Menu & Search Buttons */
  }
            <div className="flex lg:hidden items-center gap-2">
              <button
    onClick={() => setSearchOpen(true)}
    className="p-2 rounded-lg text-sp-slate hover:text-sp-ink hover:bg-sp-tint/40"
    aria-label="Search"
  >
                <Search className="w-5 h-5" />
              </button>
              <Link
    href="/notification"
    className="relative p-2 rounded-lg text-sp-slate hover:text-sp-ink"
    aria-label="Notifications"
  >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
              </Link>
              <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="p-2 rounded-lg text-sp-ink hover:bg-sp-tint/40"
    aria-label="Open menu"
  >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {
    /* Mobile Navigation Drawer */
  }
        {mobileMenuOpen && <div className="lg:hidden border-t border-sp-tint bg-white px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="font-mono text-xs text-sp-slate uppercase tracking-wider font-semibold">
                Categories
              </div>
              {NAV_CATEGORIES.map((category) => <div key={category.slug} className="border-b border-sp-tint/60 pb-2">
                  <Link
    href={category.href}
    onClick={() => setMobileMenuOpen(false)}
    className="font-semibold text-sm text-sp-ink hover:text-sp-primary block py-1"
  >
                    {category.title}
                  </Link>
                  <div className="grid grid-cols-1 gap-1 pl-2 mt-1">
                    {category.topServices.slice(0, 4).map((s) => <Link
    key={s.slug}
    href={s.href}
    onClick={() => setMobileMenuOpen(false)}
    className="text-xs text-sp-slate hover:text-sp-primary py-1"
  >
                        • {s.title}
                      </Link>)}
                  </div>
                </div>)}

              <div className="pt-2 flex flex-col gap-2">
                <Link
    href="/blog"
    onClick={() => setMobileMenuOpen(false)}
    className="font-semibold text-sm text-sp-ink py-1.5"
  >
                  Blogs
                </Link>
                <Link
    href="/contact"
    onClick={() => setMobileMenuOpen(false)}
    className="font-semibold text-sm text-sp-ink py-1.5"
  >
                  Contact Us
                </Link>
                <Link
    href="/payment"
    onClick={() => setMobileMenuOpen(false)}
    className="font-semibold text-sm text-sp-primary py-1.5 flex items-center gap-2"
  >
                  <CreditCard className="w-4 h-4" /> Online Payment
                </Link>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-sp-tint">
                  <Link
    href="/user-login"
    onClick={() => setMobileMenuOpen(false)}
    className="flex items-center justify-center py-2.5 rounded-xl border border-sp-tint text-sm font-semibold text-sp-ink hover:bg-sp-bg"
  >
                    Login
                  </Link>
                  <Link
    href="/user-register"
    onClick={() => setMobileMenuOpen(false)}
    className="flex items-center justify-center py-2.5 rounded-xl bg-sp-primary text-sm font-semibold text-white hover:bg-sp-primary-600 shadow-sm"
  >
                    Register +
                  </Link>
                </div>
              </div>
            </div>
          </div>}
      </header>

      {
    /* Global Command Palette (Cmd+K) */
  }
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>;
}
export {
  TopNav
};
