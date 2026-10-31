"use client";

import Image from "next/image";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import { useRef, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import GalleryLightbox from "../components/GalleryLightbox";
import GalleryCarousel from "../components/GalleryCarousel";
import type { GalleryPhoto } from "../types/wedding";
import floralBackground from "../assets/designs/gallery-floral-background.webp";

interface GallerySectionProps {
  id: string;
  title: string;
  photos: readonly GalleryPhoto[];
  carousel?: boolean;
  showHeading?: boolean;
}

// Cover crops need enough source pixels for the frame's height as well as width.
function galleryImageSizes(photo: GalleryPhoto, featured: boolean) {
  const ratio = typeof photo.src === "string" ? 1 : photo.src.width / photo.src.height;
  const cover = photo.fit !== "contain";
  const tileScale = cover ? Math.max(1, ratio * 1.25) : 1;
  const desktopScale = featured && cover ? Math.max(1, ratio * 2.5) : tileScale;
  const rowGap = featured && cover && ratio * 2.5 > 1 ? ratio * 20 : 0;
  const mobileScale = featured && cover ? Math.max(1, ratio * 0.75) : tileScale;
  const scaled = (vw: number, inset: number, scale: number, extra = 0) =>
    `calc(${(vw * scale).toFixed(3)}vw - ${(inset * scale - extra).toFixed(3)}px)`;

  return [
    `(min-width:1248px) ${((1112 / 3) * desktopScale + rowGap).toFixed(1)}px`,
    `(min-width:1024px) ${scaled(100 / 3, 136 / 3, desktopScale, rowGap)}`,
    `(min-width:768px) ${scaled(100 / 3, 104 / 3, desktopScale, rowGap)}`,
    `(min-width:640px) ${scaled(featured ? 100 : 50, featured ? 64 : 42, mobileScale)}`,
    scaled(featured ? 100 : 50, featured ? 40 : 26, mobileScale),
  ].join(", ");
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
    <ScrollScene lockOnFocus id={id} aria-label={title} className={`relative overflow-hidden px-5 py-20 sm:px-8 md:py-28 lg:px-12 ${carousel ? "isolate z-10 -mb-6 sm:-mb-10" : ""}`}>
      {carousel && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
          <Image src={floralBackground} alt="" fill sizes="100vw" loading="lazy" draggable={false} className="object-cover object-bottom" />
        </div>
      )}
      <div className="relative mx-auto max-w-6xl">
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
                <ScrollLayer profile="photo" phase={index * 0.025} className="absolute inset-0"><Image src={image.src} alt={image.alt} fill sizes={galleryImageSizes(image, index === 0)} className={image.fit === "contain" ? "object-contain" : "object-cover"} loading="lazy" /></ScrollLayer>
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

