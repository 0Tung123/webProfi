"use client";

import Image from "next/image";
import { useState } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { SERVICES } from "@/app/lib/data";

export default function ServicesSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-[var(--bg-0)]">
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <span className={`reveal text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-4 block ${isVisible ? 'is-visible' : ''}`}>
              Chuyên môn của chúng tôi
            </span>
            <h2 className={`reveal text-[36px] md:text-[56px] font-display font-bold text-[var(--text-0)] leading-[1.1] tracking-tight ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
              Giải pháp toàn diện cho <br /> kỷ nguyên kỹ thuật số
            </h2>
          </div>
        </div>

        {/* Services Grid with Full Background Interaction */}
        <div 
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[var(--surface-border)]"
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              onMouseEnter={() => setHoveredIndex(i)}
              className={`service-item reveal group relative flex flex-col items-start p-10 lg:p-14 border-r border-b border-[var(--surface-border)] overflow-hidden transition-all duration-700 min-h-[350px] lg:min-h-[420px] ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: isVisible ? `${0.1 * i}s` : '0s' } as React.CSSProperties}
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`object-cover transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${hoveredIndex === i ? 'scale-110' : 'opacity-20'}`}
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {/* Dark overlay that intensifies on hover */}
                <div className={`absolute inset-0 transition-opacity duration-[1000ms] ${hoveredIndex === i ? 'bg-black/60 opacity-100' : 'bg-transparent opacity-0'}`} />
                
                {/* Noise overlay for texture */}
                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              </div>

              {/* Content Wrapper (Always on top) */}
              <div className="relative z-10 w-full h-full flex flex-col">
                {/* Index & Line */}
                <div className="flex items-center gap-4 mb-8">
                  <span className={`text-[14px] font-bold tracking-widest transition-colors duration-[800ms] ${hoveredIndex === i ? 'text-[var(--accent)]' : 'text-[var(--text-1)]'}`}>
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <div className={`flex-1 h-px transition-all duration-[1000ms] ${hoveredIndex === i ? 'bg-[var(--accent)] scale-x-100' : 'bg-[var(--surface-border)] scale-x-50'}`} />
                </div>

                <h3 className={`font-display text-[28px] sm:text-[34px] font-bold mb-6 leading-tight transition-all duration-[800ms] ${hoveredIndex === i ? 'text-white translate-x-2' : 'text-[var(--text-0)]'}`}>
                  {service.title}
                </h3>

                <p className={`text-[15px] sm:text-[16px] font-light leading-relaxed max-w-[280px] transition-colors duration-[800ms] ${hoveredIndex === i ? 'text-white/80' : 'text-[var(--text-1)]'}`}>
                  {service.desc}
                </p>

                {/* Arrow Indicator */}
                <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all duration-[800ms] translate-y-4 group-hover:translate-y-0">
                  <div className="w-10 h-10 rounded-full border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transform group-hover:rotate-45 transition-transform duration-[800ms]">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
