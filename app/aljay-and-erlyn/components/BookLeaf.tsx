"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { animate, motion, useIsPresent, useMotionValue, usePresenceData, useReducedMotion, useTransform, type Variants } from "framer-motion";
import { pageFold } from "../utils/page-fold";
import WoodlandBackdrop from "./WoodlandBackdrop";
import { usePageTextReveal } from "./usePageTextReveal";
import entourageBackground from "../assets/design/entourage-bg-2.png";
import styles from "../styles/wedding.module.css";

const pageTurn = { duration: 1.25, ease: [0.38, 0.05, 0.25, 1] as const };
const leaf: Variants = {
  enter: { opacity: 1 },
  settled: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0, delay: pageTurn.duration } },
};

const tones = {
  ivory: { className: "", reverse: "#eee8da" },
  olive: { className: styles.oliveLeaf, reverse: "#46533b" },
  woodland: { className: styles.woodlandLeaf, reverse: "#46533b" },
  venues: { className: styles.venuesLeaf, reverse: "#454b1c" },
  story: { className: styles.storyLeaf, reverse: "var(--ae-story)" },
};

export default function BookLeaf({ children, id, label, ready, tone = "ivory", onSettled, fullBleed = false }: {
  children: ReactNode; id: string; label: string; ready: boolean; tone?: keyof typeof tones; onSettled: (element: HTMLElement) => void; fullBleed?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const scrollContent = useRef<HTMLDivElement>(null);
  const foldGradient = useId();
  const foldShadow = useId();
  const present = useIsPresent();
  const direction: number = usePresenceData() ?? 1;
  const reduced = useReducedMotion();
  const [size, setSize] = useState({ width: 1, height: 1 });
  const progress = useMotionValue(direction < 0 && !reduced ? 1 : 0);
  const shape = useTransform(progress, (value) => pageFold(value, size.width, size.height));
  const frontClip = useTransform(shape, (value) => value.front);
  const reversePath = useTransform(shape, (value) => value.reverse);
  const foldOpacity = useTransform(shape, (value) => value.opacity);
  const shadeStartX = useTransform(shape, (value) => value.shadeStartX);
  const shadeStartY = useTransform(shape, (value) => value.shadeStartY);
  const shadeEndX = useTransform(shape, (value) => value.shadeEndX);
  const shadeEndY = useTransform(shape, (value) => value.shadeEndY);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => setSize({ width: element.clientWidth, height: element.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      progress.set(0);
      return;
    }
    const target = !present && direction > 0 ? 1 : 0;
    const animation = animate(progress, target, pageTurn);
    return () => animation.stop();
  }, [present, direction, reduced, progress]);

  usePageTextReveal({ root: ref, ready, present, reduced: Boolean(reduced), id });

  return (
    <motion.section
      id={id}
      ref={ref}
      tabIndex={-1}
      role="group"
      aria-roledescription="page"
      aria-label={label}
      inert={!present || !ready}
      aria-hidden={!present || !ready || undefined}
      className={`${styles.bookLeaf} absolute inset-0 h-full w-full overflow-hidden`}
      style={{ zIndex: direction > 0 ? (present ? 1 : 2) : (present ? 2 : 1) }}
      custom={direction}
      variants={reduced ? {
        enter: { opacity: 1 },
        settled: { opacity: 1 },
        exit: { opacity: 1 },
      } : leaf}
      initial="enter"
      animate="settled"
      exit="exit"
      transition={{ ...pageTurn, duration: reduced ? 0 : pageTurn.duration }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget || !["PageDown", "PageUp"].includes(event.key)) return;
        const content = scrollContent.current;
        if (!content) return;
        event.preventDefault();
        content.scrollBy({ top: content.clientHeight * 0.9 * (event.key === "PageDown" ? 1 : -1) });
      }}
      onAnimationComplete={(state) => {
        if (state === "settled" && present && ready && ref.current) onSettled(ref.current);
      }}
    >
      <motion.div
        className={`${styles.leaf} ${tones[tone].className} absolute inset-0 h-full w-full overflow-hidden`}
        style={{ clipPath: frontClip }}
      >
        {tone === "woodland" && <WoodlandBackdrop />}
        {tone === "olive" && <Image src={entourageBackground} alt="" fill sizes="max(100vw, 63.4dvh)" className="pointer-events-none object-cover object-top opacity-40" />}
        <div ref={scrollContent} className={`absolute inset-x-0 top-0 ${id === "together" ? "bottom-0" : "bottom-[var(--ae-controls-height)]"} overflow-y-auto overscroll-contain`}>
          <div className={fullBleed ? "relative h-full" : "relative flex min-h-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12 [@media(max-height:800px)]:py-6"}>{children}</div>
        </div>
      </motion.div>
      {!reduced && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] h-full w-full"
          viewBox={`0 0 ${size.width} ${size.height}`}
          preserveAspectRatio="none"
        >
          <defs>
            <filter id={foldShadow} x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow dx="3" dy="2" stdDeviation="5" floodColor="#10170c" floodOpacity="0.28" />
            </filter>
            <motion.linearGradient
              id={foldGradient}
              gradientUnits="userSpaceOnUse"
              x1={shadeStartX} y1={shadeStartY} x2={shadeEndX} y2={shadeEndY}
            >
              <stop offset="0" stopColor="#fff9e9" stopOpacity="0" />
              <stop offset="0.52" stopColor="#fff9e9" stopOpacity="0.14" />
              <stop offset="0.82" stopColor="#182010" stopOpacity="0.08" />
              <stop offset="1" stopColor="#182010" stopOpacity="0.22" />
            </motion.linearGradient>
          </defs>
          <motion.g style={{ opacity: foldOpacity }}>
            <motion.path d={reversePath} fill={tones[tone].reverse} filter={`url(#${foldShadow})`} />
            <motion.path d={reversePath} fill={`url(#${foldGradient})`} />
          </motion.g>
        </svg>
      )}
    </motion.section>
  );
}
