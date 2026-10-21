"use client";

import { useEffect, useRef, useState, type CSSProperties, type TransitionEvent } from "react";

/** Retain the opaque outgoing layer until the decoded incoming photo finishes fading. */
export function usePhotoCrossfade(count: number, playing: boolean, reducedMotion: boolean | null, interval: number) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [requested, setRequested] = useState([0]);
  const [loaded, setLoaded] = useState<number[]>([]);
  const decoding = useRef(new Set<number>());
  const next = (active + 1) % count;

  useEffect(() => {
    if (!playing || !loaded.includes(active) || previous !== null) return;
    setRequested(current => current.includes(next) ? current : [...current, next]);
    if (!loaded.includes(next)) return;
    const timer = window.setTimeout(() => {
      setPrevious(active);
      setActive(next);
    }, interval);
    return () => window.clearTimeout(timer);
  }, [active, interval, loaded, next, playing, previous]);

  useEffect(() => { if (reducedMotion) setPrevious(null); }, [reducedMotion]);

  async function decode(index: number, image: HTMLImageElement) {
    if (decoding.current.has(index)) return;
    decoding.current.add(index);
    try {
      await image.decode();
      if (!image.isConnected) return;
      // Commit the hidden starting style even when the source was cached.
      image.getBoundingClientRect();
      setLoaded(current => current.includes(index) ? current : [...current, index]);
    } catch {
      // Keep the current photo. A later successful load can retry decoding.
    } finally { decoding.current.delete(index); }
  }

  function style(index: number): CSSProperties {
    return {
      opacity: index === active || index === previous ? 1 : 0,
      zIndex: index === active ? 1 : 0,
      transitionDuration: reducedMotion || index !== active ? "0s" : "1s",
    };
  }
  function finish(index: number, event: TransitionEvent<HTMLElement>) {
    if (index === active && event.target === event.currentTarget && event.propertyName === "opacity") setPrevious(null);
  }
  return { active, previous, requested, decode, style, finish };
}
