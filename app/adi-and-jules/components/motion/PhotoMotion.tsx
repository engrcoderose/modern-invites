"use client";

import { useRef, type PropsWithChildren } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useInvitationMotion } from "./InvitationMotion";

/** A small desktop-only drift; mobile retains each photograph's approved crop. */
export default function PhotoMotion({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  const { parallax } = useInvitationMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="relative h-full" style={parallax ? { y, scale: 1.045 } : { y: 0, scale: 1 }}>
        {children}
      </motion.div>
    </div>
  );
}
