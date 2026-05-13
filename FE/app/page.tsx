import ScrollReveal from "@/app/components/common/ScrollReveal";
import Navbar from "@/app/components/layout/Navbar";
import HeroSection from "@/app/sections/HeroSection";
import AboutSection from "@/app/sections/AboutSection";
import ServicesSection from "@/app/sections/ServicesSection";
import ProjectsSection from "@/app/sections/ProjectsSection";
import BenefitsSection from "@/app/sections/BenefitsSection";
import ProcessSection from "@/app/sections/ProcessSection";
import TestimonialsSection from "@/app/sections/TestimonialsSection";
import SkillsSection from "@/app/sections/SkillsSection";
import CtaSection from "@/app/sections/CtaSection";
import Footer from "@/app/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative">
      <ScrollReveal />
      <Navbar />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Giới thiệu */}
      <AboutSection />

      {/* 3. Dịch vụ (3 cột) */}
      <ServicesSection />

      {/* 4. Dự án */}
      <ProjectsSection />

      {/* 5. Lợi ích */}
      <BenefitsSection />

      {/* 6. Cách hoạt động */}
      <ProcessSection />

      {/* 7. Đánh giá */}
      <TestimonialsSection />

      {/* 8. Danh sách nghề */}
      <SkillsSection />

      {/* 9. Kêu gọi hành động */}
      <CtaSection />

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
