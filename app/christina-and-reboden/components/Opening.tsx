"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { artwork } from "../data/media";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function Opening({ onOpen, onOpened }: { onOpen: () => void; onOpened: () => void }) {
  const [opening, setOpening] = useState(false);
  const requested = useRef(false);
  const reduced = useReducedMotion();
  return <motion.section aria-label="Open Christina and Reboden’s wedding invitation" className={`${styles.cover} absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-5 text-center`}
    initial={false} animate={opening ? { opacity: 0, scale: reduced ? 1 : 1.035 } : { opacity: 1, scale: 1 }}
    transition={{ duration: reduced ? .16 : .85, ease: [.22, 1, .36, 1] }} onAnimationComplete={() => { if (requested.current) onOpened(); }}>
    <Image src={artwork.garden} alt="" fill priority sizes="100vw" className={`${styles.garden} object-cover`} />
    <div className={`${styles.coverWash} absolute inset-0`} />
    <div className="relative flex w-full max-w-xl flex-col items-center gap-4 sm:gap-5">
      <p className={`${styles.coverMessage} max-w-sm`}>Together with our families, we invite you to celebrate our marriage</p>
      <button type="button" aria-label="Open invitation" aria-describedby="cr-envelope-hint" aria-busy={opening} disabled={opening}
        onClick={() => { if (requested.current) return; requested.current = true; onOpen(); setOpening(true); }}
        className={`${styles.envelope} relative cursor-pointer border-0 bg-transparent p-0 disabled:cursor-wait`}>
        <Image src={artwork.envelope} alt="" fill priority sizes="(max-width: 640px) 220px, 270px" className="object-contain" />
        <span aria-hidden="true" className={`${styles.monogram} absolute inset-x-0`}>C<span>&</span>R</span>
      </button>
      <h1 className={styles.couple}>{wedding.couple}</h1>
      <p className={styles.coverDate}>23 January 2027 · Malolos, Bulacan</p>
      <p id="cr-envelope-hint" aria-live="polite" className="mt-1 text-xs italic">{opening ? "Opening your invitation…" : "Tap the envelope to open"}</p>
    </div>
  </motion.section>;
}
