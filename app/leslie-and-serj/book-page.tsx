"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  animate,
  motion,
  useIsPresent,
  usePresenceData,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const pageTurn = { duration: 1.55, ease: [0.42, 0, 0.18, 1] as const };

const leaf: Variants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 0 : -105,
    rotateZ: 0,
    y: 0,
    opacity: 1,
  }),
  settled: (direction: number) => ({
    rotateY: 0,
    rotateZ: direction < 0 ? [0, -0.4, 0] : 0,
    y: direction < 0 ? [0, -3, 0] : 0,
    opacity: 1,
  }),
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -105 : 0,
    rotateZ: direction > 0 ? [0, 0.4, 0] : 0,
    y: direction > 0 ? [0, -3, 0] : 0,
    opacity: direction > 0 ? 1 : 0.5,
  }),
};

const revealTargets = [
  "h1",
  "h2:not(.sr-only)",
  "h3",
  "p",
  ".lj-ornament",
  ".lj-opening-crest",
  ".lj-opening-logo",
  ".lj-photo-letter-portrait",
  ".lj-film-frame",
  ".lj-countdown",
  ".lj-venue-art",
  ".lj-wedding-illustration",
  ".lj-attire-reference",
  ".lj-photo-page figure",
  ".lj-faq-page dl > div",
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
  const present = useIsPresent();
  const turnDirection: number = usePresenceData() ?? direction;
  const reducedMotion = useReducedMotion();
  const waitingForOpening = useRef(!revealReady);

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
    );
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
    if (content && (!revealReady || waitingForOpening.current)) content.style.overflowY = "hidden";
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
      className={`lj-book-leaf absolute inset-0 h-full w-full overflow-hidden ${className}`}
      style={{ zIndex: turnDirection > 0 ? (present ? 1 : 2) : (present ? 2 : 1) }}
      role="group"
      aria-roledescription="slide"
      aria-label={label}
      custom={turnDirection}
      variants={reducedMotion ? {
        enter: { rotateY: 0, rotateZ: 0, y: 0, opacity: 1 },
        settled: { rotateY: 0, rotateZ: 0, y: 0, opacity: 1 },
        exit: { rotateY: 0, rotateZ: 0, y: 0, opacity: 1 },
      } : leaf}
      initial="enter"
      animate="settled"
      exit="exit"
      transition={{ ...pageTurn, duration: reducedMotion ? 0 : pageTurn.duration }}
      onAnimationComplete={(state) => {
        if (state === "settled" && present && page.current) onSettled(page.current);
      }}
    >
      {children}
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="lj-page-fold pointer-events-none absolute inset-0 z-[4]"
          initial={{ opacity: turnDirection > 0 ? 0 : 0.45 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: turnDirection > 0 ? 0.45 : 0 }}
          transition={pageTurn}
        />
      )}
    </motion.section>
  );
}
