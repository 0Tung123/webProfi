"use client";

import { memo } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { SKILLS } from "@/app/lib/data";

export default memo(function SkillsSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  return (
    <section id="skills" ref={sectionRef} className="relative py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <p
          className={`reveal text-center text-xs sm:text-sm font-semibold tracking-wide text-accent uppercase mb-10 ${isVisible ? 'is-visible' : ''}`}
        >
          Công nghệ & Kỹ năng
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {SKILLS.map((skill, i) => (
            <span
              key={skill}
              className={`reveal rounded-full border border-surface bg-surface px-6 py-3 text-sm font-medium text-[var(--text-1)] hover:border-accent hover:text-accent transition-all duration-300 ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.08 * i + 0.1}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});
