"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import openingPhoto from "./assets/prenups/Photo background website.png";
import { wedding } from "./data";
import openingLogo from "./assets/designs/Opening Logo.png";

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
  const entrance = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    entrance.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!opening) return;
    // Let the invitation enter while the cover clears, retaining the dialog's
    // focus trap until both panels have finished moving.
    const reveal = window.setTimeout(onReveal, reducedMotion ? 0 : 520);
    return () => window.clearTimeout(reveal);
  }, [opening, reducedMotion, onReveal]);

  function openInvitation() {
    if (opening) return;
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
      <div className="lj-opening-doors absolute inset-0" aria-hidden="true">
        {(["left", "right"] as const).map((side) => (
          <motion.div
            key={side}
            className={`lj-opening-door absolute inset-y-0 w-1/2 overflow-hidden ${side === "left" ? "left-0 origin-left" : "right-0 origin-right"}`}
            initial={false}
            animate={
              opening
                ? {
                    x: reducedMotion
                      ? "0%"
                      : side === "left"
                        ? "-105%"
                        : "105%",
                    rotateY: reducedMotion ? 0 : side === "left" ? -32 : 32,
                    opacity: 0,
                  }
                : { x: "0%", rotateY: 0, opacity: 1 }
            }
            transition={{
              duration: reducedMotion ? 0.2 : 2.2,
              delay: reducedMotion ? 0 : 0.12,
              ease: [0.32, 0, 0.18, 1],
              opacity: {
                duration: reducedMotion ? 0.2 : 1.5,
                delay: reducedMotion ? 0 : 0.65,
                ease: "easeInOut",
              },
            }}
            onAnimationComplete={() => {
              if (opening && side === "right") onOpened();
            }}
          >
            <div
              className={`absolute inset-y-0 w-[200%] ${side === "left" ? "left-0" : "right-0"}`}
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
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="relative mx-auto flex h-full max-w-xl flex-col items-center justify-between px-6 py-[clamp(24px,5svh,52px)]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: opening ? 0 : 1,
          y: opening && !reducedMotion ? -6 : 0,
          scale: opening && !reducedMotion ? 0.985 : 1,
        }}
        transition={{
          duration: reducedMotion ? 0.15 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.button
          type="button"
          disabled={opening}
          aria-label="Open Leslie and Serj’s wedding invitation"
          className="group flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-6 rounded-sm py-5 focus-visible:outline-none"
          onClick={openInvitation}
          whileHover={reducedMotion || opening ? {} : { scale: 1.012 }}
          whileTap={reducedMotion ? {} : { scale: 0.99 }}
          transition={{ duration: 0.45 }}
        >
          <span className="relative block h-[clamp(180px,49svh,390px)] aspect-[556/764] max-w-full shrink-0">
            <Image
              src={openingLogo}
              alt="Leslie and Serj dancing in a teacup inside a scalloped sage-green frame"
              fill
              priority
              sizes="(max-width: 700px) 70vw, 284px"
              className="object-contain"
            />
          </span>
          <span className="border-b border-[#f2ede04d] px-2 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors group-hover:border-[#f2ede0] group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-offset-4">
            Click to open
          </span>
        </motion.button>
        <p className="text-[9px] tracking-[0.2em] opacity-70">{wedding.openingCaption}</p>
      </motion.div>
    </div>
  );
}
