"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { projectsService, Project } from "@/app/lib/api/projects.service";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Button from "@/app/components/common/Button";

type CategoryFilter = "all" | string;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, isVisible } = useIntersectionObserver({ once: true, threshold: 0.2 });

  const layouts = [
    { col: "md:col-span-4", row: "md:row-span-2" },
    { col: "md:col-span-8", row: "md:row-span-2" },
    { col: "md:col-span-8", row: "md:row-span-2" },
    { col: "md:col-span-4", row: "md:row-span-2" },
    { col: "md:col-span-6", row: "md:row-span-2" },
    { col: "md:col-span-6", row: "md:row-span-2" },
  ];

  const layout = layouts[index % layouts.length];

  const isVideo = project.image.match(/\.(mp4|mov|webm|ogg|mkv|avi)$|video/i);

  return (
    <div
      ref={ref}
      className={`reveal group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-[var(--bg-2)] ${layout.col} ${layout.row} ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
    >
      {isVideo ? (
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

      <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />

      <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
        <div
          className="transform translate-y-0 opacity-100 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          <p className="text-[var(--accent)] font-bold uppercase tracking-[0.2em] text-[11px] md:text-[12px] mb-2 md:mb-3">
            {project.category}
          </p>
          <h3 className="text-white font-serif italic font-bold text-[24px] md:text-[42px] leading-tight">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="absolute inset-0 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] pointer-events-none" />
    </div>
  );
}

export default function ProjectsPage() {
  const { ref: heroRef, isVisible: heroVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: gridRef, isVisible: gridVisible } = useIntersectionObserver({ threshold: 0.1 });

  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [projectsData, categoriesData] = await Promise.all([
          projectsService.getAll(),
          projectsService.getAllCategories(),
        ]);
        setProjects(projectsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        console.error("Failed to fetch projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.categorySlug === activeCategory || p.category === activeCategory);

  const categoryOptions = ["all", ...categories];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-0)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--bg-0)] flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Failed to load projects: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-0)]">
      <Navbar />

      <section className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div ref={heroRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40 relative z-10">
          <div className="max-w-4xl">
            <div className={`reveal mb-8 ${heroVisible ? "is-visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <span className="inline-block px-4 py-2 rounded-full border border-[var(--accent)]/30 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                Portfolio
              </span>
            </div>

            <h1
              className={`reveal font-display text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold text-[var(--text-0)] leading-[1.05] tracking-tight mb-8 ${heroVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              Dự án của chúng tôi
            </h1>

            <p
              className={`reveal max-w-2xl text-[18px] md:text-[20px] text-[var(--text-1)] font-light leading-relaxed ${heroVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: "0.3s" }}
            >
              Tổng hợp các dự án đã thực hiện - từ ý tưởng đến hiện thực, mỗi dự án là một câu chuyện
              độc bản được kể bằng ngôn ngữ của thiết kế và công nghệ.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-12 overflow-hidden">
        <div className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40">
          <div className="flex flex-wrap gap-4">
            {categoryOptions.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`group px-6 py-3 rounded-full text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[var(--accent)] text-white shadow-[0_8px_30px_rgba(213,175,52,0.4)]"
                    : "bg-[var(--bg-2)] text-[var(--text-1)] hover:bg-[var(--bg-2)]/80 hover:text-[var(--text-0)]"
                }`}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                {category === "all" ? "Tất cả" : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div ref={gridRef} className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 xl:px-16">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--text-1)] font-light text-lg">
                Chưa có dự án nào trong danh mục này.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[300px] md:auto-rows-[320px] mb-12 md:mb-16">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.projectId} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40 text-center">
          <h2 className="text-[32px] md:text-[48px] font-display font-bold text-[var(--text-0)] mb-8">
            Có ý tưởng tuyệt vời?
          </h2>
          <p className="max-w-xl mx-auto text-[var(--text-1)] font-light mb-12">
            Hãy cùng chúng tôi biến ý tưởng của bạn thành hiện thực
          </p>
          <Button href="/lien-he" reveal={true}>
            Bắt đầu dự án
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}