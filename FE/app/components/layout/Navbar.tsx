"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/app/lib/data";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 80);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: hidden ? -112 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed left-0 top-0 z-50 w-screen"
    >
      <div className="flex h-[88px] w-screen items-center justify-between border-b border-[var(--surface-border)] bg-[rgba(252,251,248,0.85)] px-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl md:h-[100px] md:px-16">
        <a
          href="#top"
          className="font-(family-name:--font-display) text-2xl font-semibold text-[var(--text-0)] md:text-[28px]"
          aria-label="HAT Studio"
          suppressHydrationWarning
        >
          hat<span className="text-[var(--accent)]">&apos;</span>studio
        </a>

        <div className="flex items-center gap-7 md:gap-10">
          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--text-1)] lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[var(--accent)]"
                suppressHydrationWarning
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            className="grid size-[52px] place-items-center rounded-full bg-[var(--accent)] text-black shadow-[0_14px_35px_rgba(213,175,52,0.28)] transition duration-300 hover:scale-105 hover:bg-[var(--accent-soft)] md:size-[56px]"
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
