"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import openingPhoto from "./assets/prenups/Photo background website.png";
import { wedding } from "./data";
import openingLogo from "./assets/designs/Opening Logo.png";

const logoMoveDuration = 1.4;
const coverFadeDuration = 1.6;
const logoFadeDelay = 0.5;
const openingEase = [0.42, 0, 0.22, 1] as const;

export default function OpeningScreen({
  onOpen,
  onReveal,
  onOpened,
}: {
  onOpen: () => void;
  onReveal: () => void;
  onOpened: () => void;
}) {
  const [opening, setOpening] = useState(false);
  const [logoDestination, setLogoDestination] = useState({ x: 0, y: 0, scale: 1 });
  const entrance = useRef<HTMLDivElement>(null);
  const coverLogo = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    entrance.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!opening) return;
    // Reveal the invitation during the garden fade, just before the moving
    // cover logo starts dissolving into the illustration underneath.
    const reveal = window.setTimeout(onReveal, reducedMotion ? 0 : 400);
    return () => window.clearTimeout(reveal);
  }, [opening, reducedMotion, onReveal]);

  function openInvitation() {
    if (opening) return;
    const target = document.querySelector<HTMLElement>("#home .lj-opening-logo");
    if (!reducedMotion && coverLogo.current && target) {
      const source = coverLogo.current.getBoundingClientRect();
      const destination = target.getBoundingClientRect();
      // The invitation logo waits 16px below its final position for its reveal.
      const revealOffset = new DOMMatrixReadOnly(getComputedStyle(target).transform).m42;
      // Match the illustration inside the sage frame, not the frame's edges.
      // The artwork occupies about 68% of the supplied cover image's height.
      setLogoDestination({
        x: destination.left + destination.width / 2 - (source.left + source.width / 2),
        y: destination.top - revealOffset + destination.height / 2 - (source.top + source.height * 0.49),
        scale: destination.height / (source.height * 0.68),
      });
    }
    // Start playback within the guest's click/keypress to preserve browser
    // audio permission while the cover animation runs.
    onOpen();
    setOpening(true);
  }

  return (
    <div
      ref={entrance}
      tabIndex={-1}
      className="lj-opening-screen fixed inset-0 z-[100] h-dvh overflow-hidden text-[#f2ede0] outline-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lj-opening-title"
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          entrance.current
            ?.querySelector<HTMLButtonElement>("button:not(:disabled)")
            ?.focus();
        }
        if (
          event.target === event.currentTarget &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          openInvitation();
        }
      }}
    >
      <h1 id="lj-opening-title" className="sr-only">
        Leslie and Serj — your wedding invitation
      </h1>
      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: reducedMotion ? 0.2 : coverFadeDuration, ease: "easeInOut" }}
      >
        <Image
          src={openingPhoto}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="lj-opening-shade absolute inset-0" />
      </motion.div>
      <motion.div
        className="relative mx-auto flex h-full max-w-xl flex-col items-center justify-between px-6 py-[clamp(24px,5svh,52px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reducedMotion ? 0.15 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <button
          type="button"
          disabled={opening}
          aria-label="Open Leslie and Serj’s wedding invitation"
          className="group flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-6 rounded-sm py-5 focus-visible:outline-none"
          onClick={openInvitation}
        >
          <motion.span
            ref={coverLogo}
            className="relative block h-[clamp(180px,49svh,390px)] aspect-[556/764] max-w-full shrink-0"
            initial={false}
            animate={{
              ...(opening && !reducedMotion ? logoDestination : { x: 0, y: 0, scale: 1 }),
              opacity: opening ? 0 : 1,
            }}
            style={{ transformOrigin: "50% 49%" }}
            transition={{
              duration: reducedMotion ? 0 : logoMoveDuration,
              ease: openingEase,
              opacity: {
                delay: opening && !reducedMotion ? logoFadeDelay : 0,
                duration: reducedMotion ? 0.2 : coverFadeDuration - logoFadeDelay,
                ease: "easeInOut",
              },
            }}
            onAnimationComplete={() => {
              if (opening) onOpened();
            }}
          >
            <Image
              src={openingLogo}
              alt="Leslie and Serj dancing in a teacup inside a scalloped sage-green frame"
              fill
              priority
              sizes="(max-width: 700px) 70vw, 284px"
              className="object-contain"
            />
          </motion.span>
          <motion.span
            className="border-b border-[#f2ede04d] px-2 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors group-hover:border-[#f2ede0] group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-offset-4"
            initial={false}
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.4, ease: "easeInOut" }}
          >
            Click to open
          </motion.span>
        </button>
        <motion.p
          className="text-[9px] tracking-[0.2em]"
          initial={false}
          animate={{ opacity: opening ? 0 : 0.7 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.4, ease: "easeInOut" }}
        >
          {wedding.openingCaption}
        </motion.p>
      </motion.div>
    </div>
  );
}
