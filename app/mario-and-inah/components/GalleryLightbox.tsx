"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, type RefObject } from "react";
import type { InvitationPhoto } from "../data/photos";
import styles from "../styles/invitation.module.css";

type Props = {
  dialog: RefObject<HTMLDialogElement | null>;
  photos: readonly InvitationPhoto[];
  selected: number;
  open: boolean;
  onClose: () => void;
  onNavigate: (direction: number) => void;
};

export default function GalleryLightbox({ dialog, photos, selected, open, onClose, onNavigate }: Props) {
  const photo = photos[selected];
  const source = photo?.src;
  const ratio = source && typeof source !== "string" ? source.width / source.height : null;
  const sizes = ratio
    ? `(min-width: 640px) min(1104px, calc(94vw - 48px), calc(${90 * ratio}svh - ${160 * ratio}px)), min(calc(94vw - 32px), calc(${90 * ratio}svh - ${144 * ratio}px))`
    : "(min-width: 1280px) 1104px, (min-width: 640px) calc(94vw - 48px), calc(94vw - 32px)";

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);

  return (
    <dialog ref={dialog} id="mi-gallery-viewer" aria-label="Mario and Inah’s photo gallery" onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          onNavigate(event.key === "ArrowLeft" ? -1 : 1);
        }
        if (event.key === "Tab") {
          const controls = event.currentTarget.querySelectorAll<HTMLButtonElement>("button");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }}
      className={`${styles.galleryLightbox} fixed inset-0 m-auto h-[90svh] max-h-none w-[94vw] max-w-6xl overflow-hidden rounded-sm border-0 p-4 sm:p-6`}>
      <div className="flex h-full flex-col gap-3">
        <div className="flex min-h-11 shrink-0 items-center justify-between gap-4">
          <p className={`${styles.serifDetail} text-sm`}>Little moments, forever</p>
          <button autoFocus type="button" aria-label="Close photo viewer" onClick={() => dialog.current?.close()} className="flex size-11 shrink-0 items-center justify-center">
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <div className="relative min-h-0 flex-1">
          {open && source && <Image key={photo.id} src={source} alt={photo.alt} fill sizes={sizes} quality={85} className="object-contain" />}
        </div>
        <div className="flex min-h-11 shrink-0 items-center justify-between gap-4">
          <button type="button" aria-label="Previous photo" onClick={() => onNavigate(-1)} className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--mi-rule)]">
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <p aria-live="polite" aria-atomic="true" className="text-center text-xs leading-5">{selected + 1} / {photos.length}<span className="sr-only">: {photo?.alt}</span></p>
          <button type="button" aria-label="Next photo" onClick={() => onNavigate(1)} className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--mi-rule)]">
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </dialog>
  );
}
