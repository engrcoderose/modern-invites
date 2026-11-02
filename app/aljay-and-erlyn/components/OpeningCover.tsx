"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import gardenBackground from "../assets/design/whimsical-garden-background.png";
import { WeddingLogo } from "./Stationery";
import styles from "../styles/wedding.module.css";

export default function OpeningCover({ onStart, onComplete }: { onStart: () => void; onComplete: () => void }) {
  const [opening, setOpening] = useState(false);
  const started = useRef(false);
  const [ready, setReady] = useState(false);
  const [destination, setDestination] = useState({ x: 0, y: 0, scale: 1 });
  const [aligned, setAligned] = useState(false);
  const cover = useRef<HTMLDivElement>(null);
  const artwork = useRef<HTMLSpanElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const images = Array.from(cover.current?.querySelectorAll("img") ?? []);
    Promise.all([document.fonts.ready, ...images.map(image => image.decode().catch(() => {}))]).then(() => { if (!cancelled) setReady(true); });
    const fallback = window.setTimeout(() => setReady(true), 2200);
    return () => { cancelled = true; window.clearTimeout(fallback); };
  }, []);
  useEffect(() => { if (ready) openButton.current?.focus({ preventScroll: true }); }, [ready]);

  function open() {
    if (started.current || !ready) return;
    started.current = true;
    const target = document.querySelector<HTMLElement>("#ae-invitation-art");
    if (!reducedMotion && artwork.current && target) {
      const source = artwork.current.getBoundingClientRect();
      const end = target.getBoundingClientRect();
      setDestination({ x: end.left + end.width / 2 - source.left - source.width / 2, y: end.top + end.height / 2 - source.top - source.height / 2, scale: end.height / source.height });
      setAligned(true);
    }
    onStart();
    setOpening(true);
  }

  return <div ref={cover} role="dialog" aria-modal="true" aria-labelledby="ae-cover-title" aria-busy={!ready || opening} className={`${styles.cover} fixed inset-0 z-50 h-dvh overflow-hidden`}>
    <h1 id="ae-cover-title" className="sr-only">Aljay and Erlyn — your wedding invitation</h1>
    <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: ready && !opening ? 1 : 0 }} transition={{ duration: reducedMotion ? 0.2 : opening ? 1.8 : 0.7 }} onAnimationComplete={() => { if (opening) onComplete(); }}>
      <Image src={gardenBackground} alt="" fill priority sizes="(max-aspect-ratio: 3/2) 150dvh, 100vw" className="pointer-events-none object-cover" />
    </motion.div>
    <motion.div className="relative mx-auto flex h-full max-w-xl flex-col items-center justify-center px-6 py-8" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: reducedMotion ? 0.15 : 0.7 }}>
      <button ref={openButton} type="button" disabled={!ready || opening} aria-label="Open Aljay and Erlyn’s wedding invitation" onClick={open} className="group flex max-w-full flex-col items-center gap-6 focus-visible:outline-none">
        <span className="relative block h-[clamp(250px,52svh,400px)] aspect-[33/46] max-w-full">
          <motion.span ref={artwork} className="absolute inset-0" animate={{ ...(opening && !reducedMotion ? destination : { x: 0, y: 0, scale: 1 }), opacity: opening && (reducedMotion || !aligned) ? 0 : 1 }} transition={{ duration: reducedMotion ? 0.15 : 1.5, ease: [0.38, 0.05, 0.25, 1] }} style={{ transformOrigin: "center" }}>
            <motion.span className="absolute inset-0" initial={false} animate={{ opacity: opening && aligned ? 0 : 1 }} transition={{ duration: 0.65, delay: opening ? 0.35 : 0 }}>
              <WeddingLogo priority className="h-full w-full" sizes="clamp(179px, 37.3svh, 287px)" />
            </motion.span>
            <motion.span aria-hidden="true" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: opening && aligned ? 1 : 0 }} transition={{ duration: 0.65, delay: opening ? 0.35 : 0 }}>
              <WeddingLogo variant="green" priority className="h-full w-full" sizes="clamp(179px, 37.3svh, 287px)" />
            </motion.span>
          </motion.span>
        </span>
        <motion.span className={`${styles.openPrompt} min-h-11 border-b px-2 py-3 group-focus-visible:border-b-2 group-focus-visible:border-current`} animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: 0.3 }}>Click to open</motion.span>
      </button>
    </motion.div>
  </div>;
}
