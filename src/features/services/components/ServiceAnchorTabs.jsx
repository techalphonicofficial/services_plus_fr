"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const SPRING_TAB = {
  type: "spring",
  stiffness: 120,
  damping: 20
};

function ServiceAnchorTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Calculate overall page reading progress (0 to 100%)
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            const pct = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
            setScrollProgress(pct);
          }

          const scrollPos = window.scrollY + 170;
          for (const tab of tabs) {
            const el = document.getElementById(tab.id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                setActiveTab(tab.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -136, duration: 1.15 });
      } else {
        const yOffset = -136;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setActiveTab(id);
    }
  };

  if (tabs.length === 0) return null;

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-sp-border shadow-sp-soft mb-10">
      {/* Scroll Progress Bar on Service Pages */}
      <div className="w-full h-[2px] bg-sp-tint/60 overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-sp-primary transition-[width] duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-1 overflow-x-auto no-scrollbar"
          role="tablist"
          aria-label="Service guide sections"
        >
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => scrollTo(tab.id)}
                className={`relative px-3.5 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "text-sp-primary"
                    : "text-sp-slate hover:text-sp-ink"
                }`}
              >
                <span className="text-[11px] tabular-nums text-sp-primary">
                  0{idx + 1}
                </span>
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="service-anchor-tab-indicator"
                    transition={SPRING_TAB}
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-sp-primary"
                  />
                )}
              </button>
            );
          })}
        </div>

        <span className="hidden md:inline-block text-xs text-sp-slate tabular-nums whitespace-nowrap">
          Reading progress: {Math.round(scrollProgress)}%
        </span>
      </div>
    </div>
  );
}

export { ServiceAnchorTabs };
