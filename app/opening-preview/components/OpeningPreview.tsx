"use client";

import { useCallback, useEffect, useRef, useState, type AnimationEvent } from "react";
import { RotateCcw } from "lucide-react";
import EnvelopePanels from "./EnvelopePanels";
import InvitationCard from "./InvitationCard";
import SatinBow from "./SatinBow";
import styles from "../styles/opening.module.css";

type OpeningState = "closed" | "untying" | "opening" | "opened";

export default function OpeningPreview() {
  const [state, setState] = useState<OpeningState>("closed");
  const openingRequested = useRef(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const opened = state === "opened";

  const finish = useCallback(() => setState("opened"), []);
  const releaseRibbon = useCallback(() => setState("opening"), []);

  useEffect(() => {
    if (opened) heading.current?.focus({ preventScroll: true });
  }, [opened]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { if (preference.matches && openingRequested.current) finish(); };
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [finish]);

  function open() {
    if (openingRequested.current) return;
    openingRequested.current = true;
    setState(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "opened" : "untying");
  }

  function replay() {
    openingRequested.current = false;
    setState("closed");
    requestAnimationFrame(() => openButton.current?.focus({ preventScroll: true }));
  }

  function onAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    // Child fold/text events must never retire the cover early.
    if (event.target === event.currentTarget && event.animationName.includes("packetReveal") && state === "opening") finish();
  }

  return (
    <main className={`${styles.preview} relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-16`}>
      <div className={`${styles.packet} relative shrink-0`} data-state={state} onAnimationEnd={onAnimationEnd}>
        <InvitationCard ref={heading} opened={opened} />
        {!opened && (
          <>
            <EnvelopePanels />
            <div aria-hidden="true" className={`${styles.coverTitle} pointer-events-none absolute inset-x-0 text-center`}>You&apos;re invited</div>
            {state !== "opening" && <SatinBow releasing={state === "untying"} onReleased={releaseRibbon} />}
            <button ref={openButton} type="button" onClick={open} disabled={state !== "closed"} aria-label="Open invitation" aria-busy={state !== "closed"}
              className={`${styles.openButton} absolute inset-0 flex w-full items-end justify-center pb-[7%] text-center disabled:cursor-default`}>
              <span className={styles.openLabel}>{state !== "closed" ? "Opening invitation" : "Tap the bow to open"}</span>
            </button>
          </>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-4 flex min-h-11 items-center justify-center sm:bottom-6">
        {opened ? (
          <button type="button" onClick={replay} className={`${styles.replay} flex min-h-11 items-center justify-center gap-2 px-4 text-xs`}>
            <RotateCcw size={13} strokeWidth={1.5} aria-hidden="true" /> Replay opening
          </button>
        ) : (
          <p className={`${styles.previewNote} text-center text-[10px]`}>Opening animation preview</p>
        )}
      </div>
      <span className="sr-only" role="status">{state === "untying" || state === "opening" ? "Unwrapping your invitation." : opened ? "Invitation opened. Replay is available below." : ""}</span>
    </main>
  );
}
