"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/app/lib/data";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#d5af34] uppercase mb-4"
        >
          Đánh giá
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center font-(family-name:--font-display) text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase mb-16"
        >
          Khách hàng nói gì?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-8"
            >
              <p className="text-lg text-[var(--text-1)] font-light leading-relaxed italic mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[rgba(213,175,52,0.2)] flex items-center justify-center text-[#d5af34] font-bold text-sm">
                  {item.author[0]}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.author}</p>
                  <p className="text-[var(--text-2)] text-xs">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
