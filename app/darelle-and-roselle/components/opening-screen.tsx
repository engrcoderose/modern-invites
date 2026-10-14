"use client";

import { useEffect, useRef, useState } from "react";
import ScenicBackground from "./scenic-background";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { media } from "../data/media";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";
import Monogram from "./monogram";

// Match the reference's shared-monogram handoff and woodland dissolve.
const logoMoveDuration = 1.4;
const coverFadeDuration = 1.6;
const logoFadeDelay = 0.5;
const openingEase = [0.42, 0, 0.22, 1] as const;

export default function OpeningScreen({ onOpened }: { onOpened: () => void }) {
  const [opening, setOpening] = useState(false);
  const [photoReady, setPhotoReady] = useState(false);
  const [monogramReady, setMonogramReady] = useState(false);
  const [fontReady, setFontReady] = useState(false);
  const [destination, setDestination] = useState({ x: 0, y: 0, scale: 1 });
  const entrance = useRef<HTMLDivElement>(null);
  const coverLogo = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const ready = photoReady && monogramReady && fontReady;
  const backgroundOpacity = useMotionValue(0);
  const contentOpacity = useMotionValue(0);
  const coverMarkOpacity = useMotionValue(1);
  const formalMarkOpacity = useMotionValue(0);
  const promptOpacity = useMotionValue(1);

  useEffect(() => {
    entrance.current?.focus({ preventScroll: true });
    let cancelled = false;
    void document.fonts.ready.then(() => { if (!cancelled) setFontReady(true); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const animation = animate(backgroundOpacity, ready && !opening ? 1 : 0, {
      duration: reducedMotion ? 0.2 : opening ? coverFadeDuration : 0.7,
      ease: "easeInOut",
      onComplete: opening ? onOpened : undefined,
    });
    return () => animation.stop();
  }, [backgroundOpacity, ready, opening, reducedMotion, onOpened]);

  useEffect(() => {
    const animation = animate(contentOpacity, ready ? 1 : 0, {
      duration: reducedMotion ? 0.15 : 0.7,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => animation.stop();
  }, [contentOpacity, ready, reducedMotion]);

  useEffect(() => {
    if (!opening) return;
    const dissolve = {
      delay: reducedMotion ? 0 : logoFadeDelay,
      duration: reducedMotion ? 0.15 : coverFadeDuration - logoFadeDelay,
      ease: "easeInOut" as const,
    };
    const animations = [
      animate(coverMarkOpacity, 0, dissolve),
      animate(formalMarkOpacity, reducedMotion ? 0 : 1, dissolve),
      animate(promptOpacity, 0, { duration: reducedMotion ? 0.2 : 0.4, ease: "easeInOut" }),
    ];
    return () => animations.forEach((animation) => animation.stop());
  }, [opening, reducedMotion, coverMarkOpacity, formalMarkOpacity, promptOpacity]);

  function openInvitation() {
    if (opening || !ready) return;
    const target = document.querySelector<HTMLElement>("[data-dr-formal-logo]");
    if (!reducedMotion && coverLogo.current && target) {
      const source = coverLogo.current.getBoundingClientRect();
      const landing = target.getBoundingClientRect();
      setDestination({
        x: landing.left + landing.width / 2 - (source.left + source.width / 2),
        y: landing.top + landing.height / 2 - (source.top + source.height / 2),
        scale: landing.height / source.height,
      });
    }
    setOpening(true);
  }

  return (
    <div ref={entrance} tabIndex={-1} className={`${styles.openingScreen} fixed inset-0 z-[100] h-dvh overflow-hidden outline-none`} role="dialog" aria-modal="true" aria-labelledby="dr-opening-title" aria-busy={!ready || opening} onKeyDown={(event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        entrance.current?.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus();
      }
      if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault(); openInvitation();
      }
    }}>
      <h2 id="dr-opening-title" className="sr-only">{wedding.shortTitle} — your wedding invitation</h2>
      <motion.div className="absolute inset-0" aria-hidden="true" style={{ opacity: backgroundOpacity }}>
        <ScenicBackground src={media.cover} priority className="opacity-[0.55]" initialSizes="max(100vw, 155.4svh)" onLoad={() => setPhotoReady(true)} onError={() => setPhotoReady(true)} />
        <div className={`${styles.coverShade} absolute inset-0`} />
      </motion.div>
      <motion.div className="relative mx-auto flex h-full max-w-xl flex-col items-center justify-center px-6 py-[clamp(24px,5svh,52px)]" style={{ opacity: contentOpacity }}>
        <button type="button" disabled={!ready || opening} aria-label={`Open ${wedding.shortTitle}’s wedding invitation`} className={`${styles.openingButton} group flex min-h-0 w-full flex-col items-center justify-center gap-5 rounded-sm py-5`} onClick={openInvitation}>
          <motion.span ref={coverLogo} className="relative block aspect-[320/413] h-[clamp(160px,44svh,350px)] max-w-full shrink-0" initial={false} animate={opening && !reducedMotion ? destination : { x: 0, y: 0, scale: 1 }} style={{ transformOrigin: "50% 50%" }} transition={{ duration: reducedMotion ? 0.15 : logoMoveDuration, ease: openingEase }}>
            <motion.span className="absolute inset-0" style={{ opacity: coverMarkOpacity }}>
              <Monogram tone="paper" className="h-full w-full" priority sizes="425px" onReady={() => setMonogramReady(true)} />
            </motion.span>
            <motion.span aria-hidden="true" className="absolute inset-0" style={{ opacity: formalMarkOpacity }}>
              <Monogram className="h-full w-full" priority sizes="425px" />
            </motion.span>
          </motion.span>
          <motion.span className={`${styles.coverNames} text-[clamp(32px,6vw,46px)]`} style={{ opacity: promptOpacity }}>{wedding.shortTitle}</motion.span>
          <motion.span className="text-xs" style={{ opacity: promptOpacity }}>{wedding.date}</motion.span>
          <motion.span className={`${styles.coverLink} mt-3 px-2 py-3`} style={{ opacity: promptOpacity }}>Click to open</motion.span>
        </button>
      </motion.div>
    </div>
  );
}

