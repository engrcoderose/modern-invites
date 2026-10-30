"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, type MotionValue } from "motion/react";

interface Props {
  progress: MotionValue<number>;
  position: number;
  rightSide: boolean;
  active: boolean;
  reducedMotion: boolean;
  artwork: ReactNode;
  children: ReactNode;
}

export default function TimelineStation({ progress, position, rightSide, active, reducedMotion, artwork, children }: Props) {
  const reached = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const checkPosition = useCallback((value: number) => {
    const next = active && value > 0 && value >= position;
    if (next !== reached.current) {
      reached.current = next;
      setExpanded(next);
    }
  }, [active, position]);
  useMotionValueEvent(progress, "change", checkPosition);
  useEffect(() => { checkPosition(progress.get()); }, [checkPosition, progress]);

  const showRing = expanded || reducedMotion;
  const popArtwork = active && expanded && !reducedMotion;
  return <><span aria-hidden="true" data-schedule-station data-reached={showRing}
    className={`pointer-events-none absolute top-1/2 z-10 grid size-4 -translate-y-1/2 place-items-center ${rightSide ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"}`}>
    <motion.span data-schedule-ring className="absolute inset-0 rounded-full border border-[var(--timeline-ink)] bg-[var(--timeline-paper)]"
      initial={false} animate={{ scale: showRing ? 1 : 0, opacity: showRing ? 1 : 0 }}
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 18 }} />
    <span className="relative size-1.5 rounded-full bg-[var(--timeline-ink)]" />
  </span>
    <div data-reveal className="relative px-2 text-center sm:px-5">
      <motion.div aria-hidden="true" data-schedule-artwork data-active={popArtwork} initial={false}
        animate={popArtwork ? { scale: [0.94, 1.06, 1], y: [4, -2, 0] } : { scale: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}>
        {artwork}
      </motion.div>
      {children}
    </div>
  </>;
}
