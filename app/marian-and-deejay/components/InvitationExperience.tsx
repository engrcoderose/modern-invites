"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import GatefoldPacket from "@/components/invitation-opening/GatefoldPacket";
import openingStyles from "@/components/invitation-opening/styles/opening.module.css";
import useReducedMotionPreference from "@/components/landing/useMarketingReducedMotion";
import OpeningHeroCard from "./OpeningHeroCard";
import useOpeningHeroReady from "../hooks/useOpeningHeroReady";
import useOpeningExpansion from "../hooks/useOpeningExpansion";
import { InvitationOpenContext } from "./InvitationState";
import wedding from "../data/wedding-details.json";
import "../styles/invitation.css";

export default function InvitationExperience({ children, openingHero, className = "" }: { children: ReactNode; openingHero: ReactNode; className?: string }) {
  const [opened, setOpened] = useState(false);
  const [requested, setRequested] = useState(false);
  const [unwrapped, setUnwrapped] = useState(false);
  const [letteringShown, setLetteringShown] = useState(false);
  const [letteringReady, setLetteringReady] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const packet = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const heroReady = useOpeningHeroReady(content, requested);
  const finish = useCallback(() => setOpened(true), []);
  const requestOpening = useCallback(() => setRequested(true), []);
  const finishLettering = useCallback(() => setLetteringShown(true), []);
  const finishUnwrapping = useCallback(() => {
    setUnwrapped(true);
    cover.current?.focus({ preventScroll: true });
  }, []);
  const expansion = useOpeningExpansion({ packet, card, content, requested: requested && !opened, ready: heroReady, unwrapped, letteringReady, reducedMotion, onComplete: finish });

  useLayoutEffect(() => {
    if (opened) return;
    const previous = document.documentElement.style.overflow;
    const gutter = document.documentElement.style.scrollbarGutter;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.scrollbarGutter = "stable";
    return () => {
      document.documentElement.style.overflow = previous;
      document.documentElement.style.scrollbarGutter = gutter;
    };
  }, [opened]);

  useEffect(() => {
    if (!letteringShown || opened) return;
    const pause = window.setTimeout(() => setLetteringReady(true), 350);
    return () => window.clearTimeout(pause);
  }, [letteringShown, opened]);

  useEffect(() => {
    if (!unwrapped || opened) return;
    const fallback = window.setTimeout(() => setLetteringReady(true), 2000);
    return () => window.clearTimeout(fallback);
  }, [opened, unwrapped]);

  useEffect(() => {
    if (!requested || opened) return;
    // Recover from suppressed ribbon/paper events; normal handoff follows completion.
    const fallback = window.setTimeout(finish, 22000);
    return () => window.clearTimeout(fallback);
  }, [finish, opened, requested]);

  useEffect(() => {
    if (!opened) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    content.current?.querySelector<HTMLElement>("#home h1")?.focus({ preventScroll: true });
  }, [opened]);

  useEffect(() => {
    if (!opened || !content.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        (entry.target as HTMLElement).dataset.revealed = "true";
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.25 });
    content.current.querySelectorAll("h2").forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [opened]);

  const palette = Object.fromEntries(wedding.design.palette.map((color, index) => [`--mj-palette-${index}`, color.hex])) as CSSProperties;
  return (
    <div className={`mj-invitation ${className}`} style={palette} data-phase={opened ? "open" : requested ? "opening" : "closed"}>
      {!opened && (
        <div ref={cover} tabIndex={-1} className={`${openingStyles.preview} mj-opening-cover fixed inset-0 z-50 isolate flex h-dvh items-center justify-center overflow-hidden px-4 py-16 text-center outline-none`} role="dialog" aria-modal="true" aria-label={`${wedding.couple.display} wedding invitation`}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            event.preventDefault();
            (cover.current?.querySelector<HTMLButtonElement>("button") ?? cover.current)?.focus({ preventScroll: true });
          }}>
          <GatefoldPacket autoFocus onRequest={requestOpening} onOpened={finishUnwrapping} readyToReveal={heroReady} packetRef={packet} style={expansion.packetStyle} className={expansion.phase === "expanding" ? "mj-opening-expanding" : undefined} onTransitionEnd={expansion.onTransitionEnd}
            card={<OpeningHeroCard ref={card} scene={expansion.scene} expanding={expansion.phase === "expanding"} unwrapped={unwrapped} onLetteringComplete={finishLettering}>{openingHero}</OpeningHeroCard>} />
          <span className="sr-only" role="status">{expansion.phase === "expanding" ? "Entering your invitation." : requested ? "Unwrapping your invitation." : ""}</span>
        </div>
      )}
      <div ref={content} className="mj-content" hidden={!requested} inert={!opened} aria-hidden={!opened}>
        <a href="#celebration" className="mj-skip fixed left-4 top-4 z-40 px-5 py-3">Skip to wedding details</a>
        <header className="mj-navigation sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-4 sm:px-10">
          <a href="#home" className="mj-monogram shrink-0 whitespace-nowrap text-2xl" aria-label="Marian and Dee Jay, back to top">M <span>&</span> D</a>
          <nav aria-label="Invitation navigation" className="flex items-center gap-3 whitespace-nowrap text-[11px] sm:gap-8 sm:text-xs">
            <a href="#celebration">The day</a><a href="#details">Guest guide</a><a className="mj-nav-rsvp px-3 py-2 sm:px-4" href="#rsvp">Kindly reply <ArrowDown className="ml-1 hidden sm:inline" size={12} aria-hidden="true" /></a>
          </nav>
        </header>
        <InvitationOpenContext.Provider value={opened}>{requested && children}</InvitationOpenContext.Provider>
      </div>
    </div>
  );
}
