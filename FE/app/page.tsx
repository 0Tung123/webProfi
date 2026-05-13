import Container from "@/app/components/common/Container";
import ScrollReveal from "@/app/components/common/ScrollReveal";
import Navbar from "@/app/components/layout/Navbar";
import HeroSection from "@/app/sections/HeroSection";

import { SERVICES, PROJECTS, CLIENTS } from "@/app/lib/data";

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />
      <HeroSection />

      <section id="services" className="py-20 md:py-28">
        <Container>
          <p
            data-reveal
            className="text-sm uppercase tracking-[0.22em] text-[var(--text-2)]"
          >
            Services
          </p>
          <div className="mt-8 space-y-5">
            {SERVICES.map((service) => (
              <h2
                key={service}
                data-reveal
                className="font-(family-name:--font-display) text-4xl font-semibold tracking-normal md:text-6xl"
              >
                {service}
              </h2>
            ))}
          </div>
        </Container>
      </section>

      <section id="projects" className="py-20 md:py-28">
        <Container>
          <p
            data-reveal
            className="text-sm uppercase tracking-[0.22em] text-[var(--text-2)]"
          >
            Projects
          </p>
          <div className="mt-8 space-y-8">
            {PROJECTS.map((project) => (
              <p
                key={project}
                data-reveal
                className="max-w-5xl font-(family-name:--font-display) text-3xl leading-tight tracking-normal text-[var(--text-0)] md:text-5xl"
              >
                {project}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section id="about" className="py-20 md:py-28">
        <Container>
          <p
            data-reveal
            className="max-w-6xl font-(family-name:--font-display) text-4xl leading-tight tracking-normal text-[var(--text-0)] md:text-6xl"
          >
            We focus on clear ideas, careful typography, smooth motion, and
            digital experiences that feel intentional.
          </p>
        </Container>
      </section>

      <section id="clients" className="py-20 md:py-28">
        <Container>
          <p
            data-reveal
            className="text-sm uppercase tracking-[0.22em] text-[var(--text-2)]"
          >
            Clients
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 text-lg text-[var(--text-1)] md:grid-cols-4">
            {CLIENTS.map((client) => (
              <p key={client} data-reveal>
                {client}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="pb-28 pt-20 md:pb-40 md:pt-28">
        <Container>
          <p
            data-reveal
            className="max-w-5xl font-(family-name:--font-display) text-4xl leading-tight tracking-normal md:text-6xl"
          >
            Let&apos;s build your next digital experience.
          </p>
          <a
            data-reveal
            href="mailto:hello@hatstudio.dev"
            className="mt-8 inline-block text-lg text-[var(--accent-soft)]"
          >
            hello@hatstudio.dev
          </a>
        </Container>
      </section>
    </main>
  );
}
