"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { scroll } from "motion";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { timelineArtwork } from "../data/timeline-artwork";
import { timeline } from "../data/wedding";
import { useInvitationMotion } from "./InvitationMotion";
import TimelineStation from "./TimelineStation";
import styles from "../styles/wedding.module.css";

const motionPreference = "(prefers-reduced-motion: reduce)";
function subscribeMotionPreference(onChange: () => void) {
  const query = window.matchMedia(motionPreference);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(motionPreference).matches;

export default function ScheduleTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const active = useInvitationMotion();
  const reducedMotion = useSyncExternalStore(subscribeMotionPreference, getReducedMotion, () => true);
  const [track, setTrack] = useState({ top: 0, length: 0, stations: [] as number[] });
  const [tracking, setTracking] = useState(false);
  const scrollYProgress = useMotionValue(0);
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const markerY = useTransform(progress, value => value * track.length);
  const animated = active && tracking && !reducedMotion;

  useEffect(() => {
    if (!active || !track.length || reducedMotion) { setTracking(false); return; }
    const element = trackRef.current;
    if (!element) return;
    // The cover initially hides this track. Subscribe only after it has a real
    // layout, so a zero-height hidden target cannot prematurely reach every stop.
    const bounds = element.getBoundingClientRect();
    const initial = Math.min(1, Math.max(0, (window.innerHeight / 2 - bounds.top) / bounds.height));
    scrollYProgress.set(initial);
    progress.jump(initial);
    setTracking(true);
    return scroll((value: number) => scrollYProgress.set(value), { target: element, offset: ["start center", "end center"] });
  }, [active, reducedMotion, track.top, track.length, progress, scrollYProgress]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const listTop = list.getBoundingClientRect().top;
      const centers = Array.from(list.querySelectorAll<HTMLElement>("[data-schedule-station]"), station => {
        const bounds = station.getBoundingClientRect();
        return bounds.top + bounds.height / 2 - listTop;
      });
      if (!centers.length || centers[centers.length - 1] <= centers[0]) return;
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

  return <div className="relative mx-auto mt-12 max-w-xl sm:mt-16">
    <div ref={trackRef} aria-hidden="true" data-schedule-track className={`${styles.scheduleTrack} pointer-events-none absolute left-[4.5rem] w-px sm:left-32`}
      style={track.length ? { top: track.top, height: track.length } : { top: 0, bottom: 0 }}>
      {animated && <>
        <motion.span data-schedule-fill className="absolute inset-0 origin-top bg-[#d1b788]" style={{ scaleY: progress }} />
        <motion.span data-schedule-marker className="absolute -left-[3.5px] -top-1 size-2 rounded-full bg-[#d1b788]" style={{ y: markerY }} />
      </>}
    </div>
    <ol ref={listRef} data-reveal-group className="relative">
      {timeline.map((event, index) => <li key={event.label} className="relative grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-5 py-7 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-10 sm:py-8">
        <div data-reveal="image" aria-hidden="true" className="flex items-center justify-center pr-3 sm:pr-6">
          <Image src={timelineArtwork[event.icon]} alt="" sizes="(min-width: 640px) 96px, 60px"
            className="h-20 w-full max-w-[60px] object-contain sm:h-24 sm:max-w-24" />
        </div>
        <TimelineStation progress={progress} position={track.stations[index] ?? index / Math.max(1, timeline.length - 1)} active={active && tracking} reducedMotion={Boolean(reducedMotion)} />
        <div data-reveal className="min-w-0">
          <p className="text-2xl leading-tight tabular-nums text-[#d1b788] sm:text-3xl">{event.time}</p>
          <h3 className="mt-3 text-xs uppercase leading-6 tracking-[0.08em]">{event.label}</h3>
          <p className="mt-2 text-sm leading-7 text-[#f5f0e6]/85 sm:text-base">{event.description}</p>
        </div>
      </li>)}
    </ol>
  </div>;
}
