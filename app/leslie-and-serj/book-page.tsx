"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useIsPresent,
  useMotionValue,
  useTransform,
  usePresenceData,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { pageFold } from "./page-fold";

const pageTurn = { duration: 1.25, ease: [0.38, 0.05, 0.25, 1] as const };
// Keep both pages mounted while the corner folds over the underlying page.
const leaf: Variants = {
  enter: { opacity: 1 },
  settled: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0, delay: pageTurn.duration } },
};

const revealTargets = [
  "[data-lj-reveal]",
  "h1",
  "h2:not(.sr-only)",
  "h3",
  "h4",
  "p",
  ".lj-names",
  ".lj-combined-party section",
  ".lj-ornament",
  ".lj-opening-logo",
  ".lj-film-frame",
  ".lj-countdown",
  ".lj-venue-art",
  ".lj-attire-reference",
  ".lj-photo-page figure",
].join(",");

export default function BookPage({
  id,
  label,
  direction,
  className,
  children,
  onSettled,
  revealReady = true,
}: {
  id: string;
  label: string;
  direction: number;
  className: string;
  children: ReactNode;
  onSettled: (page: HTMLElement) => void;
  revealReady?: boolean;
}) {
  const page = useRef<HTMLElement>(null);
  const foldGradient = useId();
  const foldShadow = useId();
  const present = useIsPresent();
  const turnDirection: number = usePresenceData() ?? direction;
  const reducedMotion = useReducedMotion();
  const waitingForOpening = useRef(!revealReady);
  const [size, setSize] = useState({ width: 1, height: 1 });
  const progress = useMotionValue(direction < 0 && !reducedMotion ? 1 : 0);
  const shape = useTransform(progress, (value) => pageFold(value, size.width, size.height));
  const frontClip = useTransform(shape, (value) => value.front);
  const reversePath = useTransform(shape, (value) => value.reverse);
  const foldOpacity = useTransform(shape, (value) => value.opacity);
  const shadeStartX = useTransform(shape, (value) => value.shadeStartX);
  const shadeStartY = useTransform(shape, (value) => value.shadeStartY);
  const shadeEndX = useTransform(shape, (value) => value.shadeEndX);
  const shadeEndY = useTransform(shape, (value) => value.shadeEndY);
  const reverseColor = className.includes("lj-tone-olive") ? "#46533b" : "#eee8da";

  useLayoutEffect(() => {
    const element = page.current;
    if (!element) return;
    const measure = () => setSize({ width: element.clientWidth, height: element.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      progress.set(0);
      return;
    }
    const target = !present && turnDirection > 0 ? 1 : 0;
    const animation = animate(progress, target, pageTurn);
    return () => animation.stop();
  }, [present, turnDirection, reducedMotion, progress]);

  useEffect(() => {
    const element = page.current;
    if (!element) return;
    if (!present) {
      element.querySelectorAll("video, audio").forEach((media) => {
        (media as HTMLMediaElement).pause();
      });
      return;
    }
    const targets = Array.from(
      element.querySelectorAll<HTMLElement>(revealTargets),
    ).filter((target) => !target.closest("dialog"));
    // Animate each group once, rather than applying motion to nested children too.
    const groups = targets.filter((target) =>
      !targets.some((parent) => parent !== target && parent.contains(target)),
    );
    const content = element.querySelector<HTMLElement>(".lj-page-content");
    const previousOverflow = content?.style.overflowY ?? "";
    const restoreOverflow = () => {
      if (content) content.style.overflowY = previousOverflow;
    };
    // The rising elements must not briefly create a scrollbar and shift width.
    if (content) content.style.overflowY = "hidden";
    if (!revealReady) {
      // Keep the entrance from playing unseen behind the closed cover.
      const hidden = groups.map((target) =>
        animate(target, { opacity: 0, y: reducedMotion ? 0 : 16 }, { duration: 0 }),
      );
      return () => {
        hidden.forEach((animation) => animation.stop());
        restoreOverflow();
      };
    }
    const openingReveal = waitingForOpening.current;
    waitingForOpening.current = false;
    const animations = groups.map((target, index) =>
      animate(target, {
        opacity: reducedMotion ? 1 : [0, 1],
        y: reducedMotion ? 0 : [openingReveal ? 16 : 10, 0],
      }, {
        duration: reducedMotion ? 0 : openingReveal ? 1.1 : 0.85,
        delay: reducedMotion ? 0 : openingReveal
          ? 0.1 + Math.min(index * 0.12, 0.72)
          : 0.4 + Math.min(index * 0.07, 0.42),
        ease: [0.22, 1, 0.36, 1],
        onComplete: index === groups.length - 1 ? restoreOverflow : undefined,
      }),
    );
    if (!groups.length) restoreOverflow();
    return () => {
      animations.forEach((animation) => animation.stop());
      restoreOverflow();
    };
  }, [present, reducedMotion, revealReady]);

  return (
    <motion.section
      ref={page}
      id={id}
      tabIndex={-1}
      inert={!present}
      aria-hidden={!present || undefined}
      className="lj-book-leaf absolute inset-0 h-full w-full overflow-hidden"
      style={{ zIndex: turnDirection > 0 ? (present ? 1 : 2) : (present ? 2 : 1) }}
      role="group"
      aria-roledescription="slide"
      aria-label={label}
      custom={turnDirection}
      variants={reducedMotion ? {
        enter: { opacity: 1 },
        settled: { opacity: 1 },
        exit: { opacity: 1 },
      } : leaf}
      initial="enter"
      animate="settled"
      exit="exit"
      transition={{ ...pageTurn, duration: reducedMotion ? 0 : pageTurn.duration }}
      onAnimationComplete={(state) => {
        if (state === "settled" && present && page.current) onSettled(page.current);
      }}
    >
      <motion.div
        className={`absolute inset-0 h-full w-full overflow-hidden ${className}`}
        style={{ clipPath: frontClip }}
      >
        {children}
      </motion.div>
      {!reducedMotion && (
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
            <motion.path d={reversePath} fill={reverseColor} filter={`url(#${foldShadow})`} />
            <motion.path d={reversePath} fill={`url(#${foldGradient})`} />
          </motion.g>
        </svg>
      )}
    </motion.section>
  );
}
