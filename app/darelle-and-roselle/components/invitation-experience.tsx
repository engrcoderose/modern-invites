"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import OpeningScreen from "./opening-screen";
import BackgroundMusic, { type BackgroundMusicHandle } from "./background-music";
import { useInvitationReveals } from "../hooks/use-invitation-reveals";

export default function InvitationExperience({ children, cover }: { children: ReactNode; cover: ReactNode }) {
  const [enhanced, setEnhanced] = useState(false);
  const [opening, setOpening] = useState(true);
  const content = useRef<HTMLDivElement>(null);
  const music = useRef<BackgroundMusicHandle>(null);
  const startMusic = useCallback(() => { void music.current?.play(); }, []);
  const finishOpening = useCallback(() => {
    setOpening(false);
    // Move keyboard focus into the revealed invitation after removing the cover.
    requestAnimationFrame(() => content.current?.querySelector<HTMLElement>("#invitation")?.focus({ preventScroll: true }));
  }, []);
  useEffect(() => {
    // The invitation entry shows the cover, including its bookmarked anchor.
    // Links to a specific later section still take guests straight there.
    const isSectionLink = window.location.hash && window.location.hash !== "#invitation";
    if (isSectionLink) setOpening(false);
    else window.scrollTo({ top: 0, behavior: "instant" });
    setEnhanced(true);
  }, []);
  useEffect(() => {
    if (!enhanced || !opening) return;
    const previous = document.body.style.overflow;
    const keepCoverAtTop = () => {
      if (window.scrollY !== 0) window.scrollTo({ top: 0, behavior: "instant" });
    };
    document.body.style.overflow = "hidden";
    keepCoverAtTop();
    // Browsers can restore a previous scroll position after hydration.
    window.addEventListener("scroll", keepCoverAtTop, { passive: true });
    return () => {
      window.removeEventListener("scroll", keepCoverAtTop);
      document.body.style.overflow = previous;
    };
  }, [enhanced, opening]);
  useInvitationReveals(content, !opening, enhanced);
  return (
    <>
      {!enhanced && cover}
      <div ref={content} style={{ visibility: enhanced && opening ? "hidden" : "visible" }} inert={enhanced && opening} aria-hidden={enhanced && opening ? true : undefined}>
        {children}
      </div>
      {enhanced && opening && <OpeningScreen onOpening={startMusic} onOpened={finishOpening} />}
      <BackgroundMusic ref={music} showControl={enhanced && !opening} />
    </>
  );
}
