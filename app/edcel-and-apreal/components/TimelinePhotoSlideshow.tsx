"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { useInvitationOpen } from "./InvitationState";
import usePhotoSlideshow from "../hooks/usePhotoSlideshow";
import { timelineGalleryPhotos as photos } from "../data/timeline-gallery-photos";
import styles from "../styles/photo-slideshow.module.css";

function imageSizes(photo: (typeof photos)[number]) {
  const ratio = photo.src.width / photo.src.height;
  const frameHeight = `max(${(480 * ratio).toFixed(2)}px, calc(${(100 * ratio).toFixed(2)}svh - ${(64 * ratio).toFixed(2)}px))`;
  return `(min-width: 640px) min(1152px, calc(100vw - 80px), calc(${frameHeight} - ${(ratio * 136).toFixed(2)}px)), min(calc(100vw - 48px), calc(${frameHeight} - ${(ratio * 120).toFixed(2)}px))`;
}

export default function TimelinePhotoSlideshow() {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { amount: 0.15 });
  const open = useInvitationOpen();
  const show = usePhotoSlideshow(photos.length, open && inView);

  return <div ref={frame} role="region" aria-roledescription="carousel" aria-label="Edcel and Apreal’s photo break" aria-describedby="ea-timeline-gallery-instructions" tabIndex={0}
    className={`${styles.carousel} relative isolate h-[calc(100svh-64px)] min-h-[480px] w-full overflow-hidden`}
    onKeyDown={event => {
      if (event.key === " " && event.target === event.currentTarget) {
        event.preventDefault();
        if (!show.reducedMotion) show.togglePlayback();
        return;
      }
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Home") show.selectSlide(0);
      else if (event.key === "End") show.selectSlide(photos.length - 1);
      else show.stepSlide(event.key === "ArrowLeft" ? -1 : 1);
    }}>
    <p id="ea-timeline-gallery-instructions" className="sr-only">Photographs change automatically while visible. Selecting a slide bullet pauses playback. Use the slide bullets, left and right arrow keys, Home or End to browse. With the carousel focused, press Space to pause or resume automatic playback.</p>
    {show.mounted.map(index => <div key={photos[index].src.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${photos.length}`} aria-hidden={index !== show.active}
      data-photo-break-slide={index} className={`${styles.slide} pointer-events-none absolute inset-0`}
      style={{ opacity: index === show.active || index === show.previous ? 1 : 0, zIndex: index === show.active ? 1 : 0, transitionDuration: show.reducedMotion || index !== show.active ? "0s" : undefined }}
      onTransitionEnd={event => show.finishTransition(index, event)}>
      <Image src={photos[index].src} alt="" aria-hidden="true" fill quality={85} sizes={imageSizes(photos[index])} loading={index === 0 ? "lazy" : "eager"} className={`${styles.backdrop} object-cover`} />
      <div aria-hidden="true" className="absolute inset-0 bg-[#4b0f1f]/30" />
      <div className="absolute inset-x-6 bottom-24 top-6 mx-auto max-w-6xl sm:inset-x-10 sm:top-10">
        <Image src={photos[index].src} alt={photos[index].alt} fill quality={85} sizes={imageSizes(photos[index])} loading={index === 0 ? "lazy" : "eager"} className={`${styles.foreground} object-contain`}
          onLoad={event => void show.loadPhoto(index, event)} onError={() => show.failPhoto(index)} />
      </div>
    </div>)}
    <div role="group" aria-label="Photo break slideshow controls" className="absolute inset-x-5 bottom-20 z-10 flex items-center justify-center sm:bottom-6">
      <div role="group" aria-label="Choose photo break photograph" className="flex items-center justify-center">
        {photos.map((photo, index) => <button key={photo.src.src} type="button" aria-label={`Go to photo break photograph ${index + 1}`}
          aria-current={index === show.active ? "true" : undefined} onClick={() => show.selectSlide(index)}
          className="flex size-6 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8f0e5] sm:size-8">
          <span aria-hidden="true" className={`${styles.dot} ${index === show.active ? styles.activeDot : ""} block size-1.5 rounded-full sm:size-2`} />
        </button>)}
      </div>
    </div>
    <p className="sr-only" aria-live={show.paused ? "polite" : "off"}>{show.paused ? "Paused. " : ""}Photograph {show.active + 1} of {photos.length}</p>
    {show.failed && <p role="status" className="absolute inset-x-5 bottom-20 z-20 text-center text-sm">This photo could not load. Please choose a photograph again.</p>}
  </div>;
}
