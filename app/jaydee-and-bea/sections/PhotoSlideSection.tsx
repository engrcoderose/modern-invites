"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import type { GalleryPhoto } from "../types/wedding";
import { usePageVisibility } from "../hooks/usePageVisibility";

const SLIDE_INTERVAL_MS = 3000;
// Both layers reuse the width selected for the sharp portrait in the height-limited 2:3 frame.
const IMAGE_SIZES = "(min-width: 1915px) 558px, (min-width: 937px) calc(31.333vw - 43px), 251px";

export default function PhotoSlideSection({ photos }: { photos: readonly GalleryPhoto[] }) {
  const section = useRef<HTMLElement>(null);
  const nearViewport = useInView(section, { margin: "400px", once: true });
  const inView = useInView(section, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisibility();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [requested, setRequested] = useState([0]);
  const [loaded, setLoaded] = useState<string[]>([]);
  const playing = mounted && inView && pageVisible && reducedMotion === false && photos.length > 1;
  const next = (active + 1) % Math.max(photos.length, 1);
  const activeReady = loaded.includes(`background-${active}`) && loaded.includes(`photo-${active}`);
  const nextReady = loaded.includes(`background-${next}`) && loaded.includes(`photo-${next}`);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!playing || !activeReady) return;
    setRequested((current) => current.includes(next) ? current : [...current, next]);
  }, [activeReady, next, playing]);

  useEffect(() => {
    if (!playing || !activeReady || !nextReady) return;
    const timer = window.setTimeout(() => setActive(next), SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [activeReady, next, nextReady, playing]);

  function markLoaded(key: string) {
    setLoaded((current) => current.includes(key) ? current : [...current, key]);
  }

  if (!photos.length) return null;

  return (
    <section ref={section} id="photo-slides" aria-label="Prenup photo slideshow" aria-roledescription="carousel" data-playing={playing}
      className="relative isolate flex h-[clamp(440px,47vw,900px)] items-center justify-center overflow-hidden bg-[#293327] px-6 py-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {nearViewport && photos.map((photo, index) => requested.includes(index) && (
          <Image key={photo.alt} src={photo.src} alt="" fill loading="eager" sizes={IMAGE_SIZES} quality={85} onLoad={() => markLoaded(`background-${index}`)} className={`scale-110 object-cover blur-sm transition-opacity duration-1000 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`} />
        ))}
        <div className="absolute inset-0 bg-[#1c271b]/30" />
      </div>
      <div aria-live="off" className="relative aspect-[2/3] h-full max-w-full shadow-[0_24px_65px_#00000050]">
        {nearViewport && photos.map((photo, index) => requested.includes(index) && (
          <div key={photo.alt} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${photos.length}`} aria-hidden={active !== index} data-active={active === index} className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}>
            <Image src={photo.src} alt={photo.alt} fill loading="eager" sizes={IMAGE_SIZES} quality={85} onLoad={() => markLoaded(`photo-${index}`)} className="object-contain" />
          </div>
        ))}
      </div>
      <p aria-live="off" className="sr-only">Photo {active + 1} of {photos.length}</p>
    </section>
  );
}


