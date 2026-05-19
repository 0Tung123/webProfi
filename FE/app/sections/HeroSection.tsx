"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { heroService, HeroConfig } from "@/app/lib/api/hero.service";
import { clientsService, Client as ApiClient } from "@/app/lib/api/clients.service";
import { CLIENTS as STATIC_CLIENTS } from "@/app/lib/data";

export default memo(function HeroSection() {
  const { ref: heroRef, isVisible } = useIntersectionObserver({
    once: true,
    threshold: 0,
  });

  const [config, setConfig] = useState<HeroConfig | null>(null);
  const [partners, setPartners] = useState<ApiClient[]>([]);

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

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await clientsService.getAll();
        if (data && data.length > 0) {
          setPartners(data);
        } else {
          setPartners(STATIC_CLIENTS.map((name, i) => ({
            clientId: `static-${i}`,
            name,
            order: i,
            isActive: true,
            createdAt: "",
            updatedAt: ""
          })));
        }
      } catch (error) {
        console.error("Failed to fetch clients for hero:", error);
        setPartners(STATIC_CLIENTS.map((name, i) => ({
          clientId: `static-${i}`,
          name,
          order: i,
          isActive: true,
          createdAt: "",
          updatedAt: ""
        })));
      }
    };
    fetchPartners();
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
      <div className="hidden md:flex absolute left-6 md:left-10 top-[450px] flex-col items-center gap-6 z-20">
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
          <div className={`reveal flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 mb-4 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <h1 className="text-[32px] sm:text-[50px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-semibold leading-[1] tracking-[-0.02em] text-[var(--text-0)] uppercase">
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
          <div className={`reveal ml-0 md:ml-[15%] mb-6 md:mb-10 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <h2 className="text-[32px] sm:text-[50px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-semibold leading-[1] tracking-[-0.02em] text-[var(--text-0)] uppercase">
              {heroData.title2}
            </h2>
          </div>
          
          {/* Subtext (Further Indented) */}
          <div className={`reveal ml-0 md:ml-[40%] max-w-lg ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
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

        {/* Partners Marquee Banner */}
        <div 
          className={`reveal mt-12 md:mt-20 w-full ${isVisible ? 'is-visible' : ''}`} 
          style={{ transitionDelay: '0.6s' }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 lg:gap-12 border-t border-b border-[var(--surface-border)] py-3.5 md:py-6 relative overflow-hidden">
            
            {/* Left side label: static & prominent */}
            <div className="flex-shrink-0 z-20 bg-[var(--bg-0)] pr-6 flex items-center gap-3">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--text-1)]">
                Trusted Partners:
              </span>
            </div>

            {/* Marquee Container */}
            <div className="flex-grow overflow-hidden relative mask-fade-edges">
              {/* Edge gradients */}
              <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[var(--bg-0)] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[var(--bg-0)] to-transparent z-10 pointer-events-none" />

              {/* Scrolling Row */}
              <div className="flex animate-marquee-hero whitespace-nowrap gap-8 md:gap-24 items-center">
                {partners.length > 0 && [...partners, ...partners, ...partners].map((partner, i) => (
                  <div 
                    key={`${partner.clientId || partner.name}-${i}`}
                    className="inline-flex items-center justify-center transition-all duration-300 hover:scale-105"
                  >
                    {partner.logo ? (
                      <div className="relative h-8 w-24 sm:h-12 sm:w-32 md:h-16 md:w-44 opacity-60 hover:opacity-100 transition-all duration-300">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain filter grayscale dark:invert"
                          sizes="(max-width: 768px) 96px, 176px"
                        />
                      </div>
                    ) : (
                      <span className="text-sm md:text-xl lg:text-2xl font-display font-semibold tracking-tight text-[var(--text-2)] hover:text-[var(--accent)] opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer uppercase">
                        {partner.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-hero {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-hero {
          animation: marquee-hero 40s linear infinite;
          width: max-content;
          display: inline-flex;
        }
        .animate-marquee-hero:hover {
          animation-play-state: paused;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  );
});
