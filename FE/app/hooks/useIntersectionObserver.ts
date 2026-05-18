"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Options extends IntersectionObserverInit {
  once?: boolean;
  threshold?: number;
}

export default function useIntersectionObserver(options: Options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback((element: Element | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (element) {
      const { once = true, threshold = 0.1, root, rootMargin } = options;
      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observerRef.current?.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      }, { threshold, root, rootMargin });

      observerRef.current.observe(element);
    }
  }, [options]);

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return { ref, isVisible };
}
