"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "../../../components/ui/Card";
function ServiceFaqAccordion({ faqs, serviceTitle }) {
  const [openIdx, setOpenIdx] = useState(0);
  if (!faqs || faqs.length === 0) return null;
  return <div id="faq" className="pt-6 scroll-mt-36">
      <h3 className="text-2xl font-bold text-sp-ink mb-2">
        Frequently Asked Questions about {serviceTitle}
      </h3>
      <p className="text-xs text-sp-slate mb-6">
        Essential answers regarding eligibility, processing time, and documents.
      </p>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
    const isOpen = openIdx === idx;
    return <Card key={idx} hoverLift={false} className="overflow-hidden bg-white">
              <button
      onClick={() => setOpenIdx(isOpen ? null : idx)}
      className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-sp-bg/60 transition-colors"
      aria-expanded={isOpen}
    >
                <span className="font-semibold text-sp-ink text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <ChevronDown
      className={`w-4 h-4 text-sp-slate shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-sp-primary" : ""}`}
    />
              </button>
              {isOpen && <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-sp-slate leading-relaxed border-t border-sp-tint/40">
                  {faq.answer}
                </div>}
            </Card>;
  })}
      </div>
    </div>;
}
export {
  ServiceFaqAccordion
};
