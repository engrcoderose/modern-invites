"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type SyntheticEvent } from "react";
import { heroPhotos, heroTiming } from "../data/hero-photos";
import { useInvitationOpen } from "./InvitationState";

export default function HeroSlideshow() {
  const enabled = useInvitationOpen();
  const frame = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pendingIndex = useRef<number | null>(null);
  const activeSince = useRef(0);
  const animationFrames = useRef<number[]>([]);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [mounted, setMounted] = useState([0]);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [failedIndices, setFailedIndices] = useState<number[]>([]);
  const [reloadCounts, setReloadCounts] = useState<Record<number, number>>({});
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const scheduledFrames = animationFrames.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) { setPrevious(null); busy.current = false; }
    };
    const updateVisibility = () => setVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    if (frame.current) observer.observe(frame.current);
    updateMotion();
    updateVisibility();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      scheduledFrames.forEach(cancelAnimationFrame);
    };
  }, []);

  // Fetch only the next photo after this one has decoded and the invitation is open.
  useEffect(() => {
    if (!enabled || !inView || !visible || reducedMotion || paused || !loaded.includes(active)) return;
    const next = (active + 1) % heroPhotos.length;
    if (failedIndices.includes(next)) return;
    setMounted((current) => current.includes(next) ? current : [...current, next]);
  }, [active, enabled, failedIndices, inView, loaded, paused, reducedMotion, visible]);

  const requestSlide = useCallback((index: number) => {
    if (busy.current) return;
    if (index === active) {
      if (failedIndices.includes(index)) {
        setFailed(false);
        setFailedIndices((current) => current.filter((item) => item !== index));
        setReloadCounts((current) => ({ ...current, [index]: (current[index] ?? 0) + 1 }));
      }
      return;
    }
    busy.current = true;
    pendingIndex.current = index;
    setFailed(false);
    setFailedIndices((current) => current.filter((item) => item !== index));
    setMounted((current) => current.includes(index) ? current : [...current, index]);
    setPending(index);
  }, [active, failedIndices]);

  useEffect(() => {
    if (pending === null || previous !== null || !loaded.includes(pending) || pendingIndex.current !== pending) return;
    activeSince.current = performance.now();
    setPrevious(reducedMotion ? null : active);
    setActive(pending);
    pendingIndex.current = null;
    setPending(null);
    if (reducedMotion) busy.current = false;
  }, [active, loaded, pending, previous, reducedMotion]);

  const playing = enabled && inView && visible && !paused && !reducedMotion;
  useEffect(() => { if (playing) activeSince.current = performance.now(); }, [playing]);
  useEffect(() => {
    if (!playing || !loaded.includes(active) || pending !== null || previous !== null) return;
    const delay = Math.max(0, heroTiming.intervalMs - (performance.now() - activeSince.current));
    const timer = window.setTimeout(() => requestSlide((active + 1) % heroPhotos.length), delay);
    return () => window.clearTimeout(timer);
  }, [active, loaded, pending, playing, previous, requestSlide]);

  function handleError(index: number) {
    setFailedIndices((current) => current.includes(index) ? current : [...current, index]);
    setLoaded((current) => current.filter((item) => item !== index));
    if (index !== active) setMounted((current) => current.filter((item) => item !== index));
    if (pendingIndex.current !== index && index !== active) return;
    pendingIndex.current = null;
    busy.current = false;
    setPending(null);
    setPaused(true);
    setFailed(true);
  }

  async function loadSlide(index: number, event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    try { await image.decode(); } catch { handleError(index); return; }
    if (!image.isConnected) return;
    // Two paints establish the hidden starting style even for cached photos.
    animationFrames.current.push(requestAnimationFrame(() => {
      animationFrames.current.push(requestAnimationFrame(() => {
        if (image.isConnected) setLoaded((current) => current.includes(index) ? current : [...current, index]);
      }));
    }));
  }

  function pausePlayback() {
    setPaused(true);
    if (pendingIndex.current !== null) {
      pendingIndex.current = null;
      setPending(null);
      busy.current = previous !== null;
    }
  }

  return (
    <div ref={frame} className="absolute inset-0" role="region" aria-roledescription="carousel" aria-label="Marian and Dee Jay’s prenup photographs"
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        pausePlayback();
        requestSlide((active + (event.key === "ArrowRight" ? 1 : heroPhotos.length - 1)) % heroPhotos.length);
      }}>
      {heroPhotos.map((photo, index) => mounted.includes(index) && (
        <div key={photo.src.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroPhotos.length}`} aria-hidden={index !== active}
          className="mj-hero-slide pointer-events-none absolute inset-0"
          style={{ opacity: active === index || previous === index ? 1 : 0, zIndex: active === index ? 2 : previous === index ? 1 : 0, transitionDuration: !reducedMotion && index === active ? `${heroTiming.fadeMs}ms` : "0ms" }}
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget || event.propertyName !== "opacity" || index !== active) return;
            setPrevious(null);
            busy.current = false;
          }}>
          <Image key={reloadCounts[index] ?? 0} src={photo.src} alt={photo.alt} fill priority={index === 0} loading={index === 0 ? undefined : "eager"} quality={85}
            sizes="(max-width: 639px) max(100vw, calc(150svh - 111px), 1080px), max(100vw, calc(150svh - 111px), 1020px)"
            className="object-cover [object-position:var(--mj-hero-mobile-position)] sm:[object-position:var(--mj-hero-position)]"
            style={{ "--mj-hero-position": photo.position, "--mj-hero-mobile-position": photo.mobilePosition ?? photo.position } as CSSProperties}
            onLoad={(event) => void loadSlide(index, event)} onError={() => handleError(index)} />
        </div>
      ))}
      <div className="mj-hero-wash pointer-events-none absolute inset-0 z-[3]" aria-hidden="true" />
      <div className="mj-hero-controls absolute inset-x-0 bottom-5 z-20 mx-auto flex w-fit max-w-[calc(100%-2rem)] flex-col items-center px-3 py-1">
        {failed && <p role="status" className="px-3 py-2 text-center text-xs">This photograph couldn’t load. Please choose another photograph.</p>}
        <div className="flex items-center gap-1">
          {heroPhotos.map((photo, index) => <button key={photo.src.src} type="button" aria-label={`Show photograph ${index + 1}`} aria-current={index === active ? "true" : undefined}
            disabled={pending !== null || previous !== null} className="flex h-11 w-9 items-center justify-center" onClick={() => { pausePlayback(); requestSlide(index); }}>
            <span className={`mj-hero-dot block h-1.5 w-1.5 rounded-full ${index === active ? "opacity-100" : "opacity-40"}`} aria-hidden="true" />
          </button>)}
          {!reducedMotion && <button type="button" className="sr-only focus:not-sr-only focus:absolute focus:bottom-full focus:whitespace-nowrap focus:bg-[var(--mj-paper)] focus:px-4 focus:py-3 focus:text-xs" onClick={() => paused ? setPaused(false) : pausePlayback()}>{paused ? "Play slideshow" : "Pause slideshow"}</button>}
        </div>
      </div>
    </div>
  );
}
