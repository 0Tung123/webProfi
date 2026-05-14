"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/app/lib/data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#d5af34] uppercase mb-4"
        >
          Dự án
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center font-(family-name:--font-display) text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-0)] uppercase mb-16"
        >
          Sản phẩm nổi bật
        </motion.h2>

        <div className="space-y-12">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)]"
            >
              <div className="aspect-[16/7] w-full overflow-hidden bg-[var(--surface)]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 sm:p-10">
                <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#d5af34] uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="font-(family-name:--font-display) text-2xl sm:text-3xl lg:text-4xl font-bold text-white shadow-sm">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
