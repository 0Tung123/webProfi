"use client";

import { memo } from "react";
import { SERVICES } from "@/app/lib/data";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";

export default memo(function Footer() {
  const { ref: footerRef, isVisible } = useIntersectionObserver({ threshold: 0 });

  return (
    <footer ref={footerRef} className="relative bg-white pt-24 pb-8 overflow-hidden">
      
      {/* 1. Large High-Impact CTA */}
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16 mb-24 md:mb-32 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12">
          <h2 className={`reveal font-display text-[36px] sm:text-[52px] md:text-[80px] font-bold text-[var(--text-0)] leading-[1] tracking-tight max-w-3xl ${isVisible ? 'is-visible' : ''}`}>
            Hiện thực hoá <br /> 
            <span className="font-serif italic font-medium text-[var(--accent)] lowercase">ý tưởng của bạn</span>
          </h2>

          {/* Massive Branding Circle with Arrow */}
          <div className={`reveal relative group cursor-pointer self-end md:self-auto ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[260px] md:h-[260px] bg-[var(--accent)] rounded-full flex items-center justify-center transform transition-all duration-700 group-hover:scale-105 shadow-[0_20px_60px_rgba(213,175,52,0.2)] group-hover:shadow-[0_30px_80px_rgba(213,175,52,0.4)]">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 text-black transform transition-all duration-500 group-hover:translate-x-3"
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            
            {/* Animated Halo Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-[var(--accent)] opacity-20 group-hover:scale-125 transition-transform duration-1000 ease-out" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-[var(--accent)] opacity-10 group-hover:scale-150 transition-transform duration-1000 ease-out" />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16">
        <div className="h-px w-full bg-black/5 mb-16" />

        {/* 2. Four-Column Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-24">
          
          {/* Column 1: Trụ sở */}
          <div className={`reveal flex flex-col gap-6 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-black">Trụ sở</h4>
            <div className="flex flex-col gap-6 text-[13px] leading-relaxed text-black/60">
              <div>
                <p className="font-bold text-black/30 mb-2">Văn phòng đại diện</p>
                <p>Tầng 5, 33 Giang Văn Minh, Kim Mã,<br />Ba Đình, Hà Nội</p>
              </div>
              <div>
                <p className="font-bold text-black/30 mb-2">Trung tâm công nghệ</p>
                <p>2/28/93 Hoàng Văn Thái, Thanh Xuân,<br />Hà Nội</p>
              </div>
            </div>
          </div>

          {/* Column 2: Liên hệ */}
          <div className={`reveal flex flex-col gap-6 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-black">Liên hệ</h4>
            <div className="flex flex-col gap-4 text-[13px] text-black/60">
              <div className="flex gap-4">
                <span className="font-bold text-black/30 w-12 shrink-0">Phone</span>
                <p>(+84) 97 531 9889<br />(+84) 86 929 1771</p>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-black/30 w-12 shrink-0">Email</span>
                <p>info@hatmedia.dev</p>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-black/30 w-12 shrink-0">Website</span>
                <p>hatmedia.dev</p>
              </div>
            </div>
          </div>

          {/* Column 3: Dịch vụ */}
          <div className={`reveal flex flex-col gap-6 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-black">Dịch vụ</h4>
            <div className="flex flex-col gap-3 text-[13px] text-black/60">
              {SERVICES.map(s => (
                <p key={s.title} className="hover:text-[var(--accent)] transition-colors cursor-pointer">{s.title}</p>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className={`reveal flex flex-col gap-6 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-black">Đăng Ký Nhận Thông Tin</h4>
            <div className="relative mt-2">
              <input 
                type="email" 
                placeholder="Nhập email tại đây" 
                className="w-full bg-transparent border-b border-black/10 pb-4 pr-20 text-[13px] focus:outline-none focus:border-black transition-colors"
              />
              <button className="absolute right-0 bottom-4 text-[13px] font-bold uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
                Đăng ký
              </button>
            </div>
          </div>

        </div>

        {/* 3. Bottom Bar */}
        <div className={`reveal pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.7s' }}>
          <p className="text-[10px] text-black/30 uppercase tracking-[0.2em]">
            Copyright &copy; {new Date().getFullYear()} HATMedia Agency. All Rights Reserved.
          </p>
          
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-black/50">
            {["Facebook", "Behance", "Dribbble", "LinkedIn"].map(social => (
              <a key={social} href="#" className="hover:text-[var(--accent)] transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
});
