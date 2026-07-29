"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowLeft, ArrowRight, Images, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type {
  GalleryAssetKey,
  WeddingData,
} from "../../data/weddingData";
import romanticallyRunning from "../../assets/romantically-running.webp";
import sitting from "../../assets/sitting.webp";
import walking from "../../assets/walking.webp";
import weddingRings from "../../assets/wedding rings.jpg";
import { Container, Heading, Section } from "../ui";

type GalleryProps = {
  data: Pick<WeddingData, "couple" | "gallery">;
};

const assets: Record<GalleryAssetKey, StaticImageData> = {
  sitting,
  walking,
  running: romanticallyRunning,
  rings: weddingRings,
};

const tileClasses = [
  "col-span-2 aspect-[4/5] sm:aspect-[5/4] lg:col-span-7 lg:row-span-2 lg:aspect-auto",
  "col-span-2 aspect-[4/3] sm:col-span-1 lg:col-span-5 lg:aspect-auto",
  "col-span-1 aspect-[4/5] lg:col-span-3 lg:aspect-auto",
  "col-span-1 aspect-[4/5] lg:col-span-2 lg:aspect-auto",
];

export function Gallery({ data }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? 0 : (current + 1) % data.gallery.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null
            ? 0
            : (current - 1 + data.gallery.length) % data.gallery.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [data.gallery.length, selectedIndex]);

  const selected =
    selectedIndex === null ? null : data.gallery[selectedIndex];

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null
        ? 0
        : (current - 1 + data.gallery.length) % data.gallery.length,
    );
  };

  const showNext = () => {
    setSelectedIndex((current) =>
      current === null ? 0 : (current + 1) % data.gallery.length,
    );
  };

  return (
    <>
      <Section
        id="gallery"
        aria-labelledby="gallery-heading"
        tone="ivory"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_12%_15%,rgb(var(--wedding-color-sage-soft)/.6),transparent_23%),radial-gradient(circle_at_92%_88%,rgb(var(--wedding-color-mist)/.9),transparent_28%)]"
        />

        <Container size="wide" className="relative">
          <motion.header
            className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center sm:mb-16"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 text-wedding-sage">
              <span className="h-px w-8 bg-wedding-line" aria-hidden="true" />
              <Images className="size-4 stroke-[1.2]" aria-hidden="true" />
              <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em]">
                Our favorite moments
              </p>
              <span className="h-px w-8 bg-wedding-line" aria-hidden="true" />
            </div>
            <Heading
              id="gallery-heading"
              as="h2"
              variant="script"
              align="center"
              className="mt-5 text-[clamp(4rem,9vw,7rem)]"
            >
              A glimpse of us
            </Heading>
            <p className="mt-4 max-w-xl font-wedding-body text-sm leading-7 tracking-[0.06em] text-wedding-ink/70 sm:text-base">
              Little moments from the beautiful life we continue to build
              together.
            </p>
          </motion.header>

          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-5 lg:h-[38rem] lg:grid-cols-12 lg:grid-rows-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {data.gallery.map((image, index) => (
              <motion.button
                key={image.id}
                type="button"
                aria-label={`Open photo: ${image.alt}`}
                className={`group relative isolate overflow-hidden rounded-wedding-control bg-wedding-mist text-left shadow-wedding-card focus-visible:outline-none ${tileClasses[index] ?? tileClasses[3]}`}
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.05,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={assets[image.asset]}
                  alt={image.alt}
                  fill
                  quality={88}
                  sizes={
                    index === 0
                      ? "(min-width: 1024px) 56vw, 92vw"
                      : "(min-width: 1024px) 36vw, 48vw"
                  }
                  className="object-cover transition duration-700 ease-wedding-out group-hover:scale-[1.035]"
                  style={{ objectPosition: image.position }}
                />
              </motion.button>
            ))}
          </motion.div>
        </Container>
      </Section>

      <AnimatePresence>
        {selected && selectedIndex !== null ? (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-wedding-ink/95 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer: ${selected.alt}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <button
              type="button"
              aria-label="Close photo viewer"
              className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full border border-wedding-paper/25 bg-wedding-ink/45 text-wedding-paper transition hover:bg-wedding-paper hover:text-wedding-ink sm:right-7 sm:top-7"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="size-5 stroke-[1.25]" />
            </button>

            <button
              type="button"
              aria-label="Previous photo"
              className="absolute bottom-5 left-1/2 z-20 grid size-11 -translate-x-[3.25rem] place-items-center rounded-full border border-wedding-paper/25 bg-wedding-ink/55 text-wedding-paper transition hover:bg-wedding-paper hover:text-wedding-ink sm:bottom-auto sm:left-7 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
            >
              <ArrowLeft className="size-5 stroke-[1.25]" />
            </button>

            <motion.figure
              key={selected.id}
              className="relative h-[76svh] w-full max-w-5xl overflow-hidden rounded-wedding-control"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={assets[selected.asset]}
                alt={selected.alt}
                fill
                priority
                quality={94}
                sizes="92vw"
                className="object-contain"
                style={{ objectPosition: selected.position }}
              />
            </motion.figure>

            <button
              type="button"
              aria-label="Next photo"
              className="absolute bottom-5 right-1/2 z-20 grid size-11 translate-x-[3.25rem] place-items-center rounded-full border border-wedding-paper/25 bg-wedding-ink/55 text-wedding-paper transition hover:bg-wedding-paper hover:text-wedding-ink sm:bottom-auto sm:right-7 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
            >
              <ArrowRight className="size-5 stroke-[1.25]" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
