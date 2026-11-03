"use client";

import { useRef } from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { gallery } from "../data/photos";
import usePhotoSlideshow from "../hooks/usePhotoSlideshow";
import styles from "../styles/invitation.module.css";

export default function GalleryCarousel() {
  const { frame, requested, inView, reducedMotion, ready, active, previous, pending, mounted, paused, failed, playing, setPrevious, setPaused, requestSlide, pausePlayback, selectSlide, loadSlide, handleError } = usePhotoSlideshow(gallery.length);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  function step(direction: number) {
    selectSlide(((requested.current ?? active) + direction + gallery.length) % gallery.length);
  }

  return <div ref={frame} role="region" aria-roledescription="carousel" aria-label="Wedding photo gallery" aria-describedby="jg-gallery-instructions"
    tabIndex={0} data-active-slide={active} data-transitioning={previous !== null} data-pending-slide={pending ?? ""} data-playing={playing}
    className={`${styles.gallerySlideshow} relative mx-auto max-w-5xl`}
    onFocusCapture={event => { if (!(event.target as HTMLElement).closest("[data-slideshow-playback]")) pausePlayback(); }}
    onKeyDown={event => {
      if (event.key === " " && event.target === event.currentTarget && !reducedMotion) {
        event.preventDefault();
        if (paused) setPaused(false); else pausePlayback();
        return;
      }
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Home") selectSlide(0);
      else if (event.key === "End") selectSlide(gallery.length - 1);
      else step(event.key === "ArrowRight" ? 1 : -1);
    }}>
    <p id="jg-gallery-instructions" className="sr-only">Photographs change automatically while visible. Focusing this region pauses playback. Swipe or use Left, Right, Home and End keys to browse. Space pauses or resumes playback.</p>
    <div id="jg-gallery-track" className="relative isolate aspect-[4/5] touch-pan-y overflow-hidden sm:aspect-[3/2]"
      onTouchStart={event => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }}
      onTouchCancel={() => { touchStart.current = null; }}
      onTouchEnd={event => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const touch = event.changedTouches[0];
        const dx = touch.clientX - start.x, dy = touch.clientY - start.y;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
      }}>
      {gallery.map((photo, index) => mounted.includes(index) && <div key={photo.alt} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${gallery.length}`}
        aria-hidden={index !== active} className={`${styles.slideshowSlide} pointer-events-none absolute inset-0`}
        style={{ zIndex: index === active ? 1 : 0, opacity: index === active || index === previous ? 1 : 0, transitionDuration: reducedMotion || index !== active ? "0s" : ".9s" }}
        onTransitionEnd={event => {
          if (event.target === event.currentTarget && event.propertyName === "opacity" && index === active && previous !== null) setPrevious(null);
        }}>
        <Image src={photo.src} alt={photo.alt} fill sizes={photo.sizes} quality={85}
          loading={index === pending || (index === 0 && inView) ? "eager" : "lazy"}
          className="object-cover" style={{ objectPosition: photo.position }}
          onLoad={event => { void loadSlide(index, event); }} onError={() => handleError(index)} />
      </div>)}
    </div>
    {ready && !reducedMotion && <button type="button" data-slideshow-playback aria-label={paused ? "Play gallery slideshow" : "Pause gallery slideshow"}
      onClick={() => paused ? setPaused(false) : pausePlayback()}
      className={`${styles.slideshowPlayback} sr-only focus:not-sr-only focus:absolute focus:bottom-6 focus:left-6 focus:z-20 focus:min-h-11 focus:px-4 focus:py-2`}>
      {paused ? "Resume slideshow" : "Pause slideshow"}
    </button>}
    <p className="sr-only" role="status" aria-live={paused || reducedMotion ? "polite" : "off"} aria-atomic="true">Photograph {active + 1} of {gallery.length}{pending !== null ? ". Loading photograph." : ""}</p>
    {failed !== null && <div role="status" className="mt-3 flex items-center justify-center gap-3 text-sm">
      <p>This photo couldn’t load.</p><button type="button" onClick={() => requestSlide(failed)} aria-label="Retry gallery photograph" className="inline-flex min-h-11 items-center gap-2"><RotateCcw size={14} aria-hidden="true" />Retry</button>
    </div>}
  </div>;
}
