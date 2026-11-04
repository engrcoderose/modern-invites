"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject, type TransitionEvent } from "react";
import { portraitComposition } from "../utils/opening-composition";

interface SceneSize { width: number; height: number; scale: number; parts: Record<string, string> }
interface Frame { width: number; height: number; left: number; top: number }
type ExpansionPhase = "inside" | "prepared" | "expanding";

interface HeroExpansionOptions {
  packet: RefObject<HTMLDivElement | null>;
  card: RefObject<HTMLDivElement | null>;
  invitation: RefObject<HTMLDivElement | null>;
  requested: boolean;
  ready: boolean;
  unwrapped: boolean;
  letteringReady: boolean;
  reducedMotion: boolean | null;
  onComplete: () => void;
}

export default function useHeroExpansion({ packet, card, invitation, requested, ready, unwrapped, letteringReady, reducedMotion, onComplete }: HeroExpansionOptions) {
  const [scene, setScene] = useState<SceneSize | null>(null);
  const [frames, setFrames] = useState<{ source: Frame; destination: Frame } | null>(null);
  const [phase, setPhase] = useState<ExpansionPhase>("inside");
  const started = useRef(false);

  const measure = useCallback(() => {
    const hero = invitation.current?.querySelector<HTMLElement>("#top");
    if (!hero || !card.current) return null;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const destination = hero.getBoundingClientRect();
    if (!destination.width || !destination.height) return null;
    const width = card.current.clientWidth;
    const height = card.current.clientHeight;
    const scale = Math.max(width / destination.width, height / destination.height);
    setScene({ width: destination.width, height: destination.height, scale, parts: portraitComposition(hero, width, height, scale) });
    return { left: destination.left, top: destination.top, width: destination.width, height: destination.height, hero };
  }, [card, invitation]);

  useLayoutEffect(() => {
    if (!requested) return;
    measure();
    const resize = () => {
      // Rotation/viewport changes finish safely in the newly responsive page layout.
      if (started.current) onComplete();
      else measure();
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [measure, onComplete, requested]);

  useLayoutEffect(() => {
    if (!requested || !ready || !unwrapped) return;
    if (reducedMotion) { onComplete(); return; }
    if (!letteringReady) return;
    if (started.current) return;
    const destination = measure();
    const source = packet.current?.getBoundingClientRect();
    if (!destination || !source) { onComplete(); return; }
    started.current = true;
    const scale = Math.max(source.width / destination.width, source.height / destination.height);
    setScene({ width: destination.width, height: destination.height, scale, parts: portraitComposition(destination.hero, source.width, source.height, scale) });
    setFrames({ source: { left: source.left, top: source.top, width: source.width, height: source.height }, destination: { left: destination.left, top: destination.top, width: destination.width, height: destination.height } });
    setPhase("prepared");
  }, [letteringReady, measure, onComplete, packet, ready, reducedMotion, requested, unwrapped]);

  useEffect(() => {
    if (!requested || phase !== "prepared") return;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setPhase("expanding"));
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, [phase, requested]);

  const frame = phase === "expanding" ? frames?.destination : frames?.source;
  const packetStyle: CSSProperties | undefined = frame ? {
    position: "fixed", left: frame.left, top: frame.top, width: frame.width, height: frame.height,
    aspectRatio: "auto", transform: "none", boxShadow: "none",
  } : undefined;

  function onTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (phase === "expanding" && event.target === event.currentTarget && event.propertyName === "width") onComplete();
  }

  return { scene: scene && { ...scene, scale: phase === "expanding" ? 1 : scene.scale }, packetStyle, phase, onTransitionEnd };
}
