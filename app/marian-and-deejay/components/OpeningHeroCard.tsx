"use client";

import { forwardRef, useLayoutEffect, useRef, type ReactNode } from "react";
import openingStyles from "@/components/invitation-opening/styles/opening.module.css";
import type { OpeningScene } from "../hooks/useOpeningExpansion";

interface Props {
  children: ReactNode;
  scene: OpeningScene | null;
  expanding: boolean;
  unwrapped: boolean;
  onLetteringComplete: () => void;
}

const OpeningHeroCard = forwardRef<HTMLDivElement, Props>(function OpeningHeroCard({ children, scene, expanding, unwrapped, onLetteringComplete }, ref) {
  const canvas = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!scene) return;
    canvas.current?.querySelectorAll<HTMLElement>("[data-opening-part]").forEach((part) => {
      part.style.setProperty("--mj-card-transform", scene.parts[part.dataset.openingPart!] ?? "none");
    });
  }, [scene]);
  return (
    <div ref={ref} aria-hidden="true" inert className={`${openingStyles.card} absolute inset-0 overflow-hidden`}>
      {scene && <div ref={canvas} data-lettering={unwrapped ? "revealing" : "waiting"} data-expanding={expanding} className="mj-opening-canvas absolute left-1/2 top-1/2" onTransitionEnd={(event) => {
        if (unwrapped && event.propertyName === "opacity" && event.target instanceof HTMLElement && event.target.hasAttribute("data-hero-detail")) onLetteringComplete();
      }} style={{ width: scene.width, height: scene.height, transform: `translate(-50%, -50%) scale(${scene.scale})` }}>{children}</div>}
    </div>
  );
});

export default OpeningHeroCard;
