"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import BackgroundMusic, { type BackgroundMusicHandle } from "./BackgroundMusic";
import { welcomePhoto } from "../data/photo-layout";
import { wedding } from "../data/wedding-data";
import { heroArtwork } from "../data/hero-artwork";
import useWelcomeEntrance from "../hooks/useWelcomeEntrance";
import useHeroReady from "../hooks/useHeroReady";
import { InvitationEntryContext } from "./InvitationEntryContext";
import styles from "../styles/welcome.module.css";

export default function InvitationWelcome({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [requested, setRequested] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const invitation = useRef<HTMLDivElement>(null);
  const music = useRef<BackgroundMusicHandle>(null);
  const reducedMotion = useReducedMotion();
  const welcome = useWelcomeEntrance(!opened);
  const heroReady = useHeroReady(invitation, requested);
  const closing = requested && heroReady;

  useLayoutEffect(() => {
    if (opened) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previousOverflow; };
  }, [opened]);

  useEffect(() => {
    if (closing && reducedMotion) setOpened(true);
  }, [closing, reducedMotion]);

  useEffect(() => {
    if (!opened) {
      button.current?.focus({ preventScroll: true });
      return;
    }
    invitation.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [opened]);

  function openInvitation() {
    // Start in the guest's gesture, before the cover fade or hero mount.
    music.current?.play();
    setRequested(true);
  }

  return (
    <>
      <BackgroundMusic ref={music} visible={opened} />
      {!opened && (
        <motion.section
          ref={welcome}
          data-jb-welcome-screen
          aria-labelledby="jb-welcome-title"
          initial={false}
          animate={{ opacity: closing ? 0 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => { if (closing) setOpened(true); }}
          className="fixed inset-0 z-[70] isolate flex h-dvh items-end justify-center overflow-hidden bg-[#211f1b] px-6 pb-[max(2rem,env(safe-area-inset-bottom))] text-center sm:pb-12"
        >
          <div data-welcome-photo className="absolute inset-0">
            <Image
              src={welcomePhoto.src}
              alt={welcomePhoto.alt}
              fill priority quality={85}
              sizes="max(100vw, 149.89dvh)"
              className="object-cover object-center"
            />
          </div>
          <div aria-hidden="true" className={`${styles.shade} pointer-events-none absolute inset-0`} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
            <div className="absolute -left-1 -top-0.5 w-[34%] max-w-[240px] sm:w-[28%]">
              <div data-welcome-flower className="origin-top-left">
                <Image src={heroArtwork.leftFlowers} alt="" priority sizes="(min-width: 858px) 240px, (min-width: 640px) 28vw, 34vw" draggable={false} className="h-auto w-full" />
              </div>
            </div>
            <div className="absolute -right-1 top-0 w-[34%] max-w-[240px] sm:w-[28%]">
              <div data-welcome-flower className="origin-top-right">
                <Image src={heroArtwork.rightFlowers} alt="" priority sizes="(min-width: 858px) 240px, (min-width: 640px) 28vw, 34vw" draggable={false} className="h-auto w-full" />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-3 border border-[#fffaf3]/40 sm:inset-5" />
          <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-[#fffaf3]">
            <h1 data-welcome-name id="jb-welcome-title" aria-label={`${wedding.couple.display} wedding invitation`} className={styles.names}>
              {wedding.couple.display}
            </h1>
            <time data-welcome-date dateTime={wedding.date.iso} className="mt-2 text-xs uppercase tracking-[0.2em] sm:text-sm">
              {wedding.date.display}
            </time>
            <div aria-hidden="true" className="mt-6 h-px w-12 bg-[#fffaf3]/50" />
            <button
              data-welcome-action
              ref={button}
              type="button"
              onClick={openInvitation}
              disabled={requested}
              aria-busy={requested}
              className="mt-6 flex min-h-12 min-w-[220px] items-center justify-center gap-4 border border-[#fffaf3]/70 bg-[#fffaf3]/95 px-7 py-3 text-xs uppercase tracking-[0.16em] text-[#36472e] transition-colors hover:border-white hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fffaf3] disabled:cursor-default motion-reduce:transition-none"
            >
              {requested ? "Opening Invitation" : "Open Invitation"} <ArrowRight size={15} strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>
        </motion.section>
      )}
      <div ref={invitation} data-jb-invitation-content hidden={!requested} inert={!opened} aria-hidden={!opened} tabIndex={-1} className="outline-none">
        <InvitationEntryContext.Provider value={opened}>
          {requested && children}
        </InvitationEntryContext.Provider>
      </div>
      <noscript>
        <style>{"[data-jb-welcome-screen]{display:none}"}</style>
        {children}
      </noscript>
    </>
  );
}
