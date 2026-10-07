"use client";

import Image from "next/image";
import { useEffect, type RefObject } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { GalleryPhoto } from "../types/wedding";

interface GalleryLightboxProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  photos: readonly GalleryPhoto[];
  selected: number;
  open: boolean;
  onClose: () => void;
  onNavigate: (direction: number) => void;
}

export default function GalleryLightbox({
  dialogRef, photos, selected, open, onClose, onNavigate,
}: GalleryLightboxProps) {
  const photo = photos[selected];

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Wedding photo viewer"
      aria-modal="true"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const controls = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          }
          if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          onNavigate(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      className="jb-lightbox fixed inset-0 m-auto h-[90svh] max-h-none w-[94vw] max-w-6xl overflow-hidden border-0 bg-[#faf8f0] p-4 text-[#36472e] sm:p-6"
    >
      <div className="flex justify-end">
        <button
          type="button" autoFocus aria-label="Close photo viewer"
          onClick={() => dialogRef.current?.close()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#526445]/25"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <div className="relative mt-4 h-[calc(100%-8rem)]">
        {photo && <Image src={photo.src} alt={photo.alt} fill sizes="94vw" className="object-contain" />}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button" aria-label="Previous photo" disabled={photos.length < 2}
          onClick={() => onNavigate(-1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#526445]/25 disabled:opacity-40"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <p aria-live="polite" aria-atomic="true" className="sr-only">Photo {selected + 1} of {photos.length}: {photo?.alt}</p>
        <button
          type="button" aria-label="Next photo" disabled={photos.length < 2}
          onClick={() => onNavigate(1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#526445]/25 disabled:opacity-40"
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}
