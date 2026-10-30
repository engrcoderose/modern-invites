"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { useInvitationOpen } from "./InvitationState";
import usePhotoSlideshow from "../hooks/usePhotoSlideshow";
import { heroPhotos } from "../data/hero-photos";
import styles from "../styles/hero.module.css";

// Cover cropping can require more source width than the visible photo frame.
function imageSizes(photo: (typeof heroPhotos)[number]) {
  const ratio = photo.src.width / photo.src.height;
  const viewportCover = `calc(${(100 * ratio).toFixed(2)}svh - ${(64 * ratio).toFixed(2)}px)`;
  return `(min-width: 768px) max(100vw, ${Math.ceil(790 * ratio)}px, ${viewportCover}), max(100vw, ${viewportCover})`;
}

export default function HeroSlideshow() {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { amount: 0.15 });
  const invitationOpen = useInvitationOpen();
  const { active, previous, mounted, paused, reducedMotion, failed, loadPhoto, failPhoto, finishTransition, togglePlayback } = usePhotoSlideshow(heroPhotos.length, invitationOpen && inView);

  return <>
    <div ref={frame} className={`${styles.photoSurface} pointer-events-none absolute inset-0`}>
      {mounted.map(index => <div key={heroPhotos[index].src.src} aria-hidden={index !== active} data-hero-slide={index}
        className={`${styles.photoSlide} absolute inset-0`}
        style={{ opacity: index === active || index === previous ? 1 : 0, zIndex: index === active ? 1 : 0, transitionDuration: reducedMotion || index !== active ? "0s" : undefined }}
        onTransitionEnd={event => finishTransition(index, event)}>
        <Image src={heroPhotos[index].src} alt={heroPhotos[index].alt} fill sizes={imageSizes(heroPhotos[index])} quality={85}
          loading={index === 0 ? "lazy" : "eager"} className="object-cover" style={{ objectPosition: heroPhotos[index].position }}
          onLoad={event => void loadPhoto(index, event)} onError={() => failPhoto(index)} />
      </div>)}
    </div>
    <button type="button" disabled={Boolean(reducedMotion)}
      aria-label={reducedMotion ? "Automatic photos disabled for reduced motion" : paused ? "Play hero slideshow" : "Pause hero slideshow"}
      onClick={togglePlayback}
      className={`${styles.keyboardPlayback} sr-only focus:not-sr-only focus:absolute focus:bottom-6 focus:right-6 focus:z-30 focus:px-5 focus:py-3 focus:text-sm`}>
      {paused ? "Play photos" : "Pause photos"}
    </button>
    {failed && <p role="status" className="sr-only">The slideshow paused because the next photograph could not load.</p>}
  </>;
}
