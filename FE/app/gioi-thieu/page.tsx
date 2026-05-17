"use client";

import { memo } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Button from "@/app/components/common/Button";

// Team member data - Update with real data when available
const TEAM_MEMBERS = [
  {
    id: "founder",
    name: "Lê Xuân Hải",
    role: "Founder & Creative Director",
    image: "/images/team/founder.jpg",
    socials: {
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "designer1",
    name: "Nguyễn Thị Minh Phương",
    role: "Senior UI/UX Designer",
    image: null, // Placeholder - will show wireframe
    socials: {
      facebook: "https://facebook.com",
      behance: "https://behance.net",
    },
  },
  {
    id: "developer1",
    name: "Trần Văn Hoàng",
    role: "Lead Frontend Developer",
    image: null,
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "photographer1",
    name: "Lê Thị Hương",
    role: "Photography Lead",
    image: null,
    socials: {
      instagram: "https://instagram.com",
      behance: "https://behance.net",
    },
  },
  {
    id: "designer2",
    name: "Phạm Anh Tuấn",
    role: "Brand Designer",
    image: null,
    socials: {
      behance: "https://behance.net",
      dribbble: "https://dribbble.com",
    },
  },
  {
    id: "developer2",
    name: "Ngô Văn Long",
    role: "Full Stack Developer",
    image: null,
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
];

const VALUES = [
  {
    title: "Sáng tạo không giới hạn",
    desc: "Chúng tôi luôn tìm kiếm những cách tiếp cận mới mẻ và đột phá.",
  },
  {
    title: "Chất lượng trên hết",
    desc: "Mỗi dự án đều được đầu tư công phu và tỉ mỉ đến từng chi tiết.",
  },
  {
    title: "Đồng hành bền vững",
    desc: "Chúng tôi xây dựng mối quan hệ lâu dài với khách hàng.",
  },
  {
    title: "Cảm xúc và trải nghiệm",
    desc: "Mỗi sản phẩm đều chạm đến cảm xúc người dùng.",
  },
];

function TeamCard({ member, index }: { member: typeof TEAM_MEMBERS[0]; index: number }) {
  const { ref, isVisible } = useIntersectionObserver({ once: true, threshold: 0.2 });

  const hasImage = member.image !== null;

  return (
    <div
      ref={ref}
      className={`reveal group relative overflow-hidden rounded-[2rem] bg-[var(--bg-2)] ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 0.15}s` }}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        {hasImage ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          // Wireframe placeholder
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/50 dark:bg-white/10 flex items-center justify-center mb-4">
              <span className="text-3xl md:text-4xl font-bold text-gray-400 dark:text-gray-500">
                {member.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <h3 className="text-white font-bold text-[20px] md:text-[24px] mb-1">{member.name}</h3>
          <p className="text-white/80 text-xs md:text-sm font-light italic mb-3">{member.role}</p>

          {/* Social links */}
          <div className="flex gap-3">
            {Object.entries(member.socials).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label={platform}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  {platform === "facebook" && (
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  )}
                  {platform === "linkedin" && (
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 11-2 2 2 2 0 012-2z" />
                  )}
                  {platform === "github" && (
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  )}
                  {platform === "instagram" && (
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m2 2h4.4a3.8 3.8 0 013.8 3.8v4.4a3.8 3.8 0 01-3.8 3.8H9.8A3.8 3.8 0 016 14.2V9.8A3.8 3.8 0 019.8 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  )}
                  {platform === "behance" && (
                    <path d="M22 7h-7v-.01A4.99 4.99 0 0119.59 2.5 5 5 0 0117 7.5V22h-3V7.5A5 5 0 0112 2.5 5 5 0 019.59 7.49V22h-3V2h7a5 5 0 015 5zM3 19.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5zM10 19.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                  )}
                  {platform === "dribbble" && (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.66.51-3.2 1.38-4.49 2.48 1.17 5.42 1.82 8.62 1.91-.45 1.39-.7 2.87-.7 4.41 0 .54.02 1.08.06 1.61-2.22.79-4.1 1.71-5.36 2.56zm7.38-3.56c-1.27-.86-3.18-1.78-5.43-2.56.06-.6.09-1.21.09-1.84 0-1.8-.31-3.51-.86-5.08 3.29.49 6.29 2.13 7.91 4.48a7.97 7.97 0 01-1.71 5z" />
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Border */}
      <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
    </div>
  );
}

export default function AboutPage() {
  const { ref: heroRef, isVisible: heroVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: teamRef, isVisible: teamVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: valuesRef, isVisible: valuesVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-[var(--bg-0)]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div ref={heroRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40 relative z-10">
          <div className="max-w-4xl">
            <div className={`reveal mb-8 ${heroVisible ? "is-visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <span className="inline-block px-4 py-2 rounded-full border border-[var(--accent)]/30 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                About Us
              </span>
            </div>

            <h1
              className={`reveal font-display text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold text-[var(--text-0)] leading-[1.05] tracking-tight mb-8 ${heroVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              Về HAT Studio
            </h1>

            <p
              className={`reveal max-w-2xl text-[18px] md:text-[20px] text-[var(--text-1)] font-light leading-relaxed ${heroVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: "0.3s" }}
            >
              Chúng tôi là đội ngũ những người sáng tạo đam mê, biến ý tưởng thành trải nghiệm digital
              đáng nhớ. Mỗi dự án là một câu chuyện được kể bằng ngôn ngữ của thiết kế và công nghệ.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-20 md:py-32 overflow-hidden">
        <div ref={teamRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <span className={`reveal text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-4 block ${teamVisible ? "is-visible" : ""}`}>
                Đội ngũ của chúng tôi
              </span>
              <h2
                className={`reveal text-[32px] md:text-[56px] font-display font-bold text-[var(--text-0)] leading-[1.1] tracking-tight ${teamVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.1s" }}
              >
                Những người kiến tạo
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--bg-2)]">
        <div ref={valuesRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <span className={`reveal text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-4 block ${valuesVisible ? "is-visible" : ""}`}>
                Core Values
              </span>
              <h2
                className={`reveal text-[32px] md:text-[56px] font-display font-bold text-[var(--text-0)] leading-[1.1] tracking-tight ${valuesVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.1s" }}
              >
                Giá trị chúng tôi mang lại
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {VALUES.map((value, index) => (
              <div
                key={index}
                className={`reveal group p-8 md:p-12 rounded-[2rem] bg-[var(--bg-0)] border border-[var(--bg-2)] hover:border-[var(--accent)]/30 transition-all duration-500 ${valuesVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                    <span className="text-[var(--accent)] font-bold text-lg">{`0${index + 1}`}</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] md:text-[24px] font-bold text-[var(--text-0)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-[var(--text-1)] font-light leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40 text-center">
          <h2 className="text-[32px] md:text-[48px] font-display font-bold text-[var(--text-0)] mb-8">
            Cùng nhau kiến tạo điều tuyệt vời
          </h2>
          <p className="max-w-xl mx-auto text-[var(--text-1)] font-light mb-12">
            Hãy để chúng tôi giúp bạn hiện thực hóa ý tưởng và tạo ra những trải nghiệm digital độc đáo
          </p>
          <Button href="/lien-he" reveal={true}>
            Liên hệ ngay
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}