export const ANIMATION = {
  duration: {
    fast: 'var(--dur-fast)',
    normal: 'var(--dur-normal)',
    slow: 'var(--dur-slow)',
  } as const,
  easing: {
    standard: 'var(--ease-standard)',
  } as const,
};

export const animationClasses = `
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity var(--dur-normal) var(--ease-standard),
                transform var(--dur-normal) var(--ease-standard);
  }

  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
  .reveal-delay-5 { transition-delay: 0.5s; }

  @keyframes float {
    0%, 100% { transform: translateY(-10px); }
    50% { transform: translateY(10px); }
  }

  .float-anim {
    animation: float 6s ease-in-out infinite;
  }

  .float-anim-slow {
    animation: float 7s ease-in-out infinite;
  }
`;
