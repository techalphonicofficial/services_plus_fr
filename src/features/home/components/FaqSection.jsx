"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

const HOMEPAGE_FAQS = [
  {
    question: "Maximize your results while minimizing constraints with our solutions",
    answer:
      "No matter what your business needs, we can connect you with a creative expert to make your business look and feel professional."
  },
  {
    question:
      "What documents are required to register a Private Limited Company in India?",
    answer:
      "To register a Private Limited Company, you typically require PAN cards, Aadhaar cards, identity proofs (Voter ID/Passport/Driving License), latest bank statements/utility bills for address proof of directors, and proof of registered office (electricity bill along with NOC from landlord)."
  },
  {
    question: "How long does GST registration take through Services Plus?",
    answer:
      "GST registration typically takes 3 to 7 working days once all verified documents are submitted to the GST portal and Aadhaar OTP authentication is successfully completed."
  },
  {
    question: "Why is Trademark Registration critical for my brand?",
    answer:
      "Trademark registration grants exclusive legal ownership over your brand name, logo, or slogan across India under the Trade Marks Act, 1999. It prevents competitors from infringing or copying your identity."
  },
  {
    question: "Can foreign nationals or NRIs incorporate an Indian Subsidiary?",
    answer:
      "Yes, 100% Foreign Direct Investment (FDI) is permitted in most sectors under the automatic route. At least one resident director who stayed in India for 120 days in the previous financial year is required."
  }
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOMEPAGE_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <section className="py-24 lg:py-32 bg-sp-bg">
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 4 Columns: Section Header & Direct Question Prompt */}
          <div className="lg:col-span-4 space-y-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sp-primary flex items-center justify-center lg:justify-start gap-1.5">
              <span className="text-sp-accent" aria-hidden="true">+</span>
              <span>Statutory Clarifications</span>
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-sp-ink tracking-[-0.02em] leading-[1.1] max-w-[16ch]">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-sp-slate leading-[1.6]">
              Answers to common questions regarding company setup, taxation, licenses, and legal compliance.
            </p>
            <div className="pt-2 flex justify-center lg:justify-start w-full">
              <Button
                href="https://wa.me/918800028794?text=Hi%2C%20I%20have%20a%20question%20regarding%20company%20registration%20or%20compliance."
                variant="outline"
                size="sm"
                external
              >
                <MessageCircle className="w-4 h-4 text-sp-primary" />
                <span>Ask an advisor on WhatsApp</span>
              </Button>
            </div>
          </div>

          {/* Right 8 Columns: Indexed FAQ Ledger */}
          <div className="lg:col-span-8 space-y-3.5">
            {HOMEPAGE_FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <Card
                  key={faq.question}
                  hoverLift={false}
                  className={`overflow-hidden bg-white transition-colors ${
                    isOpen ? "border-sp-primary" : "border-sp-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:bg-sp-bg/50"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-baseline gap-3.5 pr-2">
                      <span className="text-xs font-semibold text-sp-primary tabular-nums shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="font-semibold text-sp-ink text-base sm:text-[17px] leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-sp-slate shrink-0 mt-0.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-sp-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:pr-6 pb-6 pl-12 sm:pl-12 pt-1 text-base text-sp-slate leading-[1.6] border-t border-sp-border/60 max-w-[65ch]">
                      {faq.answer}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { FaqSection, HOMEPAGE_FAQS };
