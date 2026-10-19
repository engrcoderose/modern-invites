"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useInView } from "motion/react";
import PhotoFrame from "./PhotoFrame";
import ParallaxLayer from "./ParallaxLayer";
import { heroPhotos } from "../data/photos";
import styles from "../styles/invitation.module.css";

const slideInterval = 3000;
const fadeDuration = 0.9;
const zoomDuration = slideInterval + fadeDuration * 1000;
// Account for each source's aspect ratio, parallax overscan and 3% zoom.
// Phones reserve the 64px navigation, with 24px top and 48px bottom overscan
// so the 18px parallax drift cannot expose the hero background below the nav.
// The 510px floor covers the hero content in short landscape viewports.
function imageSizes(photo: (typeof heroPhotos)[number]) {
  const ratio = photo.src && typeof photo.src !== "string" ? photo.src.width / photo.src.height : 1.5;
  const mobileSizes = `max(103vw, calc(${(103 * ratio).toFixed(1)}dvh + ${(8 * 1.03 * ratio).toFixed(1)}px), ${Math.ceil((510 + 8) * 1.03 * ratio)}px)`;
  const desktopSizes = `max(103vw, calc(${(103 * ratio).toFixed(1)}dvh + ${(99 * ratio).toFixed(1)}px), ${Math.ceil(510 * 1.03 * ratio)}px)`;
  return `(max-width: 639px) ${mobileSizes}, ${desktopSizes}`;
}

export default function HeroSlideshow() {
  const frame = useRef<HTMLDivElement>(null);
  const pendingIndex = useRef<number | null>(null);
  const inView = useInView(frame, { amount: 0.2 });
  const [reducedMotion, setReducedMotion] = useState(true);
  const [ready, setReady] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [mounted, setMounted] = useState([0]);
  const [loaded, setLoaded] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);

  useEffect(() => {
    setReady(true);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) {
        pendingIndex.current = null;
        setPending(null);
        setPrevious(null);
      }
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      preference.removeEventListener("change", updatePreference);
      pendingIndex.current = null;
    };
  }, []);

  const requestSlide = useCallback((index: number) => {
    setFailed(false);
    pendingIndex.current = index === active ? null : index;
    setMounted(current => current.includes(index) ? current : [...current, index]);
    setPending(pendingIndex.current);
  }, [active]);

  function pausePlayback() {
    pendingIndex.current = null;
    setPending(null);
    setPaused(true);
  }

  function selectSlide(index: number) {
    pausePlayback();
    requestSlide(index);
  }

  useEffect(() => {
    // A decoded photo waits for the current dissolve to finish before covering it.
    if (pending === null || previous !== null || !loaded.includes(pending) || pendingIndex.current !== pending) return;
    setPrevious(reducedMotion ? null : active);
    setActive(pending);
    pendingIndex.current = null;
    setPending(null);
  }, [active, loaded, pending, previous, reducedMotion]);

  useEffect(() => {
    if (inView && pageVisible) return;
    pendingIndex.current = null;
    setPending(null);
  }, [inView, pageVisible]);

  const playing = ready && photoLoaded && inView && pageVisible && !paused && !reducedMotion;
  useEffect(() => {
    if (!playing || pending !== null) return;
    const timer = window.setTimeout(() => requestSlide((active + 1) % heroPhotos.length), slideInterval);
    return () => window.clearTimeout(timer);
  }, [active, pending, playing, requestSlide]);

  async function loadSlide(index: number, event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    try {
      await image.decode();
    } catch {
      handleError(index);
      return;
    }
    if (!image.isConnected) return;
    // Establish opacity: 0 before promoting a newly mounted, cached photo.
    image.closest('[aria-roledescription="slide"]')?.getBoundingClientRect();
    setPhotoLoaded(true);
    setLoaded(current => current.includes(index) ? current : [...current, index]);
  }

  function handleError(index: number) {
    if (pendingIndex.current !== index) return;
    pendingIndex.current = null;
    setPending(null);
    // Remount a failed pending image if the guest chooses to retry it.
    setMounted(current => current.filter(slide => slide !== index));
    setLoaded(current => current.filter(slide => slide !== index));
    setPaused(true);
    setFailed(true);
  }

  function togglePlayback() {
    if (paused) setPaused(false);
    else pausePlayback();
  }

  return (
    // On phones, begin the photo below the 64px navigation instead of behind it.
    <div ref={frame} role="region" aria-roledescription="carousel" aria-label="Wedding photographs" className="absolute inset-x-0 bottom-0 top-16 sm:top-0"
      onFocusCapture={event => { if (!(event.target as HTMLElement).closest("[data-slideshow-playback]")) pausePlayback(); }}
      onKeyDown={event => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        selectSlide((active + (event.key === "ArrowRight" ? 1 : heroPhotos.length - 1)) % heroPhotos.length);
      }}>
      <ParallaxLayer background backgroundInsets="-top-6 -bottom-12 sm:-inset-y-12">
      {/* Keep visited photos mounted in a fixed order so a swap never moves image layers. */}
      {mounted.map(index => (
        <div key={heroPhotos[index].id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroPhotos.length}`} aria-hidden={index !== active}
          className={`${styles.slideshowSlide} pointer-events-none absolute inset-0`} style={{
            zIndex: index === active ? 1 : 0,
            opacity: index === active || index === previous ? 1 : 0,
            transitionDuration: reducedMotion || index !== active ? "0s" : `${fadeDuration}s`,
          }}
          // CSS keeps opacity: 1 in place when the fade ends, before retiring the old photo.
          onTransitionEnd={event => {
            if (event.target === event.currentTarget && event.propertyName === "opacity" && index === active) setPrevious(null);
          }}>
          <div className={`${index === active || index === previous ? styles.slideshowZoom : ""} absolute inset-0 origin-top sm:origin-center`} style={{
            animationDuration: `${zoomDuration}ms`,
            animationPlayState: playing && (index === active || index === previous) ? "running" : "paused",
          }}>
            <PhotoFrame photo={heroPhotos[index]} sizes={imageSizes(heroPhotos[index])} fullBleed
              onLoad={event => void loadSlide(index, event)} onError={() => handleError(index)} />
          </div>
        </div>
      ))}
      </ParallaxLayer>
      {ready && <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2">
        {failed && <p role="status" className={`${styles.slideshowMessage} mb-2 max-w-xs px-4 py-2 text-xs leading-5`}>This photo couldn’t load. Choose another photo.</p>}
        <div className="flex items-center justify-center">
          {heroPhotos.map((photo, index) => {
            const isCurrent = active === index;
            const label = isCurrent && !reducedMotion
              ? `Photograph ${index + 1}: ${paused ? "resume" : "pause"} slideshow`
              : `Show photograph ${index + 1}`;
            return <button key={photo.id} type="button" aria-label={label} title={label} aria-current={isCurrent ? "true" : undefined}
              data-slideshow-playback={isCurrent && !reducedMotion ? true : undefined}
              onClick={() => isCurrent && !reducedMotion ? togglePlayback() : selectSlide(index)}
              className="flex size-11 items-center justify-center rounded-full">
              <span aria-hidden="true" className={`${styles.slideshowDot} size-1.5 rounded-full ${isCurrent ? "" : "opacity-50"}`} />
            </button>;
          })}
        </div>
      </div>}
    </div>
  );
}
