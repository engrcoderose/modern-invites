"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, type MotionValue } from "motion/react";

interface Props {
  progress: MotionValue<number>;
  position: number;
  active: boolean;
  reducedMotion: boolean;
}

export default function TimelineStation({ progress, position, active, reducedMotion }: Props) {
  const reached = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const checkPosition = useCallback((value: number) => {
    if (active && !reached.current && value > 0 && value >= position) {
      reached.current = true;
      setExpanded(true);
    }
  }, [active, position]);
  useMotionValueEvent(progress, "change", checkPosition);
  useEffect(() => { checkPosition(progress.get()); }, [checkPosition, progress]);

  const showRing = expanded || reducedMotion;
  return <span aria-hidden="true" data-schedule-station data-reached={showRing}
    className="absolute left-[4.5rem] top-1/2 grid size-4 -translate-x-1/2 -translate-y-1/2 place-items-center sm:left-32">
    <motion.span data-schedule-ring className="absolute inset-0 rounded-full border border-[#d1b788] bg-[#171714]"
      initial={false} animate={{ scale: showRing ? 1 : 0, opacity: showRing ? 1 : 0 }}
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 18 }} />
    <span className="relative size-1.5 rounded-full bg-[#d1b788]" />
  </span>;
}
