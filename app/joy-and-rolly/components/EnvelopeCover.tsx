"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FloralArtwork from "./FloralArtwork";
import HeroBackdrop from "./HeroBackdrop";
import useEnvelopeOpening from "./useEnvelopeOpening";
import { envelopeMotion } from "./envelopeMotion";
import closedEnvelope from "../designs/close-envelope.png";
import openEnvelope from "../designs/open-envelope.png";
import saveTheDate from "../designs/joy-and-rolly-save-the-date.png";
import { wedding } from "../data/wedding";
import styles from "../styles/envelope.module.css";

type EnvelopeCoverProps = {
  opening: boolean;
  reducedMotion: boolean;
  actionRef: RefObject<HTMLButtonElement | null>;
  onOpen: () => void;
  onOpened: () => void;
};

export default function EnvelopeCover({ opening, reducedMotion, actionRef, onOpen, onOpened }: EnvelopeCoverProps) {
  const cover = useRef<HTMLDivElement>(null);
  const [cardFailed, setCardFailed] = useState(false);
  const [heroFrame, setHeroFrame] = useState({ top: 61, height: 0 });
  const { paper, exit, phase } = useEnvelopeOpening({ opening, reducedMotion, onOpened, cover });

  useLayoutEffect(() => {
    const hero = document.getElementById("invitation");
    if (!hero) return;
    const measure = () => {
      const rect = hero.getBoundingClientRect();
      setHeroFrame({ top: rect.top + window.scrollY, height: rect.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    const navigation = hero.closest("main")?.previousElementSibling;
    if (navigation) observer.observe(navigation);
    return () => observer.disconnect();
  }, []);

  return <div ref={cover} data-envelope-cover data-opening-phase={phase} className={`${styles.cover} fixed inset-0 z-50 overflow-x-hidden overflow-y-auto overscroll-y-contain`} aria-label="Wedding invitation envelope">
    <motion.div aria-hidden="true" initial="closed" animate={exit}
      variants={{ closed: { opacity: 0 }, exited: { opacity: 1, transition: { duration: reducedMotion ? 0.2 : 1, ease: "easeInOut" } } }}
      className="pointer-events-none absolute inset-0 bg-[#fbf9f6]">
      <div className="absolute inset-x-0 isolate" style={{ top: heroFrame.top, height: heroFrame.height }}><HeroBackdrop /></div>
    </motion.div>
    <motion.div initial="closed" animate={exit}
      variants={{ closed: { opacity: 1, scale: 1 }, exited: { opacity: 0, scale: reducedMotion ? 1 : 0.99, transition: { duration: reducedMotion ? 0.2 : 0.7, ease: "easeInOut" } } }}
      className="relative flex min-h-[100svh] items-center justify-center py-5">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <FloralArtwork sizes="(min-width: 768px) 360px, 190px" className="absolute -bottom-8 -left-14 w-[190px] opacity-70 md:w-[360px]" />
        <FloralArtwork sizes="(min-width: 768px) 360px, 190px" className="absolute -right-14 -top-8 w-[190px] rotate-180 opacity-70 md:w-[360px]" />
      </div>
      <div className={`${styles.scene} relative`}>
        <motion.div initial="closed" animate={paper} variants={envelopeMotion.anchor} className={`${styles.envelopeAnchor} absolute inset-x-0 bottom-0`}>
          <button ref={actionRef} type="button" aria-label="Open invitation" aria-describedby="jr-envelope-hint" aria-disabled={opening}
            onClick={() => { if (!opening) onOpen(); }} className={`${styles.envelope} relative block size-full text-center`}>
            <span aria-hidden="true" className={`${styles.bodyBase} absolute inset-0`} />
            <span aria-hidden="true" className={`${styles.openBody} pointer-events-none absolute inset-0`}>
              <Image src={openEnvelope} alt="" unoptimized loading="eager" className={styles.openedArtwork} />
            </span>
            <motion.span aria-hidden="true" initial="closed" animate={paper} variants={envelopeMotion.openFlap} className={`${styles.openFlap} pointer-events-none absolute inset-x-0 bottom-full`}>
              <Image src={openEnvelope} alt="" unoptimized loading="eager" className={styles.openFlapArtwork} />
            </motion.span>
            <span className={`${styles.cardWindow} pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden`}>
              <motion.span data-envelope-card initial="closed" animate={paper} variants={envelopeMotion.card} className={`${styles.card} absolute bottom-0 block`}>
                {cardFailed ? <span className={`${styles.cardFallback} absolute inset-0 flex flex-col items-center justify-center gap-4 p-4`}>
                  <span className={styles.fallbackTitle}>Save the Date</span><span>{wedding.date.display}</span><span>{wedding.couple.shortDisplay}</span>
                </span> : <Image src={saveTheDate} alt={`Save the Date — ${wedding.couple.shortDisplay}, ${wedding.date.display}`} fill loading="eager"
                  sizes="min(538px, calc(96vw - 38.4px), calc(53.93svh - 43.15px))" onError={() => setCardFailed(true)} className="select-none object-contain" />}
              </motion.span>
            </span>
            <motion.span aria-hidden="true" initial="closed" animate={paper} variants={envelopeMotion.pocket} className={`${styles.frontPocket} pointer-events-none absolute inset-0 z-20`}>
              <Image src={openEnvelope} alt="" unoptimized loading="eager" className={styles.openedArtwork} />
            </motion.span>
            <motion.span aria-hidden="true" initial="closed" animate={paper} variants={envelopeMotion.closedBody} className={`${styles.closedBody} pointer-events-none absolute inset-0 z-30`}>
              <Image src={closedEnvelope} alt="" priority unoptimized className={styles.closedArtwork} />
            </motion.span>
            <motion.span aria-hidden="true" initial="closed" animate={paper} variants={envelopeMotion.closedFlap} className={`${styles.closedFlap} pointer-events-none absolute inset-0 z-40`}>
              <Image src={closedEnvelope} alt="" unoptimized loading="eager" className={styles.closedArtwork} />
            </motion.span>
          </button>
        </motion.div>
        <motion.div initial="closed" animate={paper} variants={envelopeMotion.caption} className="absolute inset-x-0 top-[76%] text-center">
          <h1 className={styles.names}>{wedding.couple.display}</h1>
          <p id="jr-envelope-hint" className="mt-3 text-base leading-6">{opening ? "Opening your invitation…" : "Tap the envelope to open"}</p>
        </motion.div>
      </div>
    </motion.div>
    <p role="status" className="sr-only">{phase === "holding" ? `Save the Date — ${wedding.couple.shortDisplay}, ${wedding.date.display}.` : ""}</p>
  </div>;
}
