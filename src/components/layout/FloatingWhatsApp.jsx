"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

function FloatingWhatsApp() {
  const whatsappUrl =
    "https://wa.me/918800028794?text=Hi%2C%20I%20am%20interested%20in%20your%20services.%20Please%20provide%20more%20details.";

  return (
    <>
      {/* Desktop Floating WhatsApp Widget */}
      <aside
        aria-label="WhatsApp quick contact"
        className="hidden md:flex fixed bottom-6 right-6 z-40 group items-center gap-2.5"
      >
        <div className="bg-sp-navy text-white text-xs font-medium px-3.5 py-2 rounded-sp-sm shadow-sp-lift border border-sp-sky/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Chat with a compliance advisor
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative flex items-center justify-center w-12 h-12 rounded-sp-btn bg-sp-navy hover:bg-sp-primary text-white border border-white/15 shadow-sp-lift transition-all duration-200 hover:-translate-y-0.5"
        >
          <div className="relative w-6 h-6">
            <Image
              src="/assets/images/whatsapp--v1-ed9c74b9.png"
              alt="WhatsApp"
              fill
              className="object-contain"
            />
          </div>
        </a>
      </aside>

      {/* Mobile Sticky Bottom Action Bar (Call, WhatsApp, Get Started) */}
      <aside
        aria-label="Mobile quick actions"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-sp-border-strong px-3 py-2.5 shadow-sp-lift"
      >
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          <a
            href="tel:+918800028794"
            className="inline-flex items-center justify-center gap-1.5 h-11 px-3 rounded-sp-btn border border-sp-border-strong bg-white text-sp-ink text-xs font-semibold whitespace-nowrap active:scale-[0.99]"
          >
            <Phone className="w-3.5 h-3.5 text-sp-primary shrink-0" />
            <span>Call</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-11 px-3 rounded-sp-btn border border-sp-border-strong bg-sp-bg text-sp-ink text-xs font-semibold whitespace-nowrap active:scale-[0.99]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-sp-primary shrink-0" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/user-register"
            className="inline-flex items-center justify-center gap-1 h-11 px-3 rounded-sp-btn bg-sp-navy text-white text-xs font-semibold whitespace-nowrap shadow-sp-btn-primary active:scale-[0.99]"
          >
            <span>Get Started</span>
            <span aria-hidden="true">+</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

export { FloatingWhatsApp };
