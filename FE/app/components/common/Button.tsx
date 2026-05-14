"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  reveal?: boolean;
};

export default function Button({
  children,
  className = "",
  reveal = false,
  ...props
}: ButtonProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, once: true });

  return (
    <a
      ref={reveal ? ref : undefined}
      className={`group relative inline-flex w-fit items-center gap-3 md:gap-4 rounded-full border border-[var(--accent)] bg-transparent px-5 py-3 md:px-7 md:py-4 text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] md:tracking-[0.22em] text-[var(--text-0)] overflow-hidden transition-all duration-500 shadow-[0_18px_48px_rgba(213,175,52,0.05)] ${reveal ? `reveal ${isVisible ? 'is-visible' : ''}` : ''} ${className}`}
      {...props}
    >
      {/* Background Fill (Bottom to Top) */}
      <div className="absolute bottom-0 left-0 right-0 h-0 bg-[var(--accent)] transition-all duration-500 ease-in-out group-hover:h-full" />
      
      {/* Content */}
      <span className="relative z-10 group-hover:text-white transition-colors duration-500">{children}</span>
      
      <div className="relative z-10 w-6 h-6 rounded-full bg-[var(--bg-1)] flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-all duration-500">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-3.5 transition duration-500 ease-[var(--ease-standard)] text-[var(--text-0)] group-hover:text-white"
          fill="none"
        >
          <path
            d="M4 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </a>
  );
}
