import { NAV_ITEMS } from "@/app/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <a
            href="#top"
            className="font-(family-name:--font-display) text-2xl font-semibold text-white"
            suppressHydrationWarning
          >
            hat<span className="text-[#d5af34]">&apos;</span>studio
          </a>

          {/* Nav Links */}
          <nav className="flex flex-wrap gap-6 text-sm text-[var(--text-2)]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#d5af34]"
                suppressHydrationWarning
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-[rgba(255,255,255,0.06)]" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-2)]">
          <p>&copy; {new Date().getFullYear()} HATMedia. All rights reserved.</p>
          <p>
            Crafted with <span className="text-[#d5af34]">♥</span> in Vietnam
          </p>
        </div>
      </div>
    </footer>
  );
}
