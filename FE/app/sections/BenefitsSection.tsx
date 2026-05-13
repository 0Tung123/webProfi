"use client";

import { motion } from "framer-motion";
import { BENEFITS } from "@/app/lib/data";

export default function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#d5af34] opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-[1920px] px-6 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#d5af34] uppercase mb-4"
        >
          Lợi ích
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center font-(family-name:--font-display) text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase mb-16"
        >
          Tại sao chọn HATMedia?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(213,175,52,0.15)] text-[#d5af34] text-lg font-bold">
                ✓
              </div>
              <p className="text-lg text-white font-light leading-relaxed">
                {benefit}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
