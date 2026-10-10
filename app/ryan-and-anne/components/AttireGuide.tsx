"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useRef, useState } from "react";
import outfitGuide from "../assets/design/Wedding Attire Guide.png";
import type { PrenupPhoto } from "../types/media";
import GalleryLightbox from "./GalleryLightbox";

const guide: PrenupPhoto = {
  id: "wedding-attire-guide",
  filename: "Wedding Attire Guide.png",
  src: outfitGuide.src,
  width: outfitGuide.width,
  height: outfitGuide.height,
  alt: "Wedding attire examples: black bridesmaid dresses, a champagne gold maid of honor dress, black suits for groomsmen, black and champagne outfits for sponsors and guests.",
};
const viewerPhotos = [guide];

export default function AttireGuide() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" aria-label="View the full wedding attire guide" aria-haspopup="dialog"
        onClick={() => { dialog.current?.showModal(); setOpen(true); }}
        className="relative block w-full cursor-zoom-in">
        <Image src={outfitGuide} alt={guide.alt} sizes="(min-width:1280px) 1104px, (min-width:640px) calc(100vw - 128px), calc(100vw - 72px)" className="h-auto w-full" />
        <span aria-hidden="true" className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center bg-[#171714]/85 text-[#f5f0e6]">
          <Maximize2 size={18} />
        </span>
      </button>
      <GalleryLightbox dialog={dialog} photos={viewerPhotos} selected={0} open={open} onClose={() => setOpen(false)}
        heading="Wedding attire guide" ariaLabel="Wedding attire guide viewer" fullSizeHref={outfitGuide.src} />
    </>
  );
}
