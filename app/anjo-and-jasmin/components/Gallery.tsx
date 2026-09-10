"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { gallery } from "../media";
import type { GalleryImage } from "../../jasmin-and-anjo/types";
import Botanicals from "../../jasmin-and-anjo/components/Botanicals";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";

export default function Gallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!selected) return;
    dialog.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [selected]);
  function close() {
    dialog.current?.close();
    setSelected(null);
    opener.current?.focus({ preventScroll: true });
  }
  function photoButton(photo: GalleryImage) {
    return (
      <button
        type="button"
        className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-[#eadfe4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879]"
        aria-label={`View photograph: ${photo.alt}`}
        onClick={(e) => {
          opener.current = e.currentTarget;
          setSelected(photo);
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc((100vw - 120px) / 2), (max-width: 1119px) calc((100vw - 144px) / 3), 326px"
          style={{ objectPosition: photo.position }}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </button>
    );
  }
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#f8edf0] px-5 py-20 sm:px-12 sm:py-24"
    >
      <Botanicals className="-left-28 top-24 w-56 opacity-50" />
      <Botanicals className="-right-28 bottom-24 w-56 rotate-180 opacity-50" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="mb-8 text-center">
          {/* <p className="text-[10px] uppercase tracking-[.25em]">
            Captured moments
          </p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
            Scenes from our forever.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7">
            Placeholder photographs for now. Soon, these frames will hold our
            own favorite moments.
          </p> */}
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {gallery.map((photo) => (
            <Reveal key={photo.alt}>
              {photoButton({
                ...photo,
                alt: photo.alt.replace("Jasmin and Anjo", "Anjo and Jasmin"),
              })}
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center font-instrumentSerif text-2xl italic">
          Little moments. A lifetime of memories.
        </p>
      </div>
      <dialog
        ref={dialog}
        aria-label="Wedding photograph preview"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="max-h-[94svh] w-[min(1100px,94vw)] border-0 bg-[#fbf8f1] p-4 pt-14 text-[#624451] backdrop:bg-[#263d35]/90 backdrop:backdrop-blur"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close photograph"
          className="absolute right-2 top-1 grid h-11 w-11 place-items-center"
        >
          <X />
        </button>
        {selected && (
          <Image
            src={selected.src}
            alt={selected.alt}
            width={1600}
            height={1200}
            sizes="90vw"
            className="max-h-[75svh] w-full object-contain"
          />
        )}
        <p className="mt-3 text-center text-xs">
          {selected?.alt.startsWith("Placeholder")
            ? "Placeholder photograph · Our photos to follow"
            : selected?.alt}
        </p>
      </dialog>
    </section>
  );
}
