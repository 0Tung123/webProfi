"use client";

import { memo } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { BENEFITS } from "@/app/lib/data";

export default memo(function BenefitsSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="benefits" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-[1920px] px-6 relative z-10">
        {/* Section Title */}
        <div
          ref={ref}
          className={`reveal text-center text-xs sm:text-sm font-semibold tracking-wide text-accent uppercase mb-4 ${isVisible ? 'is-visible' : ''}`}
        >
          Lợi ích
        </div>

        <h2
          className={`reveal text-center font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-0)] uppercase mb-16 ${isVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          Tại sao chọn HATMedia?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BENEFITS.map((benefit, i) => (
            <div
              key={benefit}
              className={`reveal flex items-start gap-4 rounded-xl border border-surface bg-surface p-6 ${isVisible ? 'is-visible' : ''}`}
              style={{
                transitionDelay: `${0.1 * i + 0.2}s`,
                transitionDuration: 'var(--dur-normal)',
                transitionTimingFunction: 'var(--ease-standard)'
              }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-15 text-accent text-lg font-bold">
                ✓
              </div>
              <p className="text-lg text-[var(--text-0)] font-light leading-relaxed">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
