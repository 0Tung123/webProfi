"use client";

import { memo } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { HERO_CARDS as cards } from "@/app/lib/data";

export default memo(function HeroSection() {
  const { ref: heroRef, isVisible } = useIntersectionObserver({
    once: true,
    threshold: 0.1,
  });

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-[90svh] w-full overflow-hidden pt-28 pb-12 flex items-center"
    >
      <div className="mx-auto flex w-full max-w-[1920px] flex-col lg:flex-row items-center justify-between px-6 lg:px-12 xl:px-16 relative z-10">

        {/* Left: Text Content */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
          {/* Tagline */}
          <div
            className={`flex items-center gap-4 mb-6 transition-all duration-[var(--dur-normal)] ease-[var(--ease-standard)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="h-[1px] w-12 bg-[var(--accent)]" />
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[var(--accent)] uppercase">
              DESIGN • PHOTO • CODE
            </p>
          </div>

          {/* Heading */}
          <h1
            className={`font-display text-[48px] sm:text-[64px] lg:text-[80px] xl:text-[96px] font-bold leading-[1.05] tracking-tight text-[var(--text-0)] uppercase transition-all duration-[var(--dur-normal)] ease-[var(--ease-standard)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
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
            className={`mt-6 max-w-2xl text-[15px] sm:text-[18px] text-[var(--text-1)] font-light leading-relaxed transition-all duration-[var(--dur-normal)] ease-[var(--ease-standard)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
            style={{ transitionDelay: '0.3s' }}
          >
            Tại <strong className="font-semibold text-[var(--text-0)]">HATMedia</strong>, chúng tôi xem mỗi dự án như một bản phác thảo đầy tinh tế — nơi ánh sáng của nghệ thuật gặp gỡ sự chuẩn xác của công nghệ.
          </p>

          {/* CTA Button */}
          <div
            className={`mt-10 transition-all duration-[var(--dur-normal)] ease-[var(--ease-standard)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
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
        <div className="w-full lg:w-[50%] h-[400px] lg:h-[550px] mt-16 lg:mt-0 relative flex items-center justify-center">

          {/* Concentric Dashed Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full border border-dashed border-[var(--surface-border)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full border border-dashed border-[var(--surface-border)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full border border-dashed border-[rgba(0,0,0,0.03)]" />

          {/* Center Large Image (Monitor/Design) */}
          <div
            className={`relative z-10 h-[300px] w-[90%] sm:h-[400px] sm:w-[600px] lg:h-[450px] lg:w-[650px] overflow-hidden rounded-2xl shadow-2xl bg-[var(--surface)] transition-all duration-[var(--dur-slow)] ease-[var(--ease-standard)] ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <Image
              src={cards[0].src}
              alt={cards[0].alt}
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 600px, 650px"
              priority
            />
          </div>

          {/* Top Right Small Image (Team/Photo) */}
          <div
            className="absolute z-20 -right-4 top-10 sm:right-0 sm:top-16 lg:-right-10 lg:top-24 h-[120px] w-[180px] sm:h-[180px] sm:w-[280px] overflow-hidden rounded-xl border-2 border-[var(--accent)] shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-[var(--surface)] float-anim"
          >
            <Image
              src={cards[2].src}
              alt={cards[2].alt}
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 768px) 180px, 280px"
              loading="lazy"
            />
          </div>

          {/* Bottom Left Small Image (Interior/Code) */}
          <div
            className="absolute z-20 -left-4 bottom-10 sm:left-4 sm:bottom-20 lg:-left-16 lg:bottom-32 h-[120px] w-[180px] sm:h-[180px] sm:w-[280px] overflow-hidden rounded-xl border-2 border-[var(--accent)] shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-[var(--surface)] float-anim"
            style={{ animationDelay: '1s' }}
          >
            <Image
              src={cards[1].src}
              alt={cards[1].alt}
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 768px) 180px, 280px"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
});
