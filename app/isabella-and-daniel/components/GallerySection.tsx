"use client";

import Image from "next/image";
import type { GalleryImage } from "../types";
import Reveal from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

interface GallerySectionProps {
  images: GalleryImage[];
}

const layouts = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5 md:row-span-3",
  "md:col-span-4 md:row-span-2",
  "md:col-span-3 md:row-span-2",
  "md:col-span-5 md:row-span-2",
  "md:col-span-7 md:row-span-3",
  "md:col-span-5 md:row-span-3",
];

export default function GallerySection({ images }: GallerySectionProps) {
  return (
    <section id="gallery" className="overflow-hidden bg-[#24070d] px-5 py-24 text-[#f8eee3] sm:px-8 sm:py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal><SectionLabel light>Captured moments</SectionLabel></Reveal>
            <Reveal delay={0.08}><h2 className="mt-8 font-instrumentSerif text-[clamp(3.7rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">Scenes from<br />our forever.</h2></Reveal>
          </div>
          <Reveal delay={0.12}><p className="max-w-xs font-libreBaskerville text-xs leading-7 text-[#dfcfc5]/55 sm:text-right">The smallest moments have always been our favorites.</p></Reveal>
        </div>

        <div className="mt-16 grid auto-rows-[12rem] grid-cols-1 gap-3 sm:auto-rows-[15rem] md:mt-24 md:grid-cols-12">
          {images.map((image, index) => (
            <Reveal
              key={image.alt}
              y={0}
              scale={0.96}
              delay={Math.min(index * 0.05, 0.2)}
              className={`image-scroll-reveal relative min-h-[18rem] ${layouts[index] ?? "md:col-span-4 md:row-span-2"}`}
            >
              <figure className="group relative h-full min-h-[18rem] overflow-hidden bg-[#3b1018]">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 60vw" style={{ objectPosition: image.position }} className="object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.045] group-hover:saturate-[.8]" />
                <div className="absolute inset-0 bg-[#580d21]/0 mix-blend-multiply transition-colors duration-700 group-hover:bg-[#580d21]/20" />
                <figcaption className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 text-[0.56rem] uppercase tracking-[0.24em] text-white/75 transition-transform duration-500 group-hover:translate-y-0">
                  Moment {String(index + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
