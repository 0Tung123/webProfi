"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/app/lib/data";

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#d5af34] uppercase mb-4"
        >
          Dịch vụ
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-(family-name:--font-display) text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase mb-16"
        >
          Chúng tôi làm gì?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-8 text-center transition-all duration-300 hover:border-[rgba(213,175,52,0.3)] hover:bg-[rgba(255,255,255,0.04)]"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(213,175,52,0.1)] text-3xl">
                {service.icon}
              </div>
              <h3 className="font-(family-name:--font-display) text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-[var(--text-2)] text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
