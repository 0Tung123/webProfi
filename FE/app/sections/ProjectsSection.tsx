"use client";

import { memo } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { PROJECTS } from "@/app/lib/data";

export default memo(function ProjectsSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        {/* Section Title */}
        <p
          className={`reveal text-center text-xs sm:text-sm font-semibold tracking-wide text-[var(--accent)] uppercase mb-4 ${isVisible ? 'is-visible' : ''}`}
        >
          Dự án
        </p>

        <h2
          className={`reveal text-center font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-0)] uppercase mb-16 ${isVisible ? 'is-visible' : ''}`}
          style={isVisible ? { transitionDelay: '0.1s' } : undefined}
        >
          Sản phẩm nổi bật
        </h2>

        <div className="space-y-12">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`reveal group relative overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] ${isVisible ? 'is-visible' : ''}`}
              style={isVisible ? { transitionDelay: `${0.1 * i + 0.2}s` } : undefined}
            >
              <div className="relative aspect-[16/7] w-full overflow-hidden bg-[var(--surface)]">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 sm:p-10">
                <p className="text-xs sm:text-sm font-semibold tracking-widest text-[var(--accent)] uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white shadow-sm">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
