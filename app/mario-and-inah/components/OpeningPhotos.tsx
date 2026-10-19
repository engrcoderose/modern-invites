"use client";

import { useEffect, useRef, useState, type CSSProperties, type SyntheticEvent } from "react";
import PhotoFrame from "./PhotoFrame";
import { mobileOpeningPhotos } from "../data/opening";
import styles from "../styles/opening.module.css";

const slideInterval = 4500;

type Props = { playing: boolean; reducedMotion: boolean };

export default function OpeningPhotos({ playing, reducedMotion }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [mounted, setMounted] = useState([0]);
  const [loaded, setLoaded] = useState<number[]>([]);
  const currentSlide = useRef(0);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // Desktop-only image nodes are removed on mobile; decode their replacements again.
    if (mobile) setLoaded(current => current.filter(index => mounted.includes(index)));
  }, [mobile, mounted]);

  useEffect(() => {
    if (mobile && playing && !reducedMotion) return;
    setPending(null);
    // Pausing during a fade keeps the outgoing photo until completion.
    if (!mobile || reducedMotion) setPrevious(null);
  }, [mobile, playing, reducedMotion]);

  useEffect(() => {
    if (!mobile || !playing || reducedMotion || !loaded.includes(active) || pending !== null || previous !== null) return;
    const timer = window.setTimeout(() => {
      const next = (active + 1) % mobileOpeningPhotos.length;
      setMounted(current => current.includes(next) ? current : [...current, next]);
      setPending(next);
    }, slideInterval);
    return () => window.clearTimeout(timer);
  }, [active, loaded, mobile, pending, playing, previous, reducedMotion]);

  useEffect(() => {
    if (!mobile || !playing || reducedMotion || pending === null || !loaded.includes(pending) || previous !== null) return;
    frame.current?.querySelector(`[data-opening-slide="${pending}"]`)?.getBoundingClientRect();
    setPrevious(active);
    currentSlide.current = pending;
    setActive(pending);
    setPending(null);
  }, [active, loaded, mobile, pending, playing, previous, reducedMotion]);

  async function loadPhoto(index: number, event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    try {
      await image.decode();
    } catch {
      failPhoto(index);
      return;
    }
    if (!image.isConnected) return;
    // Commit the hidden starting style before promoting a cached image.
    image.closest("[data-opening-slide]")?.getBoundingClientRect();
    setLoaded(current => current.includes(index) ? current : [...current, index]);
  }

  function failPhoto(index: number) {
    if (index === active) return;
    setPending(current => current === index ? null : current);
    setMounted(current => current.filter(slide => slide !== index));
    setLoaded(current => current.filter(slide => slide !== index));
  }

  return (
    <div ref={frame} aria-hidden="true" data-opening-photos className={`${styles.photoPanels} absolute inset-0 sm:grid sm:grid-cols-3 sm:gap-1`}>
      {mobileOpeningPhotos.map((photo, index) => {
        const aspect = typeof photo.src === "object" && photo.src ? photo.src.width / photo.src.height : 1.5;
        // The proposal leads the mobile slideshow; desktop retains its three panels.
        const display = index === 0 ? "block sm:hidden" : `${mounted.includes(index) ? "block" : "hidden"} sm:block`;
        // Before hydration, provide each viewport's first photo without mounting the gallery.
        const showImage = mobile === false ? index > 0 : mounted.includes(index) || mobile === null && index === 1;
        return (
          <div key={photo.id} data-opening-slide={index} className={`${styles.panel} ${styles.photoSlide} ${display} absolute inset-0 overflow-hidden sm:relative`}
            style={{ "--slide-opacity": index === active || index === previous ? 1 : 0, "--slide-z": index === active ? 1 : 0,
              "--slide-duration": index === active && !reducedMotion ? ".9s" : "0s" } as CSSProperties}
            onTransitionEnd={event => {
              if (event.target === event.currentTarget && event.propertyName === "opacity" && index === currentSlide.current) setPrevious(null);
            }}>
            <div className={`${styles.photoDrift} absolute inset-0`}>
              {showImage && <PhotoFrame photo={photo} sizes={`(max-width: 639px) max(108vw, ${Math.ceil(aspect * 108)}dvh), max(36vw, ${Math.ceil(aspect * 108)}dvh)`}
                priority={mobile !== null && index === (mobile ? 0 : 1)} fullBleed onLoad={event => void loadPhoto(index, event)} onError={() => failPhoto(index)} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
