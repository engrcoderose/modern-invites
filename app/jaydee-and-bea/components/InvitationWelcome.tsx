"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import useReducedMotionPreference from "@/components/landing/useMarketingReducedMotion";
import GatefoldPacket from "@/components/invitation-opening/GatefoldPacket";
import openingStyles from "@/components/invitation-opening/styles/opening.module.css";
import BackgroundMusic, { type BackgroundMusicHandle } from "./BackgroundMusic";
import OpeningHeroCard from "./OpeningHeroCard";
import { wedding } from "../data/wedding-data";
import useHeroReady from "../hooks/useHeroReady";
import useHeroExpansion from "../hooks/useHeroExpansion";
import { InvitationEntryContext } from "./InvitationEntryContext";
import styles from "../styles/welcome.module.css";

export default function InvitationWelcome({ children, openingHero }: { children: ReactNode; openingHero: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [requested, setRequested] = useState(false);
  const [unwrapped, setUnwrapped] = useState(false);
  const [letteringShown, setLetteringShown] = useState(false);
  const [letteringReady, setLetteringReady] = useState(false);
  const cover = useRef<HTMLElement>(null);
  const invitation = useRef<HTMLDivElement>(null);
  const music = useRef<BackgroundMusicHandle>(null);
  const packet = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const heroReady = useHeroReady(invitation, requested);
  const completeOpening = useCallback(() => setOpened(true), []);
  const expansion = useHeroExpansion({ packet, card, invitation, requested: requested && !opened, ready: heroReady, unwrapped, letteringReady, reducedMotion, onComplete: completeOpening });
  const finishLettering = useCallback(() => setLetteringShown(true), []);

  useEffect(() => {
    if (!letteringShown || opened) return;
    // A short reading beat follows the last text transition before the shared scene expands.
    const pause = window.setTimeout(() => setLetteringReady(true), 350);
    return () => window.clearTimeout(pause);
  }, [letteringShown, opened]);

  useLayoutEffect(() => {
    if (opened) return;
    const previousOverflow = document.documentElement.style.overflow;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.scrollbarGutter = "stable";
    return () => { document.documentElement.style.overflow = previousOverflow; document.documentElement.style.scrollbarGutter = previousGutter; };
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    invitation.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [opened]);

  const requestOpening = useCallback(() => {
    music.current?.prepare();
    setRequested(true);
  }, []);

  const finishUnwrapping = useCallback(() => {
    music.current?.play();
    setUnwrapped(true);
    cover.current?.focus({ preventScroll: true });
  }, []);

  function keepCoverFocus(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const action = cover.current?.querySelector<HTMLButtonElement>("button");
    (action ?? cover.current)?.focus({ preventScroll: true });
  }

  return <>
    <BackgroundMusic ref={music} visible={opened} />
    {!opened && (
      <section ref={cover} data-jb-welcome-screen aria-labelledby="jb-welcome-title" tabIndex={-1}
        onKeyDown={keepCoverFocus}
        className={`${openingStyles.preview} ${styles.cover} fixed inset-0 z-[70] isolate flex h-dvh items-center justify-center overflow-hidden px-4 py-16 outline-none`}>
        <h1 id="jb-welcome-title" className="sr-only">{wedding.couple.display} wedding invitation</h1>
        <GatefoldPacket autoFocus onRequest={requestOpening} onOpened={finishUnwrapping} readyToReveal={heroReady}
          packetRef={packet} style={expansion.packetStyle} className={expansion.phase === "expanding" ? styles.expandingPacket : undefined} onTransitionEnd={expansion.onTransitionEnd}
          card={<OpeningHeroCard ref={card} scene={expansion.scene} expanding={expansion.phase === "expanding"} unwrapped={unwrapped} onLetteringComplete={finishLettering}>{openingHero}</OpeningHeroCard>} />
        <span className="sr-only" role="status">{expansion.phase === "expanding" ? "Entering your invitation." : requested ? "Unwrapping your invitation." : ""}</span>
      </section>
    )}
    <div ref={invitation} data-jb-invitation-content hidden={!requested} inert={!opened} aria-hidden={!opened} tabIndex={-1}
      style={{ visibility: opened ? "visible" : "hidden" }} className="outline-none">
      <InvitationEntryContext.Provider value={opened}>{requested && children}</InvitationEntryContext.Provider>
    </div>
    <noscript><style>{"[data-jb-welcome-screen]{display:none}"}</style>{children}</noscript>
  </>;
}
