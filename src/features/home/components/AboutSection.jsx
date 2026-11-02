"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { RegistrationMarks } from "../../../components/ui/Card";

function AnimatedCounter({ target, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    let startTime = null;
    const duration = 550;
    const startValue = Math.floor(target * 0.65);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(startValue + (target - startValue) * eased));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, prefersReducedMotion, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

function AboutSection() {
  return (
    <section className="py-24 lg:py-36 bg-white border-y border-sp-border relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8">
        {/* Split Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left 5 Columns: Architectural Image Frame with Marked Photo Slot */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sp-md border border-sp-border-strong bg-sp-bg p-3 shadow-sp-soft">
              <RegistrationMarks />
              <div className="relative w-full h-[360px] sm:h-[400px] rounded-sp-sm overflow-hidden bg-white border border-sp-border">
                <Image
                  src="/assets/images/about-us_avif-8aa54286.png"
                  alt="Services Plus Corporate Advisory Desk"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Marked Slot Metadata Bar (flagged in /docs/NOTES.md) */}
              <div className="mt-3 px-2 py-1.5 flex items-center justify-between text-xs text-sp-slate">
                <span className="font-medium text-sp-ink">
                  Noida Sector-18 Head Office Desk
                </span>
                <span className="tabular-nums text-sp-primary font-semibold">
                  13+ Years Standing
                </span>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Copy & Key Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sp-primary flex items-center gap-1.5">
              <span className="text-sp-accent" aria-hidden="true">+</span>
              <span>About Services Plus</span>
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-display font-semibold text-sp-ink tracking-[-0.02em] leading-[1.1] max-w-[20ch]">
              Revolutionize Industry with Expert Solutions
            </h2>

            <p className="text-base sm:text-[17px] text-sp-slate leading-[1.6] max-w-[62ch]">
              With thirteen-plus years&apos; standing as a business process management, digital innovation, and technology solutions partner, Services Plus aims to bring change in the lives of its clients in a number of industry domains through their solutions and services. Shape the future of your business with conviction and clarity.
            </p>

            <ul className="space-y-3 pt-2 text-base text-sp-ink">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-sp-sm bg-sp-tint/35 border border-sp-accent/25 text-sp-navy flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>
                  Corporate attorneys, chartered accountants, and company secretaries handling end-to-end documentation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-sp-sm bg-sp-tint/35 border border-sp-accent/25 text-sp-navy flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>
                  Structured filing workflows across MCA, IP India, GST portal, and FSSAI FoSCoS
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-sp-sm bg-sp-tint/35 border border-sp-accent/25 text-sp-navy flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>
                  Dedicated lifecycle support from initial incorporation to annual statutory compliance
                </span>
              </li>
            </ul>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Button href="/about" size="md" showPlus>
                About Our Practice
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Contact Advisory Desk
              </Button>
            </div>
          </div>
        </div>

        {/* Large Stat Ledger Row (Tabular Numerals, Real Site Metrics Only) */}
        <div className="mt-20 pt-12 border-t border-sp-border grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="pl-4 border-l-2 border-sp-primary">
            <div className="text-3xl sm:text-4xl font-display font-bold text-sp-ink tabular-nums">
              <AnimatedCounter target={42800} suffix="+" />
            </div>
            <p className="text-sm text-sp-slate mt-1">
              Customers globally rated at 4.9/5
            </p>
          </div>

          <div className="pl-4 border-l-2 border-sp-border-strong">
            <div className="text-3xl sm:text-4xl font-display font-bold text-sp-ink tabular-nums">
              <AnimatedCounter target={12000} suffix="+" />
            </div>
            <p className="text-sm text-sp-slate mt-1">
              Happy business users across India
            </p>
          </div>

          <div className="pl-4 border-l-2 border-sp-border-strong">
            <div className="text-3xl sm:text-4xl font-display font-bold text-sp-ink tabular-nums">
              <AnimatedCounter target={100} suffix="+" />
            </div>
            <p className="text-sm text-sp-slate mt-1">
              Registration, tax &amp; licensing services
            </p>
          </div>

          <div className="pl-4 border-l-2 border-sp-border-strong">
            <div className="text-3xl sm:text-4xl font-display font-bold text-sp-ink tabular-nums">
              Since 2017
            </div>
            <p className="text-sm text-sp-slate mt-1">
              13+ years of domain standing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { AboutSection };
