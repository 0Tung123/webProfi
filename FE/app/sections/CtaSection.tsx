"use client";

import { memo } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";

export default memo(function CtaSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16 text-center">
        <h2
          className={`reveal font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-0)] uppercase leading-tight mb-6 ${isVisible ? 'is-visible' : ''}`}
        >
          Bắt đầu dự án tiếp theo <br className="hidden sm:block" />
          cùng HATMedia
        </h2>

        <p
          className={`reveal text-[var(--text-2)] text-base sm:text-lg mb-10 max-w-xl mx-auto ${isVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          Hãy cho chúng tôi biết ý tưởng của bạn. Chúng tôi sẵn sàng biến nó thành hiện thực.
        </p>

        <div
          className={`reveal flex flex-col sm:flex-row items-center justify-center gap-4 ${isVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <a
            href="mailto:hello@hatmedia.dev"
            className="inline-flex items-center justify-center rounded-full bg-accent px-10 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all duration-300 hover:bg-accent-soft hover:scale-105 shadow-[0_14px_35px_rgba(213,175,52,0.25)]"
            suppressHydrationWarning
          >
            Liên hệ ngay
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full border border-surface bg-surface px-10 py-4 text-sm font-semibold uppercase tracking-widest text-[var(--text-0)] transition-all duration-300 hover:bg-black-5"
            suppressHydrationWarning
          >
            Xem dự án
          </a>
        </div>
      </div>
    </section>
  );
});
