"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import envelope from "../assets/design/black-lace-envelope.webp";
import waxSeal from "../assets/design/ryan-and-anne-wax-seal.png";
import styles from "../styles/envelope.module.css";
import EnvelopeArtwork from "./EnvelopeArtwork";

const timing = { flap: 2.8, fadeDelay: 2.25, fade: .55 };
const sizes = "(max-height:500px) 65vh, min(680px, 60vh, calc(100vw - 40px))";

export default function EnvelopeIntro({ onOpening, onOpened }: { onOpening: () => void; onOpened: () => void }) {
  const [opening, setOpening] = useState(false);
  const reducedMotion = useReducedMotion();
  const button = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shapeId = useId().replace(/:/g, "");
  const flapId = `ra-envelope-flap-${shapeId}`;
  const pocketId = `ra-envelope-pocket-${shapeId}`;

  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const open = () => {
    if (opening || timer.current) return;
    onOpening();
    setOpening(true);
    dialog.current?.focus({ preventScroll: true });
    timer.current = setTimeout(onOpened, reducedMotion ? 0 : (timing.fadeDelay + timing.fade) * 1000);
  };

  return (
    <motion.div ref={dialog} data-envelope-intro role="dialog" aria-modal="true" aria-label="Ryan and Anne’s wedding invitation" tabIndex={-1}
      className={`${styles.table} fixed inset-0 z-[100] flex flex-col items-center justify-center gap-9 overflow-hidden px-5 outline-none sm:gap-12`}
      onKeyDown={(event) => { if (event.key === "Tab") { event.preventDefault(); if (!opening) button.current?.focus(); } }}
      animate={{ opacity: opening ? 0 : 1 }} transition={{ delay: opening && !reducedMotion ? timing.fadeDelay : 0, duration: reducedMotion ? 0 : timing.fade }}>
      <button ref={button} type="button" disabled={opening} onClick={open} aria-label="Open Ryan and Anne’s wedding invitation"
        style={{ "--ra-envelope-flap-clip": `url(#${flapId})`, "--ra-envelope-pocket-clip": `url(#${pocketId})` } as CSSProperties}
        className={`${styles.scene} peer relative block aspect-[3/2] w-full max-w-[min(680px,60svh)] text-center disabled:cursor-default [@media(max-height:500px)]:max-w-[65svh]`}>
        <EnvelopeArtwork flapId={flapId} pocketId={pocketId} />
        <div aria-hidden="true" className={`${styles.back} absolute inset-0 overflow-hidden`}>
          <Image src={envelope} alt="" fill priority sizes={sizes} className={`${styles.paperTexture} object-fill`} />
          <div className={`${styles.interiorShade} absolute inset-0`} />
        </div>
        <div aria-hidden="true" className={`${styles.pocket} absolute inset-0 z-20`}>
          <Image src={envelope} alt="" fill priority sizes={sizes} className="object-fill" />
          <motion.div className={`${styles.pocketShade} absolute inset-0`}
            animate={{ opacity: opening ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : timing.flap, ease: [.55, 0, .8, .5] }} />
        </div>
        <motion.div aria-hidden="true" className={`${styles.flap} absolute inset-0 z-30 origin-top`}
          animate={{ rotateX: opening ? 170 : 0 }} transition={{ duration: reducedMotion ? 0 : timing.flap, ease: [.55, 0, .8, .5] }}>
          <div className={`${styles.flapBack} absolute inset-0`} />
          <div className={`${styles.flapFront} absolute inset-0`}>
            <Image src={envelope} alt="" fill priority sizes={sizes} className="object-fill" />
          </div>
          <motion.div className={`${styles.seal} absolute left-1/2 top-[56%] z-40 -ml-[clamp(36px,10vw,64px)] aspect-square w-[clamp(72px,20vw,128px)]`}
            initial={{ z: 3 }} animate={{ z: 3, opacity: opening ? 0 : 1, y: opening ? 20 : 0, scale: opening ? .92 : 1 }} transition={{ duration: reducedMotion ? 0 : .35 }}>
            <Image src={waxSeal} alt="" fill priority sizes="clamp(72px, 20vw, 128px)" className="object-contain" />
          </motion.div>
        </motion.div>
      </button>
      <motion.p className="text-center text-[9px] uppercase tracking-[.25em] text-[#665840] peer-focus-visible:underline peer-focus-visible:underline-offset-4 sm:text-[10px]"
        animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : .2 }}>Tap the seal to open</motion.p>
      <p role="status" className="sr-only">{opening ? "Opening your invitation." : ""}</p>
    </motion.div>
  );
}
