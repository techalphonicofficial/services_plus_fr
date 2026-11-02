"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent
} from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { RegistrationMarks } from "../../../components/ui/Card";
import {
  ScaleDuotoneIcon,
  TimelineDuotoneIcon,
  BespokeDuotoneIcon,
  LicensingDuotoneIcon
} from "../../../components/ui/DuotoneIcons";

const REASONS = [
  {
    index: "01",
    title: "The Expansive Ability in Industry",
    description:
      "“Spanning 100+ services across incorporation, taxation, IP protection, and industrial licensing. Our multi-disciplinary team handles complex legal frameworks effortlessly.”",
    icon: ScaleDuotoneIcon,
    theme: {
      surface: "bg-[#EAE0CF] text-[#111844] border-[#C5B8A1]",
      heading: "text-[#111844]",
      body: "text-[#1E2642]",
      badge: "text-[#111844]",
      iconBox: "bg-white border-[#D5C9B4]",
      pill: "bg-white text-[#111844] border-[#D5C9B4] hover:bg-[#111844] hover:text-white",
      marks: "white"
    },
    links: [
      { label: "Private Limited Company", href: "/service/private-limited-company" },
      { label: "Trademark Registration", href: "/service/trademark-registration" },
      { label: "GST Registration", href: "/service/gst-registration" }
    ]
  },
  {
    index: "02",
    title: "Agile and Transparent Approach",
    description:
      "“No surprise fees or bureaucratic delays. Track application milestones with continuous progress notifications and dedicated advisor support.”",
    icon: TimelineDuotoneIcon,
    theme: {
      surface: "bg-[#111844] text-white border-[#4B5694]",
      heading: "text-white",
      body: "text-[#E2E8F5]",
      badge: "text-[#EAE0CF]",
      iconBox: "bg-white border-white/20",
      pill: "bg-[#1B2559] text-white border-[#4B5694]/70 hover:bg-[#EAE0CF] hover:text-[#111844]",
      marks: "navy"
    },
    links: [
      { label: "View Notifications", href: "/notification" },
      { label: "Online Payment", href: "/payment" },
      { label: "Client Login", href: "/user-login" }
    ]
  },
  {
    index: "03",
    title: "Tailored, Unique Solutions",
    description:
      "“Every business is distinct. Whether you are a solo founder starting a proprietorship or an international subsidiary scaling in India, we craft bespoke compliance plans.”",
    icon: BespokeDuotoneIcon,
    theme: {
      surface: "bg-[#3A447A] text-white border-[#7288AE]",
      heading: "text-white",
      body: "text-[#EDF1FA]",
      badge: "text-[#EAE0CF]",
      iconBox: "bg-white border-white/20",
      pill: "bg-[#111844] text-white border-[#7288AE]/60 hover:bg-[#EAE0CF] hover:text-[#111844]",
      marks: "navy"
    },
    links: [
      { label: "One Person Company", href: "/service/one-person-company" },
      { label: "Indian Subsidiary", href: "/service/indian-subsidiary" },
      { label: "USA Company Registration", href: "/service/usa-company-registration" }
    ]
  },
  {
    index: "04",
    title: "Proper Support and Assurance in Quality",
    description:
      "“Backed by prompt WhatsApp query resolution and accurate regulatory submissions verified by seasoned Chartered Accountants and Company Secretaries.”",
    icon: LicensingDuotoneIcon,
    theme: {
      surface: "bg-white text-[#111844] border-sp-border-strong",
      heading: "text-[#111844]",
      body: "text-[#2D3548]",
      badge: "text-[#4B5694]",
      iconBox: "bg-[#F8F6F1] border-sp-border-strong",
      pill: "bg-[#F8F6F1] text-[#111844] border-sp-border-strong hover:bg-[#111844] hover:text-white",
      marks: "white"
    },
    links: [
      { label: "Private Limited Compliance", href: "/service/private-limited-company-compliance" },
      { label: "LLP Annual Compliance", href: "/service/llp-compliance" },
      { label: "Income Tax Notice Response", href: "/service/income-tax-notice-response" }
    ]
  }
];

function StackedReasonCard({ reason, idx, total, progressIndex }) {
  const Icon = reason.icon;
  const { theme } = reason;

  // Compute relative position: rel = progressIndex - idx
  // When rel === 0: card is active on top of the deck
  // When rel < 0: card is waiting behind in the tilted stack (rel = -1, -2, -3)
  // When rel > 0: card has been scrolled past and peels off to the left/upward (rel = +1, +2, +3)
  const x = useTransform(progressIndex, (p) => {
    const rel = p - idx;
    if (rel <= -3) return 14;
    if (rel <= -2) {
      // Interpolate between -3 and -2
      const t = rel + 3;
      return 14 + t * (-22 - 14);
    }
    if (rel <= -1) {
      // Interpolate between -2 (-22px) and -1 (+24px)
      const t = rel + 2;
      return -22 + t * (24 - -22);
    }
    if (rel <= 0) {
      // Interpolate from background peek (+24px) to active front (0px)
      const t = rel + 1;
      return 24 * (1 - t);
    }
    if (rel <= 1) {
      // Peel off cleanly to the right (+740px) as user scrolls to next card
      return rel * 740;
    }
    return 740;
  });

  const y = useTransform(progressIndex, (p) => {
    const rel = p - idx;
    if (rel <= -2) return 16;
    if (rel <= -1) {
      const t = rel + 2;
      return 16 + t * (-12 - 16);
    }
    if (rel <= 0) {
      const t = rel + 1;
      return -12 * (1 - t);
    }
    if (rel <= 1) {
      return -rel * 65;
    }
    return -65;
  });

  const rotate = useTransform(progressIndex, (p) => {
    const rel = p - idx;
    if (rel <= -3) return 4;
    if (rel <= -2) {
      const t = rel + 3;
      return 4 + t * (-6 - 4);
    }
    if (rel <= -1) {
      const t = rel + 2;
      return -6 + t * (5.5 - -6);
    }
    if (rel <= 0) {
      // From +5.5deg tilted background card to -1.5deg active front card
      const t = rel + 1;
      return 5.5 + t * (-1.5 - 5.5);
    }
    if (rel <= 1) {
      // Tilt to +16deg as it peels away to the right
      return -1.5 + rel * 17.5;
    }
    return 16;
  });

  const scale = useTransform(progressIndex, (p) => {
    const rel = p - idx;
    if (rel < 0) {
      return Math.max(0.9, 1 + rel * 0.025);
    }
    if (rel <= 1) {
      return 1 - rel * 0.06;
    }
    return 0.94;
  });

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        zIndex: (total - idx) * 10
      }}
      className="absolute inset-0 will-change-transform"
    >
      <article
        className={`relative w-full h-full rounded-[22px] border p-7 sm:p-9 shadow-sp-lift flex flex-col justify-between overflow-hidden ${theme.surface}`}
      >
        <RegistrationMarks variant={theme.marks} />

        {/* Top Row: 5 Stars + Tabular Index & Duotone Icon */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span
                className={`font-display text-2xl sm:text-3xl font-bold tabular-nums leading-none ${theme.badge}`}
              >
                {reason.index}
              </span>
              <div className="flex items-center gap-1" aria-hidden="true">
                {[...Array(5)].map((_, sIdx) => (
                  <Star
                    key={sIdx}
                    className={`w-4 h-4 fill-current ${theme.badge}`}
                  />
                ))}
              </div>
            </div>

            <div
              className={`w-11 h-11 rounded-sp-md border flex items-center justify-center shrink-0 shadow-sp-xs ${theme.iconBox}`}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>

          {/* Editorial Title & Quote-style Body */}
          <h3
            className={`font-display text-2xl sm:text-[28px] font-bold tracking-tight leading-[1.15] mb-4 ${theme.heading}`}
          >
            {reason.title}
          </h3>

          <p
            className={`text-base sm:text-[17px] leading-[1.58] font-medium ${theme.body}`}
          >
            {reason.description}
          </p>
        </div>

        {/* Bottom Contextual Service Links */}
        <div className="pt-5 mt-6 border-t border-current/15">
          <div className="flex flex-wrap items-center gap-2">
            {reason.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group/rlink inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sp-sm border text-xs font-semibold transition-all duration-150 ${theme.pill}`}
              >
                <span aria-hidden="true">+</span>
                <span>{link.label}</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover/rlink:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

function WhyUsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.3
  });

  const progressIndex = useTransform(
    smoothProgress,
    [0, 1],
    [0, REASONS.length - 1]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      REASONS.length - 1,
      Math.max(0, Math.round(latest * (REASONS.length - 1)))
    );
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  const scrollToReasonCard = (targetIdx) => {
    const clamped = Math.min(REASONS.length - 1, Math.max(0, targetIdx));
    setActiveIndex(clamped);

    if (!trackRef.current || typeof window === "undefined") return;
    const rect = trackRef.current.getBoundingClientRect();
    const trackTop = rect.top + window.scrollY;
    const scrollableDistance = trackRef.current.offsetHeight - window.innerHeight;
    const targetY =
      trackTop + (clamped / Math.max(1, REASONS.length - 1)) * scrollableDistance;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, { duration: 0.9 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <section
      id="why-choose-us-section"
      ref={trackRef}
      className="relative bg-sp-bg border-y border-sp-border h-[290vh]"
    >
      <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden flex items-center bg-sp-bg">
        {/* Subtle Plus-Grid Backdrop */}
        <div
          className="absolute inset-0 sp-plus-grid pointer-events-none z-0"
          aria-hidden="true"
        />

        <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 5 Columns: Editorial Heading, Rating Summary & Prev/Next Controls */}
            <div className="lg:col-span-5 space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sp-primary flex items-center gap-1.5">
                <span className="text-sp-accent" aria-hidden="true">
                  +
                </span>
                <span>Why Businesses Choose Services Plus</span>
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.1rem] font-display font-bold text-sp-ink tracking-[-0.025em] leading-[1.08] max-w-[16ch]">
                Reasons Why Services Plus Is the Best Technology Partner
              </h2>

              <p className="text-sm sm:text-base text-sp-slate leading-[1.6] max-w-[46ch]">
                We combine legal domain mastery with structured digital processing so your enterprise stays compliant year-round.
              </p>

              {/* 5-Star Rating Row (matching reference design) */}
              <div className="flex items-center gap-2.5 pt-1">
                <div className="flex items-center gap-0.5 text-amber-500" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-sp-ink tabular-nums">
                  4.9 from 42,800+ clients
                </span>
              </div>

              {/* Previous / Next Controls + "1 of 4" Counter */}
              <div className="pt-3 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollToReasonCard(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    aria-label="Previous reason card"
                    className="w-11 h-11 rounded-sp-md bg-white border border-sp-border-strong flex items-center justify-center text-sp-ink hover:border-sp-primary hover:bg-[#EAE0CF]/40 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sp-xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToReasonCard(activeIndex + 1)}
                    disabled={activeIndex === REASONS.length - 1}
                    aria-label="Next reason card"
                    className="w-11 h-11 rounded-sp-md bg-white border border-sp-border-strong flex items-center justify-center text-sp-ink hover:border-sp-primary hover:bg-[#EAE0CF]/40 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sp-xs"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs sm:text-sm font-semibold text-sp-ink tabular-nums pl-1">
                  {activeIndex + 1} of {REASONS.length}
                </span>
              </div>
            </div>

            {/* Right 7 Columns: Tilted Stacked Card Deck */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <div className="relative w-full max-w-[460px] sm:max-w-[500px] h-[390px] sm:h-[430px]">
                {REASONS.map((reason, idx) => (
                  <StackedReasonCard
                    key={reason.index}
                    reason={reason}
                    idx={idx}
                    total={REASONS.length}
                    progressIndex={progressIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { WhyUsSection };
