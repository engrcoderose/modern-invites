"use client";

import Image from "next/image";
import { slideshowBackdrop, slideshowPhotos, togetherPhotos, slideshowTiming } from "../data/slideshow";
import usePhotoSlideshow from "../utilities/usePhotoSlideshow";
import styles from "../styles/invitation.module.css";

const portraitSizes = "(max-height: 600px) min(440px, calc(100vw - 72px), calc((100dvh - 286px) * .75)), (max-width: 640px) min(calc(100vw - 72px), calc((100dvh - 306px) * .75)), min(440px, calc(100vw - 72px), calc((100dvh - 328px) * .75))";
const backdropRatio = slideshowBackdrop.width / slideshowBackdrop.height;
const backdropSizes = `(max-height: 600px) max(100vw, calc((100dvh - 110px) * ${backdropRatio})), (max-width: 640px) max(100vw, calc((100dvh - 130px) * ${backdropRatio})), max(100vw, calc((100dvh - 152px) * ${backdropRatio}))`;

function fullPageSizes(ratio: number) {
  return `(max-aspect-ratio: 4/3) 100vw, (max-height: 600px) max(100vw, calc((100dvh - 110px) * ${ratio})), max(100vw, calc((100dvh - 152px) * ${ratio}))`;
}

function SlideshowBackdrop({ slice = false }: { slice?: boolean }) {
  return <div className={`${slice ? styles.slideshowBackdropSlice : "absolute inset-0"} pointer-events-none`} aria-hidden="true">
    <Image src={slideshowBackdrop} alt="" fill sizes={backdropSizes} quality={85} className="object-cover" />
    <div className={`${styles.slideshowWash} absolute inset-0`} />
  </div>;
}

export default function PhotoSlideshow({ visible, fullBleed = false }: { visible: boolean; fullBleed?: boolean }) {
  const photos = fullBleed ? togetherPhotos : slideshowPhotos;
  const show = usePhotoSlideshow(photos.length, visible);
  return <div data-invitation-carousel tabIndex={0} role="region" aria-roledescription="carousel" aria-label={`${fullBleed ? "Together" : "Our moments"} photo slideshow`}
    className={`${styles.slideshow} relative h-full w-full overflow-hidden outline-none ${fullBleed ? "" : "flex flex-col items-center justify-center gap-10"}`}
    onFocusCapture={event => { if (!(event.target as HTMLElement).closest("[data-slideshow-playback]")) show.pause(); }}
    onKeyDown={event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      const index = event.key === "Home" ? 0 : event.key === "End" ? photos.length - 1 : (show.active + (event.key === "ArrowRight" ? 1 : photos.length - 1)) % photos.length;
      show.select(index);
    }}>
    {!fullBleed && <SlideshowBackdrop />}
    <div className={fullBleed ? "absolute inset-0" : `${styles.slideshowFrame} relative shrink-0`}>
      <div className="absolute inset-0 isolate overflow-hidden">
        {show.mounted.map(index => {
          const photo = photos[index];
          const sizes = fullBleed ? fullPageSizes(photo.src.width / photo.src.height) : portraitSizes;
          return <div key={photo.src.src} ref={element => { show.layers.current[index] = element; }} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${photos.length}`} aria-hidden={index !== show.active}
            className={`${styles.slideshowLayer} pointer-events-none absolute inset-0 overflow-hidden`}
            style={{ zIndex: index === show.active ? 2 : index === show.previous ? 1 : 0, opacity: index === show.active || index === show.previous ? 1 : 0, transitionDuration: show.reducedMotion || index !== show.active ? "0s" : `${slideshowTiming.fade}ms` }}
            onTransitionEnd={event => show.finish(index, event)}>
            {fullBleed ? <Image src={photo.src} alt="" fill quality={85} sizes={sizes} loading="eager" draggable={false} className={`${styles.slideshowFill} object-cover`} /> : <SlideshowBackdrop slice />}
            <Image src={photo.src} alt={photo.alt} fill quality={85} sizes={sizes} loading="eager" draggable={false} className={fullBleed ? styles.slideshowFullPhoto : "object-contain"}
              onLoad={event => void show.load(index, event)} onError={() => show.fail(index)} />
          </div>;
        })}
      </div>
      {!fullBleed && <h2 className={`${styles.slideshowNames} pointer-events-none absolute inset-0 z-10`} aria-label="Christina and Reboden">
        <span className="absolute -left-4 -top-[.6em]" aria-hidden="true">Christina</span>
        <span className="absolute -bottom-[.5em] -right-4" aria-hidden="true">Reboden</span>
      </h2>}
    </div>
    <div className={`${fullBleed ? `${styles.slideshowControls} absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-2` : "relative shrink-0"} z-10 flex items-center justify-center`} aria-label="Slideshow controls">
      {photos.map((photo, index) => {
        const playback = index === show.active && !show.reducedMotion;
        const label = playback ? `Photo ${index + 1}: ${show.paused ? "resume" : "pause"} slideshow` : `Show photo ${index + 1}`;
        return <button key={photo.src.src} type="button" aria-label={label} title={label} aria-current={index === show.active ? "true" : undefined} data-slideshow-playback={playback ? true : undefined}
        onClick={() => playback ? show.toggle() : show.select(index)} className="flex size-11 items-center justify-center rounded-full">
        <span aria-hidden="true" className={`${styles.slideshowDot} h-1.5 rounded-full ${index === show.active ? "w-5" : "w-1.5 opacity-60"}`} />
      </button>;
      })}
    </div>
    <p className="sr-only" aria-live={show.playing ? "off" : "polite"} aria-atomic="true">Photo {show.active + 1} of {photos.length}</p>
    {show.failed !== null && <p role="status" className="absolute inset-x-4 bottom-2 z-10 text-center text-xs">This photo couldn’t load. <button type="button" onClick={show.retry} className="min-h-11 px-2 underline underline-offset-4">Try again</button></p>}
  </div>;
}
