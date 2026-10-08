"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "./OptimizedPhoto";
import PortraitCarousel from "./PortraitCarousel";
import type { PrenupPhoto } from "../types/media";
import styles from "../styles/wedding.module.css";

interface Props {
  slides: readonly PrenupPhoto[];
  sizes: string;
  label: string;
  priorityFirst?: boolean;
  decorative?: boolean;
  portrait?: boolean;
  interval?: number;
}

export default function PhotoSlideshow({ slides, sizes, label, priorityFirst = false, decorative = false, portrait = false, interval = 7000 }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [requested, setRequested] = useState(0);
  const [mounted, setMounted] = useState([0]);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(priorityFirst);

  const showPhoto = useCallback((index: number) => {
    setMounted((previous) => previous.includes(index) ? previous : [...previous, index]);
    setRequested(index);
    if (loaded.includes(index)) setCurrent(index);
  }, [loaded]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    let inView = priorityFirst;
    const updateVisibility = () => setVisible(inView && !document.hidden);
    const observer = window.IntersectionObserver ? new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.01;
      updateVisibility();
    // Exclude the sticky navigation when deciding whether the photo is visible.
    }, { rootMargin: "-76px 0px 0px 0px", threshold: 0.01 }) : null;
    if (frame.current) observer?.observe(frame.current);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, [priorityFirst]);

  useEffect(() => {
    if (!portrait || !visible) return;
    const neighbours = [(current + slides.length - 1) % slides.length, (current + 1) % slides.length];
    setMounted((previous) => {
      const missing = neighbours.filter((index) => !previous.includes(index));
      return missing.length ? [...previous, ...missing] : previous;
    });
  }, [current, portrait, slides.length, visible]);

  useEffect(() => {
    if (paused || reducedMotion || !visible || requested !== current || !loaded.includes(current)) return;
    const timer = window.setTimeout(() => showPhoto((current + 1) % slides.length), interval);
    return () => window.clearTimeout(timer);
  }, [current, interval, loaded, paused, reducedMotion, requested, showPhoto, slides.length, visible]);

  const stepPhoto = (direction: number) => {
    setPaused(true);
    showPhoto((requested + direction + slides.length) % slides.length);
  };

  const handleLoad = (index: number) => {
    setLoaded((previous) => previous.includes(index) ? previous : [...previous, index]);
    if (requested === index) setCurrent(index);
  };

  if (portrait) {
    return <PortraitCarousel frame={frame} slides={slides} sizes={sizes} label={label} current={current} mounted={mounted} paused={paused} reducedMotion={reducedMotion}
      onLoad={handleLoad} onStep={stepPhoto} onSelect={(index) => { setPaused(true); showPhoto(index); }} onTogglePlayback={() => setPaused(!paused)} />;
  }

  return (
    <>
      <div ref={frame} className="absolute inset-0 -z-20" aria-hidden={decorative || undefined}>
        {mounted.map((index) => {
          const photo = slides[index];
          return <Image key={photo.id} src={photo.src} alt={decorative ? "" : photo.alt} aria-hidden={current !== index || undefined} fill sizes={sizes} quality={85}
            priority={priorityFirst && index === 0} loading={index === 0 ? priorityFirst ? undefined : "lazy" : "eager"}
            className={`${styles.photoFade} object-cover ${current === index ? "opacity-100" : "opacity-0"}`}
            style={{ objectPosition: photo.position }}
            onLoad={() => handleLoad(index)} />;
        })}
      </div>
      <div role="group" aria-label={`${label} slideshow controls`} className="group absolute right-5 top-5 z-10 flex items-center gap-1">
        <div className="pointer-events-none flex opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 motion-reduce:transition-none">
          {slides.map((photo, index) => <button key={photo.id} type="button"
            aria-label={`Show ${label.toLowerCase()} photo ${index + 1} of ${slides.length}: ${photo.alt}`}
            aria-pressed={current === index} onClick={() => { setPaused(true); showPhoto(index); }}
            className="flex h-11 w-8 items-center justify-center">
            <span className={`h-1.5 w-1.5 rounded-full ${current === index ? "bg-[#ead9b8]" : "bg-white/40"}`} />
          </button>)}
        </div>
        <button type="button" disabled={reducedMotion} onClick={() => setPaused(!paused)}
          aria-label={reducedMotion ? "Automatic slideshow disabled for reduced motion" : paused ? `Play ${label.toLowerCase()} slideshow` : `Pause ${label.toLowerCase()} slideshow`}
          className="sr-only focus:not-sr-only focus:flex focus:h-11 focus:items-center focus:justify-center focus:rounded-full focus:bg-black/60 focus:px-4 focus:text-[10px] focus:text-[#f5f0e6]">
          {paused || reducedMotion ? "Play photos" : "Pause photos"}
        </button>
      </div>
    </>
  );
}
