"use client";

import { memo } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { TESTIMONIALS } from "@/app/lib/data";

export default memo(function TestimonialsSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <p
          className={`reveal text-center text-xs sm:text-sm font-semibold tracking-wide text-accent uppercase mb-4 ${isVisible ? 'is-visible' : ''}`}
        >
          Đánh giá
        </p>

        <h2
          className={`reveal text-center font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-0)] uppercase mb-16 ${isVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          Khách hàng nói gì?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={item.author}
              className={`reveal rounded-2xl border border-surface bg-surface p-8 ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.15 * i + 0.2}s` }}
            >
              <p className="text-lg text-[var(--text-1)] font-light leading-relaxed italic mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent-20 flex items-center justify-center text-accent font-bold text-sm">
                  {item.author[0]}
                </div>
                <div>
                  <p className="text-[var(--text-0)] font-medium text-sm">{item.author}</p>
                  <p className="text-[var(--text-2)] text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
