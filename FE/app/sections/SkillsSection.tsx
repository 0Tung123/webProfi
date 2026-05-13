"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/app/lib/data";

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#d5af34] uppercase mb-10"
        >
          Công nghệ & Kỹ năng
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {SKILLS.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-3 text-sm font-medium text-[var(--text-1)] transition-colors duration-300 hover:border-[#d5af34] hover:text-[#d5af34]"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
