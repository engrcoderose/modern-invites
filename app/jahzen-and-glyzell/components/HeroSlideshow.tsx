"use client";

import Image from "next/image";
import { motion, type MotionValue } from "motion/react";
import { RotateCcw } from "lucide-react";
import { heroSlides, heroImageQuality, photoSizes } from "../data/photos";
import usePhotoSlideshow from "../hooks/usePhotoSlideshow";
import styles from "../styles/invitation.module.css";

const fadeDuration = .9;

export default function HeroSlideshow({ zoom }: { zoom?: MotionValue<number> }) {
  const { frame, requested, inView, reducedMotion, ready, active, previous, pending, mounted, paused, failed, playing, setPrevious, setPaused, requestSlide, pausePlayback, selectSlide, loadSlide, handleError } = usePhotoSlideshow(heroSlides.length);

  return <div ref={frame} role="region" aria-roledescription="carousel" aria-label="Hero wedding photographs" aria-describedby="jg-hero-slideshow-help"
    tabIndex={0} data-active-slide={active} data-transitioning={previous !== null} data-pending-slide={pending ?? ""} data-playing={playing}
    className={`${styles.heroSlideshow} absolute inset-0`}
    onFocusCapture={event => { if (!(event.target as HTMLElement).closest("[data-slideshow-playback]")) pausePlayback(); }}
    onKeyDown={event => {
      if (event.key === " " && event.target === event.currentTarget && !reducedMotion) {
        event.preventDefault();
        if (paused) setPaused(false); else pausePlayback();
        return;
      }
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const current = requested.current ?? active;
      if (event.key === "Home") selectSlide(0);
      else if (event.key === "End") selectSlide(heroSlides.length - 1);
      else selectSlide((current + (event.key === "ArrowRight" ? 1 : heroSlides.length - 1)) % heroSlides.length);
    }}>
    <p id="jg-hero-slideshow-help" className="sr-only">Photographs change automatically while visible. Focusing this region pauses playback. Use Left, Right, Home and End keys to browse, or Space to pause or resume.</p>
    <div className="absolute inset-0 isolate">
      {heroSlides.map((photo, index) => mounted.includes(index) && <div key={photo.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroSlides.length}`} aria-hidden={index !== active}
        className={`${styles.slideshowSlide} pointer-events-none absolute inset-0`}
        style={{ zIndex: index === active ? 1 : 0, opacity: index === active || index === previous ? 1 : 0, transitionDuration: reducedMotion || index !== active ? "0s" : `${fadeDuration}s` }}
        onTransitionEnd={event => {
          if (event.target === event.currentTarget && event.propertyName === "opacity" && index === active && previous !== null) setPrevious(null);
        }}>
        <motion.div className="absolute inset-0" style={{ scale: zoom ?? 1 }}>
          <Image src={photo.src} alt={photo.alt} fill sizes={photoSizes.hero} quality={heroImageQuality}
            loading={index === pending || (index === 0 && inView) ? "eager" : "lazy"}
            className="object-cover" style={{ objectPosition: photo.position }}
            onLoad={event => { void loadSlide(index, event); }} onError={() => handleError(index)} />
        </motion.div>
      </div>)}
    </div>
    <div className={`${styles.photoShade} pointer-events-none absolute inset-0`} />
    {ready && !reducedMotion && <button type="button" data-slideshow-playback aria-label={paused ? "Play hero slideshow" : "Pause hero slideshow"}
      onClick={() => paused ? setPaused(false) : pausePlayback()}
      className={`${styles.heroSlideMessage} sr-only focus:not-sr-only focus:absolute focus:bottom-6 focus:left-6 focus:z-20 focus:min-h-11 focus:px-4 focus:py-2`}>
      {paused ? "Resume slideshow" : "Pause slideshow"}
    </button>}
    {ready && failed !== null && <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0">
      <div role="status" className={`${styles.heroSlideMessage} flex max-w-xs items-center gap-3 px-4 py-2`}>
        <p>This photo couldn’t load.</p><button type="button" onClick={() => requestSlide(failed)} aria-label="Retry hero photograph" className="inline-flex min-h-11 items-center gap-2"><RotateCcw size={14} aria-hidden="true" />Retry</button>
      </div>
    </div>}
    <p className="sr-only" role="status" aria-live={paused || reducedMotion ? "polite" : "off"} aria-atomic="true">Photograph {active + 1} of {heroSlides.length}{pending !== null ? ". Loading photograph." : ""}</p>
  </div>;
}
