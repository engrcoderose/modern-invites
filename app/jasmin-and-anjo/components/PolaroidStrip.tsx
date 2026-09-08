"use client";

import { useRef, useState, type CSSProperties } from "react";
import { Walking, Together, Garden, Sitting, Embrace, Portrait } from "../prenup-media";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { usePageVisibility } from "../hooks/usePageVisibility";
import SectionPetals from "./SectionPetals";

const photos = [
  { src: Walking, caption: "Hand in hand", position: "50% 45%", tilt: -4 },
  { src: Together, caption: "My favorite place", position: "50% 48%", tilt: 3 },
  {
    src: Garden,
    caption: "A little everyday magic",
    position: "50% 48%",
    tilt: -2,
  },
  { src: Sitting, caption: "Just us, always", position: "50% 45%", tilt: 4 },
  { src: Embrace, caption: "Home is you", position: "82% 48%", tilt: -3 },
  { src: Portrait, caption: "Our next chapter", position: "50% 45%", tilt: 2 },
];

export default function PolaroidStrip() {
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { margin: "100px" });
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const visible = usePageVisibility();

  return (
    <section
      ref={section}
      id="photostrip"
      className="polaroid-strip relative overflow-hidden bg-[#f8edf0] py-12 text-[#624451] sm:py-16"
      aria-labelledby="polaroid-title"
    >
      <SectionPetals />
      <header className="relative mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 sm:px-10">
        <div>
          <p className="text-[9px] uppercase tracking-[.24em] text-[#946879]">
            Anjo &amp; Jasmin
          </p>
          <h2
            id="polaroid-title"
            className="mt-2 font-instrumentSerif text-3xl sm:text-4xl"
          >
            Little moments,{" "}
            <span className="font-meaCulpa text-[#946879]">forever ours.</span>
          </h2>
        </div>
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Resume photo strip" : "Pause photo strip"}
            aria-pressed={paused}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#cba4b6] transition-colors hover:bg-[#f1dce4]"
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        )}
      </header>
      <div
        className="polaroid-window relative overflow-hidden pt-[38px] pb-7 max-[600px]:pt-7"
        data-paused={paused || !visible || !inView}
      >
        <div className="polaroid-track flex w-max motion-reduce:w-full">
          {[0, 1].map((copy) => (
            <div
              className="flex min-w-[100vw] shrink-0 items-center justify-around gap-[30px] px-[15px] py-3.5 max-[600px]:gap-[22px] max-[600px]:px-[11px] motion-reduce:min-w-0 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:gap-[30px] motion-reduce:px-6 motion-reduce:py-4 motion-reduce:aria-hidden:hidden"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {photos.map((photo) => (
                <figure
                  key={photo.caption}
                  className="polaroid-print m-0 w-[264px] flex-[0_0_264px] rotate-[var(--print-tilt)] border border-[#ede7df] bg-[#fffdf8] px-[13px] pt-[13px] pb-[27px] shadow-[0_7px_15px_#62445115,0_2px_4px_#62445110] max-[600px]:w-[196px] max-[600px]:basis-[196px] max-[600px]:px-2.5 max-[600px]:pt-2.5 max-[600px]:pb-6"
                  style={
                    { "--print-tilt": `${photo.tilt}deg` } as CSSProperties
                  }
                >
                  <div className="relative aspect-square overflow-hidden bg-[#e6e7de]">
                    <Image
                      src={photo.src}
                      alt={
                        copy === 1 ? "" : `Anjo and Jasmin · ${photo.caption}`
                      }
                      fill
                      sizes="(max-width: 600px) 174px, 238px"
                      className="object-cover"
                      style={{ objectPosition: photo.position }}
                    />
                  </div>
                  <figcaption className="pt-4 text-center font-meaCulpa text-[27px] max-[600px]:text-2xl leading-none text-[#756770]">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
