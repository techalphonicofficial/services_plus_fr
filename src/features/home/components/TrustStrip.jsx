import Image from "next/image";
import { Star } from "lucide-react";

function TrustStrip() {
  return (
    <section
      aria-label="Verified ratings and accreditations"
      className="bg-white border-y border-sp-border py-5 relative"
    >
      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Google Rating */}
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 shrink-0 grayscale contrast-125 opacity-80">
              <Image
                src="/assets/images/google-b815e39d.webp"
                alt="Google"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-sp-ink tabular-nums">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0 self-center" />
                4.9 / 5.0
              </span>
              <span className="text-xs text-sp-slate tabular-nums">
                Rated by 42,800+ customers globally
              </span>
            </div>
          </div>

          <span className="hidden lg:inline text-sp-primary/30" aria-hidden="true">
            +
          </span>

          {/* 12k+ Happy Users */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-sp-ink tabular-nums">
              12,000+ Happy Users
            </span>
            <span className="text-xs text-sp-slate">
              Registered Indian &amp; global businesses
            </span>
          </div>

          <span className="hidden lg:inline text-sp-primary/30" aria-hidden="true">
            +
          </span>

          {/* Existing Certificates in Monochrome */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 shrink-0 grayscale contrast-125 opacity-85">
                <Image
                  src="/assets/images/certificate1-57e45752.png"
                  alt="Certificate 1"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-8 h-8 shrink-0 grayscale contrast-125 opacity-85">
                <Image
                  src="/assets/images/certificate2-fd4642f9.png"
                  alt="Certificate 2"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-sp-slate font-medium">
                Verified Corporate Registration Certificates
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { TrustStrip };
