"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useIsPresent, useReducedMotion } from "framer-motion";

const slideInterval = 3000;

export function usePhotoSlideshow(count: number, enabled: boolean) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [mounted, setMounted] = useState([0]);
  const [decoded, setDecoded] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<Record<number, number>>({});
  const [failed, setFailed] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const pendingIndex = useRef<number | null>(null);
  const slideStartedAt = useRef<number | null>(null);
  const failedImages = useRef(new Set<number>());
  const present = useIsPresent();
  const reduced = useReducedMotion();

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const requestSlide = useCallback((index: number) => {
    if (failed === index || failedImages.current.has(index)) {
      failedImages.current.delete(index);
      setAttempts(current => ({ ...current, [index]: (current[index] ?? 0) + 1 }));
      setDecoded(current => current.filter(value => value !== index));
    }
    setFailed(null);
    pendingIndex.current = index === active ? null : index;
    setMounted(current => current.includes(index) ? current : [...current, index]);
    setPending(pendingIndex.current);
  }, [active, failed]);

  const pause = useCallback(() => {
    setPaused(true);
    pendingIndex.current = null;
    setPending(null);
  }, []);

  function select(index: number) {
    setPaused(true);
    requestSlide(index);
  }

  useEffect(() => {
    if (pending === null || previous !== null || !decoded.includes(pending) || pendingIndex.current !== pending) return;
    setPrevious(reduced ? null : active);
    slideStartedAt.current = performance.now();
    setActive(pending);
    pendingIndex.current = null;
    setPending(null);
  }, [active, decoded, pending, previous, reduced]);

  useEffect(() => {
    if (reduced) setPrevious(null);
    if (enabled && present && visible) return;
    pendingIndex.current = null;
    setPending(null);
  }, [enabled, present, reduced, visible]);

  const playing = enabled && present && visible && !paused && !reduced && decoded.includes(active);
  useEffect(() => {
    if (!playing) {
      slideStartedAt.current = null;
      return;
    }
    slideStartedAt.current ??= performance.now();
    const next = (active + 1) % count;
    setMounted(current => current.includes(next) ? current : [...current, next]);
    if (pending !== null || previous !== null) return;
    const remaining = Math.max(0, slideInterval - (performance.now() - slideStartedAt.current));
    const timer = window.setTimeout(() => requestSlide(next), remaining);
    return () => window.clearTimeout(timer);
  }, [active, count, pending, playing, previous, requestSlide]);

  function handleError(index: number) {
    failedImages.current.add(index);
    if (index !== active && pendingIndex.current !== index) return;
    pendingIndex.current = null;
    setPending(null);
    setFailed(index);
    setPaused(true);
  }

  async function load(index: number, event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    try {
      await image.decode();
    } catch {
      if (image.isConnected) handleError(index);
      return;
    }
    if (!image.isConnected) return;
    failedImages.current.delete(index);
    // Flush the hidden starting style even for newly mounted, cached images.
    image.closest("[data-photo-layer]")?.getBoundingClientRect();
    setDecoded(current => current.includes(index) ? current : [...current, index]);
  }

  return {
    active, previous, pending, mounted, attempts, failed, paused, reduced,
    initialLoading: !decoded.includes(active),
    loading: !decoded.includes(active) || pending !== null,
    load, handleError, select, pause,
    retry: () => { if (failed !== null) requestSlide(failed); },
    complete: (index: number) => { if (index === active) setPrevious(null); },
  };
}
