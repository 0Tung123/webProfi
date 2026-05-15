"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { heroService, HeroConfig } from "@/app/lib/api/hero.service";

export default memo(function HeroSection() {
  const { ref: heroRef, isVisible } = useIntersectionObserver({
    once: true,
    threshold: 0,
  });

  const [config, setConfig] = useState<HeroConfig | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await heroService.get();
        setConfig(data);
      } catch (error) {
        console.error("Failed to fetch hero config:", error);
      }
    };
    fetchConfig();
  }, []);

  // Use config data or fallback to defaults
  const heroData = {
    title1: config?.title1 || "WE COMPLETE",
    title2: config?.title2 || "YOUR CREATIVE IDEAS",
    subtext: config?.subtext || "HAT Studio is a visionary design agency that breathes life into ideas and transforms them into extraordinary realities.",
    mediaUrl: config?.mediaUrl || "https://res.cloudinary.com/dykmrgu8e/image/upload/v1778861498/hat-studio/blq1qtdlokrit4cbmhvp.jpg",
    mediaType: config?.mediaType || "image",
  };

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative w-full bg-[var(--bg-0)] pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden"
    >
      {/* Scroll Down Indicator (Left Side) */}
      <div className="absolute left-6 md:left-10 top-[450px] flex flex-col items-center gap-6 z-20">
        <div className="flex flex-col items-center gap-4">
          <span className="[writing-mode:vertical-lr] text-[10px] font-bold tracking-[0.4em] text-[#c5a12e] uppercase rotate-180">
            Scroll Down
          </span>
          <div className="w-[1.5px] h-20 bg-[#c5a12e]" />
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#c5a12e]" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40 relative z-10">
        
        {/* Main Content Block - STAGGERED ALIGNMENT */}
        <div className="w-full flex flex-col items-start mb-20">
          
          {/* Line 1: WE COMPLETE (Aligned Left) */}
          <div className={`reveal flex items-center gap-6 md:gap-12 mb-4 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <h1 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-semibold leading-[1] tracking-[-0.02em] text-[var(--text-0)] uppercase">
              {heroData.title1}
            </h1>
            
            {/* Integrated Let's Talk Button */}
            <a 
              href="#contact" 
              className="group flex items-center gap-4 bg-transparent mt-2 md:mt-4"
            >
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-gray-200 p-1 flex items-center justify-center transition-all duration-500 group-hover:border-[var(--accent)]">
                <div className="w-full h-full rounded-full bg-[var(--accent)] flex items-center justify-center transition-transform duration-500 group-hover:scale-95 shadow-[0_10px_25px_rgba(213,175,52,0.25)]">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-[var(--accent)] uppercase whitespace-nowrap">
                Let's talk now
              </span>
            </a>
          </div>

          {/* Line 2: YOUR CREATIVE IDEAS (Indented) */}
          <div className={`reveal ml-[10%] md:ml-[15%] mb-10 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <h2 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-semibold leading-[1] tracking-[-0.02em] text-[var(--text-0)] uppercase">
              {heroData.title2}
            </h2>
          </div>
          
          {/* Subtext (Further Indented) */}
          <div className={`reveal ml-[25%] md:ml-[40%] max-w-lg ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <p className="text-[13px] md:text-[15px] text-gray-500 font-normal leading-relaxed tracking-normal">
              {heroData.subtext}
            </p>
          </div>
        </div>

        {/* Large Media Box */}
        <div 
          className={`reveal relative w-full aspect-[21/9] rounded-[30px] md:rounded-[50px] overflow-hidden bg-[var(--bg-2)] shadow-[0_20px_60px_rgba(0,0,0,0.06)] group cursor-pointer ${isVisible ? 'is-visible' : ''}`} 
          style={{ transitionDelay: '0.5s' }}
        >
          {heroData.mediaType === 'video' ? (
            <video
              key={heroData.mediaUrl}
              src={heroData.mediaUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          ) : (
            <Image
              src={heroData.mediaUrl}
              alt="Hero Media"
              fill
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
          )}

          {/* Video / Image will show clearly without overlay */}
        </div>
      </div>
    </section>
  );
});
