"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, MessageCircle } from "lucide-react";
import { NAV_CATEGORIES } from "../../content/navigation";
function CommandPalette({
  isOpen,
  onClose
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const allServices = useMemo(() => {
    const list = [];
    NAV_CATEGORIES.forEach((cat) => {
      cat.topServices.forEach((s) => {
        list.push({
          title: s.title,
          category: cat.title,
          href: s.href,
          slug: s.slug
        });
      });
    });
    return list;
  }, []);
  const filtered = useMemo(() => {
    if (!query.trim()) return allServices.slice(0, 8);
    const q = query.toLowerCase();
    return allServices.filter(
      (s) => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
  }, [allServices, query]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        router.push(filtered[selectedIndex].href);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, router, onClose]);
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {
    /* Backdrop */
  }
      <div
    className="fixed inset-0 bg-sp-navy/50 backdrop-blur-xs transition-opacity"
    onClick={onClose}
  />

      {
    /* Modal dialog */
  }
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-sp-tint overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3 border-b border-sp-tint/80">
          <Search className="w-5 h-5 text-sp-slate mr-3 shrink-0" />
          <input
    type="text"
    className="w-full bg-transparent border-none text-sp-ink placeholder-sp-slate/70 focus:outline-none text-base"
    placeholder="Search 80+ legal, tax & compliance services..."
    value={query}
    onChange={(e) => {
      setQuery(e.target.value);
      setSelectedIndex(0);
    }}
    autoFocus
  />
          <button
    onClick={onClose}
    className="p-1 rounded-lg hover:bg-sp-tint text-sp-slate hover:text-sp-ink transition-colors"
    aria-label="Close search"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length > 0 ? <div className="space-y-1">
              <div className="px-3 py-1.5 text-xs font-mono font-medium text-sp-slate uppercase tracking-wider">
                Services ({filtered.length})
              </div>
              {filtered.map((item, idx) => {
    const isSelected = idx === selectedIndex;
    return <Link
      key={item.href}
      href={item.href}
      onClick={onClose}
      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all ${isSelected ? "bg-sp-tint/80 text-sp-primary font-medium" : "text-sp-ink hover:bg-sp-bg"}`}
    >
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sp-primary" />
                      <span>{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-sp-slate font-mono bg-white px-2 py-0.5 rounded-md border border-sp-tint/60">
                        {item.category}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-sp-slate" />
                    </div>
                  </Link>;
  })}
            </div> : <div className="text-center py-8 px-4">
              <p className="text-sp-ink font-medium mb-1">No services found for &quot;{query}&quot;</p>
              <p className="text-sp-slate text-xs mb-4">
                Looking for a custom corporate solution or specific license?
              </p>
              <a
    href={`https://wa.me/918800028794?text=${encodeURIComponent(
      `Hi ServicesPlus, I am looking for: ${query}`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
  >
                <MessageCircle className="w-4 h-4" />
                Talk to us on WhatsApp
              </a>
            </div>}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 bg-sp-bg border-t border-sp-tint text-xs font-mono text-sp-slate">
          <span>Navigate with &uarr;&darr;</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>;
}
export {
  CommandPalette
};
