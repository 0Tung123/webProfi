"use client";

import { memo } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { HERO_CARDS as cards } from "@/app/lib/data";

export default memo(function HeroSection() {
  const { ref: heroRef, isVisible } = useIntersectionObserver({
    once: true,
    threshold: 0,
  });

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative w-full overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32 flex items-center"
    >
      <div className="mx-auto flex w-full max-w-[1920px] flex-col lg:flex-row items-center justify-between px-6 lg:px-12 xl:px-16 relative z-10">

        {/* Left: Text Content */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
          {/* Tagline */}
          <div
            className={`reveal flex items-center gap-4 mb-6 ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="h-[1px] w-12 bg-[var(--accent)]" />
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[var(--accent)] uppercase">
              DESIGN • PHOTO • CODE
            </p>
          </div>

          {/* Heading */}
          <h1
            className={`reveal font-display text-[48px] sm:text-[64px] lg:text-[80px] xl:text-[96px] font-bold leading-[1.05] tracking-tight text-[var(--text-0)] uppercase ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            ĐỊNH HÌNH <br />
            <span className="font-serif italic font-medium text-[var(--accent)] lowercase block -mt-2 sm:-mt-3">
              nghệ thuật
            </span>
            <span className="-mt-2 sm:-mt-3 block">NGUYÊN BẢN</span>
          </h1>

          {/* Paragraph */}
          <p
            className={`reveal mt-6 max-w-2xl text-[15px] sm:text-[18px] text-[var(--text-1)] font-light leading-relaxed ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            Tại <strong className="font-semibold text-[var(--text-0)]">HATMedia</strong>, chúng tôi xem mỗi dự án như một bản phác thảo đầy tinh tế — nơi ánh sáng của nghệ thuật gặp gỡ sự chuẩn xác của công nghệ.
          </p>

          {/* CTA Button */}
          <div
            className={`reveal mt-10 ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.4s' }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-10 py-5 text-sm font-semibold uppercase tracking-widest text-[var(--text-0)] transition-all hover:bg-black-5 hover:border-black-10 backdrop-blur-sm"
              suppressHydrationWarning
            >
              KHÁM PHÁ SỰ TINH TẾ
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Right: Static/Floating Composition */}
        <div className="w-full lg:w-[50%] mt-12 lg:mt-0 relative flex items-center justify-center min-h-[350px] sm:min-h-[450px] lg:min-h-[550px]">

          {/* Center Large Image (Monitor/Design) */}
          <div
            className={`reveal relative z-10 w-full max-w-[650px] aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl bg-[var(--surface)] ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <Image
              src={cards[0].src}
              alt={cards[0].alt}
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 650px"
              priority
            />
          </div>

          {/* Top Right Small Image (Team/Photo) */}
          <div
            className={`reveal absolute z-20 -right-2 top-0 sm:right-0 sm:top-10 lg:-right-8 lg:top-16 w-[40%] max-w-[280px] aspect-[4/3] overflow-hidden rounded-xl border-2 border-[var(--accent)] shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-[var(--surface)] float-anim ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.5s' }}
          >
            <Image
              src={cards[2].src}
              alt={cards[2].alt}
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 768px) 40vw, 280px"
              loading="lazy"
            />
          </div>

          {/* Bottom Left Small Image (Interior/Code) */}
          <div
            className={`reveal absolute z-20 -left-2 bottom-0 sm:left-4 sm:bottom-12 lg:-left-12 lg:bottom-24 w-[40%] max-w-[280px] aspect-[4/3] overflow-hidden rounded-xl border-2 border-[var(--accent)] shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-[var(--surface)] float-anim ${isVisible ? 'is-visible' : ''}`}
            style={{ 
              transitionDelay: '0.6s',
              animationDelay: '1.6s' 
            }}
          >
            <Image
              src={cards[1].src}
              alt={cards[1].alt}
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 768px) 40vw, 280px"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
