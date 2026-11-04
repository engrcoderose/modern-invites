"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";
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
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    touchStart.current = null;
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
        } else if (event.key === "Home" || event.key === "End") {
          event.preventDefault();
          onNavigate(event.key === "Home" ? -selected : photos.length - 1 - selected);
        }
      }}
      className="jb-lightbox fixed inset-0 m-auto h-[90svh] max-h-none w-[94vw] max-w-6xl overflow-hidden border-0 bg-[rgb(var(--jb-paper))] p-4 text-[rgb(var(--jb-ink))] sm:p-6"
    >
      <div className="flex justify-end">
        <button
          type="button" autoFocus aria-label="Close photo viewer"
          onClick={() => dialogRef.current?.close()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--jb-sage))]/25"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <div className="relative mt-4 h-[calc(100%-8rem)] touch-pan-y"
        onPointerDown={(event) => {
          touchStart.current = null;
          if (event.pointerType !== "mouse") {
            touchStart.current = { x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={() => { touchStart.current = null; }}
        onPointerUp={(event) => {
          if (!touchStart.current) return;
          const dx = event.clientX - touchStart.current.x;
          const dy = event.clientY - touchStart.current.y;
          touchStart.current = null;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) onNavigate(dx < 0 ? 1 : -1);
        }}>
        {open && photo && <Image src={photo.src} alt={photo.alt} fill loading="eager" draggable={false} sizes="(min-width:1226px) 1104px, (min-width:640px) calc(94vw - 48px), calc(94vw - 32px)" className="pointer-events-none select-none object-contain" />}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button" aria-label="Previous photo" disabled={photos.length < 2}
          onClick={() => onNavigate(-1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--jb-sage))]/25 disabled:opacity-40"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <p aria-live="polite" aria-atomic="true" className="text-center text-xs tracking-[0.12em]">Photo {selected + 1} of {photos.length}<span className="sr-only">: {photo?.alt}</span></p>
        <button
          type="button" aria-label="Next photo" disabled={photos.length < 2}
          onClick={() => onNavigate(1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--jb-sage))]/25 disabled:opacity-40"
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}
