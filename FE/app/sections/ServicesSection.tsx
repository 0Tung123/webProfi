"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { SERVICES } from "@/app/lib/data";

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <section id="services" className="relative py-20 md:py-28 bg-[var(--bg-1)]">
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16">
        {/* Section Title with Intersection Observer */}
        <div
          ref={titleRef}
          className={`services-title text-center text-xs sm:text-sm font-semibold tracking-wide text-[var(--accent)] uppercase mb-12 transition-all duration-[var(--dur-normal)] ease-[var(--ease-standard)] ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          Dịch vụ
        </div>

        <div className="services-grid flex flex-col lg:flex-row h-[600px] lg:h-[700px] gap-0 overflow-hidden rounded-2xl border border-[var(--surface-border)]">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              className={`service-card relative flex-1 cursor-pointer overflow-hidden group transition-all duration-700 ease-[var(--ease-standard)] ${hoveredIndex === i ? 'flex-[2.5]' : 'flex-1'}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/20" />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              </div>

              {/* Content Wrapper */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 lg:p-12">
                <div className="relative overflow-hidden">
                  <h3 className="font-display text-3xl lg:text-4xl font-bold text-white uppercase mb-4">
                    {service.title}
                  </h3>

                  {/* Description - shown on hover */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${hoveredIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  >
                    <p className="text-white-80 text-base lg:text-lg font-light leading-relaxed mb-6 max-w-md">
                      {service.desc}
                    </p>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-[var(--accent)] text-sm font-bold uppercase tracking-widest border-b border-[var(--accent)] pb-1 hover:text-white hover:border-white transition-colors"
                      suppressHydrationWarning
                    >
                      Tìm hiểu thêm <span>→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Vertical Title for collapsed state on mobile */}
              <div
                className={`absolute inset-0 flex items-center justify-center lg:hidden transition-opacity duration-300 ${hoveredIndex === i ? 'opacity-0' : 'opacity-100'}`}
              >
                <span className="text-white text-xl font-bold uppercase tracking-widest rotate-90 whitespace-nowrap">
                  {service.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
