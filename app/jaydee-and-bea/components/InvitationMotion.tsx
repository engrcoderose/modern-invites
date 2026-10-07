"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";

export default function InvitationMotion({ children, className }: { children: ReactNode; className: string }) {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = scope.current;
    if (!root || reducedMotion !== false) return;

    const ambient = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        (entry.target as HTMLElement).style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      });
    });
    const decorations = root.querySelectorAll<HTMLElement>("[data-ambient]");
    decorations.forEach((element) => {
      element.style.animationPlayState = "paused";
      ambient.observe(element);
    });

    return () => {
      ambient.disconnect();
      decorations.forEach((element) => element.style.removeProperty("animation-play-state"));
    };
  }, [reducedMotion]);

  return <MotionConfig reducedMotion="user"><div ref={scope} className={className}>{children}</div></MotionConfig>;
}
