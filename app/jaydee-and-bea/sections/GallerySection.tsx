"use client";

import Image from "next/image";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import { useRef, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import GalleryLightbox from "../components/GalleryLightbox";
import GalleryCarousel from "../components/GalleryCarousel";
import GalleryPreview from "../components/GalleryPreview";
import GalleryCornerFlowers from "../components/GalleryCornerFlowers";
import type { GalleryPhoto } from "../types/wedding";
import floralBackground from "../assets/designs/gallery-floral-background.webp";

interface GallerySectionProps {
  id: string;
  title: string;
  photos: readonly GalleryPhoto[];
  carousel?: boolean;
  showHeading?: boolean;
}

export default function GallerySection({ id, title, photos, carousel = false, showHeading = true }: GallerySectionProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const showPhoto = (index: number, trigger?: HTMLButtonElement) => {
    opener.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setSelected(index);
    dialog.current?.showModal();
    setOpen(true);
  };
  const changePhoto = (direction: number) => {
    setSelected((index) => (index + direction + photos.length) % photos.length);
  };
  const closePhoto = () => {
    setOpen(false);
    opener.current?.focus({ preventScroll: true });
  };

  return (
    <ScrollScene lockOnFocus id={id} aria-label={title} className={`relative overflow-hidden px-5 py-20 sm:px-8 md:py-28 lg:px-12 ${carousel ? "isolate z-10 -mb-6 sm:-mb-10" : ""}`}>
      {carousel && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
          <Image src={floralBackground} alt="" fill sizes="100vw" loading="lazy" draggable={false} className="object-cover object-bottom" />
        </div>
      )}
      {!carousel && <GalleryCornerFlowers />}
      <div className="relative mx-auto max-w-6xl">
        {showHeading && <SectionHeading title={title} />}
        {carousel ? <ScrollLayer profile="gallery"><GalleryCarousel photos={photos} onOpen={showPhoto} /></ScrollLayer> : <GalleryPreview photos={photos} onOpen={showPhoto} />}
      </div>
      {photos.length > 0 && (
        <GalleryLightbox
          dialogRef={dialog}
          photos={photos}
          selected={selected}
          open={open}
          onClose={closePhoto}
          onNavigate={changePhoto}
        />
      )}
    </ScrollScene>
  );
}

