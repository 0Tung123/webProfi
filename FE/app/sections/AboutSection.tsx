"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 md:py-24 overflow-hidden">
      
      {/* Faint Vertical Grid Lines Background (Matching the reference image) */}
      <div className="absolute inset-0 z-0 flex justify-between px-6 lg:px-12 xl:px-16 pointer-events-none opacity-[0.03] max-w-[1920px] mx-auto">
        <div className="w-px h-full bg-white" />
        <div className="w-px h-full bg-white hidden sm:block" />
        <div className="w-px h-full bg-white" />
        <div className="w-px h-full bg-white hidden sm:block" />
        <div className="w-px h-full bg-white" />
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.h2 
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.1}
            className="font-(family-name:--font-display) text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-white uppercase leading-tight tracking-wide"
          >
            SỰ KHỞI ĐẦU CỦA NHỮNG TRẢI NGHIỆM <br className="hidden sm:block" /> 
            KỸ THUẬT SỐ ĐỘC BẢN
          </motion.h2>

          <motion.p 
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.2}
            className="mt-8 sm:mt-10 max-w-4xl text-[16px] sm:text-[18px] lg:text-[20px] text-[var(--text-1)] font-light leading-relaxed"
          >
            Là một studio sáng tạo mới thành lập, <strong className="text-white font-medium">HATMedia</strong> mang trong mình lợi thế lớn nhất: 
            sự linh hoạt, không bị gò bó bởi những lối mòn cũ và một ngọn lửa đam mê cháy bỏng. 
            Chúng tôi không hứa hẹn một bề dày lịch sử hàng chục năm, nhưng chúng tôi cam kết mang lại 
            những sản phẩm có độ hoàn thiện cao nhất — từ giao diện tinh tế, chuyển động mượt mà 
            đến những dòng code được tối ưu.
            <br className="hidden sm:block" /><br className="hidden sm:block" />
            Mỗi dự án đều được chăm chút bằng 100% năng lượng của tuổi trẻ và khát khao khẳng định chất riêng cho thương hiệu của bạn.
          </motion.p>

          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.3}
            className="mt-12 sm:mt-14"
          >
            <a 
              href="#contact" 
              className="inline-block text-[#d5af34] font-bold text-sm sm:text-base tracking-[0.15em] uppercase border-b-2 border-[#d5af34] pb-1 hover:text-white hover:border-white transition-all duration-300"
            >
              Bắt đầu hành trình
            </a>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
