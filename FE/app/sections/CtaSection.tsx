"use client";

import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-(family-name:--font-display) text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase leading-tight mb-6"
        >
          Bắt đầu dự án tiếp theo <br className="hidden sm:block" />
          cùng HATMedia
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[var(--text-2)] text-base sm:text-lg mb-10 max-w-xl mx-auto"
        >
          Hãy cho chúng tôi biết ý tưởng của bạn. Chúng tôi sẵn sàng biến nó thành hiện thực.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:hello@hatmedia.dev"
            className="inline-flex items-center justify-center rounded-full bg-[#d5af34] px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-[#e8c84a] hover:scale-105 shadow-[0_14px_35px_rgba(213,175,52,0.25)]"
          >
            Liên hệ ngay
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]"
          >
            Xem dự án
          </a>
        </motion.div>
      </div>
    </section>
  );
}
