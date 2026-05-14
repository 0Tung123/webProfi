"use client";

import { memo, useState } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { PROCESS_BY_FIELD, CLIENTS } from "@/app/lib/data";

export default memo(function ProcessSection() {
  const { ref: stepsRef, isVisible: stepsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: partnersRef, isVisible: partnersVisible } = useIntersectionObserver({ threshold: 0.2 });
  const [activeField, setActiveField] = useState<keyof typeof PROCESS_BY_FIELD>("design");

  return (
    <section id="process" className="relative py-16 md:py-24 overflow-hidden bg-[var(--bg-0)]">
      
      {/* Background Accent (Pinkish Blur) */}
      <div className="absolute top-1/2 -right-48 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff4d6d] opacity-[0.05] blur-[140px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16 relative z-10">
        
        {/* 1. Process Header & Category Selection */}
        <div ref={stepsRef} className="mb-20 md:mb-32">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-8 md:gap-10">
            <div className="max-w-2xl">
              <div
                className={`reveal flex items-center gap-4 mb-6 md:mb-10 ${stepsVisible ? 'is-visible' : ''}`}
              >
                <span className="w-8 h-px bg-[var(--accent)]" />
                <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                  Lộ trình triển khai
                </span>
              </div>

              <h2
                className={`reveal font-display text-[32px] md:text-[56px] font-bold text-[var(--text-0)] leading-[1.1] tracking-tight ${stepsVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: '0.1s' }}
              >
                Quy trình tối ưu <br className="hidden lg:block" /> cho từng mục tiêu
              </h2>

              <p 
                className={`reveal mt-6 text-[15px] md:text-[16px] text-[var(--text-2)] font-light leading-relaxed max-w-xl transition-all duration-700 ${stepsVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: '0.2s' }}
              >
                {PROCESS_BY_FIELD[activeField].desc}
              </p>
            </div>

            {/* Field Selectors */}
            <div className={`reveal flex flex-wrap gap-2 ${stepsVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
              {(Object.keys(PROCESS_BY_FIELD) as Array<keyof typeof PROCESS_BY_FIELD>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveField(key)}
                  className={`px-6 py-3 rounded-full text-[13px] font-bold uppercase tracking-wider transition-all duration-500 border ${
                    activeField === key 
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg' 
                      : 'bg-transparent text-[var(--text-2)] border-[var(--surface-border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                  }`}
                >
                  {PROCESS_BY_FIELD[key].title}
                </button>
              ))}
            </div>
          </div>

          {/* Steps Grid - Dynamic based on activeField */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_BY_FIELD[activeField].steps.map((item, i) => (
              <div
                key={`${activeField}-${item.step}`}
                className={`reveal group relative p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-[var(--surface-border)] bg-[var(--bg-0)] transition-all duration-700 hover:border-[var(--accent)] hover:shadow-xl ${stepsVisible ? 'is-visible' : ''}`}
                style={{
                  transitionDelay: `${0.1 * i + 0.3}s`,
                }}
              >
                <div className="mb-4 md:mb-6 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-[var(--bg-1)] text-[var(--accent)] font-display text-xl md:text-2xl font-bold group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-500">
                  {item.step}
                </div>
                <h3 className="font-display text-[18px] md:text-[20px] font-bold text-[var(--text-0)] mb-3 md:mb-4">
                  {item.title}
                </h3>
                <p className="text-[13px] md:text-[14px] text-[var(--text-2)] leading-relaxed font-light">
                  {item.desc}
                </p>

                {/* Subtle Progress Line connecting steps on desktop */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[var(--surface-border)]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Trusted Partners - Infinite Scroll Marquee */}
        <div ref={partnersRef} className="pt-24 border-t border-[var(--surface-border)] relative">
          
          <div className={`reveal mb-20 max-w-3xl ${partnersVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <h3 className="text-[32px] md:text-[42px] font-display font-bold text-[var(--text-0)] mb-6">
              Mạng lưới đối tác chiến lược
            </h3>
            <p className="text-[16px] text-[var(--text-2)] font-light leading-relaxed">
              Chúng tôi tự hào được đồng hành cùng các tập đoàn tài chính, tổ chức giáo dục và các doanh nghiệp dẫn đầu trong nhiều lĩnh vực khác nhau. Sự tin tưởng của đối tác là thước đo giá trị cao nhất cho mỗi sản phẩm của HATMedia.
            </p>
          </div>

          {/* Marquee Rows */}
          <div className={`reveal flex flex-col gap-12 overflow-hidden py-10 -mx-6 lg:-mx-16 relative ${partnersVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            
            {/* Gradient Fades for edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-0)] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-0)] to-transparent z-10" />

            {/* Row 1: Left Scroll */}
            <div className="flex animate-marquee-left whitespace-nowrap gap-16 md:gap-24 items-center">
              {[...CLIENTS, ...CLIENTS].map((client, i) => (
                <span 
                  key={`${client}-1-${i}`}
                  className="text-[24px] md:text-[38px] font-display font-black tracking-tighter text-[var(--text-0)] opacity-70 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-500 cursor-default"
                >
                  {client}
                </span>
              ))}
            </div>

            {/* Row 2: Right Scroll */}
            <div className="flex animate-marquee-right whitespace-nowrap gap-16 md:gap-24 items-center">
              {[...CLIENTS.slice().reverse(), ...CLIENTS.slice().reverse()].map((client, i) => (
                <span 
                  key={`${client}-2-${i}`}
                  className="text-[24px] md:text-[38px] font-serif italic text-[var(--text-1)] opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-500 cursor-default"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          {/* Trust Metrics */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Đối tác tin cậy", value: "24+" },
              { label: "Dự án thành công", value: "100+" },
              { label: "Năm kinh nghiệm", value: "05+" },
              { label: "Lĩnh vực chuyên sâu", value: "08+" }
            ].map((stat, i) => (
              <div 
                key={stat.label} 
                className={`reveal flex flex-col border-l border-[var(--surface-border)] pl-6 ${partnersVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${0.5 + i * 0.1}s` }}
              >
                <span className="text-[32px] font-display font-bold text-[var(--accent)]">{stat.value}</span>
                <span className="text-[12px] uppercase tracking-widest text-[var(--text-2)] font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
          width: max-content;
        }
        .animate-marquee-right {
          animation: marquee-right 50s linear infinite;
          width: max-content;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
});
