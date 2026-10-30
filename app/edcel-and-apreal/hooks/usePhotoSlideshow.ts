"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent, type TransitionEvent } from "react";
import { useReducedMotion } from "motion/react";

export default function usePhotoSlideshow(count: number, enabled: boolean, interval = 3000) {
  const reducedMotion = useReducedMotion();
  const requested = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [mounted, setMounted] = useState([0]);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const requestSlide = useCallback((index: number) => {
    const next = (index + count) % count;
    setFailed(false);
    requested.current = next === active ? null : next;
    setMounted(current => current.includes(next) ? current : [...current, next]);
    setPending(requested.current);
  }, [active, count]);

  useEffect(() => {
    if (pending === null || previous !== null || !loaded.includes(pending) || requested.current !== pending) return;
    const reveal = () => {
      if (requested.current !== pending) return;
      setPrevious(reducedMotion ? null : active);
      setActive(pending);
      requested.current = null;
      setPending(null);
    };
    if (reducedMotion) { reveal(); return; }
    // Paint the decoded layer hidden before revealing it, including rapid returns
    // to a photo that was the outgoing layer of the preceding transition.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => { secondFrame = requestAnimationFrame(reveal); });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, [active, loaded, pending, previous, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) setPrevious(null);
    if (enabled && pageVisible) return;
    requested.current = null;
    setPending(null);
  }, [enabled, pageVisible, reducedMotion]);

  const playing = enabled && pageVisible && !paused && reducedMotion === false && loaded.includes(active);
  useEffect(() => {
    if (!playing || pending !== null || previous !== null) return;
    const timer = window.setTimeout(() => requestSlide(active + 1), interval);
    return () => window.clearTimeout(timer);
  }, [active, interval, pending, playing, previous, requestSlide]);

  function failPhoto(index: number) {
    if (index === active || requested.current !== index) return;
    requested.current = null;
    setPending(null);
    setMounted(current => current.filter(slide => slide !== index));
    setLoaded(current => current.filter(slide => slide !== index));
    setPaused(true);
    setFailed(true);
  }

  async function loadPhoto(index: number, event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    try { await image.decode(); } catch { failPhoto(index); return; }
    if (!image.isConnected) return;
    setLoaded(current => current.includes(index) ? current : [...current, index]);
  }

  function finishTransition(index: number, event: TransitionEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && event.propertyName === "opacity" && index === active) setPrevious(null);
  }

  function selectSlide(index: number) { setPaused(true); requestSlide(index); }
  function stepSlide(direction: number) { selectSlide((requested.current ?? active) + direction); }
  function togglePlayback() {
    if (!paused) { requested.current = null; setPending(null); }
    setPaused(current => !current);
  }

  return { active, previous, mounted, paused, reducedMotion, failed, requestSlide, selectSlide, stepSlide, togglePlayback, loadPhoto, failPhoto, finishTransition };
}
