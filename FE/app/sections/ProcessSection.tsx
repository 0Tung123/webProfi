"use client";

import { memo } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { PROCESS_STEPS, CLIENTS } from "@/app/lib/data";

export default memo(function ProcessSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="process" className="relative py-16 md:py-24 overflow-hidden bg-[var(--bg-0)]">
      
      {/* Background Accent (Pinkish Blur) */}
      <div className="absolute top-1/2 -right-48 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff4d6d] opacity-[0.05] blur-[140px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16 relative z-10">
        
        {/* 1. Process Header & Steps */}
        <div ref={ref} className="mb-32">
          <div
            className={`reveal flex items-center gap-4 mb-10 ${isVisible ? 'is-visible' : ''}`}
          >
            <span className="w-8 h-px bg-[var(--accent)]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
              Lộ trình triển khai
            </span>
          </div>

          <h2
            className={`reveal font-display text-[36px] md:text-[56px] font-bold text-[var(--text-0)] leading-[1.1] tracking-tight mb-16 ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Cách chúng tôi <br className="hidden lg:block" /> kiến tạo giá trị
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((item, i) => (
              <div
                key={item.step}
                className={`reveal group relative p-8 rounded-[2rem] border border-[var(--surface-border)] bg-[var(--bg-0)] transition-all duration-500 hover:border-[var(--accent)] hover:shadow-xl ${isVisible ? 'is-visible' : ''}`}
                style={{
                  transitionDelay: `${0.1 * i + 0.2}s`,
                }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--bg-1)] text-[var(--accent)] font-display text-2xl font-bold group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-500">
                  {item.step}
                </div>
                <h3 className="font-display text-[22px] font-bold text-[var(--text-0)] mb-4">
                  {item.title}
                </h3>
                <p className="text-[15px] text-[var(--text-1)] leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Trusted Partners - Infinite Scroll Marquee */}
        <div className="pt-24 border-t border-[var(--surface-border)] relative">
          
          <div className={`reveal mb-20 max-w-3xl ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
            <h3 className="text-[32px] md:text-[42px] font-display font-bold text-[var(--text-0)] mb-6">
              Mạng lưới đối tác chiến lược
            </h3>
            <p className="text-[16px] text-[var(--text-2)] font-light leading-relaxed">
              Chúng tôi tự hào được đồng hành cùng các tập đoàn tài chính, tổ chức giáo dục và các doanh nghiệp dẫn đầu trong nhiều lĩnh vực khác nhau. Sự tin tưởng của đối tác là thước đo giá trị cao nhất cho mỗi sản phẩm của HATMedia.
            </p>
          </div>

          {/* Marquee Rows */}
          <div className="flex flex-col gap-12 overflow-hidden py-10 -mx-6 lg:-mx-16 relative">
            
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
              <div key={stat.label} className="flex flex-col border-l border-[var(--surface-border)] pl-6">
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
