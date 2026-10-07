"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { GalleryPhoto } from "../types/wedding";

import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";

export default function PhotoSlideSection({ photos }: { photos: readonly GalleryPhoto[] }) {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const photo = photos[selected];
  if (!photo) return null;

  const changePhoto = (direction: number) => {
    setSelected((index) => (index + direction + photos.length) % photos.length);
  };

  return (
    <ScrollScene lockOnFocus
      id="photo-slides" aria-label="Prenup photo slideshow" aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          changePhoto(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      className="relative isolate flex h-[calc(100svh-72px)] min-h-[480px] flex-col items-center justify-center overflow-hidden bg-[#293327] px-5 pb-24 pt-8 sm:px-12"
    >
      <Image src={photo.src} alt="" aria-hidden="true" fill sizes="(min-width:1024px) 512px, 50vw" quality={40} className="-z-20 scale-110 object-cover blur-2xl" loading="lazy" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#1c271b]/45" />
      <ScrollLayer profile="gallery" className="relative h-full max-h-[80svh] w-full max-w-5xl">
        <motion.div key={selected} initial={reducedMotion ? false : { opacity: 0.5, scale: 1.015 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width:1024px) 900px, 90vw" className="object-contain" loading="lazy" />
        </motion.div>
      </ScrollLayer>
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-6 text-[#faf8f0]">
        <button type="button" aria-label="Previous slideshow photo" disabled={photos.length < 2} onClick={() => changePhoto(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-black/20 disabled:opacity-40">
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <p aria-live="polite" aria-atomic="true" className="sr-only">Photo {selected + 1} of {photos.length}</p>
        <button type="button" aria-label="Next slideshow photo" disabled={photos.length < 2} onClick={() => changePhoto(1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-black/20 disabled:opacity-40">
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </ScrollScene>
  );
}


