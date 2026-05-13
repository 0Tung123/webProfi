"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.04,
      wheelMultiplier: 0.6,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.2,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    document.documentElement.classList.add("lenis", "lenis-smooth");

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    lenis.on("scroll", () => {
      if (!isScrolling) {
        isScrolling = true;
        document.documentElement.classList.add("lenis-scrolling");
        document.documentElement.classList.remove("lenis-stopped");
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.documentElement.classList.remove("lenis-scrolling");
        document.documentElement.classList.add("lenis-stopped");
      }, 50); // 50ms không có event scroll -> đã dừng cuộn
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
      document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-scrolling", "lenis-stopped");
      lenis.destroy();
    };
  }, []);

  return null;
}
