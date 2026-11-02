"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { RegistrationMarks } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import {
  ConsultationDuotoneIcon,
  DocumentationDuotoneIcon,
  FilingDuotoneIcon,
  CertificateDuotoneIcon
} from "../../../components/ui/DuotoneIcons";

const STEPS = [
  {
    number: "01",
    title: "Consultation First.",
    tagline: "Tailored regulatory and jurisdiction assessment.",
    icon: ConsultationDuotoneIcon,
    theme: {
      surface: "bg-[#111844] text-white border-[#4B5694]",
      heading: "text-white",
      number: "text-[#EAE0CF]",
      tagline: "text-[#DCE4F2]",
      iconBox: "bg-white border-white/20",
      marks: "navy"
    },
    // Scroll keyframes: rises from bottom into center, then fans out to far-left
    yRange: [0.0, 0.18],
    xRange: [0.16, 0.34],
    finalX: -480,
    finalRotate: 1.5,
    zIndex: 40
  },
  {
    number: "02",
    title: "Agile Documentation.",
    tagline: "Precision dossier and statutory verification.",
    icon: DocumentationDuotoneIcon,
    theme: {
      surface: "bg-[#EAE0CF] text-[#111844] border-[#C5B8A1]",
      heading: "text-[#111844]",
      number: "text-[#111844]",
      tagline: "text-[#262E4D]",
      iconBox: "bg-white border-[#D5C9B4]",
      marks: "white"
    },
    // Rises from bottom into center, then fans out to inner-left
    yRange: [0.22, 0.42],
    xRange: [0.40, 0.56],
    finalX: -160,
    finalRotate: -1.5,
    zIndex: 30
  },
  {
    number: "03",
    title: "Government Filing.",
    tagline: "Direct portal submission and resolution.",
    icon: FilingDuotoneIcon,
    theme: {
      surface: "bg-white text-sp-ink border-sp-border-strong",
      heading: "text-sp-ink",
      number: "text-sp-primary",
      tagline: "text-[#3B4254]",
      iconBox: "bg-[#F8F6F1] border-sp-border",
      marks: "white"
    },
    // Rises from bottom into center, then fans out to inner-right
    yRange: [0.44, 0.64],
    xRange: [0.62, 0.76],
    finalX: 160,
    finalRotate: 1.5,
    zIndex: 20
  },
  {
    number: "04",
    title: "Lifelong Delivery.",
    tagline: "Official certifications and compliance continuity.",
    icon: CertificateDuotoneIcon,
    theme: {
      surface: "bg-[#3A447A] text-white border-[#7288AE]",
      heading: "text-white",
      number: "text-[#EAE0CF]",
      tagline: "text-[#E8ECF7]",
      iconBox: "bg-white border-white/20",
      marks: "navy"
    },
    // Rises from bottom into center, then fans out to far-right
    yRange: [0.64, 0.84],
    xRange: [0.80, 0.92],
    finalX: 480,
    finalRotate: -2,
    zIndex: 10
  }
];

function StackingProcessCard({ step, progress }) {
  const Icon = step.icon;
  const { theme } = step;

  const y = useTransform(progress, step.yRange, [680, 0]);
  const x = useTransform(progress, step.xRange, [0, step.finalX]);
  const rotate = useTransform(progress, step.xRange, [0, step.finalRotate]);

  return (
    <motion.div
      style={{
        y,
        x,
        rotate,
        zIndex: step.zIndex
      }}
      className="hidden lg:block absolute top-1/2 left-1/2 -mt-[220px] -ml-[152px] xl:-ml-[160px] w-[304px] xl:w-[320px] h-[440px] will-change-transform"
    >
      <article
        className={`relative w-full h-full rounded-sp-lg border p-6 xl:p-7 shadow-sp-lift flex flex-col justify-between overflow-hidden ${theme.surface}`}
      >
        <RegistrationMarks variant={theme.marks} />

        {/* Top: Step Index + Duotone Icon + Large Editorial Step Title */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-5">
            <span
              className={`font-display text-4xl xl:text-5xl font-bold tabular-nums leading-none tracking-tighter ${theme.number}`}
            >
              {step.number}
            </span>
            <div
              className={`w-11 h-11 rounded-sp-md border flex items-center justify-center shrink-0 shadow-sp-xs ${theme.iconBox}`}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>

          <h3
            className={`font-display text-2xl xl:text-[28px] font-bold leading-[1.12] tracking-tight ${theme.heading}`}
          >
            {step.title}
          </h3>
        </div>

        {/* Bottom: Only few words */}
        <div className="pt-4 border-t border-current/10">
          <p className={`text-sm xl:text-base font-medium leading-snug ${theme.tagline}`}>
            {step.tagline}
          </p>
        </div>
      </article>
    </motion.div>
  );
}

function ProcessSection() {
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.3
  });

  // Gently scale the background heading as the cards rise and fan across it
  const headerScale = useTransform(smoothProgress, [0, 0.28], [1, 0.94]);

  return (
    <section
      id="agile-process-section"
      ref={trackRef}
      className="relative bg-sp-bg border-t border-sp-border lg:h-[340vh]"
    >
      {/* Desktop Sticky Scroll Stage (Huge Inc. "It matters how we show up." stacking & horizontal fan-out) */}
      <div className="hidden lg:flex sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden items-center justify-center bg-sp-bg">
        {/* Plus-grid backdrop */}
        <div
          className="absolute inset-0 sp-plus-grid pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Pinned Editorial Header in Center Backdrop */}
        <motion.div
          style={{ scale: headerScale }}
          className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 relative z-0 pointer-events-auto"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sp-primary inline-flex items-center gap-1.5">
              <span className="text-sp-accent" aria-hidden="true">
                +
              </span>
              <span>Four-Stage Filing Methodology</span>
            </p>

            <h2 className="text-4xl xl:text-[3.25rem] font-display font-bold text-sp-ink tracking-[-0.025em] leading-[1.06]">
              How Services Plus Delivers Excellence with Agile Process
            </h2>

            <div className="pt-1">
              <Button href="/user-register" size="md" showPlus>
                Start Step 01 Consultation
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stacking Portrait Cards Layer */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="relative w-full h-full pointer-events-auto">
            {STEPS.map((step) => (
              <StackingProcessCard
                key={step.number}
                step={step}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Fallback (< lg) */}
      <div className="lg:hidden py-20 px-4 sm:px-6 space-y-8">
        <div className="space-y-4 text-center sm:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sp-primary flex items-center justify-center sm:justify-start gap-1.5">
            <span className="text-sp-accent" aria-hidden="true">
              +
            </span>
            <span>Four-Stage Filing Methodology</span>
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-sp-ink tracking-[-0.02em] leading-[1.1]">
            How Services Plus Delivers Excellence with Agile Process
          </h2>
          <div className="pt-1">
            <Button href="/user-register" size="md" showPlus>
              Start Step 01 Consultation
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const { theme } = step;
            return (
              <article
                key={step.number}
                className={`relative rounded-sp-lg border p-6 shadow-sp-soft flex flex-col justify-between min-h-[260px] ${theme.surface}`}
              >
                <RegistrationMarks variant={theme.marks} />
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span
                      className={`font-display text-3xl font-bold tabular-nums leading-none ${theme.number}`}
                    >
                      {step.number}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-sp-md border flex items-center justify-center shrink-0 ${theme.iconBox}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3
                    className={`font-display text-2xl font-bold leading-tight mb-2 ${theme.heading}`}
                  >
                    {step.title}
                  </h3>
                </div>
                <div className="pt-3 border-t border-current/10">
                  <p className={`text-sm font-medium leading-snug ${theme.tagline}`}>
                    {step.tagline}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { ProcessSection };
