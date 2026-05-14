"use client";

import { memo } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { PROCESS_STEPS } from "@/app/lib/data";

export default memo(function ProcessSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="process" className="relative py-20 md:py-28">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1920px] px-6"
      >
        <div
          className={`reveal text-center text-xs sm:text-sm font-semibold tracking-wide text-accent uppercase mb-4 ${isVisible ? 'is-visible' : ''}`}
        >
          Quy trình
        </div>

        <h2
          className={`reveal text-center font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-0)] uppercase mb-16 ${isVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          Cách hoạt động
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((item, i) => (
            <div
              key={item.step}
              className={`reveal text-center ${isVisible ? 'is-visible' : ''}`}
              style={{
                transitionDelay: `${0.12 * i + 0.2}s`,
              }}
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent text-accent font-display text-xl font-bold">
                {item.step}
              </div>
              <h3 className="font-display text-lg font-semibold text-[var(--text-0)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-2)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
