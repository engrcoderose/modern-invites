"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import type { SlideshowPhoto } from "../data/photos";
import { usePhotoSlideshow } from "./usePhotoSlideshow";
import styles from "../styles/slideshow.module.css";
import weddingStyles from "../styles/wedding.module.css";

export default function PhotoSlideshow({ title, photos, fullPage = false, enabled }: {
  title: string;
  photos: SlideshowPhoto[];
  fullPage?: boolean;
  enabled: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const slideshow = usePhotoSlideshow(photos.length, enabled);

  useLayoutEffect(() => {
    const element = frame.current;
    if (!element) return;
    const available = fullPage ? element : element.parentElement;
    if (!available) return;
    const measure = () => {
      const width = fullPage ? available.clientWidth : Math.min(available.clientWidth, available.clientHeight * 3 / 4);
      setSize({ width, height: fullPage ? available.clientHeight : width * 4 / 3 });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(available);
    return () => observer.disconnect();
  }, [fullPage]);

  const controls = <div className={`${styles.controls} relative z-10 mx-auto w-fit max-w-full px-2 py-1 text-center`}>
    {slideshow.failed !== null && <p role="status" className="mb-1 px-2 text-xs leading-6">This photo couldn’t load. <button type="button" className="min-h-11 px-2 underline underline-offset-4" onClick={slideshow.retry}>Retry photo</button></p>}
    <div className="flex items-center justify-center" aria-label={`${title} photo controls`}>
      {photos.map((photo, index) => <button
        key={photo.src.src} type="button" aria-label={`Show ${title} photo ${index + 1}`}
        aria-pressed={index === slideshow.active}
        onClick={() => slideshow.select(index)} className="flex size-11 shrink-0 items-center justify-center rounded-full"
      ><span className={`${styles.dot} ${index === slideshow.active ? styles.currentDot : ""} block h-1.5 rounded-full`} /></button>)}
      {!slideshow.reduced && <button type="button" data-slideshow-playback
        aria-label={slideshow.paused ? `Play ${title} slideshow` : `Pause ${title} slideshow`}
        aria-pressed={!slideshow.paused} onClick={slideshow.togglePlayback}
        className="flex size-11 shrink-0 items-center justify-center rounded-full"
      >{slideshow.paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>}
    </div>
    <p className={`${styles.placeholderNote} px-2 pb-1`}>Placeholder photos · Vincent & Gabrielle</p>
    <p className="sr-only" role="status" aria-live={slideshow.paused ? "polite" : "off"}>Photo {slideshow.active + 1} of {photos.length}{slideshow.loading ? " · Loading photo" : ""}</p>
  </div>;

  return <div
    className={`${styles.gallery} ${fullPage ? "relative h-full overflow-hidden" : "relative grid h-full grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] items-center gap-3 px-6 py-5 sm:gap-4 sm:py-6"}`}
    role="region" aria-roledescription="carousel" aria-label={`${title} · placeholder photo gallery`}
    onFocusCapture={event => { if (!(event.target as HTMLElement).closest("[data-slideshow-playback]")) slideshow.pause(); }}
    onKeyDown={event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      event.stopPropagation();
      slideshow.select((slideshow.active + (event.key === "ArrowRight" ? 1 : photos.length - 1)) % photos.length);
    }}
  >
    <h2 className={`${weddingStyles.heading} ${fullPage ? `${styles.photoHeading} pointer-events-none absolute left-6 top-5 z-10 sm:left-10 sm:top-7` : "relative z-10 text-center"}`}>{title}</h2>
    <div className={fullPage ? "absolute inset-x-0 top-1/2 h-full -translate-y-1/2 [@media(max-width:767px)]:max-h-[166.667vw]" : "flex h-full min-h-0 min-w-0 items-center justify-center"}>
      <div ref={frame} className={`${styles.frame} ${fullPage ? "absolute inset-0" : "relative max-w-full overflow-hidden"}`}
        style={fullPage ? undefined : { width: size.width, height: size.height }}>
        {slideshow.initialLoading && slideshow.failed === null && <p role="status" className="absolute inset-0 grid place-items-center px-4 text-center text-xs">Loading photographs…</p>}
        {size.width > 0 && slideshow.mounted.map(index => {
          const photo = photos[index];
          // Size the cover image from its actual frame, including source-aspect cropping.
          const imageWidth = Math.ceil(Math.max(size.width, size.height * photo.src.width / photo.src.height));
          return <div key={`${index}-${slideshow.attempts[index] ?? 0}`} data-photo-layer
            className={`${styles.slide} pointer-events-none absolute inset-0`}
            role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${photos.length}`}
            aria-hidden={index !== slideshow.active}
            style={{ zIndex: index === slideshow.active ? 2 : index === slideshow.previous ? 1 : 0,
              opacity: index === slideshow.active || index === slideshow.previous ? 1 : 0,
              transitionDuration: slideshow.reduced || index !== slideshow.active ? "0s" : "900ms" }}
            onTransitionEnd={event => {
              if (event.target === event.currentTarget && event.propertyName === "opacity") slideshow.complete(index);
            }}
          ><Image src={photo.src} alt={photo.alt} fill quality={85} sizes={`${imageWidth}px`}
            className="object-cover" style={{ objectPosition: photo.position }} draggable={false}
            onLoad={event => void slideshow.load(index, event)} onError={() => slideshow.handleError(index)} /></div>;
        })}
      </div>
    </div>
    {fullPage ? <div className="absolute inset-x-4 bottom-4 z-20 flex justify-center sm:bottom-6">{controls}</div> : controls}
  </div>;
}
