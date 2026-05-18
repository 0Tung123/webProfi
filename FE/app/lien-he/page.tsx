"use client";

import { memo, useEffect, useState } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import ContactForm from "@/app/components/ContactForm";
import { contactInfoService, ContactInfo } from "@/app/lib/api/contact-info.service";

function ContactInfoCard({
  icon,
  title,
  children,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  const { ref, isVisible } = useIntersectionObserver({ once: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`reveal p-8 md:p-10 rounded-[2rem] bg-[var(--bg-2)] border border-transparent hover:border-[var(--accent)]/20 transition-all duration-500 ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-[18px] md:text-[20px] font-bold text-[var(--text-0)] mb-4">{title}</h3>
          <div className="space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ label, href, icon, index }: { label: string; href: string; icon: React.ReactNode; index: number }) {
  const { ref, isVisible } = useIntersectionObserver({ once: true, threshold: 0.2 });

  return (
    <a
      ref={ref}
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--bg-2)] transition-all duration-300 ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <div className="w-10 h-10 rounded-full bg-[var(--bg-2)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
        <div className="w-5 h-5 text-[var(--text-1)] group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <span className="text-sm font-medium text-[var(--text-1)] hover:text-[var(--accent)] transition-colors">
        {label}
      </span>
    </a>
  );
}

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /> },
  { label: "Behance", href: "https://behance.net", icon: <path d="M22 7h-7v-.01A4.99 4.99 0 0119.59 2.5 5 5 0 0117 7.5V22h-3V7.5A5 5 0 0112 2.5 5 5 0 019.59 7.49V22h-3V2h7a5 5 0 015 5zM3 19.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5zM10 19.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" /> },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 11-2 2 2 2 0 012-2z" /> },
  { label: "Instagram", href: "https://instagram.com", icon: <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m2 2h4.4a3.8 3.8 0 013.8 3.8v4.4a3.8 3.8 0 01-3.8 3.8H9.8A3.8 3.8 0 016 14.2V9.8A3.8 3.8 0 019.8 4z" stroke="currentColor" strokeWidth="2" fill="none" /> },
];

export default function ContactPage() {
  const { ref: heroRef, isVisible: heroVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: infoRef, isVisible: infoVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: formRef, isVisible: formVisible } = useIntersectionObserver({ threshold: 0.1 });

  const [contactInfos, setContactInfos] = useState<ContactInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setIsLoading(true);
        const data = await contactInfoService.getAll();
        setContactInfos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch contact info");
        console.error("Failed to fetch contact info:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const phones = contactInfos.filter((c) => c.type === "phone");
  const emails = contactInfos.filter((c) => c.type === "email");
  const offices = contactInfos.filter((c) => c.type === "office");

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
          Failed to load contact info: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-0)]">
      <Navbar />

      <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div ref={heroRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40 relative z-10">
          <div className="max-w-4xl">
            <div className={`reveal mb-8 ${heroVisible ? "is-visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <span className="inline-block px-4 py-2 rounded-full border border-[var(--accent)]/30 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                Get In Touch
              </span>
            </div>

            <h1
              className={`reveal font-display text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold text-[var(--text-0)] leading-[1.05] tracking-tight mb-8 ${heroVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              Liên hệ
            </h1>

            <p
              className={`reveal max-w-2xl text-[18px] md:text-[20px] text-[var(--text-1)] font-light leading-relaxed ${heroVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: "0.3s" }}
            >
              Sẵn sàng bắt đầu dự án? Hãy trò chuyện với chúng tôi về ý tưởng của bạn.
              Đội ngũ HAT Studio luôn sẵn sàng đồng hành cùng bạn.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div ref={infoRef} className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
            <div className="space-y-6">
              <ContactInfoCard
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
                title="Điện thoại"
                index={0}
              >
                {phones.length > 0 ? (
                  phones.map((item) => (
                    <a key={item.contactInfoId} href={`tel:${item.value}`} className="block text-[var(--text-1)] hover:text-[var(--accent)] transition-colors">
                      {item.value}
                    </a>
                  ))
                ) : (
                  <p className="text-[var(--text-1)]">Chưa có thông tin liên hệ</p>
                )}
              </ContactInfoCard>

              <ContactInfoCard
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                title="Email"
                index={1}
              >
                {emails.length > 0 ? (
                  emails.map((item) => (
                    <a key={item.contactInfoId} href={`mailto:${item.value}`} className="block text-[var(--text-1)] hover:text-[var(--accent)] transition-colors">
                      {item.value}
                    </a>
                  ))
                ) : (
                  <p className="text-[var(--text-1)]">Chưa có thông tin email</p>
                )}
              </ContactInfoCard>

              <ContactInfoCard
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                title="Văn phòng"
                index={2}
              >
                {offices.length > 0 ? (
                  offices.map((item) => (
                    <div key={item.contactInfoId} className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-1">
                        {item.label}
                      </span>
                      <p className="text-[var(--text-1)]">{item.value}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[var(--text-1)]">Chưa có thông tin văn phòng</p>
                )}
              </ContactInfoCard>
            </div>

            <div className="space-y-8">
              <div className={`reveal p-8 rounded-[2rem] bg-[var(--bg-2)] ${infoVisible ? "is-visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
                <h3 className="text-[18px] md:text-[20px] font-bold text-[var(--text-0)] mb-6">Theo dõi chúng tôi</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SOCIAL_LINKS.map((link, index) => (
                    <SocialLink key={link.label} label={link.label} href={link.href} icon={link.icon} index={index} />
                  ))}
                </div>
              </div>

              <div
                className={`reveal h-64 rounded-[2rem] overflow-hidden bg-[var(--bg-2)] relative ${infoVisible ? "is-visible" : ""}`}
                style={{ transitionDelay: "0.2s" }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-1)]">
                  <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="text-sm font-medium">Open in Maps</span>
                </div>
              </div>
            </div>
          </div>

          <div ref={formRef} className={`max-w-3xl mx-auto ${formVisible ? "is-visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <div className="text-center mb-12">
              <h2 className="text-[32px] md:text-[40px] font-display font-bold text-[var(--text-0)] mb-4">
                Gửi tin nhắn
              </h2>
              <p className="text-[var(--text-1)] font-light">
                Điền vào form dưới đây và chúng tôi sẽ liên hệ lại với bạn trong vòng 24h
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 overflow-hidden bg-[var(--accent)]">
        <div className="mx-auto w-full max-w-[1920px] px-6 md:px-24 lg:px-40 text-center">
          <h2 className="text-[32px] md:text-[48px] font-display font-bold text-white mb-6">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="max-w-xl mx-auto text-white/90 font-light mb-10">
            Gọi ngay cho chúng tôi để được tư vấn miễn phí về dự án của bạn
          </p>
          <a
            href={phones.length > 0 ? `tel:${phones[0].value}` : "tel:("+84+") 123 456 789"}
            className="inline-flex items-center gap-4 bg-white text-[var(--accent)] px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {phones.length > 0 ? phones[0].value : "(+84) 123 456 789"}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}