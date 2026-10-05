"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, type MotionValue } from "motion/react";

interface TimelineDotProps {
  progress: MotionValue<number>;
  position: number;
  active: boolean;
  reducedMotion: boolean;
}

export default function TimelineDot({ progress, position, active, reducedMotion }: TimelineDotProps) {
  const reached = useRef(false);
  const [expanded, setExpanded] = useState(false);

  const checkPosition = useCallback((value: number) => {
    if (active && !reached.current && value > 0 && value >= position) {
      reached.current = true;
      setExpanded(true);
    }
  }, [active, position]);
  useMotionValueEvent(progress, "change", checkPosition);
  useEffect(() => {
    checkPosition(progress.get());
  }, [checkPosition, progress]);

  const showRing = expanded || reducedMotion;
  return (
    <span aria-hidden="true" data-timeline-dot data-reached={showRing} className="relative col-start-2 row-start-1 mx-auto grid h-5 w-5 place-items-center">
      <motion.span
        data-timeline-ring
        className="absolute inset-0 rounded-full border border-[rgb(var(--aj-line))] bg-[rgb(var(--aj-paper))]"
        initial={false}
        animate={{ scale: showRing ? 1 : 0, opacity: showRing ? 1 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 18 }}
      />
      <span className="relative h-1.5 w-1.5 rounded-full bg-[rgb(var(--aj-accent))]" />
    </span>
  );
}
