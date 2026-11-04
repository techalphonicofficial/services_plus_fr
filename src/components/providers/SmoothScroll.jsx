"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Phones and tablets keep the browser's native momentum scrolling: it runs on the
    // compositor thread and is always smoother than a JS-driven scroll on touch screens.
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) return;

    // lerp mode follows the wheel closely (no fixed-duration easing tail), which removes
    // the "page trails behind the wheel" lag of the old duration-based setup.
    const lenis = new Lenis({
      lerp: 0.12,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      infinite: false,
      autoRaf: false
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth anchor navigation
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest("a[href*='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const hashIndex = href.indexOf("#");
      const hash = href.slice(hashIndex);
      if (hash.length > 1) {
        let targetElement = null;
        try {
          targetElement = document.querySelector(hash);
        } catch {
          return;
        }
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: -80, duration: 1.0 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return <>{children}</>;
}
