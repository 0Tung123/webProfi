"use client";

import { memo } from "react";
import { SERVICES } from "@/app/lib/data";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";

export default memo(function Footer() {
  const { ref: footerRef, isVisible } = useIntersectionObserver();

  return (
    <footer ref={footerRef} className="relative bg-white pt-24 pb-8 overflow-hidden">
      
      {/* 1. Large High-Impact CTA */}
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16 mb-32 relative">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <h2 className="font-display text-[42px] md:text-[72px] font-bold text-black leading-[1.1] tracking-tight max-w-2xl">
            Hiện thực hoá <br /> ý tưởng của bạn
          </h2>

          {/* Massive Red Circle with Arrow */}
          <div className="relative group cursor-pointer mr-0 md:mr-12">
            <div className="w-[180px] h-[180px] md:w-[280px] md:h-[280px] bg-[#ff334b] rounded-full flex items-center justify-center transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_0_50px_rgba(255,51,75,0.3)]">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-12 h-12 md:w-20 md:h-20 text-black transform transition-transform duration-500 group-hover:translate-x-2"
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-[200px] h-[200px] bg-[#ff334b] rounded-full opacity-[0.03] blur-3xl -z-10" />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16">
        <div className="h-px w-full bg-black/5 mb-16" />

        {/* 2. Four-Column Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-24">
          
          {/* Column 1: Trụ sở */}
          <div className="flex flex-col gap-6">
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
          <div className="flex flex-col gap-6">
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
          <div className="flex flex-col gap-6">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-black">Dịch vụ</h4>
            <div className="flex flex-col gap-3 text-[13px] text-black/60">
              {SERVICES.map(s => (
                <p key={s.title} className="hover:text-[#ff334b] transition-colors cursor-pointer">{s.title}</p>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-black">Đăng Ký Nhận Thông Tin</h4>
            <div className="relative mt-2">
              <input 
                type="email" 
                placeholder="Nhập email tại đây" 
                className="w-full bg-transparent border-b border-black/10 pb-4 pr-20 text-[13px] focus:outline-none focus:border-black transition-colors"
              />
              <button className="absolute right-0 bottom-4 text-[13px] font-bold uppercase tracking-widest hover:text-[#ff334b] transition-colors">
                Đăng ký
              </button>
            </div>
          </div>

        </div>

        {/* 3. Bottom Bar */}
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-black/30 uppercase tracking-[0.2em]">
            Copyright &copy; {new Date().getFullYear()} HATMedia Agency. All Rights Reserved.
          </p>
          
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-black/50">
            {["Facebook", "Behance", "Dribbble", "LinkedIn"].map(social => (
              <a key={social} href="#" className="hover:text-[#ff334b] transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
});
