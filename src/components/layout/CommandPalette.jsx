"use client";

import { useState, useEffect, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, MessageCircle, Clock, CornerDownLeft } from "lucide-react";
import { NAV_CATEGORIES } from "../../content/navigation";
import serviceCatalog from "../../content/services/catalog.json";

const RECENT_STORAGE_KEY = "sp_recent_searches_v1";

const DEFAULT_RECENT = [
  {
    title: "Private Limited Company",
    category: "Startup",
    href: "/service/private-limited-company",
    slug: "private-limited-company"
  },
  {
    title: "GST Registration",
    category: "Taxes",
    href: "/service/gst-registration",
    slug: "gst-registration"
  },
  {
    title: "Trademark Registration",
    category: "Trademark",
    href: "/service/trademark-registration",
    slug: "trademark-registration"
  },
  {
    title: "FSSAI Food License",
    category: "Certification & Licensing",
    href: "/service/fssai-registration",
    slug: "fssai-registration"
  }
];

const CATEGORY_LABELS = {
  startup: "Startup",
  trademark: "Trademark",
  taxes: "Taxes",
  compliance: "Compliance",
  "certification-licensing": "Certification & Licensing"
};

const emptySubscribe = () => () => {};

export function usePlatformShortcut() {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      const ua = navigator.userAgent || navigator.platform || "";
      return /Mac|iPhone|iPad|iPod/i.test(ua) ? "Cmd K" : "Ctrl K";
    },
    () => "Ctrl K"
  );
}

export function openCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("sp:open-command-palette"));
  }
}

function readSavedRecentSearches() {
  if (typeof window === "undefined") return DEFAULT_RECENT;
  try {
    const raw = window.localStorage.getItem(RECENT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, 4);
      }
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_RECENT;
}

function CommandPalette({ isOpen: propIsOpen, open, onClose, onOpen }) {
  const isOpen = propIsOpen ?? open ?? false;
  const router = useRouter();
  const shortcutLabel = usePlatformShortcut();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState(readSavedRecentSearches);

  const saveRecent = (item) => {
    try {
      const updated = [
        item,
        ...recentSearches.filter((r) => r.href !== item.href)
      ].slice(0, 4);
      setRecentSearches(updated);
      window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  // Combine curated topServices + full catalog (100 services)
  const allServices = useMemo(() => {
    const map = new Map();
    NAV_CATEGORIES.forEach((cat) => {
      cat.topServices.forEach((s) => {
        map.set(s.slug, {
          title: s.title,
          category: cat.title,
          categorySlug: cat.slug,
          href: s.href,
          slug: s.slug
        });
      });
    });
    serviceCatalog.forEach((s) => {
      if (!map.has(s.slug)) {
        map.set(s.slug, {
          title: s.title,
          category: CATEGORY_LABELS[s.category] || "Startup",
          categorySlug: s.category || "startup",
          href: s.href,
          slug: s.slug
        });
      }
    });
    return Array.from(map.values());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return allServices.slice(0, 15);
    }
    return allServices
      .filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.slug.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [allServices, query]);

  // Group filtered items by category
  const groupedResults = useMemo(() => {
    const groups = [];
    const byCat = new Map();
    filtered.forEach((item) => {
      if (!byCat.has(item.category)) {
        const group = { category: item.category, items: [] };
        byCat.set(item.category, group);
        groups.push(group);
      }
      byCat.get(item.category).items.push(item);
    });
    return groups;
  }, [filtered]);

  // Flat list in display order for keyboard navigation
  const flatItems = useMemo(() => {
    return groupedResults.flatMap((g) => g.items);
  }, [groupedResults]);

  useEffect(() => {
    const handleCustomOpen = () => {
      if (onOpen) onOpen();
    };
    window.addEventListener("sp:open-command-palette", handleCustomOpen);
    return () => window.removeEventListener("sp:open-command-palette", handleCustomOpen);
  }, [onOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else if (onOpen) {
          setQuery("");
          setSelectedIndex(0);
          onOpen();
        }
        return;
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (flatItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + (flatItems.length || 1)) % (flatItems.length || 1)
        );
      } else if (e.key === "Enter" && flatItems[selectedIndex]) {
        e.preventDefault();
        const chosen = flatItems[selectedIndex];
        saveRecent(chosen);
        router.push(chosen.href);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!isOpen) return null;

  let runningIndex = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search compliance and registration services"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-sp-navy/55 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal surface */}
      <div className="relative w-full max-w-2xl bg-white rounded-sp-md shadow-sp-lift border border-sp-border-strong overflow-hidden z-10">
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-sp-border gap-3">
          <Search className="w-5 h-5 text-sp-primary shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent border-none text-sp-ink placeholder-sp-slate/75 focus:outline-none text-base"
            placeholder="Search services (GST, Private Limited, Trademark)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono bg-sp-bg text-sp-slate rounded-sp-sm border border-sp-border shrink-0">
            {shortcutLabel}
          </kbd>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sp-sm hover:bg-sp-tint/60 text-sp-slate hover:text-sp-ink transition-colors shrink-0"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[62vh] overflow-y-auto p-3 space-y-4">
          {/* Recent Searches when query is empty */}
          {!query.trim() && recentSearches.length > 0 && (
            <div>
              <div className="px-2.5 pb-1.5 flex items-center justify-between text-xs font-medium text-sp-slate">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sp-primary" />
                  Recent searches
                </span>
                <span className="tabular-nums text-sp-slate/70">{recentSearches.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 px-2 pt-1">
                {recentSearches.map((item) => (
                  <Link
                    key={`recent-${item.href}`}
                    href={item.href}
                    onClick={() => {
                      saveRecent(item);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sp-sm bg-sp-bg hover:bg-sp-tint/60 border border-sp-border text-xs font-medium text-sp-ink hover:text-sp-primary transition-colors whitespace-nowrap"
                  >
                    <span>{item.title}</span>
                    <ArrowRight className="w-3 h-3 text-sp-slate" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Grouped Results by Category */}
          {groupedResults.length > 0 ? (
            <div className="space-y-4">
              {groupedResults.map((group) => (
                <div key={group.category}>
                  <div className="px-2.5 py-1 flex items-center justify-between text-xs font-semibold text-sp-slate border-b border-sp-border/60 mb-1">
                    <span>{group.category}</span>
                    <span className="tabular-nums text-sp-slate/80">
                      {group.items.length}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      runningIndex += 1;
                      const idx = runningIndex;
                      const isSelected = idx === selectedIndex;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            saveRecent(item);
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-sp-sm text-sm transition-colors ${
                            isSelected
                              ? "bg-sp-tint/75 text-sp-primary font-medium"
                              : "text-sp-ink hover:bg-sp-bg"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`text-xs font-semibold leading-none ${
                                isSelected ? "text-sp-primary" : "text-sp-slate/60"
                              }`}
                              aria-hidden="true"
                            >
                              +
                            </span>
                            <span className="truncate">{item.title}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-3">
                            <span className="text-xs text-sp-slate bg-white px-2 py-0.5 rounded-sp-sm border border-sp-border">
                              {item.category}
                            </span>
                            <ArrowRight
                              className={`w-3.5 h-3.5 transition-transform ${
                                isSelected
                                  ? "text-sp-primary translate-x-0.5"
                                  : "text-sp-slate"
                              }`}
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4">
              <p className="text-sp-ink font-semibold text-base mb-1">
                No matching service for &ldquo;{query}&rdquo;
              </p>
              <p className="text-sp-slate text-sm mb-5 max-w-md mx-auto">
                Need a specific license, custom filing, or multi-state registration? Our corporate desk can assist directly.
              </p>
              <a
                href={`https://wa.me/918800028794?text=${encodeURIComponent(
                  `Hi ServicesPlus, I am looking for: ${query}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-sp-btn bg-sp-primary text-white text-sm font-medium hover:bg-sp-primary-600 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                Ask an advisor on WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* Footer keyboard hints */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-sp-bg border-t border-sp-border text-xs text-sp-slate">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-sp-border font-mono text-[11px]">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-sp-border font-mono text-[11px]">
                <CornerDownLeft className="w-3 h-3 inline" />
              </kbd>
              Open
            </span>
          </div>
          <span>Press Esc to close</span>
        </div>
      </div>
    </div>
  );
}

export { CommandPalette };
