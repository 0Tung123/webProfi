"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { NAV_ITEMS, CONTACT_INFO, OFFICE_LOCATIONS, SOCIAL_LINKS, ABOUT_CONTENT } from "@/app/lib/data";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Set initial coordinates to button position
  useEffect(() => {
    const updateInitialCoords = () => {
      const btn = buttonRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setClickCoords({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    updateInitialCoords();
    window.addEventListener('resize', updateInitialCoords);
    return () => window.removeEventListener('resize', updateInitialCoords);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!mobileMenuOpen) {
      setClickCoords({ x: e.clientX, y: e.clientY });
    }
  };

  // Prevent scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    setClickCoords({ x: e.clientX, y: e.clientY });
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Scroll hide/show with Lenis compatibility
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setHidden(currentScrollY > lastScrollY && currentScrollY > 80);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking with Intersection Observer
  useEffect(() => {
    const sections = NAV_ITEMS
      .filter((item) => item.href.startsWith("#"))
      .map((item) => {
        try {
          return document.querySelector(item.href);
        } catch (e) {
          console.error("Failed to query selector for", item.href, e);
          return null;
        }
      })
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -50% 0px" }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Handle navigation - page links vs anchor scroll
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, isPage: boolean) => {
    if (isPage) {
      // Let Link handle page navigation
      setMobileMenuOpen(false);
    } else {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (href.startsWith("#")) {
        try {
          const target = document.querySelector(href);
          if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        } catch (error) {
          console.error("Failed to scroll to target:", href, error);
        }
      }
    }
  }, []);

  return (
    <>
      <header
      className={`fixed left-0 top-0 z-50 w-full transition-transform duration-[450ms] ease-[var(--ease-standard)] ${
        hidden ? "-translate-y-[112px]" : "translate-y-0"
      }`}
    >
      <div className="flex h-[88px] w-full items-center justify-between border-b border-surface bg-[rgba(252,251,248,0.85)] px-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl md:h-[100px] md:px-16">
        <Link
          href="/"
          className="relative h-10 w-40 md:h-12 md:w-48 transition-transform duration-300 hover:scale-105"
          aria-label="HAT Studio"
        >
          <Image
            src="/logo/ngang-slogan.png"
            alt="HAT Studio"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isPageLink = item.href === "/gioi-thieu" || item.href === "/du-an" || item.href === "/lien-he";
              return (
                isPageLink ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      "text-[var(--text-1)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, false)}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      "text-[var(--text-1)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {item.label}
                  </a>
                )
              );
            })}
          </nav>

          <button
            ref={buttonRef}
            onClick={toggleMenu}
            onMouseEnter={handleMouseEnter}
            className="group relative z-[60] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[var(--accent)] shadow-[0_8px_30px_rgba(213,175,52,0.4)] transition-all duration-500 hover:scale-110 active:scale-95"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`h-[2px] w-full bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[5px] w-full' : 'group-hover:w-3/4'}`} />
              <span className={`h-[2px] w-full bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          ref={buttonRef}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          onMouseEnter={handleMouseEnter}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] shadow-[0_8px_20px_rgba(213,175,52,0.25)] transition-all duration-300 active:scale-90"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.2 w-4">
            <span className={`h-[1.5px] w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`h-[1.5px] w-full bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
          </div>
        </button>
      </div>

    </header>

    {/* Full Screen Menu Overlay */}
    <div
      className={`fixed inset-0 z-[100] flex flex-col bg-[var(--accent)] text-white transition-all duration-[2000ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
        mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{
        clipPath: mobileMenuOpen
          ? `circle(150% at ${clickCoords.x}px ${clickCoords.y}px)`
          : `circle(0% at ${clickCoords.x > 0 ? `${clickCoords.x}px` : '100%'} ${clickCoords.y > 0 ? `${clickCoords.y}px` : '0%'})`,
      }}
    >
      {/* Menu Content Wrapper */}
      <div className="relative flex h-full w-full flex-col px-6 pt-32 md:px-16 md:pt-40 lg:px-24">
        {/* Close Button Inside Overlay */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute right-6 top-6 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 md:right-16 md:top-6"
          aria-label="Close menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span className="h-[2px] w-full bg-white rounded-full rotate-45 translate-y-[5px]" />
            <span className="h-[2px] w-full bg-white rounded-full -rotate-45 -translate-y-[5px]" />
          </div>
        </button>

        <div className="grid h-full w-full grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Navigation & Info */}
          <div className="flex flex-col justify-between lg:col-span-4 h-full pb-12 lg:pb-20">
            <div className="flex flex-col gap-2">
              <nav className="flex flex-col gap-2 md:gap-4">
                {NAV_ITEMS.map((item, index) => {
                  const isPageLink = item.href === "/gioi-thieu" || item.href === "/du-an" || item.href === "/lien-he";
                  return (
                    isPageLink ? (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative overflow-hidden text-3xl font-medium tracking-tight md:text-5xl transition-all duration-[1000ms] hover:pl-4 opacity-70 hover:opacity-100`}
                        style={{ transitionDelay: `${index * 120 + 1000}ms` }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, false)}
                        className={`group relative overflow-hidden text-3xl font-medium tracking-tight md:text-5xl transition-all duration-[1000ms] hover:pl-4 opacity-70 hover:opacity-100`}
                        style={{ transitionDelay: `${index * 120 + 1000}ms` }}
                      >
                        {item.label}
                      </a>
                    )
                  );
                })}
              </nav>
              <div className="mt-8 h-[1px] w-24 bg-white/30" />
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Điện thoại</span>
                  {CONTACT_INFO.phones.map(phone => (
                    <a key={phone} href={`tel:${phone}`} className="text-sm md:text-base hover:text-white/80 transition-colors">{phone}</a>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Email</span>
                  <a href={`mailto:${CONTACT_INFO.emails[0]}`} className="text-sm md:text-base hover:text-white/80 transition-colors">{CONTACT_INFO.emails[0]}</a>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Văn phòng</span>
                  <p className="max-w-[280px] text-xs md:text-sm leading-relaxed opacity-90">{OFFICE_LOCATIONS[0].address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Large Slogan */}
          <div className="hidden items-center lg:col-span-8 lg:flex">
            <h2 className="max-w-3xl text-4xl font-light leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              {ABOUT_CONTENT.title.split('.').map((part, i) => (
                <span key={i} className="block mb-2">{part}</span>
              ))}
            </h2>
          </div>
        </div>

        {/* Bottom Row: Social Links */}
        <div className="mt-auto flex w-full items-center justify-between border-t border-white/10 py-8 text-xs font-bold uppercase tracking-[0.2em]">
          <div className="flex gap-8">
            {SOCIAL_LINKS.map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                {link.label}
              </a>
            ))}
          </div>
          <div className="hidden md:block opacity-40">
            © {new Date().getFullYear()} HAT Studio
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
