"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject, type TransitionEvent } from "react";
import { openingComposition } from "../utils/opening-composition";

export interface OpeningScene { width: number; height: number; scale: number; parts: Record<string, string> }
interface Frame { width: number; height: number; left: number; top: number }
interface Options {
  packet: RefObject<HTMLDivElement | null>;
  card: RefObject<HTMLDivElement | null>;
  content: RefObject<HTMLDivElement | null>;
  requested: boolean;
  ready: boolean;
  unwrapped: boolean;
  letteringReady: boolean;
  reducedMotion: boolean;
  onComplete: () => void;
}

export default function useOpeningExpansion({ packet, card, content, requested, ready, unwrapped, letteringReady, reducedMotion, onComplete }: Options) {
  const [scene, setScene] = useState<OpeningScene | null>(null);
  const [frames, setFrames] = useState<{ source: Frame; destination: Frame } | null>(null);
  const [phase, setPhase] = useState<"inside" | "prepared" | "expanding">("inside");
  const started = useRef(false);

  const measure = useCallback(() => {
    const hero = content.current?.querySelector<HTMLElement>("#home");
    if (!hero || !card.current) return null;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const destination = hero.getBoundingClientRect();
    if (!destination.width || !destination.height) return null;
    const width = card.current.clientWidth;
    const height = card.current.clientHeight;
    const scale = Math.max(width / destination.width, height / destination.height);
    setScene({ width: destination.width, height: destination.height, scale, parts: openingComposition(hero, width, height, scale) });
    return { left: destination.left, top: destination.top, width: destination.width, height: destination.height };
  }, [card, content]);

  useLayoutEffect(() => {
    if (!requested) return;
    measure();
    const resize = () => started.current ? onComplete() : measure();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [measure, onComplete, requested]);

  useLayoutEffect(() => {
    if (requested && ready && !started.current) measure();
  }, [measure, ready, requested]);

  useLayoutEffect(() => {
    if (!requested || !ready || !unwrapped) return;
    if (reducedMotion) { onComplete(); return; }
    if (!letteringReady || started.current) return;
    const destination = measure();
    const source = packet.current?.getBoundingClientRect();
    if (!destination || !source) { onComplete(); return; }
    started.current = true;
    const hero = content.current?.querySelector<HTMLElement>("#home");
    const scale = Math.max(source.width / destination.width, source.height / destination.height);
    if (hero) setScene({ width: destination.width, height: destination.height, scale, parts: openingComposition(hero, source.width, source.height, scale) });
    setFrames({ source: { left: source.left, top: source.top, width: source.width, height: source.height }, destination });
    setPhase("prepared");
  }, [content, letteringReady, measure, onComplete, packet, ready, reducedMotion, requested, unwrapped]);

  useEffect(() => {
    if (!requested || phase !== "prepared") return;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setPhase("expanding"));
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, [phase, requested]);

  useEffect(() => {
    if (phase !== "expanding") return;
    // Completion remains event-driven; this is only for suppressed transition events.
    const fallback = window.setTimeout(onComplete, 1800);
    return () => window.clearTimeout(fallback);
  }, [onComplete, phase]);

  const frame = phase === "expanding" ? frames?.destination : frames?.source;
  const packetStyle: CSSProperties | undefined = frame ? {
    position: "fixed", left: frame.left, top: frame.top, width: frame.width, height: frame.height,
    aspectRatio: "auto", transform: "none", boxShadow: "none",
  } : undefined;

  function onTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (phase === "expanding" && event.target === event.currentTarget && ["width", "height"].includes(event.propertyName)) onComplete();
  }

  return { scene: scene && { ...scene, scale: phase === "expanding" ? 1 : scene.scale }, packetStyle, phase, onTransitionEnd };
}
