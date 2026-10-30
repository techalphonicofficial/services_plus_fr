import Image from "next/image";
import { Button } from "../../../components/ui/Button";
import { Check } from "lucide-react";
function AboutSection() {
  return <section className="py-20 bg-white border-y border-sp-tint/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {
    /* Left Column: Image with Trust Badge */
  }
          <div className="relative">
            <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-sp-lift border border-sp-tint">
              <Image
    src="/assets/images/about-us_avif-8aa54286.png"
    alt="Services Plus Corporate Team"
    fill
    className="object-cover"
  />
            </div>
            {
    /* Overlay Experience Card */
  }
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-sp-navy text-white p-6 rounded-2xl shadow-2xl border border-sp-sky/20 max-w-xs">
              <div className="font-mono text-3xl font-extrabold text-sp-sky mb-1">
                13+ Years
              </div>
              <p className="text-xs text-sp-sky/90 leading-snug">
                Standing as a trusted business process management and technology solutions partner.
              </p>
            </div>
          </div>

          {
    /* Right Column: Copy and Stats */
  }
          <div className="space-y-6">
            <div className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-sp-primary bg-sp-tint px-3 py-1 rounded-full">
              About Services Plus
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sp-ink leading-tight">
              Revolutionize Industry with Expert Solutions
            </h2>
            <p className="text-sm sm:text-base text-sp-slate leading-relaxed">
              With thirteen-plus years&apos; standing as a business process management, digital innovation, and technology solutions partner, Services Plus aims to bring change in the lives of its clients in a number of industry domains through their solutions and services. Shape the future of your business with conviction and clarity.
            </p>

            <ul className="space-y-3 pt-2 text-sm text-sp-ink font-medium">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>Licensed corporate attorneys, chartered accountants &amp; CS on staff</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>Transparent fixed pricing with no hidden government filing charges</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>End-to-end digital lifecycle: from inception to annual audit compliance</span>
              </li>
            </ul>

            <div className="pt-4 flex items-center gap-4">
              <Button href="/about" size="md" showPlus>
                Discover Our Story
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Contact Advisory Team
              </Button>
            </div>
          </div>
        </div>

        {
    /* 4 Animated Metric Counters */
  }
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-sp-tint/80 text-center">
          <div className="p-4 rounded-2xl bg-sp-bg border border-sp-tint/60">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-sp-primary mb-1">
              42,800+
            </div>
            <div className="text-xs text-sp-slate font-medium">Clients Globally Served</div>
          </div>
          <div className="p-4 rounded-2xl bg-sp-bg border border-sp-tint/60">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-sp-primary mb-1">
              100+
            </div>
            <div className="text-xs text-sp-slate font-medium">Corporate Legal Services</div>
          </div>
          <div className="p-4 rounded-2xl bg-sp-bg border border-sp-tint/60">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-sp-primary mb-1">
              99.8%
            </div>
            <div className="text-xs text-sp-slate font-medium">On-Time Filing Rate</div>
          </div>
          <div className="p-4 rounded-2xl bg-sp-bg border border-sp-tint/60">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-sp-primary mb-1">
              Since 2017
            </div>
            <div className="text-xs text-sp-slate font-medium">Digital Innovation Hub</div>
          </div>
        </div>
      </div>
    </section>;
}
export {
  AboutSection
};
