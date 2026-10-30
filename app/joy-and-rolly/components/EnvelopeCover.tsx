"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { RefObject } from "react";
import FloralArtwork from "./FloralArtwork";
import monogram from "../designs/monogram.png";
import { wedding } from "../data/wedding";
import styles from "../styles/envelope.module.css";

type EnvelopeCoverProps = {
  opening: boolean;
  reducedMotion: boolean;
  actionRef: RefObject<HTMLButtonElement | null>;
  onOpen: () => void;
  onOpened: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;
const paperEase = [0.45, 0.05, 0.2, 1] as const;
const timing = { seal: 0.4, flapDelay: 0.25, flap: 1.8, flapBehind: 1.2, cardDelay: 1.45, card: 1.2, hold: 2.4, exit: 0.55 };
const exitDelay = timing.cardDelay + timing.card + timing.hold;

export default function EnvelopeCover({ opening, reducedMotion, actionRef, onOpen, onOpened }: EnvelopeCoverProps) {
  return <div data-envelope-cover className={`${styles.cover} fixed inset-0 z-50 overflow-y-auto overscroll-y-contain`} aria-label="Wedding invitation envelope">
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-8 pt-[max(5rem,16svh)] text-center">
      <FloralArtwork priority sizes="(min-width: 768px) 360px, 190px" className="absolute -bottom-8 -left-14 w-[190px] opacity-70 md:w-[360px]" />
      <FloralArtwork sizes="(min-width: 768px) 360px, 190px" className="absolute -right-14 -top-8 w-[190px] rotate-180 opacity-70 md:w-[360px]" />
      <motion.div className="relative z-10 flex w-full flex-col items-center"
        initial={false} animate={{ opacity: opening ? 0 : 1, scale: opening && !reducedMotion ? 0.99 : 1 }}
        transition={{ delay: opening ? (reducedMotion ? timing.hold : exitDelay) : 0, duration: reducedMotion ? 0.15 : timing.exit, ease: paperEase }}
        onAnimationComplete={() => { if (opening) onOpened(); }}>
        <button ref={actionRef} type="button" aria-label="Open invitation" aria-describedby="jr-envelope-hint" aria-disabled={opening}
          onClick={onOpen} className={`${styles.envelope} relative block aspect-[3/2] w-full max-w-[min(640px,70svh)] text-center`}>
          <span aria-hidden="true" className={`${styles.back} absolute inset-0`} />
          <motion.span aria-hidden="true" className={`${styles.letter} absolute inset-x-[7%] top-[8%] z-[5] flex h-[84%] flex-col items-center justify-start gap-[8px] px-[3%] pt-[5%]`}
            initial={false} animate={{ y: opening ? "-56%" : "0%" }}
            transition={{ delay: reducedMotion ? 0 : timing.cardDelay, duration: reducedMotion ? 0 : timing.card, ease }}>
            <span className={styles.cardDetails}><span className="block">{wedding.couple.shortDisplay}</span><span className="block">Are getting married</span></span>
            <span className={styles.cardTitle}>Save the Date</span>
            <span className={styles.cardDetails}>{wedding.date.numeric}</span>
          </motion.span>
          <span aria-hidden="true" className={`${styles.leftFold} absolute inset-0 z-10`} />
          <span aria-hidden="true" className={`${styles.rightFold} absolute inset-0 z-10`} />
          <span aria-hidden="true" className={`${styles.pocket} absolute inset-0 z-20`} />
          <motion.span aria-hidden="true" className={`${styles.flap} absolute inset-x-0 top-0 h-[62%] origin-top`}
            initial={false} animate={{ rotateX: opening ? -176 : 0, zIndex: opening ? 0 : 30 }}
            transition={{ delay: reducedMotion ? 0 : timing.flapDelay, duration: reducedMotion ? 0 : timing.flap, ease: paperEase, zIndex: { delay: reducedMotion ? 0 : timing.flapBehind, duration: 0 } }}>
            <span className={`${styles.flapFront} absolute inset-0`} />
            <span className={`${styles.flapBack} absolute inset-0`} />
          </motion.span>
          <motion.span aria-hidden="true" className={`${styles.seal} absolute left-1/2 top-[52%] z-40 -ml-[clamp(28px,6vw,45px)] flex aspect-square w-[clamp(56px,12vw,90px)] items-center justify-center`}
            initial={false} animate={{ opacity: opening ? 0 : 1, y: opening && !reducedMotion ? -6 : 0, scale: opening && !reducedMotion ? 1.025 : 1 }}
            transition={{ duration: reducedMotion ? 0 : timing.seal, ease }}>
            <span className="flex size-[78%] items-center justify-center rounded-full bg-[#fbf9f6]">
              <Image src={monogram} alt="" priority unoptimized className="pointer-events-none size-[88%] select-none object-contain" />
            </span>
          </motion.span>
        </button>
        <h1 className={`${styles.names} mt-9`}>{wedding.couple.display}</h1>
        <p id="jr-envelope-hint" className="mt-4 text-base leading-6">{opening ? "Opening your invitation…" : "Tap the seal to open"}</p>
      </motion.div>
    </div>
  </div>;
}
