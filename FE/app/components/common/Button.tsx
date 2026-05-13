import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <a
      className={`group inline-flex w-fit items-center gap-4 rounded-full border border-[var(--accent)] bg-transparent px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-soft)] shadow-[0_0_0_1px_rgba(213,175,52,0.08),0_18px_48px_rgba(213,175,52,0.08)] transition duration-500 ease-[var(--ease-standard)] hover:bg-[linear-gradient(135deg,#ffe1a2_0%,#d5aa4f_48%,#b98a27_100%)] hover:text-black hover:shadow-[0_18px_54px_rgba(213,175,52,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-soft)] ${className}`}
      {...props}
    >
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-4 transition duration-500 ease-[var(--ease-standard)] group-hover:translate-x-1"
        fill="none"
      >
        <path
          d="M4 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
      </svg>
    </a>
  );
}
