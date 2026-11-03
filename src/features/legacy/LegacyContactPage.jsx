import React from "react";
import Link from "next/link";
import { Card } from "../../components/ui/Card";
import { StickyEnquiryCard } from "../../features/enquiry/components/StickyEnquiryCard";
import { MapPin, Mail, ChevronRight, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us | Services Plus",
  description:
    "Get in touch with Services Plus corporate legal and tax advisory desks in Noida. Helplines: +91 88000 28794, +91 9899184918.",
  alternates: {
    canonical: "https://www.servicesplus.in/contact"
  }
};

export default function ContactPage() {
  return (
    <div className="bg-sp-bg min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="border-b border-sp-border bg-white py-3 px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="w-full flex items-center gap-1.5 text-xs text-sp-slate">
          <Link href="/" className="hover:text-sp-primary">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sp-slate/50 shrink-0" />
          <span className="text-sp-ink font-semibold">Contact Us</span>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-sp-border py-12 lg:py-16 relative sp-plus-grid">
        <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 relative z-10">
          <p className="text-xs font-semibold text-sp-primary mb-2 flex items-center gap-1.5">
            <span aria-hidden="true">+</span>
            <span>Corporate Advisory Desks</span>
          </p>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-sp-ink tracking-[-0.02em] mb-4">
            Contact Us
          </h1>
          <p className="text-base sm:text-[17px] text-sp-slate max-w-[60ch] leading-[1.6]">
            Reach out by phone, email, WhatsApp, or schedule an appointment at our Noida offices.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Both Real Offices & Helplines */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Card hoverLift={false} className="p-6 bg-white">
                <div className="flex items-center justify-between text-xs font-semibold text-sp-primary mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-sp-primary" />
                    Head Office (India)
                  </span>
                  <span className="tabular-nums">01</span>
                </div>
                <p className="text-sm text-sp-slate leading-relaxed mb-4">
                  Office No-418, 4th Floor, Ocean Plaza, Sector-18, Noida, Gautam Buddha Nagar, Uttar Pradesh — 201301
                </p>
                <div className="text-xs text-sp-ink font-medium pt-3 border-t border-sp-border">
                  Sector 18, Noida
                </div>
              </Card>

              <Card hoverLift={false} className="p-6 bg-white">
                <div className="flex items-center justify-between text-xs font-semibold text-sp-primary mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-sp-primary" />
                    Alphonic India Pvt. Ltd.
                  </span>
                  <span className="tabular-nums">02</span>
                </div>
                <p className="text-sm text-sp-slate leading-relaxed mb-4">
                  Plot No C-203, C Block Rd, Block C, Sector 63, Noida, Uttar Pradesh — 201301
                </p>
                <div className="text-xs text-sp-ink font-medium pt-3 border-t border-sp-border">
                  Sector 63, Noida
                </div>
              </Card>
            </div>

            {/* Helpline Numbers */}
            <Card hoverLift={false} className="p-6 sm:p-8 bg-white">
              <h2 className="text-xl font-display font-semibold text-sp-ink mb-5">
                Get In Touch
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-sp-slate">
                    Sales &amp; New Registrations
                  </p>
                  <a
                    href="tel:+918800028794"
                    className="text-lg font-bold text-sp-primary hover:underline tabular-nums block"
                  >
                    (+91) 88000 28794
                  </a>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-sp-slate">
                    Support &amp; Existing Filings
                  </p>
                  <a
                    href="tel:+919899184918"
                    className="text-lg font-bold text-sp-primary hover:underline tabular-nums block"
                  >
                    (+91) 9899184918
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-sp-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-sp-slate">
                  <Mail className="w-4 h-4 text-sp-primary shrink-0" />
                  <span>
                    Email:{" "}
                    <a
                      href="mailto:info@servicesplus.in"
                      className="text-sp-primary font-semibold hover:underline"
                    >
                      info@servicesplus.in
                    </a>{" "}
                    /{" "}
                    <a
                      href="mailto:operations@servicesplus.in"
                      className="text-sp-primary font-semibold hover:underline"
                    >
                      operations@servicesplus.in
                    </a>
                  </span>
                </div>

                <a
                  href="https://wa.me/918800028794"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-sp-btn bg-sp-bg hover:bg-sp-tint/50 text-sp-ink border border-sp-border-strong text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-sp-primary" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </Card>
          </div>

          {/* Right 5 Columns: Enquiry Card */}
          <div className="lg:col-span-5">
            <StickyEnquiryCard serviceName="General Consultation" />
          </div>
        </div>
      </div>
    </div>
  );
}
