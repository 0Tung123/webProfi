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
      lerp: 0.05, // Chậm hơn một chút để tạo cảm giác sang trọng
      wheelMultiplier: 1.1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.5,
    });

    // Lenis chạy requestAnimationFrame RIÊNG, không phụ thuộc R3F
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Class toggling cho pointer-events performance hack (Removed as 3D Scene is gone)
    document.documentElement.classList.add("lenis", "lenis-smooth");


    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
    };
  }, []);

  return null;
}
