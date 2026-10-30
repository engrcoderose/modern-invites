"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      animation = element.animate(
        [{ opacity: .4, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 1000, delay, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" },
      );
      observer.disconnect();
    }, { threshold: .08 });
    observer.observe(element);
    return () => { observer.disconnect(); animation?.cancel(); };
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
