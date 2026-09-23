"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import WaxStamp from "../assets/images/designs/wax-stamp.png";
import EmbossedPaper from "../assets/images/designs/embossed-cotton-paper.png";
import { invitationOpenedEvent } from "../lib/events";
import { wedding } from "../data";

// Spend the time on the visible lift, then crossfade as the flap clears.
const openingTiming = { flap: 2.8, revealAt: 2.25, fade: 0.55 };

export default function EnvelopeIntro({ onOpening, onOpened }: { onOpening: () => void; onOpened: () => void }) {
  const [opening, setOpening] = useState(false);
  const reducedMotion = useReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const overflow = document.body.style.overflow;
    const restoration = window.history.scrollRestoration;
    document.body.style.overflow = "hidden";
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    dialog.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      window.history.scrollRestoration = restoration;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function open() {
    if (opening || timer.current) return;
    window.dispatchEvent(new Event(invitationOpenedEvent));
    onOpening();
    setOpening(true);
    timer.current = setTimeout(onOpened, reducedMotion ? 0 : (openingTiming.revealAt + openingTiming.fade) * 1000);
  }

  return (
    <motion.div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Anjo and Jasmin's wedding invitation"
      className="aj-envelope-table fixed inset-0 z-[100] flex items-center justify-center overflow-hidden outline-none md:px-10"
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ delay: opening && !reducedMotion ? openingTiming.revealAt : 0, duration: reducedMotion ? 0 : openingTiming.fade }}>
      <button type="button" disabled={opening} onClick={open} aria-label="Open Anjo and Jasmin's wedding invitation"
        className="aj-envelope-scene relative block h-full min-h-[320px] w-full overflow-hidden text-center text-[rgb(var(--aj-ink))] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-[rgb(var(--aj-accent))] disabled:cursor-default md:h-[min(78svh,680px)] md:max-w-[1040px] md:overflow-visible md:rounded-[5px]">
        <div aria-hidden="true" className="aj-envelope-paper aj-envelope-back absolute inset-0" />
        <div aria-hidden="true" className="aj-envelope-paper aj-envelope-left absolute inset-0" />
        <div aria-hidden="true" className="aj-envelope-paper aj-envelope-right absolute inset-0" />
        <div aria-hidden="true" className="aj-envelope-pocket absolute inset-0">
          <div className="aj-envelope-paper aj-envelope-bottom absolute inset-0">
            <div className="absolute inset-x-0 bottom-0 top-[53%] overflow-hidden">
              <Image src={EmbossedPaper} alt="" fill priority sizes="(max-width: 768px) 100vw, 1040px" className="aj-envelope-pocket-texture object-cover" />
              <div className="aj-envelope-pocket-light absolute inset-0" />
            </div>
          </div>
        </div>

        <motion.div aria-hidden="true" className="aj-envelope-lift-shadow pointer-events-none absolute inset-0"
          animate={{ opacity: opening ? [0.3, 0.7, 0.38, 0] : 0.3 }}
          transition={{ duration: reducedMotion ? 0 : openingTiming.flap, times: [0, 0.35, 0.65, 1] }} />

        {/* The seal belongs to the flap, so it follows the same 3D hinge. */}
        <motion.div aria-hidden="true" className="aj-envelope-flap absolute inset-x-0 top-0 z-20 h-[66%] origin-top"
          animate={{ rotateX: opening ? 170 : 0 }}
          transition={{ duration: reducedMotion ? 0 : openingTiming.flap, ease: [0.55, 0, 0.8, 0.5] }}>
          <div className="aj-envelope-flap-face aj-envelope-flap-rim absolute inset-0" />
          <div className="aj-envelope-flap-face aj-envelope-flap-front aj-envelope-paper absolute inset-0">
            <Image src={EmbossedPaper} alt="" fill priority sizes="(max-width: 768px) 100vw, 1040px" className="aj-envelope-emboss object-fill" />
            <div className="aj-envelope-letterpress absolute inset-x-5 top-[19%]">
              <p className="text-[9px] uppercase tracking-[.3em] sm:text-xs">Together with our families</p>
              <p className="mt-4 font-imperial text-[clamp(3.5rem,7vw,5.5rem)] leading-[1.2] text-[rgb(var(--aj-accent-dark))]">Anjo &amp; Jasmin</p>
              <p className="mt-4 text-[9px] uppercase tracking-[.22em] sm:text-xs">Invite you to celebrate our wedding</p>
            </div>
          </div>
          <div className="aj-envelope-flap-face aj-envelope-flap-back aj-envelope-paper absolute inset-0" />
          <div className="aj-envelope-seal absolute bottom-0 left-1/2 h-[clamp(100px,24vw,130px)] w-[clamp(100px,24vw,130px)]">
            <Image src={WaxStamp} alt="" fill priority sizes="(max-width: 640px) 110px, 130px" className="object-contain" />
          </div>
        </motion.div>

        <motion.div className="aj-envelope-letterpress absolute inset-x-5 bottom-[6%] z-30 flex flex-col items-center gap-3"
          animate={{ opacity: opening ? 0 : 1, y: opening ? 8 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}>
          <span aria-hidden="true" className="aj-envelope-date-ornament" />
          <div className="space-y-2">
            <p className="font-serif text-sm tracking-[.07em] sm:text-base">{wedding.dateDisplay}</p>
            <p className="text-[10px] uppercase tracking-[.2em]">{wedding.time}</p>
          </div>
          <span className="mt-1 border-b border-[rgb(var(--aj-accent))]/40 pb-2 text-[10px] uppercase tracking-[.3em]">Tap to open</span>
        </motion.div>
      </button>
      <p role="status" className="sr-only">{opening ? "Opening Anjo and Jasmin’s wedding invitation." : ""}</p>
    </motion.div>
  );
}
