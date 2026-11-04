"use client";

import Image from "next/image";
import ScrollLayer from "./ScrollLayer";
import type { GalleryPhoto } from "../types/wedding";

const PREVIEW_LIMIT = 10;

// Match the square phone tiles and the four-column desktop grid, including
// the extra source width needed by cover crops in the two tall frames.
function previewImageSizes(photo: GalleryPhoto, tall: boolean) {
  const ratio = typeof photo.src === "string" ? 1 : photo.src.width / photo.src.height;
  const cover = photo.fit !== "contain";
  const desktopScale = cover ? Math.max(1, ratio * (tall ? 1.5 : .75)) : 1;
  const extra = tall && cover && ratio * 1.5 > 1 ? ratio * 16 : 0;
  const mobileScale = cover ? Math.max(1, ratio) : 1;
  const scaled = (vw: number, inset: number, scale: number, addition = 0) =>
    `calc(${(vw * scale).toFixed(3)}vw - ${(inset * scale - addition).toFixed(3)}px)`;

  return [
    `(min-width:1248px) ${(276 * desktopScale + extra).toFixed(1)}px`,
    `(min-width:1024px) ${scaled(25, 36, desktopScale, extra)}`,
    `(min-width:768px) ${scaled(25, 28, desktopScale, extra)}`,
    `(min-width:640px) ${scaled(50, 40, mobileScale)}`,
    scaled(50, 26, mobileScale),
  ].join(", ");
}

interface GalleryPreviewProps {
  photos: readonly GalleryPhoto[];
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
}

export default function GalleryPreview({ photos, onOpen }: GalleryPreviewProps) {
  const previews = photos.slice(0, PREVIEW_LIMIT);
  const remaining = photos.length - previews.length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {previews.map((photo, index) => {
        const moreTile = remaining > 0 && index === previews.length - 1;
        return (
          <ScrollLayer key={`${typeof photo.src === "string" ? photo.src : photo.src.src}-${index}`}
            profile="photo" staggerIndex={index % 4}
            className={`relative aspect-square min-h-0 min-w-0 ${index < 2 ? "md:row-span-2 md:aspect-auto" : "md:aspect-[4/3]"}`}>
            <button type="button"
              aria-label={moreTile ? `View ${remaining} more photos` : `Open photo ${index + 1}: ${photo.alt}`}
              onClick={(event) => onOpen(moreTile ? previews.length : index, event.currentTarget)}
              className="jb-photo group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-sm border border-[#8c9877]/25 bg-[#eeeee4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#526445]">
              <Image src={photo.src} alt={photo.alt} fill sizes={previewImageSizes(photo, index < 2)} loading="lazy"
                className={photo.fit === "contain" ? "object-contain" : "object-cover"} />
              {moreTile && (
                <span aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#36472e]/85 text-[#fffaf3] transition-colors group-hover:bg-[#36472e]/75">
                  <span className="jb-serif text-5xl sm:text-6xl">+{remaining}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] sm:text-xs">more photos</span>
                </span>
              )}
            </button>
          </ScrollLayer>
        );
      })}
    </div>
  );
}
