"use client";

import { memo } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { useProjects, Project } from "@/app/hooks/useProjects";
import Button from "@/app/components/common/Button";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  
  const layouts = [
    { col: "md:col-span-4", row: "md:row-span-2" },
    { col: "md:col-span-8", row: "md:row-span-2" },
    { col: "md:col-span-8", row: "md:row-span-2" },
    { col: "md:col-span-4", row: "md:row-span-2" },
    { col: "md:col-span-6", row: "md:row-span-2" },
    { col: "md:col-span-6", row: "md:row-span-2" }
  ];
  
  const layout = layouts[index] || { col: "md:col-span-6", row: "md:row-span-2" };

  return (
    <div
      ref={ref}
      className={`reveal group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-[var(--bg-2)] ${layout.col} ${layout.row} ${isVisible ? 'is-visible' : ''}`}
      style={{ 
        transitionDelay: `${(index % 3) * 0.1}s`
      }}
    >
      {/* Background Image/Video */}
      {project.image.match(/\.(mp4|mov|webm|ogg|mkv|avi)$|video/i) ? (
        <video
          src={project.image}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
      ) : (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
      
      {/* Content Reveal */}
      <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
        <div className="transform translate-y-0 opacity-100 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <p className="text-[var(--accent)] font-bold uppercase tracking-[0.2em] text-[11px] md:text-[12px] mb-2 md:mb-3">
            {project.category}
          </p>
          <h3 className="text-white font-serif italic font-bold text-[24px] md:text-[42px] leading-tight">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Border interaction */}
      <div className="absolute inset-0 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] pointer-events-none" />
    </div>
  );
}

const ProjectsSection = memo(function ProjectsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-0)]">
        <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-0)]">
        <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Failed to load projects: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-0)]">
      <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <span className={`reveal text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-4 block ${headerVisible ? 'is-visible' : ''}`}>
              Sản phẩm chúng tôi đã thực hiện
            </span>
            <h2 className={`reveal text-[32px] md:text-[56px] font-display font-bold text-[var(--text-0)] leading-[1.1] tracking-tight ${headerVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
              Dự án nổi bật
            </h2>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[300px] md:auto-rows-[320px] mb-12 md:mb-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.projectId} project={project} index={i} />
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center md:justify-end">
          <Button 
            href="#projects-archive" 
            reveal={true}
            style={{ transitionDelay: '0.5s' }}
          >
            Xem thêm dự án khác
          </Button>
        </div>
      </div>
    </section>
  );
});

export default ProjectsSection;
