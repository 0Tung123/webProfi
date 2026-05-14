"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/app/lib/data";

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="services" className="relative py-20 md:py-28 bg-[var(--bg-1)]">
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#d5af34] uppercase mb-12"
        >
          Dịch vụ
        </motion.p>

        <div className="flex flex-col lg:flex-row h-[600px] lg:h-[700px] gap-0 overflow-hidden rounded-2xl border border-[var(--surface-border)]">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              onMouseEnter={() => setHoveredIndex(i)}
              className="relative flex-1 cursor-pointer overflow-hidden group transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              animate={{
                flex: hoveredIndex === i ? 2.5 : 1,
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/20" />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              </div>

              {/* Content Wrapper */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 lg:p-12">
                <div className="relative overflow-hidden">
                  <motion.h3 
                    className="font-(family-name:--font-display) text-3xl lg:text-4xl font-bold text-white uppercase mb-4"
                    animate={{
                      y: hoveredIndex === i ? 0 : 0, // Keep title visible
                    }}
                  >
                    {service.title}
                  </motion.h3>

                  <AnimatePresence>
                    {hoveredIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <p className="text-[rgba(255,255,255,0.8)] text-base lg:text-lg font-light leading-relaxed mb-6 max-w-md">
                          {service.desc}
                        </p>
                        <a 
                          href="#contact" 
                          className="inline-flex items-center gap-2 text-[#d5af34] text-sm font-bold uppercase tracking-widest border-b border-[#d5af34] pb-1 hover:text-white hover:border-white transition-colors"
                          suppressHydrationWarning
                        >
                          Tìm hiểu thêm <span>→</span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Vertical Title for collapsed state (Optional, but looks premium) */}
              <AnimatePresence>
                {hoveredIndex !== i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center lg:hidden"
                  >
                    <span className="text-white text-xl font-bold uppercase tracking-widest rotate-90 whitespace-nowrap">
                      {service.title}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
