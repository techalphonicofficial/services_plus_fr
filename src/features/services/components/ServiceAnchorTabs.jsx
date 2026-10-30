"use client";
import { useState, useEffect } from "react";
function ServiceAnchorTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
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
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -140;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveTab(id);
    }
  };
  if (tabs.length === 0) return null;
  return <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-sp-tint/80 shadow-2xs py-2 px-4 mb-8">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
    const isActive = activeTab === tab.id;
    return <button
      key={tab.id}
      onClick={() => scrollTo(tab.id)}
      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${isActive ? "bg-sp-primary text-white shadow-2xs" : "text-sp-slate hover:text-sp-ink hover:bg-sp-bg"}`}
    >
              {tab.label}
            </button>;
  })}
      </div>
    </div>;
}
export {
  ServiceAnchorTabs
};
