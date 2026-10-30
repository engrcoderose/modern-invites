"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { scroll } from "motion";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useInvitationOpen } from "./InvitationState";
import TimelineArtwork from "./TimelineArtwork";
import TimelineStation from "./TimelineStation";
import { wedding } from "../data/wedding";
import styles from "../styles/timeline.module.css";

const motionPreference = "(prefers-reduced-motion: reduce)";
function subscribeMotionPreference(onChange: () => void) {
  const query = window.matchMedia(motionPreference);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(motionPreference).matches;

export default function ScheduleTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const invitationOpen = useInvitationOpen();
  const reducedMotion = useSyncExternalStore(subscribeMotionPreference, getReducedMotion, () => true);
  const scrollProgress = useMotionValue(0);
  const progress = useSpring(scrollProgress, { stiffness: 110, damping: 28 });
  const markerTop = useTransform(progress, value => `${value * 100}%`);
  const animated = invitationOpen && !reducedMotion;

  useEffect(() => {
    if (!animated) return;
    const track = trackRef.current;
    if (!track) return;
    // Subscribe after the envelope handoff gives the hidden invitation its layout.
    const measureProgress = () => {
      // Rendered bounds include the lace border that offset-based tracking omits.
      const bounds = track.getBoundingClientRect();
      if (!bounds.height) return;
      scrollProgress.set(Math.min(1, Math.max(0, (window.innerHeight / 2 - bounds.top) / bounds.height)));
    };
    measureProgress();
    progress.jump(scrollProgress.get());
    return scroll(measureProgress);
  }, [animated, progress, scrollProgress]);

  // The two-row station grid has a leading half-row; tuck it closer to the date.
  return <div className="relative mx-auto -mt-6 max-w-xl sm:-mt-8" data-timeline-motion={animated ? "scroll" : "still"}>
    {/* Track endpoints match the centers of the first and last two-row stations. */}
    <div ref={trackRef} aria-hidden="true" data-schedule-track className="pointer-events-none absolute bottom-[7.5rem] left-1/2 top-[7.5rem] w-px bg-[var(--timeline-track)] sm:bottom-36 sm:top-36">
      {animated && <>
        <motion.span data-schedule-fill className="absolute inset-0 origin-top bg-[var(--timeline-ink)]" style={{ scaleY: progress }} />
        <motion.span data-schedule-marker className="absolute -left-[3.5px] -mt-1 size-2 rounded-full bg-[var(--timeline-ink)]" style={{ top: markerTop }} />
      </>}
    </div>
    <ol aria-label="Wedding day timeline" className="relative grid auto-rows-[7.5rem] grid-cols-2 sm:auto-rows-[9rem]">
      {wedding.timeline.map(({ time, title, detail, artwork }, index) => <li key={artwork}
        className={`${styles.station} relative row-span-2 flex items-center justify-center ${index % 2 === 0 ? "col-start-2" : "col-start-1"}`}
        style={{ gridRow: `${index + 1} / span 2` }}>
        <TimelineStation progress={progress} position={index / (wedding.timeline.length - 1)} rightSide={index % 2 === 0} active={animated} reducedMotion={reducedMotion} artwork={<TimelineArtwork name={artwork} />}>
          <p className="mt-2 text-sm leading-5 sm:text-lg sm:leading-6">{title}</p>
          <time className="mt-2 block text-xs leading-5 tabular-nums sm:text-sm">{time}</time>
          <span className="sr-only">{detail}</span>
        </TimelineStation>
      </li>)}
    </ol>
  </div>;
}
