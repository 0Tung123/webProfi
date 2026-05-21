"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Button from "@/app/components/common/Button";
import { teamService, TeamMember } from "@/app/lib/api/team.service";
import { clientsService } from "@/app/lib/api/clients.service";
import { CLIENTS } from "@/app/lib/data";
import { SERVICES } from "@/app/lib/data";
import { ABOUT_CONTENT } from "@/app/lib/data";

/* ========================================================================
   Team Card Component
   ======================================================================== */
function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const { ref, isVisible } = useIntersectionObserver({ once: true, threshold: 0.2 });

  const hasImage = member.image !== null && member.image !== "";

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />;
      case "linkedin":
        return <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 11-2 2 2 2 0 012-2z" />;
      case "github":
        return <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />;
      case "instagram":
        return <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m2 2h4.4a3.8 3.8 0 013.8 3.8v4.4a3.8 3.8 0 01-3.8 3.8H9.8A3.8 3.8 0 016 14.2V9.8A3.8 3.8 0 019.8 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />;
      case "behance":
        return <path d="M22 7h-7v-.01A4.99 4.99 0 0119.59 2.5 5 5 0 0117 7.5V22h-3V7.5A5 5 0 0112 2.5 5 5 0 019.59 7.49V22h-3V2h7a5 5 0 015 5zM3 19.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5zM10 19.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />;
      case "dribbble":
        return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.66.51-3.2 1.38-4.49 2.48 1.17 5.42 1.82 8.62 1.91-.45 1.39-.7 2.87-.7 4.41 0 .54.02 1.08.06 1.61-2.22.79-4.1 1.71-5.36 2.56zm7.38-3.56c-1.27-.86-3.18-1.78-5.43-2.56.06-.6.09-1.21.09-1.84 0-1.8-.31-3.51-.86-5.08 3.29.49 6.29 2.13 7.91 4.48a7.97 7.97 0 01-1.71 5z" />;
      default:
        return null;
    }
  };

  const socialEntries = member.socials ? Object.entries(member.socials as Record<string, string>) : [];

  return (
    <div
      ref={ref}
      className={`reveal group relative overflow-hidden rounded-[2rem] bg-[var(--bg-2)] ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 0.15}s` }}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        {hasImage && member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/50 dark:bg-white/10 flex items-center justify-center mb-4">
              <span className="text-3xl md:text-4xl font-bold text-gray-400 dark:text-gray-500">
                {member.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
        <div className="transform translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <h3 className="text-white font-bold text-[15px] sm:text-[18px] md:text-[24px] mb-0.5 md:mb-1">{member.name}</h3>
          <p className="text-white/85 text-[10px] sm:text-xs md:text-sm font-light italic mb-2 md:mb-3">{member.role}</p>

          <div className="flex gap-2.5 md:gap-3">
            {socialEntries.map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label={platform}
              >
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  {getSocialIcon(platform)}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
    </div>
  );
}

/* ========================================================================
   Impact Stat Item
   ======================================================================== */
function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
  const { ref, isVisible } = useIntersectionObserver({ once: true, threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={`reveal flex flex-col items-center text-center ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <span className="text-[36px] sm:text-[40px] md:text-[56px] font-display font-bold text-[var(--accent)] leading-none mb-1.5 md:mb-2">
        {value}
      </span>
      <span className="text-[9px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[var(--text-2)] font-semibold leading-relaxed">
        {label}
      </span>
    </div>
  );
}

/* ========================================================================
   Service Card Mini
   ======================================================================== */
function ServiceCardMini({
  title,
  desc,
  image,
  index,
}: {
  title: string;
  desc: string;
  image: string;
  index: number;
}) {
  const { ref, isVisible } = useIntersectionObserver({ once: true, threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`reveal group relative p-6 md:p-8 rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--bg-0)] hover:border-[var(--accent)]/40 hover:shadow-lg transition-all duration-500 ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Background image ghost */}
      <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden opacity-[0.06] pointer-events-none">
        {image.match(/\.(mp4|mov|webm|ogg|mkv|avi)$|video/i) ? (
          <div className="w-full h-full bg-gradient-to-br from-[var(--accent)]/20 to-transparent" />
        ) : (
          <Image src={image} alt="" fill className="object-cover" sizes="50vw" />
        )}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
            <span className="text-[var(--accent)] font-bold text-sm">{`0${index + 1}`}</span>
          </div>
          <div className="flex-1 h-px bg-[var(--surface-border)]" />
        </div>

        <h3 className="text-[18px] md:text-[22px] font-bold text-[var(--text-0)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[13px] md:text-[14px] text-[var(--text-1)] font-light leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ========================================================================
   Main Page
   ======================================================================== */
export default function AboutPage() {
  const { ref: heroRef, isVisible: heroVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: storyRef, isVisible: storyVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: servicesRef, isVisible: servicesVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: teamRef, isVisible: teamVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: valuesRef, isVisible: valuesVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: partnersRef, isVisible: partnersVisible } = useIntersectionObserver({ threshold: 0.1 });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [dynamicClients, setDynamicClients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [members, clients] = await Promise.all([
          teamService.getAll(),
          clientsService.getAll(),
        ]);
        setTeamMembers(members);
        if (clients && clients.length > 0) {
          setDynamicClients(clients.map((c) => c.name));
        } else {
          setDynamicClients(CLIENTS);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        console.error("Failed to fetch About page data:", err);
        setDynamicClients(CLIENTS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayClients = dynamicClients.length > 0 ? dynamicClients : CLIENTS;

  const STATS = [
    { value: "10+", label: "Năm kinh nghiệm" },
    { value: "1000+", label: "Dự án hoàn thiện" },
    { value: "24+", label: "Đối tác chiến lược" },
    { value: "15+", label: "Thành viên" },
  ];

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
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md text-center">
          <p className="font-semibold mb-1">Không thể tải dữ liệu</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-0)]">
      <Navbar />

      {/* ================================================================
          SECTION 1: HERO — Enhanced with decorative weight
          ================================================================ */}
      <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Decorative background accents */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent)] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

        {/* Large background decorative text */}
        <div aria-hidden="true" className="absolute top-6 right-6 sm:top-12 sm:right-12 text-[120px] sm:text-[200px] md:text-[300px] font-display font-black text-black/[0.02] select-none leading-none pointer-events-none">
          About
        </div>

        <div ref={heroRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40 relative z-10">
          {/* Top badge row */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <div className={`reveal inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 ${heroVisible ? "is-visible" : ""}`}>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                About Us
              </span>
            </div>
            <div className={`reveal text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-2)] ${heroVisible ? "is-visible" : ""}`} style={{ transitionDelay: "0.05s" }}>
              — Since {ABOUT_CONTENT.since}
            </div>
          </div>

          {/* Title */}
          <h1
            className={`reveal font-display text-[36px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold text-[var(--text-0)] leading-[1.15] md:leading-[1.05] tracking-tight mb-8 max-w-5xl ${heroVisible ? "is-visible" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            Về <span className="text-[var(--accent)]">HAT</span> Studio
          </h1>

          {/* Description */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
            <p
              className={`reveal max-w-2xl text-[17px] md:text-[19px] text-[var(--text-1)] font-light leading-relaxed ${heroVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: "0.25s" }}
            >
              Chúng tôi là đội ngũ những người sáng tạo đam mê, biến ý tưởng thành trải nghiệm digital
              đáng nhớ. Mỗi dự án là một câu chuyện được kể bằng ngôn ngữ của thiết kế và công nghệ.
            </p>

            {/* Quick CTA */}
            <div className={`reveal flex-shrink-0 ${heroVisible ? "is-visible" : ""}`} style={{ transitionDelay: "0.35s" }}>
              <Link
                href="/lien-he"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--surface-border)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300 text-sm font-semibold text-[var(--text-1)]"
              >
                Bắt đầu dự án
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Decorative divider */}
          <div className={`reveal mt-16 flex items-center gap-4 ${heroVisible ? "is-visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
            <div className="flex-1 h-px bg-[var(--surface-border)]" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--accent)]/50" />
              <div className="w-2 h-2 rounded-full bg-[var(--accent)]/20" />
            </div>
            <div className="flex-1 h-px bg-[var(--surface-border)]" />
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2: IMPACT STATS
          ================================================================ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 py-10 md:py-16 border-t border-b border-[var(--surface-border)]">
            {STATS.map((stat, i) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3: OUR STORY
          ================================================================ */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-1)]">
        {/* Decorative background */}
        <div aria-hidden="true" className="absolute top-1/2 -left-48 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.03] blur-[140px] rounded-full pointer-events-none" />

        <div ref={storyRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
            {/* Left: Story text */}
            <div className="flex-1 max-w-2xl">
              <div className={`reveal flex items-center gap-4 mb-8 ${storyVisible ? "is-visible" : ""}`}>
                <span className="w-8 h-px bg-[var(--accent)]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                  Câu chuyện của chúng tôi
                </span>
              </div>

              <h2
                className={`reveal font-display text-[32px] md:text-[52px] font-bold text-[var(--text-0)] leading-[1.1] tracking-tight mb-8 ${storyVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.1s" }}
              >
                {ABOUT_CONTENT.title}
              </h2>

              <p
                className={`reveal text-[16px] md:text-[18px] text-[var(--text-1)] font-light leading-relaxed ${storyVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.2s" }}
              >
                {ABOUT_CONTENT.desc}
              </p>

              <div
                className={`reveal mt-10 flex items-center gap-4 p-6 rounded-2xl bg-[var(--bg-0)] border border-[var(--surface-border)] ${storyVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.3s" }}
              >
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {ABOUT_CONTENT.since}
                </div>
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.15em] text-[var(--accent)]">
                    Thành lập
                  </p>
                  <p className="text-[15px] text-[var(--text-1)] font-light mt-0.5">
                    Khởi đầu hành trình kiến tạo giá trị từ năm {ABOUT_CONTENT.since}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Visual block — quote + decorative */}
            <div className="flex-1 max-w-lg lg:mt-16">
              <div
                className={`reveal relative p-6 sm:p-10 md:p-14 rounded-[2rem] bg-[var(--bg-0)] border border-[var(--surface-border)] ${storyVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.25s" }}
              >
                {/* Decorative quotation mark */}
                <div aria-hidden="true" className="absolute top-4 left-6 text-[80px] font-serif text-[var(--accent)]/10 leading-none select-none pointer-events-none">
                  &ldquo;
                </div>

                <div className="relative z-10">
                  <p className="text-[20px] md:text-[24px] font-serif italic text-[var(--text-0)] leading-relaxed mb-8">
                    &ldquo;Chúng tôi không chỉ kiến tạo sản phẩm số — chúng tôi đồng hành cùng thương hiệu để định hình giá trị và tạo ra những trải nghiệm chạm tới cảm xúc.&rdquo;
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-[var(--surface-border)]">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
                      H
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-[var(--text-0)]">Lê Xuân Hải</p>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--accent)] font-semibold">Founder &amp; Creative Director</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4: WHAT WE DO — Services preview
          ================================================================ */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div ref={servicesRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-20 gap-6">
            <div className="max-w-2xl">
              <div className={`reveal flex items-center gap-4 mb-6 ${servicesVisible ? "is-visible" : ""}`}>
                <span className="w-8 h-px bg-[var(--accent)]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                  Dịch vụ của chúng tôi
                </span>
              </div>
              <h2
                className={`reveal text-[32px] md:text-[48px] font-display font-bold text-[var(--text-0)] leading-[1.1] tracking-tight ${servicesVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.1s" }}
              >
                Chúng tôi có thể giúp gì cho bạn?
              </h2>
            </div>
            <Link
              href="/lien-he"
              className={`reveal flex-shrink-0 group inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.15em] text-[var(--accent)] hover:text-[var(--accent-deep)] transition-colors ${servicesVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              Xem tất cả dịch vụ
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCardMini
                key={service.title}
                title={service.title}
                desc={service.desc}
                image={service.image}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5: TEAM
          ================================================================ */}
      <section id="team" className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-1)]">
        <div ref={teamRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <div className={`reveal flex items-center gap-4 mb-6 ${teamVisible ? "is-visible" : ""}`}>
                <span className="w-8 h-px bg-[var(--accent)]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                  Đội ngũ của chúng tôi
                </span>
              </div>
              <h2
                className={`reveal text-[32px] md:text-[56px] font-display font-bold text-[var(--text-0)] leading-[1.1] tracking-tight ${teamVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.1s" }}
              >
                Những người kiến tạo
              </h2>
              <p
                className={`reveal mt-4 text-[15px] md:text-[16px] text-[var(--text-2)] font-light max-w-xl leading-relaxed ${teamVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.15s" }}
              >
                Mỗi thành viên là một mảnh ghép quan trọng, cùng nhau tạo nên bức tranh sáng tạo hoàn chỉnh.
              </p>
            </div>
          </div>

          {teamMembers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--text-2)] font-light">Chưa có thành viên nào được thêm.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {teamMembers.map((member, index) => (
                <TeamCard key={member.teamMemberId} member={member} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          SECTION 6: CORE VALUES (enhanced from original)
          ================================================================ */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div ref={valuesRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <div className={`reveal flex items-center gap-4 mb-6 ${valuesVisible ? "is-visible" : ""}`}>
                <span className="w-8 h-px bg-[var(--accent)]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                  Core Values
                </span>
              </div>
              <h2
                className={`reveal text-[32px] md:text-[56px] font-display font-bold text-[var(--text-0)] leading-[1.1] tracking-tight ${valuesVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.1s" }}
              >
                Giá trị cốt lõi
              </h2>
              <p
                className={`reveal mt-4 text-[15px] md:text-[16px] text-[var(--text-2)] font-light max-w-xl leading-relaxed ${valuesVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.15s" }}
              >
                Những nguyên tắc định hình mọi quyết định và sản phẩm của chúng tôi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: "Sáng tạo không giới hạn",
                desc: "Chúng tôi luôn tìm kiếm những cách tiếp cận mới mẻ và đột phá, không ngừng thử nghiệm để mang đến những giải pháp độc bản nhất.",
              },
              {
                title: "Chất lượng trên hết",
                desc: "Mỗi dự án đều được đầu tư công phu và tỉ mỉ đến từng chi tiết nhỏ nhất. Chúng tôi không bao giờ thỏa hiệp với sự tầm thường.",
              },
              {
                title: "Đồng hành bền vững",
                desc: "Chúng tôi xây dựng mối quan hệ lâu dài với khách hàng dựa trên sự tin tưởng, minh bạch và cam kết mang lại giá trị thực.",
              },
              {
                title: "Cảm xúc và trải nghiệm",
                desc: "Mỗi sản phẩm đều được thiết kế để chạm đến cảm xúc người dùng, tạo ra những kết nối ý nghĩa vượt trên chức năng thuần túy.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`reveal group p-6 sm:p-8 md:p-10 rounded-[2rem] bg-[var(--bg-1)] border border-[var(--surface-border)] hover:border-[var(--accent)]/30 transition-all duration-500 hover:shadow-lg ${valuesVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors duration-500">
                    <span className="text-[var(--accent)] font-bold text-lg">{`0${index + 1}`}</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] md:text-[22px] font-bold text-[var(--text-0)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] text-[var(--text-1)] font-light leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 7: PARTNERS MARQUEE
          ================================================================ */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-1)]">
        <div ref={partnersRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40">
          <div className="flex flex-col items-center text-center mb-16 md:mb-20">
            <div className={`reveal flex items-center gap-4 mb-6 ${partnersVisible ? "is-visible" : ""}`}>
              <span className="w-8 h-px bg-[var(--accent)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                Trusted By
              </span>
              <span className="w-8 h-px bg-[var(--accent)]" />
            </div>
            <h2
              className={`reveal text-[32px] md:text-[48px] font-display font-bold text-[var(--text-0)] leading-[1.1] tracking-tight max-w-3xl ${partnersVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: "0.1s" }}
            >
              Đối tác đã tin tưởng đồng hành
            </h2>
          </div>

          {/* Marquee */}
          <div className={`reveal flex flex-col gap-6 md:gap-10 overflow-hidden py-8 -mx-6 lg:-mx-24 relative ${partnersVisible ? "is-visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <div className="absolute inset-y-0 left-0 w-12 md:w-40 bg-gradient-to-r from-[var(--bg-1)] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-40 bg-gradient-to-l from-[var(--bg-1)] to-transparent z-10 pointer-events-none" />

            {/* Row 1 */}
            <div className="flex animate-marquee-left whitespace-nowrap gap-12 md:gap-24 items-center">
              {[...displayClients, ...displayClients].map((client, i) => (
                <span
                  key={`${client}-1-${i}`}
                  className="text-[18px] md:text-[32px] font-display font-bold tracking-tighter text-[var(--text-0)] opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-500 cursor-default"
                >
                  {client}
                </span>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex animate-marquee-right whitespace-nowrap gap-12 md:gap-24 items-center">
              {[...displayClients.slice().reverse(), ...displayClients.slice().reverse()].map((client, i) => (
                <span
                  key={`${client}-2-${i}`}
                  className="text-[16px] md:text-[28px] font-serif italic text-[var(--text-1)] opacity-50 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-500 cursor-default"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          {/* Trust metrics */}
          <div className={`reveal mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 ${partnersVisible ? "is-visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
            {[
              { label: "Lĩnh vực chuyên sâu", value: "08+" },
              { label: "Khách hàng doanh nghiệp", value: "50+" },
              { label: "Tỉ lệ hài lòng", value: "98%" },
              { label: "Giải thưởng", value: "12+" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center md:items-start border-l border-[var(--surface-border)] pl-6"
              >
                <span className="text-[28px] md:text-[36px] font-display font-bold text-[var(--accent)]">{stat.value}</span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[var(--text-2)] font-semibold mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 8: CTA
          ================================================================ */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        <div className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="reveal is-visible">
              <span className="inline-block px-5 py-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-8">
                Bắt đầu ngay
              </span>
            </div>

            <h2 className="text-[32px] md:text-[56px] font-display font-bold text-[var(--text-0)] leading-[1.1] tracking-tight mb-6">
              Cùng nhau kiến tạo <br />
              <span className="text-[var(--accent)]">điều tuyệt vời</span>
            </h2>
            <p className="max-w-xl mx-auto text-[16px] md:text-[18px] text-[var(--text-1)] font-light leading-relaxed mb-12">
              Hãy để chúng tôi giúp bạn hiện thực hóa ý tưởng và tạo ra những trải nghiệm digital độc đáo
            </p>
            <Button href="/lien-he" reveal={true}>
              Liên hệ ngay
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Marquee animation styles */}
      <style jsx global>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
          width: max-content;
        }
        .animate-marquee-right {
          animation: marquee-right 50s linear infinite;
          width: max-content;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
