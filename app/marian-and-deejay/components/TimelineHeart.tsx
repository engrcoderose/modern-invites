"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { motion, useMotionValueEvent, type MotionValue } from "motion/react";

interface TimelineHeartProps {
  progress: MotionValue<number>;
  position: number;
  active: boolean;
  reducedMotion: boolean;
}

export default function TimelineHeart({ progress, position, active, reducedMotion }: TimelineHeartProps) {
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

  const showOutline = expanded || reducedMotion;
  return (
    <span aria-hidden="true" data-mj-timeline-station data-reached={showOutline}
      className="mj-timeline-heart absolute left-[3.75rem] top-1/2 grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center sm:left-[5.75rem]">
      <motion.span className="absolute inset-0" initial={false}
        animate={{ scale: showOutline ? 1 : .7, opacity: showOutline ? 1 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}>
        <Heart className="h-full w-full fill-[var(--mj-cream)]" strokeWidth={1} />
      </motion.span>
      <Heart className="relative h-2.5 w-2.5" fill="currentColor" strokeWidth={0} />
    </span>
  );
}
