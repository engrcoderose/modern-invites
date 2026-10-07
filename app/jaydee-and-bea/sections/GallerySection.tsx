"use client";

import Image from "next/image";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import { useRef, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import GalleryLightbox from "../components/GalleryLightbox";
import GalleryCarousel from "../components/GalleryCarousel";
import type { GalleryPhoto } from "../types/wedding";

interface GallerySectionProps {
  id: string;
  title: string;
  photos: readonly GalleryPhoto[];
  carousel?: boolean;
  showHeading?: boolean;
}

export default function GallerySection({ id, title, photos, carousel = false, showHeading = true }: GallerySectionProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const showPhoto = (index: number) => {
    setSelected(index);
    dialog.current?.showModal();
    setOpen(true);
  };
  const changePhoto = (direction: number) => {
    setSelected((index) => (index + direction + photos.length) % photos.length);
  };

  return (
    <ScrollScene lockOnFocus id={id} aria-label={title} className={`relative overflow-hidden px-5 py-20 sm:px-8 md:py-28 lg:px-12 ${carousel ? "z-10 -mb-6 sm:-mb-10" : ""}`}>
      <div className="mx-auto max-w-6xl">
        {showHeading && <SectionHeading title={title} />}
        {carousel ? <ScrollLayer profile="gallery"><GalleryCarousel photos={photos} onOpen={showPhoto} /></ScrollLayer> : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {photos.map((image, index) => (
              <button
                key={`${typeof image.src === "string" ? image.src : image.src.src}-${index}`}
                type="button"
                aria-label={`Open photo ${index + 1}: ${image.alt}`}
                onClick={() => showPhoto(index)}
                className={`jb-photo relative overflow-hidden rounded-sm ${
                  index === 0
                    ? "col-span-2 aspect-[4/3] md:col-span-1 md:row-span-2 md:aspect-auto"
                    : "aspect-[4/5]"
                }`}
              >
                <ScrollLayer profile="photo" phase={index * 0.025} className="absolute inset-0"><Image src={image.src} alt={image.alt} fill sizes={index === 0 ? "(min-width:1280px) 370px, (min-width:768px) 33vw, calc(100vw - 40px)" : "(min-width:1280px) 370px, (min-width:768px) 33vw, 50vw"} className="object-cover" loading="lazy" /></ScrollLayer>
              </button>
            ))}
          </div>
        )}
      </div>
      {photos.length > 0 && (
        <GalleryLightbox
          dialogRef={dialog}
          photos={photos}
          selected={selected}
          open={open}
          onClose={() => setOpen(false)}
          onNavigate={changePhoto}
        />
      )}
    </ScrollScene>
  );
}

