"use client";

import { memo } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { PROJECTS } from "@/app/lib/data";

export default memo(function ProjectsSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-[var(--bg-0)]">
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-4 block">
              Sản phẩm chúng tôi đã thực hiện
            </span>
            <h2 className="text-[36px] md:text-[56px] font-display font-bold text-[var(--text-0)] leading-[1.1] tracking-tight">
              Dự án nổi bật
            </h2>
          </div>
          <div className="text-left md:text-right">
            <div className="text-[64px] font-display font-light text-[var(--surface-border)] leading-none mb-2">08</div>
            <div className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-2)]">Dự án chọn lọc</div>
          </div>
        </div>

        {/* Perfectly Balanced Bento Grid - No Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[250px] md:auto-rows-[320px]">
          {PROJECTS.map((project, i) => {
            // Optimized layout for 6 items to ensure zero gaps and balanced proportions
            // Pattern: [4/8, 8/4, 6/6]
            const layouts = [
              { col: "md:col-span-4", row: "md:row-span-2" }, // Row 1 - Square/Vertical
              { col: "md:col-span-8", row: "md:row-span-2" }, // Row 1 - Horizontal
              { col: "md:col-span-8", row: "md:row-span-2" }, // Row 2 - Horizontal
              { col: "md:col-span-4", row: "md:row-span-2" }, // Row 2 - Square/Vertical
              { col: "md:col-span-6", row: "md:row-span-2" }, // Row 3 - Balanced
              { col: "md:col-span-6", row: "md:row-span-2" }  // Row 3 - Balanced
            ];
            
            const layout = layouts[i] || { col: "md:col-span-6", row: "md:row-span-2" };

            return (
              <div
                key={project.title}
                className={`reveal group relative overflow-hidden rounded-[2rem] bg-[var(--bg-2)] ${layout.col} ${layout.row} ${isVisible ? 'is-visible' : ''}`}
                style={{ 
                  transitionDelay: isVisible ? `${0.1 * i}s` : '0s'
                } as React.CSSProperties}
              >
                {/* Background Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                
                {/* Content Reveal */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <p className="text-[var(--accent)] font-bold uppercase tracking-[0.2em] text-[12px] mb-3">
                      {project.category}
                    </p>
                    <h3 className="text-white font-serif italic font-bold text-[28px] md:text-[42px] leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Border interaction */}
                <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
