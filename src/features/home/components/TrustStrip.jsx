import Image from "next/image";
import { Users, Star } from "lucide-react";
function TrustStrip() {
  return <section className="bg-white border-y border-sp-tint/80 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-between text-center md:text-left">
          {
    /* Google Rating */
  }
          <div className="flex items-center justify-center md:justify-start gap-3.5">
            <div className="relative w-10 h-10 shrink-0">
              <Image
    src="/assets/images/google-b815e39d.webp"
    alt="Google Rating"
    fill
    className="object-contain"
  />
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>4.9 / 5.0 Rating</span>
              </div>
              <p className="text-xs text-sp-slate">42,800+ Verified Reviews</p>
            </div>
          </div>

          {
    /* Happy Users Claim */
  }
          <div className="flex items-center justify-center md:justify-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sp-tint text-sp-primary flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold font-mono text-sp-ink">12,000+ Happy Users</div>
              <p className="text-xs text-sp-slate">Registered Entrepreneurs</p>
            </div>
          </div>

          {
    /* ISO Certification */
  }
          <div className="flex items-center justify-center md:justify-start gap-3.5">
            <div className="relative w-10 h-10 shrink-0">
              <Image
    src="/assets/images/certificate1-57e45752.png"
    alt="ISO Certification"
    fill
    className="object-contain"
  />
            </div>
            <div>
              <div className="text-sm font-bold text-sp-ink">ISO 9001:2015</div>
              <p className="text-xs text-sp-slate">Quality Management Assured</p>
            </div>
          </div>

          {
    /* Startup India */
  }
          <div className="flex items-center justify-center md:justify-start gap-3.5">
            <div className="relative w-10 h-10 shrink-0">
              <Image
    src="/assets/images/certificate2-fd4642f9.png"
    alt="Startup India"
    fill
    className="object-contain"
  />
            </div>
            <div>
              <div className="text-sm font-bold text-sp-ink">Startup India</div>
              <p className="text-xs text-sp-slate">DPIIT Recognized Advisory</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
export {
  TrustStrip
};
