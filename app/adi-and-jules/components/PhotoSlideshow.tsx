"use client";

import Image from "next/image";
import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { usePageVisibility } from "../hooks/usePageVisibility";
import { usePhotoCrossfade } from "../hooks/usePhotoCrossfade";
import { afterDressCodeSlides as slides } from "../media";

// The blurred backdrop reuses the foreground's optimized version instead of
// generating and fetching another full-screen variant for the same photograph.
const slideshowImageSizes = "(max-width: 639px) 84vw, (max-width: 1023px) 65vw, (max-width: 1904px) 42vw, 800px";

export default function PhotoSlideshow() {
  const section = useRef<HTMLElement>(null);
  const nearViewport = useInView(section, { margin: "400px", once: true });
  const inView = useInView(section, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisibility();
  const playing = inView && pageVisible && !reducedMotion;
  const fade = usePhotoCrossfade(slides.length, playing, reducedMotion, 2000);
  const { active, requested } = fade;

  return (
    <section
      ref={section}
      id="photo-slideshow"
      aria-label="Adi and Jules photo memories"
      aria-roledescription="carousel"
      data-playing={playing}
      className="relative isolate flex h-[clamp(440px,47vw,900px)] items-center justify-center overflow-hidden bg-[rgb(var(--aj-sand))]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
      >
        {nearViewport &&
          slides.map(
            (slide, index) =>
              requested.includes(index) && (
                <Image
                  key={slide.alt}
                  src={slide.src}
                  alt=""
                  fill
                  loading="eager"
                  sizes={slideshowImageSizes}
                  style={{ ...fade.style(index), objectPosition: slide.position }}
                  className="aj-photo-crossfade scale-105 object-cover blur-sm"
                />
              ),
          )}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgb(var(--aj-sand))]/35 to-[rgb(var(--aj-clay))]/30" />
      </div>

      <div
        className="relative aspect-[3/2] w-[84vw] max-w-[800px] bg-[rgb(var(--aj-sage))] shadow-[0_24px_65px_#00000050] sm:aspect-video sm:w-[65vw] lg:w-[42vw]"
        aria-live="off"
      >
        {nearViewport &&
          slides.map(
            (slide, index) =>
              requested.includes(index) && (
                <div
                  key={slide.alt}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${slides.length}`}
                  aria-hidden={active !== index}
                  data-active={active === index}
                  className="aj-photo-crossfade absolute inset-0"
                  style={fade.style(index)}
                  onTransitionEnd={event => fade.finish(index, event)}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    loading="eager"
                    sizes={slideshowImageSizes}
                    onLoad={event => void fade.decode(index, event.currentTarget)}
                    style={{ objectPosition: slide.position }}
                    className="object-contain sm:object-cover"
                  />
                </div>
              ),
          )}
      </div>
    </section>
  );
}
