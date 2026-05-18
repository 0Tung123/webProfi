import Navbar from "@/app/components/layout/Navbar";
import HeroSection from "@/app/sections/HeroSection";
import AboutSection from "@/app/sections/AboutSection";
import ServicesSection from "@/app/sections/ServicesSection";
import ProjectsSection from "@/app/sections/ProjectsSection";
import BenefitsSection from "@/app/sections/BenefitsSection";
import ProcessSection from "@/app/sections/ProcessSection";
import ContactForm from "@/app/components/ContactForm";
import Footer from "@/app/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Giới thiệu */}
      <AboutSection />

      {/* 3. Dịch vụ */}
      <ServicesSection />

      {/* 4. Dự án */}
      <ProjectsSection />

      {/* 5. Lợi ích */}
      <BenefitsSection />

      {/* 6. Cách hoạt động & Đối tác */}
      <ProcessSection />

      {/* 7. Contact Form */}
      <ContactForm />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
