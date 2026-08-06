"use client";

import Image from "next/image";
import { Flower2, Maximize2, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import attireGuideImage from "../../assets/attire-guide.jpg";
import type { WeddingData } from "../../data/weddingData";
import { Container, Heading, Section } from "../ui";

type AttireProps = {
  data: Pick<WeddingData, "attire">;
};

export function Attire({ data }: AttireProps) {
  const reduceMotion = useReducedMotion();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const thumbnailButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeViewer = useCallback(() => {
    setIsViewerOpen(false);
    window.requestAnimationFrame(() => thumbnailButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isViewerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeViewer, isViewerOpen]);

  return (
    <>
      <Section id="attire" aria-labelledby="attire-heading" tone="ivory">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_5%_12%,rgb(var(--wedding-color-sage-soft)/.75),transparent_24%),radial-gradient(circle_at_96%_86%,rgb(var(--wedding-color-mist)),transparent_30%)]"
        />

        <Container size="wide" className="relative">
          <motion.figure
            className="mx-auto max-w-6xl"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <figcaption className="mx-auto mb-10 max-w-5xl sm:mb-12">
              <div className="flex items-center gap-3 text-wedding-sage">
                <span className="h-px w-10 bg-wedding-line/70" aria-hidden="true" />
                <Flower2 className="size-4 stroke-[1.15]" aria-hidden="true" />
                <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.3em]">
                  Celebration palette
                </p>
              </div>
              <Heading
                id="attire-heading"
                as="h2"
                variant="script"
                className="mt-5 text-[clamp(4rem,8vw,6.6rem)]"
              >
                {data.attire.heading}
              </Heading>
              <p className="mt-5 max-w-4xl font-wedding-body text-sm leading-8 tracking-[0.05em] text-wedding-ink/70 sm:text-base">
                {data.attire.message}
              </p>
            </figcaption>

            <div className="overflow-hidden rounded-[2rem] border border-wedding-line/40 bg-wedding-paper p-2 shadow-wedding-soft sm:p-3">
              <button
                ref={thumbnailButtonRef}
                type="button"
                onClick={() => setIsViewerOpen(true)}
                aria-haspopup="dialog"
                aria-controls="attire-guide-viewer"
                className="group relative block w-full overflow-hidden rounded-[1.45rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wedding-sage focus-visible:ring-offset-2"
              >
                <Image
                  src={attireGuideImage}
                  alt="Wedding attire guide for Nylgen and Kersee's celebration"
                  sizes="(max-width: 1280px) calc(100vw - 2rem), 1152px"
                  className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-wedding-sage-deep/90 px-4 py-2 font-sans text-[0.58rem] font-medium uppercase tracking-[0.18em] text-wedding-paper shadow-lg backdrop-blur-sm sm:bottom-5 sm:right-5">
                  <Maximize2 className="size-3.5 stroke-[1.5]" aria-hidden="true" />
                  Tap to enlarge
                </span>
              </button>
            </div>
          </motion.figure>
        </Container>
      </Section>

      {isViewerOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              id="attire-guide-viewer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="attire-guide-viewer-title"
              className="fixed inset-0 z-[100] bg-[#182019]/95 text-white backdrop-blur-md"
            >
              <div className="flex h-full flex-col">
                <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/15 px-4 py-3 sm:px-5">
                  <h3
                    id="attire-guide-viewer-title"
                    className="font-wedding-display text-lg tracking-[0.06em] sm:text-xl"
                  >
                    Wedding Attire Guide
                  </h3>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeViewer}
                    aria-label="Close attire guide"
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </button>
                </header>

                <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-3 sm:p-6">
                  <Image
                    src={attireGuideImage}
                    alt="Enlarged wedding attire guide for Nylgen and Kersee's celebration"
                    sizes="100vw"
                    draggable={false}
                    className="max-h-full h-auto w-auto max-w-full select-none rounded-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
