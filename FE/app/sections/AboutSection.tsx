"use client";

import { memo } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";

export default memo(function AboutSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="about" className="relative py-16 md:py-24 overflow-hidden">

      {/* Faint Vertical Grid Lines Background */}
      <div className="absolute inset-0 z-0 flex justify-between px-6 lg:px-12 xl:px-16 pointer-events-none opacity-[0.03] max-w-[1920px] mx-auto">
        <div className="w-px h-full bg-black" />
        <div className="w-px h-full bg-black hidden sm:block" />
        <div className="w-px h-full bg-black" />
        <div className="w-px h-full bg-black hidden sm:block" />
        <div className="w-px h-full bg-black" />
      </div>

      <div
        ref={ref}
        className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16 relative z-10"
      >
        <div className="flex flex-col items-center text-center">

          <h2
            className={`reveal font-display text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[var(--text-0)] uppercase leading-tight tracking-wide ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            SỰ KHỞI ĐẦU CỦA NHỮNG TRẢI NGHIỆM <br className="hidden sm:block" />
            KỸ THUẬT SỐ ĐỘC BẢN
          </h2>

          <p
            className={`reveal mt-8 sm:mt-10 max-w-4xl text-[16px] sm:text-[18px] lg:text-[20px] text-[var(--text-1)] font-light leading-relaxed ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            Là một studio sáng tạo mới thành lập, <strong className="text-[var(--text-0)] font-medium">HATMedia</strong> mang trong mình lợi thế lớn nhất:
            sự linh hoạt, không bị gò bó bởi những lối mòn cũ và một ngọn lửa đam mê cháy bỏng.
            Chúng tôi không hứa hẹn một bề dày lịch sử hàng chục năm, nhưng chúng tôi cam kết mang lại
            những sản phẩm có độ hoàn thiện cao nhất — từ giao diện tinh tế, chuyển động mượt mà
            đến những dòng code được tối ưu.
            <br className="hidden sm:block" /><br className="hidden sm:block" />
            Mỗi dự án đều được chăm chút bằng 100% năng lượng của tuổi trẻ và khát khao khẳng định chất riêng cho thương hiệu của bạn.
          </p>

          <div
            className={`reveal mt-12 sm:mt-14 ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            <a
              href="#contact"
              className="inline-block text-accent font-bold text-sm sm:text-base tracking-widest uppercase border-b-2 border-accent pb-1 hover:text-[var(--text-0)] hover:border-[var(--text-0)] transition-all duration-[var(--dur-normal)]"
            >
              Bắt đầu hành trình
            </a>
          </div>

        </div>
      </div>
    </section>
  );
});
