"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { scroll } from "motion";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import useReducedMotionPreference from "@/components/landing/useMarketingReducedMotion";
import { timelineItems } from "../data/timeline";
import { useInvitationOpen } from "./InvitationState";
import TimelineHeart from "./TimelineHeart";

export default function ScheduleTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const open = useInvitationOpen();
  const reducedMotion = useReducedMotionPreference();
  const [track, setTrack] = useState({ top: 0, length: 0, stations: [] as number[] });
  const [tracking, setTracking] = useState(false);
  const scrollProgress = useMotionValue(0);
  const progress = useSpring(scrollProgress, { stiffness: 110, damping: 28 });
  const markerY = useTransform(progress, value => value * track.length);
  const animated = open && tracking && !reducedMotion;

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const listTop = list.getBoundingClientRect().top;
      const centers = Array.from(list.querySelectorAll<HTMLElement>("[data-mj-timeline-station]"), station => {
        const bounds = station.getBoundingClientRect();
        return bounds.top + bounds.height / 2 - listTop;
      });
      if (centers.length < 2 || centers[centers.length - 1] <= centers[0]) return;
      const top = centers[0];
      const length = centers[centers.length - 1] - top;
      setTrack({ top, length, stations: centers.map(center => (center - top) / length) });
    };
    measure();
    if (!window.ResizeObserver) return;
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open || !track.length || reducedMotion) { setTracking(false); return; }
    const element = trackRef.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    if (!bounds.height) return;
    // Wait for the opening handoff; a hidden, zero-height track cannot reach stops.
    const initial = Math.min(1, Math.max(0, (window.innerHeight / 2 - bounds.top) / bounds.height));
    scrollProgress.set(initial);
    progress.jump(initial);
    setTracking(true);
    return scroll((value: number) => scrollProgress.set(value), {
      target: element, offset: ["start center", "end center"],
    });
  }, [open, reducedMotion, track.top, track.length, scrollProgress, progress]);

  return (
    <div className="relative">
      <div ref={trackRef} aria-hidden="true" data-mj-timeline-track
        className="mj-timeline-track pointer-events-none absolute left-[3.75rem] w-px sm:left-[5.75rem]"
        style={track.length ? { top: track.top, height: track.length } : { top: 0, bottom: 0 }}>
        {animated && <>
          <motion.span data-mj-timeline-fill className="absolute inset-0 origin-top bg-[var(--mj-timeline-accent)]" style={{ scaleY: progress }} />
          <motion.span data-mj-timeline-marker className="absolute -left-[5.5px] -top-1.5 h-3 w-3 text-[var(--mj-timeline-accent)]" style={{ y: markerY }}>
            <Heart className="h-full w-full" fill="currentColor" strokeWidth={0} />
          </motion.span>
        </>}
      </div>
      <ol ref={listRef}>
        {timelineItems.map((item, index) => (
          <li key={`${item.time}-${item.label}`} className="relative grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-x-6 py-4 text-left sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-10 sm:py-5">
            <div data-mj-reveal aria-hidden="true" className={`flex items-center justify-center${item.preserveArtworkInk ? " mix-blend-multiply" : ""}`}>
              {item.artwork && <Image src={item.artwork} alt="" data-original-ink={item.preserveArtworkInk || undefined} sizes="(min-width: 640px) 72px, 48px" className="mj-timeline-icon h-14 w-full max-w-12 object-contain sm:h-20 sm:max-w-[4.5rem]" />}
            </div>
            <TimelineHeart progress={progress} position={track.stations[index] ?? index / Math.max(1, timelineItems.length - 1)} active={open && tracking} reducedMotion={reducedMotion} />
            <div data-mj-stagger className="min-w-0">
              <time data-mj-reveal className="block text-xl font-medium leading-tight tabular-nums sm:text-2xl">{item.time}</time>
              <p data-mj-reveal className="mt-2 text-sm leading-6 sm:text-base">{item.label}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
