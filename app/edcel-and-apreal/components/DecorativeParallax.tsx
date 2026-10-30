"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scroll } from "motion";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useInvitationOpen } from "./InvitationState";

export default function DecorativeParallax({ children, reverse = false, distance = 14, decorative = true, className = "" }: {
  children: ReactNode;
  reverse?: boolean;
  distance?: number;
  decorative?: boolean;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const opened = useInvitationOpen();
  const reducedMotion = useReducedMotion();
  const inView = useInView(frame, { margin: "80px" });
  const enabled = opened && reducedMotion === false;
  const rawProgress = useMotionValue(.5);
  const progress = useSpring(rawProgress, { stiffness: 85, damping: 30, mass: .6 });
  const direction = reverse ? -1 : 1;
  const y = useTransform(progress, [0, 1], [-distance * direction, distance * direction]);
  const rotate = useTransform(progress, [0, 1], [-1.25 * direction, 1.25 * direction]);

  useEffect(() => {
    if (!enabled || !inView) return;
    const section = frame.current?.closest<HTMLElement>("section, footer");
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    const initial = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
    rawProgress.set(initial);
    progress.jump(initial);
    return scroll((value: number) => rawProgress.set(value), { target: section, offset: ["start end", "end start"] });
  }, [enabled, inView, progress, rawProgress]);

  return <div ref={frame} aria-hidden={decorative || undefined} className={className} data-design-parallax={enabled ? "scroll" : "still"}>
    <motion.div className="relative h-full w-full" data-design-parallax-layer
      style={{ y: enabled ? y : 0, rotate: enabled ? rotate : 0, willChange: enabled && inView ? "transform" : "auto" }}>
      {children}
    </motion.div>
  </div>;
}
