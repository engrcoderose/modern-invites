"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Garden from "./Garden";
import { Monogram, Names, Ornament } from "./Stationery";
import styles from "../styles/wedding.module.css";

export default function OpeningCover({ onStart, onComplete }: { onStart: () => void; onComplete: () => void }) {
  const [opening, setOpening] = useState(false);
  const started = useRef(false);
  const [imageReady, setImageReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const ready = imageReady && fontsReady;

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => { if (!cancelled) setFontsReady(true); });
    // A failed asset or font must never leave the invitation locked shut.
    const fallback = window.setTimeout(() => { setImageReady(true); setFontsReady(true); }, 2200);
    return () => { cancelled = true; window.clearTimeout(fallback); };
  }, []);
  useEffect(() => { if (ready) openButton.current?.focus({ preventScroll: true }); }, [ready]);

  function open() {
    if (started.current) return;
    started.current = true;
    onStart();
    setOpening(true);
  }

  return <div role="dialog" aria-modal="true" aria-labelledby="ae-cover-title" className={`${styles.cover} fixed inset-0 z-50 overflow-y-auto`}>
    <motion.div className="absolute inset-0" animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: reducedMotion ? 0.18 : 1.05 }}>
      <Garden priority onReady={() => setImageReady(true)} />
      <div className={styles.coverVignette} />
    </motion.div>
    <div className="relative flex min-h-full items-center justify-center px-5 py-8 sm:py-10">
      <motion.div className={`${styles.coverCard} relative flex w-full max-w-[430px] flex-col items-center px-7 py-10 text-center sm:px-12 sm:py-12`}
        initial={false} animate={{ opacity: opening || !ready ? 0 : 1, rotateY: opening && !reducedMotion ? -82 : 0, x: opening && !reducedMotion ? -30 : 0 }}
        transition={{ duration: reducedMotion ? 0.2 : opening ? 1.1 : 0.45, ease: [0.42, 0, 0.2, 1] }}
        onAnimationComplete={() => { if (opening) onComplete(); }}>
        <Monogram className="mb-5" />
        <Ornament />
        <h1 id="ae-cover-title" className="my-7"><span className="sr-only">The wedding of </span><Names cover /></h1>
        <p className={`${styles.coverNote} mb-7 max-w-[230px]`}>A love twelve years in the making,<br />a lifetime still to come.</p>
        <button type="button" ref={openButton} disabled={opening || !ready} onClick={open} className={`${styles.button} inline-flex min-h-12 items-center justify-center gap-5 px-7 py-3`}>
          {opening ? "Opening…" : "Open invitation"}<ArrowRight size={16} strokeWidth={1.3} aria-hidden="true" />
        </button>
        <p className={`${styles.tiny} mt-7`}>With love, for you.</p>
      </motion.div>
    </div>
  </div>;
}
