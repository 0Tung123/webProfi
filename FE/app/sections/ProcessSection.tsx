"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/app/lib/data";

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#d5af34] uppercase mb-4"
        >
          Quy trình
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center font-(family-name:--font-display) text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-0)] uppercase mb-16"
        >
          Cách hoạt động
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d5af34] text-[#d5af34] font-(family-name:--font-display) text-xl font-bold">
                {item.step}
              </div>
              <h3 className="font-(family-name:--font-display) text-lg font-semibold text-[var(--text-0)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-2)] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
