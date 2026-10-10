"use client";

import Image from "../components/OptimizedPhoto";
import { useRef, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import GalleryLightbox from "../components/GalleryLightbox";
import { galleryPhotos } from "../data/gallery";
import styles from "../styles/wedding.module.css";

const portraitFrameSizes =
  "(min-width:1280px) 384px, (min-width:1024px) calc(33.33vw - 42.67px), (min-width:768px) calc(33.33vw - 26.67px), (min-width:640px) calc(50vw - 36.67px), calc(50vw - 22px)";
const landscapeCoverSizes =
  "(min-width:1280px) 417px, (min-width:1024px) calc(37.5vw - 63px), (min-width:768px) calc(37.5vw - 45px), (min-width:640px) calc(56.25vw - 56px), calc(56.25vw - 34px)";
const ordinaryFrameSizes =
  "(min-width:1280px) 371px, (min-width:1024px) calc(33.33vw - 56px), (min-width:768px) calc(33.33vw - 40px), (min-width:640px) calc(50vw - 50px), calc(50vw - 30px)";

export default function GallerySection() {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <section
      id="gallery"
      aria-label="Prenup photo gallery"
      className="bg-[#171714] px-6 py-24 text-[#f5f0e6] sm:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="A glimpse of us"
            title="The lasting memories."
          />
          <p className={`${styles.eyebrow} pb-1 text-[#d1b788]`}>
            Our prenup collection
          </p>
        </div>
        <div
          data-reveal-group
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3"
        >
          {galleryPhotos.map((photo, index) => (
            <button
              data-reveal="image"
              key={photo.id}
              type="button"
              aria-label={`Open photo ${index + 1}: ${photo.alt}`}
              onClick={() => {
                setSelected(index);
                setOpen(true);
                dialog.current?.showModal();
              }}
              className={`group relative overflow-hidden bg-[#282721] ${index === 0 ? "row-span-2 aspect-auto" : "aspect-[4/3]"}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  index === 0
                    ? portraitFrameSizes
                    : photo.width > photo.height
                      ? landscapeCoverSizes
                      : ordinaryFrameSizes
                }
                className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
        <GalleryLightbox
          dialog={dialog}
          photos={galleryPhotos}
          selected={selected}
          open={open}
          onClose={() => setOpen(false)}
          onNavigate={(direction) =>
            setSelected(
              (current) =>
                (current + direction + galleryPhotos.length) %
                galleryPhotos.length,
            )
          }
        />
      </div>
    </section>
  );
}
