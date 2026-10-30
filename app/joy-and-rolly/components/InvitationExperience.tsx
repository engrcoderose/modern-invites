"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import useReducedMotion from "@/components/landing/useMarketingReducedMotion";
import EnvelopeCover from "./EnvelopeCover";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

type Stage = "closed" | "opening" | "opened";

export default function InvitationExperience({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>("closed");
  const opening = useRef(false);
  const focusTitle = useRef(false);
  const [openedFromCover, setOpenedFromCover] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  const action = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const id = window.location.hash.slice(1);
    const destination = id && document.getElementById(id);
    if (destination && content.current?.contains(destination)) {
      opening.current = true;
      setStage("opened");
      requestAnimationFrame(() => destination.scrollIntoView({ behavior: "instant" }));
    } else {
      action.current?.focus({ preventScroll: true });
    }
  }, []);

  useLayoutEffect(() => {
    if (stage !== "opened" || !focusTitle.current) return;
    focusTitle.current = false;
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("jr-title")?.focus({ preventScroll: true });
  }, [stage]);

  useEffect(() => {
    if (stage === "opened") return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previous; };
  }, [stage]);

  useEffect(() => {
    if (reducedMotion && openedFromCover) setOpenedFromCover(false);
  }, [reducedMotion, openedFromCover]);

  const finishOpening = useCallback(() => {
    focusTitle.current = true;
    // Commit both visual states in the animation's completion frame.
    flushSync(() => {
      setOpenedFromCover(!reducedMotion);
      setStage("opened");
    });
  }, [reducedMotion]);

  return (
    <div data-invitation-open={stage === "opened" || undefined} data-opened-from-cover={openedFromCover || undefined} className={`${styles.invitation} relative min-h-screen`}
      onAnimationEnd={event => {
        if (event.target instanceof HTMLElement && event.target.hasAttribute("data-hero-arrival-end")) setOpenedFromCover(false);
      }}>
      {stage !== "opened" && (
        <EnvelopeCover opening={stage === "opening"} reducedMotion={Boolean(reducedMotion)} actionRef={action} onOpened={finishOpening}
          onOpen={() => { if (opening.current) return; opening.current = true; setStage("opening"); }} />
      )}
      <div ref={content} inert={stage !== "opened"} aria-hidden={stage !== "opened"}
        style={{ visibility: stage === "opened" ? "visible" : "hidden" }}>
        {children}
      </div>
      <noscript>
        <style>{`[data-envelope-cover],.${styles.invitation}>div[inert]{display:none}`}</style>
        <div className="mx-auto max-w-xl px-6 py-16 text-center">
          <h1 className={`${styles.heading} mb-6`}>{wedding.couple.display}</h1>
          <p>{wedding.date.display} · 3:00 PM · Davao City</p>
          <p className="mt-6">Ceremony: {wedding.venues[0].name}, {wedding.venues[0].address}</p>
          <p className="mt-6">Reception: {wedding.venues[1].name}, {wedding.venues[1].address}</p>
          <p className="mt-6">Formal attire. Kindly reply by {wedding.rsvp.deadline}.</p>
          <p className="mt-6">Enable JavaScript to open the full interactive invitation.</p>
        </div>
      </noscript>
    </div>
  );
}
