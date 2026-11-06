"use client";

import { useCallback, useEffect, useRef, useState, type AnimationEvent, type CSSProperties, type ReactNode, type Ref, type TransitionEventHandler } from "react";
import EnvelopePanels from "./EnvelopePanels";
import InvitationCard from "./InvitationCard";
import SatinBow from "./SatinBow";
import styles from "./styles/opening.module.css";

type OpeningState = "closed" | "untying" | "waiting" | "opening" | "opened";

interface GatefoldPacketProps {
  children?: ReactNode;
  onRequest?: () => void;
  onRibbonReleased?: () => void;
  onOpened: () => void;
  autoFocus?: boolean;
  card?: ReactNode;
  readyToReveal?: boolean;
  packetRef?: Ref<HTMLDivElement>;
  className?: string;
  style?: CSSProperties;
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>;
}

export default function GatefoldPacket({ children, onRequest, onRibbonReleased, onOpened, autoFocus = false, card, readyToReveal = true, packetRef, className, style, onTransitionEnd }: GatefoldPacketProps) {
  const [state, setState] = useState<OpeningState>("closed");
  const requested = useRef(false);
  const notified = useRef(false);
  const ribbonNotified = useRef(false);
  const skipMotion = useRef(false);
  const button = useRef<HTMLButtonElement>(null);
  const opened = state === "opened";
  const finish = useCallback(() => setState("opened"), []);
  const releaseRibbon = useCallback(() => setState((current) => current === "untying" ? "waiting" : current), []);

  useEffect(() => {
    if (state === "waiting" && readyToReveal) setState(skipMotion.current ? "opened" : "opening");
  }, [readyToReveal, state]);

  useEffect(() => { if (autoFocus) button.current?.focus({ preventScroll: true }); }, [autoFocus]);

  useEffect(() => {
    if (state === "closed" || state === "untying" || ribbonNotified.current) return;
    ribbonNotified.current = true;
    onRibbonReleased?.();
  }, [onRibbonReleased, state]);

  useEffect(() => {
    if (!opened || notified.current) return;
    notified.current = true;
    onOpened();
  }, [onOpened, opened]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (!preference.matches || !requested.current) return;
      skipMotion.current = true;
      if (readyToReveal) finish();
      else setState("waiting");
    };
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [finish, readyToReveal]);

  function open() {
    if (requested.current) return;
    requested.current = true;
    // Preserve direct gesture access for music playback in the invitation host.
    onRequest?.();
    skipMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setState(skipMotion.current ? readyToReveal ? "opened" : "waiting" : "untying");
  }

  function onAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && event.animationName.includes("packetReveal") && state === "opening") finish();
  }

  return (
    <div ref={packetRef} className={`${styles.packet} relative shrink-0${className ? ` ${className}` : ""}`} style={style}
      data-state={state} data-reveal-ready={readyToReveal} onAnimationEnd={onAnimationEnd} onTransitionEnd={onTransitionEnd}>
      {card ?? <InvitationCard opened={opened}>{children}</InvitationCard>}
      {!opened && <>
        <EnvelopePanels />
        <div aria-hidden="true" className={`${styles.coverTitle} pointer-events-none absolute inset-x-0 text-center`}>You&apos;re invited</div>
        {(state === "closed" || state === "untying" || state === "waiting" && skipMotion.current) && <SatinBow releasing={state === "untying"} onReleased={releaseRibbon} />}
        <button ref={button} type="button" onClick={open} aria-label="Open invitation" aria-disabled={state !== "closed"} aria-busy={state !== "closed"}
          className={`${styles.openButton} absolute inset-0 flex w-full items-end justify-center pb-[7%] text-center`}>
          <span className={styles.openLabel}>{state === "waiting" ? "Preparing invitation" : state !== "closed" ? "Opening invitation" : "Tap the bow to open"}</span>
        </button>
      </>}
    </div>
  );
}
