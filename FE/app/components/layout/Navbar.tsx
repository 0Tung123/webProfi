"use client";

import Image from "next/image";
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
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-transform duration-[450ms] ease-[var(--ease-standard)] ${hidden ? '-translate-y-[112px]' : 'translate-y-0'}`}
    >
      <div className="flex h-[88px] w-full items-center justify-between border-b border-surface bg-[rgba(252,251,248,0.85)] px-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl md:h-[100px] md:px-16">
        <a
          href="#top"
          className="relative h-10 w-40 md:h-12 md:w-48 transition-transform duration-300 hover:scale-105"
          aria-label="HAT Studio"
        >
          <Image
            src="/logo/ngang-slogan.png"
            alt="HAT Studio"
            fill
            className="object-contain object-left"
            priority
          />
        </a>

        <div className="flex items-center gap-7 md:gap-10">
          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--text-1)] lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-accent"
                suppressHydrationWarning
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="flex h-[44px] md:h-[50px] items-center gap-2 rounded-full bg-[var(--accent)] px-6 text-[11px] md:text-xs font-bold uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(213,175,52,0.3)] transition-all duration-300 hover:scale-105 hover:bg-[var(--accent-deep)]"
          >
            Contact
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
