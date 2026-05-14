"use client";

import { memo } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";

export default memo(function AboutSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="about" className="relative py-12 md:py-16 overflow-hidden bg-[var(--bg-0)]">
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16 relative z-10"
      >
        <div className="flex flex-col items-start text-left max-w-5xl">
          <div className={`reveal flex items-center gap-4 mb-10 ${isVisible ? 'is-visible' : ''}`}>
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
              Về HAT Studio
            </span>
          </div>

          <h2
            className={`reveal font-display text-[38px] sm:text-[52px] lg:text-[68px] font-bold text-[var(--text-0)] leading-[1.05] tracking-tight ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Thấu hiểu, đồng hành và <br className="hidden lg:block" />
            thiết kế trải nghiệm digital <br className="hidden lg:block" />
            không giới hạn.
          </h2>

          <p
            className={`reveal mt-10 sm:mt-12 max-w-2xl text-[18px] sm:text-[20px] text-[var(--text-1)] font-light leading-relaxed ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            Chúng tôi xây dựng cho mình Tư duy thiết kế, Triết lý sáng tạo và gửi gắm 
            Giá trị cho mỗi thương hiệu, mỗi doanh nghiệp cũng như cả cộng đồng. 
            Mỗi dự án là một câu chuyện độc bản được kể bằng ngôn ngữ của trải nghiệm và cảm xúc.
          </p>

          <div className={`reveal mt-16 flex items-center gap-6 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <div className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-2)]">
              Dẫn đầu xu hướng từ
            </div>
            <div className="text-[24px] font-display font-light text-[var(--text-0)]">2024</div>
          </div>
        </div>
      </div>
    </section>
  );
});
