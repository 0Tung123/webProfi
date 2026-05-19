"use client";

import { memo } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { BENEFITS, BENEFITS_CONTENT, ABOUT_CONTENT } from "@/app/lib/data";

export default memo(function BenefitsSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="benefits" className="relative py-24 md:py-48 overflow-hidden bg-[var(--bg-1)]">
      
      {/* Decorative Large Background Quote */}
      <div className="absolute top-0 left-10 text-[400px] font-serif text-black/[0.03] select-none pointer-events-none leading-none">
        “
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16 relative z-10">
        <div ref={ref} className="max-w-6xl">
          
          <div className="flex flex-col md:flex-row gap-16 items-start">
            
            {/* Left Accent Column */}
            <div className={`reveal hidden md:flex flex-col gap-8 pt-4 ${isVisible ? 'is-visible' : ''}`}>
              <div className="w-px h-32 bg-[var(--accent)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] vertical-text text-[var(--accent)]">
                {BENEFITS_CONTENT.philosophy}
              </span>
            </div>

            {/* Main Statement */}
            <div className="flex-1">
              <h2 
                className={`reveal font-serif italic text-[22px] sm:text-[38px] md:text-[50px] lg:text-[64px] xl:text-[72px] font-medium text-[var(--text-0)] leading-[1.3] tracking-tight ${isVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: '0.1s' }}
              >
                "{BENEFITS_CONTENT.statement}"
              </h2>
              
              <div className={`reveal mt-8 md:mt-16 flex items-center gap-6 md:gap-10 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {BENEFITS_CONTENT.founder.initial}
                </div>
                <div className="flex flex-col">
                  <span className="text-[18px] md:text-[20px] font-bold text-[var(--text-0)]">{BENEFITS_CONTENT.founder.name}</span>
                  <span className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">{BENEFITS_CONTENT.founder.role}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modern Watermark - Restored without rising animation */}
      <div className="absolute bottom-8 lg:bottom-12 right-6 lg:right-12 flex flex-col items-end opacity-[0.02] select-none pointer-events-none">
        <span className="text-[42px] sm:text-[80px] lg:text-[180px] font-display font-black leading-none uppercase text-black">{BENEFITS_CONTENT.watermark}</span>
        <span className="text-[20px] sm:text-[40px] font-serif italic -mt-1 lg:-mt-4 text-gray-500">Since {ABOUT_CONTENT.since}</span>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
});
