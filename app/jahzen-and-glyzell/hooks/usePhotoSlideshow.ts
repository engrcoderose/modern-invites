"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useInView } from "motion/react";
import useHydratedReducedMotion from "./useHydratedReducedMotion";

const slideInterval = 5000;

export default function usePhotoSlideshow(slideCount: number) {
  const frame = useRef<HTMLDivElement>(null);
  const requested = useRef<number | null>(null);
  const inView = useInView(frame, { amount: .2 });
  const reducedMotion = useHydratedReducedMotion();
  const [ready, setReady] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [mounted, setMounted] = useState([0]);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<number | null>(null);

  useEffect(() => {
    setReady(true);
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const requestSlide = useCallback((index: number) => {
    setFailed(null);
    requested.current = index === active ? null : index;
    setMounted(current => current.includes(index) ? current : [...current, index]);
    setPending(requested.current);
  }, [active]);

  function pausePlayback() {
    requested.current = null;
    setPending(null);
    setPaused(true);
  }

  function selectSlide(index: number) {
    pausePlayback();
    requestSlide(index);
  }

  useEffect(() => {
    if (!reducedMotion) return;
    requested.current = null;
    setPending(null);
    setPrevious(null);
  }, [reducedMotion]);

  useEffect(() => {
    if (inView && pageVisible) return;
    requested.current = null;
    setPending(null);
  }, [inView, pageVisible]);

  useEffect(() => {
    if (pending === null || previous !== null || !loaded.includes(pending) || requested.current !== pending) return;
    setPrevious(reducedMotion ? null : active);
    setActive(pending);
    requested.current = null;
    setPending(null);
  }, [active, loaded, pending, previous, reducedMotion]);

  const playing = ready && inView && pageVisible && loaded.includes(active) && !paused && !reducedMotion;
  useEffect(() => {
    if (!playing || pending !== null || previous !== null) return;
    const timer = window.setTimeout(() => requestSlide((active + 1) % slideCount), slideInterval);
    return () => window.clearTimeout(timer);
  }, [active, pending, previous, playing, requestSlide, slideCount]);

  function handleError(index: number) {
    if (requested.current !== index && !(index === active && !loaded.includes(index))) return;
    requested.current = null;
    setPending(null);
    setPaused(true);
    setFailed(index);
    setMounted(current => current.filter(slide => slide !== index));
    setLoaded(current => current.filter(slide => slide !== index));
  }

  async function loadSlide(index: number, event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    try { await image.decode(); } catch { handleError(index); return; }
    if (!image.isConnected) return;
    // Flush the newly mounted hidden layer before promoting a cached photo.
    image.closest('[aria-roledescription="slide"]')?.getBoundingClientRect();
    setLoaded(current => current.includes(index) ? current : [...current, index]);
  }

  return { frame, requested, inView, reducedMotion, ready, active, previous, pending, mounted, paused, failed, playing, setPrevious, setPaused, requestSlide, pausePlayback, selectSlide, loadSlide, handleError };
}
