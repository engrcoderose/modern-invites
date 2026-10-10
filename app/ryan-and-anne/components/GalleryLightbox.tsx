"use client";

import Image from "./OptimizedPhoto";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import { useEffect, type RefObject } from "react";
import type { PrenupPhoto } from "../types/media";
import styles from "../styles/wedding.module.css";

interface Props {
  dialog: RefObject<HTMLDialogElement | null>;
  photos: readonly PrenupPhoto[];
  selected: number;
  open: boolean;
  onClose: () => void;
  onNavigate?: (direction: number) => void;
  heading?: string;
  ariaLabel?: string;
  fullSizeHref?: string;
}

export default function GalleryLightbox({ dialog, photos, selected, open, onClose, onNavigate, heading = "Our little moments", ariaLabel = "Ryan and Anne’s photo gallery", fullSizeHref }: Props) {
  const photo = photos[selected];
  const ratio = photo ? photo.width / photo.height : 1;
  const desktopHeightWidth = `calc(${92 * ratio}svh - ${176 * ratio}px)`;
  const mobileHeightWidth = `calc(${92 * ratio}svh - ${160 * ratio}px)`;
  const sizes = `(min-width:1226px) min(1104px, ${desktopHeightWidth}), (min-width:640px) min(calc(94vw - 48px), ${desktopHeightWidth}), min(calc(94vw - 32px), ${mobileHeightWidth})`;
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);
  return (
    <dialog ref={dialog} aria-label={ariaLabel} onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      onKeyDown={(event) => {
        if (photos.length > 1 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); onNavigate?.(event.key === "ArrowLeft" ? -1 : 1); }
        if (event.key === "Tab") {
          const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
          const first = controls[0]; const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }}
      className={`${styles.lightbox} fixed inset-0 m-auto h-[92svh] max-h-none w-[94vw] max-w-6xl overflow-hidden border border-[#d1b788]/30 bg-[#171714] p-4 text-[#f5f0e6] sm:p-6`}>
      <div className="flex items-center justify-between gap-4"><p className={`${styles.eyebrow} text-[#d1b788]`}>{heading}</p><button autoFocus type="button" aria-label="Close photo viewer" onClick={() => dialog.current?.close()} className="flex h-11 w-11 items-center justify-center"><X size={24} aria-hidden="true" /></button></div>
      <div className="relative mt-3 h-[calc(100%-8rem)]">{open && photo && <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-contain" />}</div>
      {photos.length > 1 && <div className="mt-4 flex items-center justify-between gap-4">
        <button type="button" aria-label="Previous photo" onClick={() => onNavigate?.(-1)} className="flex h-11 w-11 items-center justify-center border border-[#d1b788]/40"><ArrowLeft size={20} aria-hidden="true" /></button>
        <p aria-live="polite" aria-atomic="true" className="text-center text-xs text-[#ead9b8]">{selected + 1} / {photos.length}<span className="sr-only">: {photo?.alt}</span></p>
        <button type="button" aria-label="Next photo" onClick={() => onNavigate?.(1)} className="flex h-11 w-11 items-center justify-center border border-[#d1b788]/40"><ArrowRight size={20} aria-hidden="true" /></button>
      </div>}
      {fullSizeHref && <div className="mt-4 flex justify-center">
        <a href={fullSizeHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-[#ead9b8] underline underline-offset-4">
          Open full-size image <ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>}
    </dialog>
  );
}
