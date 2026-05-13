"use client";

import { motion } from "framer-motion";
import Button from "@/app/components/common/Button";

const easeCurve = [0.22, 1, 0.36, 1] as const;

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: easeCurve,
    },
  }),
};

import { HERO_CARDS as cards } from "@/app/lib/data";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[90svh] w-full overflow-hidden pt-28 pb-12 flex items-center"
    >
      <div className="mx-auto flex w-full max-w-[1920px] flex-col lg:flex-row items-center justify-between px-6 lg:px-12 xl:px-16 relative z-10">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
          <motion.div
            variants={revealVariants}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-[#d5af34]" />
            <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#d5af34]">
              DESIGN • PHOTO • CODE
            </p>
          </motion.div>

          <motion.h1
            variants={revealVariants}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="font-(family-name:--font-display) text-[48px] sm:text-[64px] lg:text-[80px] xl:text-[96px] font-bold leading-[1.05] tracking-tight text-white uppercase"
          >
            ĐỊNH HÌNH <br />
            <span className="font-(family-name:--font-serif) italic font-medium text-[#d5af34] lowercase block -mt-2 sm:-mt-3">
              nghệ thuật
            </span>
            <span className="-mt-2 sm:-mt-3 block">NGUYÊN BẢN</span>
          </motion.h1>

          <motion.p
            variants={revealVariants}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="mt-6 max-w-2xl text-[15px] sm:text-[18px] text-[var(--text-1)] font-light leading-relaxed"
          >
            Tại <strong className="font-semibold text-white">HATMedia</strong>, chúng tôi xem mỗi dự án như một bản phác thảo trong bóng tối — nơi ánh sáng của nghệ thuật gặp gỡ sự chuẩn xác của công nghệ.
          </motion.p>

          <motion.div
            variants={revealVariants}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="mt-10"
          >
            <a 
              href="#contact" 
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-10 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] backdrop-blur-sm"
            >
              KHÁM PHÁ MÀN ĐÊM
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

        {/* Right: Static/Floating Composition */}
        <div className="w-full lg:w-[50%] h-[400px] lg:h-[550px] mt-16 lg:mt-0 relative flex items-center justify-center">
          
          {/* Concentric Dashed Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full border border-dashed border-[rgba(255,255,255,0.1)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full border border-dashed border-[rgba(255,255,255,0.1)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full border border-dashed border-[rgba(255,255,255,0.05)]" />

          {/* Center Large Image (Monitor/Design) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: easeCurve, delay: 0.2 }}
            className="relative z-10 h-[300px] w-[90%] sm:h-[400px] sm:w-[600px] lg:h-[450px] lg:w-[650px] overflow-hidden rounded-2xl shadow-2xl"
          >
            <img 
              src={cards[0].src} 
              alt={cards[0].alt}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Top Right Small Image (Team/Photo) */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-20 -right-4 top-10 sm:right-0 sm:top-16 lg:-right-10 lg:top-24 h-[120px] w-[180px] sm:h-[180px] sm:w-[280px] overflow-hidden rounded-xl border-2 border-[#d5af34] shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            <img 
              src={cards[2].src} 
              alt={cards[2].alt}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Bottom Left Small Image (Interior/Code) */}
          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-20 -left-4 bottom-10 sm:left-4 sm:bottom-20 lg:-left-16 lg:bottom-32 h-[120px] w-[180px] sm:h-[180px] sm:w-[280px] overflow-hidden rounded-xl border-2 border-[#d5af34] shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            <img 
              src={cards[1].src} 
              alt={cards[1].alt}
              className="h-full w-full object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
