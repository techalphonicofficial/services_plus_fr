"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let observer = null;

    const scanAndObserve = () => {
      const selector = [
        ".home-page > *",
        "main > section",
        "main > div > section",
        "main > article",
        ".svc-hero",
        ".svc-body",
        ".svc-bottom > *",
        ".loans-hero",
        ".loans-body",
        ".ta-cb",
        ".stat-ledger-band",
        "footer"
      ].join(", ");

      const all = Array.from(document.querySelectorAll(selector));
      if (!all.length) return;

      const ignoredContainers = ["home-page", "ta-home", "ta-svc", "view"];

      // Keep only top-level section containers (ignore nested children of matched sections)
      const targets = all.filter((el) => {
        if (el.offsetHeight < 40) return false;

        let parent = el.parentElement;
        while (parent && parent !== document.body) {
          if (all.includes(parent) && !ignoredContainers.some((c) => parent.classList.contains(c))) {
            return false;
          }
          parent = parent.parentElement;
        }
        return true;
      });

      if (!observer) {
        const isMobile = window.innerWidth <= 768;
        const bottomMargin = isMobile ? "-45px" : "-70px";

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
                entry.target.classList.add("is-revealed");
                observer.unobserve(entry.target);
              }
            });
          },
          {
            rootMargin: `0px 0px ${bottomMargin} 0px`,
            threshold: 0.04
          }
        );
      }

      // Only reveal elements strictly within the upper half of the viewport on initial load
      const initialCutoff = Math.min(window.innerHeight * 0.55, 520);

      targets.forEach((el) => {
        if (el.classList.contains("is-revealed")) return;

        el.classList.add("scroll-reveal");
        const rect = el.getBoundingClientRect();

        // Elements already above or within the initial upper fold reveal immediately
        if (rect.top <= initialCutoff) {
          el.classList.add("is-revealed");
        } else {
          observer.observe(el);
        }
      });
    };

    scanAndObserve();
    const rafId = requestAnimationFrame(scanAndObserve);
    const timerId = setTimeout(scanAndObserve, 150);

    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(scanAndObserve, 150);
    };
    window.addEventListener("resize", handleResize);

    let mutationObs = null;
    const mainEl = document.querySelector("main");
    if (mainEl && typeof MutationObserver !== "undefined") {
      mutationObs = new MutationObserver(() => {
        scanAndObserve();
      });
      mutationObs.observe(mainEl, { childList: true, subtree: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
      if (mutationObs) mutationObs.disconnect();
    };
  }, [pathname]);

  return null;
}
