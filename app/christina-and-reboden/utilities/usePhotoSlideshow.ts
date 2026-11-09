"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { slideshowTiming } from "../data/slideshow";

export default function usePhotoSlideshow(count: number, visible: boolean) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [mounted, setMounted] = useState([0]);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<number | null>(null);
  const [pageVisible, setPageVisible] = useState(true);
  const pendingIndex = useRef<number | null>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion() ?? true;

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const request = useCallback((index: number) => {
    setFailed(null);
    setMounted(current => current.includes(index) ? current : [...current, index]);
    pendingIndex.current = index === active ? null : index;
    setPending(pendingIndex.current);
  }, [active]);

  const pause = useCallback(() => {
    setPaused(true);
    pendingIndex.current = null;
    setPending(null);
  }, []);

  function select(index: number) {
    pause();
    request(index);
  }

  useEffect(() => {
    if (pending === null || previous !== null || !loaded.includes(pending) || pendingIndex.current !== pending) return;
    // A queued selection may revisit the just-retired outgoing layer. Flush its
    // hidden style before revealing it again so its opacity transition runs.
    layers.current[pending]?.getBoundingClientRect();
    setPrevious(reducedMotion ? null : active);
    setActive(pending);
    pendingIndex.current = null;
    setPending(null);
  }, [active, loaded, pending, previous, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !visible || !pageVisible) setPrevious(null);
    if (visible && pageVisible) return;
    pendingIndex.current = null;
    setPending(null);
  }, [pageVisible, reducedMotion, visible]);

  const playing = visible && pageVisible && loaded.includes(active) && !paused && !reducedMotion;
  useEffect(() => {
    if (!playing || pending !== null) return;
    const timer = window.setTimeout(() => request((active + 1) % count), slideshowTiming.interval);
    return () => window.clearTimeout(timer);
  }, [active, count, pending, playing, request]);

  function fail(index: number) {
    if (index !== active && pendingIndex.current !== index) return;
    pause();
    setFailed(index);
    setMounted(current => current.filter(photo => photo !== index));
    setLoaded(current => current.filter(photo => photo !== index));
  }

  async function load(index: number, event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    try { await image.decode(); }
    catch { if (image.isConnected) fail(index); return; }
    if (!image.isConnected) return;
    // Flush the hidden starting style, including for newly mounted cached photos.
    image.closest('[aria-roledescription="slide"]')?.getBoundingClientRect();
    setLoaded(current => current.includes(index) ? current : [...current, index]);
  }

  function finish(index: number, event: SyntheticEvent<HTMLDivElement, TransitionEvent>) {
    if (event.target === event.currentTarget && event.nativeEvent.propertyName === "opacity" && index === active) setPrevious(null);
  }

  return {
    active, previous, pending, mounted, paused, failed, playing, reducedMotion,
    layers,
    load, fail, select, pause, finish,
    toggle: () => paused ? setPaused(false) : pause(),
    retry: () => { if (failed !== null) request(failed); },
  };
}
