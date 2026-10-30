"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "../../../components/ui/Card";
const HOMEPAGE_FAQS = [
  {
    question: "Maximize your results while minimizing constraints with our solutions",
    answer: "No matter what your business needs, we can connect you with a creative expert to make your business look and feel professional."
  },
  {
    question: "What documents are required to register a Private Limited Company in India?",
    answer: "To register a Private Limited Company, you typically require PAN cards, Aadhaar cards, identity proofs (Voter ID/Passport/Driving License), latest bank statements/utility bills for address proof of directors, and proof of registered office (electricity bill along with NOC from landlord)."
  },
  {
    question: "How long does GST registration take through Services Plus?",
    answer: "GST registration typically takes 3 to 7 working days once all verified documents are submitted to the GST portal and Aadhaar OTP authentication is successfully completed."
  },
  {
    question: "Why is Trademark Registration critical for my brand?",
    answer: "Trademark registration grants exclusive legal ownership over your brand name, logo, or slogan across India under the Trade Marks Act, 1999. It prevents competitors from infringing or copying your identity."
  },
  {
    question: "Can foreign nationals or NRIs incorporate an Indian Subsidiary?",
    answer: "Yes, 100% Foreign Direct Investment (FDI) is permitted in most sectors under the automatic route. At least one resident director who stayed in India for 182 days in the previous financial year is required."
  }
];
function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
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
  return <section className="py-20 bg-sp-bg">
      {
    /* Inject FAQPage Schema */
  }
      <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
  />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-sp-primary bg-sp-tint px-3 py-1 rounded-full mb-3">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sp-ink mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-sp-slate">
            Answers to common questions regarding company setup, taxation, licenses, and legal compliance.
          </p>
        </div>

        <div className="space-y-4">
          {HOMEPAGE_FAQS.map((faq, idx) => {
    const isOpen = openIndex === idx;
    return <Card
      key={faq.question}
      hoverLift={false}
      className="overflow-hidden bg-white border border-sp-tint"
    >
                <button
      onClick={() => setOpenIndex(isOpen ? null : idx)}
      className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-sp-bg/60"
      aria-expanded={isOpen}
    >
                  <span className="font-semibold text-sp-ink text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
      className={`w-5 h-5 text-sp-slate shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-sp-primary" : ""}`}
    />
                </button>
                {isOpen && <div className="px-6 pb-6 pt-1 text-sm text-sp-slate leading-relaxed border-t border-sp-tint/40">
                    {faq.answer}
                  </div>}
              </Card>;
  })}
        </div>
      </div>
    </section>;
}
export {
  FaqSection
};
