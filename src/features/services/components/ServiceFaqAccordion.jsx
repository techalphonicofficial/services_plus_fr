"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "../../../components/ui/Card";

function ServiceFaqAccordion({ faqs, serviceTitle }) {
  const [openIdx, setOpenIdx] = useState(0);
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="pt-6 scroll-mt-36">
      <div className="mb-6">
        <p className="text-xs font-semibold text-sp-primary mb-1.5 flex items-center gap-1.5">
          <span aria-hidden="true">+</span>
          <span>Statutory Questions &amp; Clarifications</span>
        </p>
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-sp-ink tracking-[-0.02em]">
          Frequently Asked Questions about {serviceTitle}
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <Card
              key={idx}
              hoverLift={false}
              className={`overflow-hidden bg-white ${
                isOpen ? "border-sp-primary" : "border-sp-border"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-sp-bg/50 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-baseline gap-3 pr-2">
                  <span className="text-xs font-semibold text-sp-primary tabular-nums shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="font-semibold text-sp-ink text-base leading-snug">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-sp-slate shrink-0 mt-1 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-sp-primary" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pl-11 pt-2 text-sm sm:text-base text-sp-slate leading-[1.6] border-t border-sp-border/60 max-w-[65ch]">
                  {faq.answer}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export { ServiceFaqAccordion };
