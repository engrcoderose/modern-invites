"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import openingPhoto from "./assets/prenups/Photo background website.png";
import { wedding } from "./data";
import openingLogo from "./assets/designs/Opening Logo.png";
import weddingIllustration from "./assets/designs/Wedding Logo.png";

const logoMoveDuration = 1.4;
const coverFadeDuration = 1.6;
const logoFadeDelay = 0.5;
const openingEase = [0.42, 0, 0.22, 1] as const;

export default function OpeningScreen({
  onOpen,
  onOpened,
}: {
  onOpen: () => void;
  onOpened: () => void;
}) {
  const [opening, setOpening] = useState(false);
  const [photoReady, setPhotoReady] = useState(false);
  const [logoReady, setLogoReady] = useState(false);
  const [weddingLogoReady, setWeddingLogoReady] = useState(false);
  const [fontReady, setFontReady] = useState(false);
  const [logoDestination, setLogoDestination] = useState({ x: 0, y: 0, scale: 1 });
  const entrance = useRef<HTMLDivElement>(null);
  const coverLogo = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const ready = photoReady && logoReady && weddingLogoReady && fontReady;
  const backgroundOpacity = useMotionValue(0);
  const contentOpacity = useMotionValue(0);
  const frameOpacity = useMotionValue(1);
  const weddingOpacity = useMotionValue(0);
  const promptOpacity = useMotionValue(1);
  const captionOpacity = useTransform(promptOpacity, [0, 1], [0, 0.7]);

  // Keep final opacity values in inline styles. Cancelling native element
  // animations during unmount can expose their initial values for one frame.
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
      animate(frameOpacity, 0, dissolve),
      animate(weddingOpacity, reducedMotion ? 0 : 1, dissolve),
      animate(promptOpacity, 0, {
        duration: reducedMotion ? 0.2 : 0.4,
        ease: "easeInOut",
      }),
    ];
    return () => animations.forEach((animation) => animation.stop());
  }, [opening, reducedMotion, frameOpacity, weddingOpacity, promptOpacity]);

  useEffect(() => {
    entrance.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    let cancelled = false;
    // Reveal the decoded artwork and final font together, including on reload.
    void document.fonts
      .load('400 11px "Noto Serif"')
      .catch(() => {})
      .then(() => document.fonts.ready)
      .then(() => {
        if (!cancelled) setFontReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function openInvitation() {
    if (opening || !ready) return;
    const target = document.querySelector<HTMLElement>("#home .lj-opening-logo");
    if (!reducedMotion && coverLogo.current && target) {
      const source = coverLogo.current.getBoundingClientRect();
      const destination = target.getBoundingClientRect();
      // Land directly on the stationary wedding logo while the text fades in.
      setLogoDestination({
        x: destination.left + destination.width / 2 - (source.left + source.width / 2),
        y: destination.top + destination.height / 2 - (source.top + source.height * 0.49),
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
      className="lj-opening-screen fixed inset-0 z-[100] h-dvh overflow-hidden bg-[#f2ede0] text-[#f2ede0] outline-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lj-opening-title"
      aria-busy={!ready || opening}
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
        style={{ opacity: backgroundOpacity }}
      >
        <Image
          src={openingPhoto}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          onLoad={() => setPhotoReady(true)}
          onError={() => setPhotoReady(true)}
        />
        <div className="lj-opening-shade absolute inset-0" />
      </motion.div>
      <motion.div
        className="relative mx-auto flex h-full max-w-xl flex-col items-center justify-between px-6 py-[clamp(24px,5svh,52px)]"
        style={{ opacity: contentOpacity }}
      >
        <button
          type="button"
          disabled={!ready || opening}
          aria-label="Open Leslie and Serj’s wedding invitation"
          className="group flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-6 rounded-sm py-5 focus-visible:outline-none"
          onClick={openInvitation}
        >
          <motion.span
            ref={coverLogo}
            className="relative block h-[clamp(180px,49svh,390px)] aspect-[556/764] max-w-full shrink-0"
            initial={false}
            animate={opening && !reducedMotion ? logoDestination : { x: 0, y: 0, scale: 1 }}
            style={{ transformOrigin: "50% 49%" }}
            transition={{
              duration: reducedMotion ? 0.15 : logoMoveDuration,
              ease: openingEase,
            }}
          >
            <motion.span
              className="absolute inset-0"
              style={{ opacity: frameOpacity }}
            >
              <Image
                src={openingLogo}
                alt="Leslie and Serj dancing in a teacup inside a scalloped sage-green frame"
                fill
                priority
                sizes="(max-width: 700px) 70vw, 284px"
                className="object-contain"
                onLoad={() => setLogoReady(true)}
                onError={() => setLogoReady(true)}
              />
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 top-[49%] h-[68%] aspect-[2533/3769] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              style={{ opacity: weddingOpacity }}
            >
              <Image
                src={weddingIllustration}
                alt=""
                priority
                sizes="800px"
                className="lj-opening-illustration absolute"
                onLoad={() => setWeddingLogoReady(true)}
                onError={() => setWeddingLogoReady(true)}
              />
            </motion.span>
          </motion.span>
          <motion.span
            className="border-b border-[#f2ede04d] px-2 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors group-hover:border-[#f2ede0] group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-offset-4"
            style={{ opacity: promptOpacity }}
          >
            Click to open
          </motion.span>
        </button>
        <motion.p
          className="text-[9px] tracking-[0.2em]"
          style={{ opacity: captionOpacity }}
        >
          {wedding.openingCaption}
        </motion.p>
      </motion.div>
    </div>
  );
}
