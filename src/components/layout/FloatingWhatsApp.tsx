'use client';

import React from 'react';
import Image from 'next/image';

export function FloatingWhatsApp() {
  const whatsappUrl =
    'https://wa.me/918800028794?text=Hi%2C%20I%20am%20interested%20in%20your%20services.%20Please%20provide%20more%20details.';

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2"
    >
      <div className="hidden sm:block bg-sp-navy/95 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-sp-sky/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with a Legal &amp; Tax Expert
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-sp-lift hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-emerald-400/20"
      >
        <div className="relative w-8 h-8">
          <Image
            src="/assets/images/whatsapp--v1-ed9c74b9.png"
            alt="WhatsApp"
            fill
            className="object-contain"
          />
        </div>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
      </a>
    </aside>
  );
}
