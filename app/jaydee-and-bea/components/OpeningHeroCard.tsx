"use client";

import { forwardRef, useLayoutEffect, useRef, type ReactNode, type TransitionEvent } from "react";
import openingStyles from "@/components/invitation-opening/styles/opening.module.css";
import { InvitationEntryContext } from "./InvitationEntryContext";
import styles from "../styles/welcome.module.css";

interface OpeningHeroCardProps {
  children: ReactNode;
  scene: { width: number; height: number; scale: number; parts: Record<string, string> } | null;
  expanding: boolean;
  unwrapped: boolean;
  onLetteringComplete: () => void;
}

const OpeningHeroCard = forwardRef<HTMLDivElement, OpeningHeroCardProps>(function OpeningHeroCard({ children, scene, expanding, unwrapped, onLetteringComplete }, ref) {
  const canvas = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!scene) return;
    canvas.current?.querySelectorAll<HTMLElement>("[data-opening-part]").forEach((part) => {
      part.style.setProperty("--jb-card-transform", scene.parts[part.dataset.openingPart!] ?? "none");
    });
  }, [scene]);

  function finishLettering(event: TransitionEvent<HTMLDivElement>) {
    if (unwrapped && event.propertyName === "opacity" && event.target instanceof HTMLElement && event.target.hasAttribute("data-hero-detail")) onLetteringComplete();
  }

  return (
    <div ref={ref} aria-hidden="true" inert data-jb-opening-hero-frame className={`${openingStyles.card} absolute inset-0 overflow-hidden`}>
      {scene && <div ref={canvas} data-lettering={unwrapped ? "revealing" : "waiting"} onTransitionEnd={finishLettering}
        className={`${styles.heroCanvas} ${expanding ? styles.expandingCanvas : ""} jb-serif absolute left-1/2 top-1/2`}
        style={{ width: scene.width, height: scene.height, transform: `translate(-50%, -50%) scale(${scene.scale})` }}>
        <InvitationEntryContext.Provider value={false}>{children}</InvitationEntryContext.Provider>
      </div>}
    </div>
  );
});

export default OpeningHeroCard;
