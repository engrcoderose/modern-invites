"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import clientLogo from "../../assets/initials.webp";
import runningPortrait from "../../assets/romantically-running.webp";
import sittingPortrait from "../../assets/sitting.webp";
import walkingPortrait from "../../assets/walking.webp";
import { invitationOpenedEvent } from "../../lib/events";

type OpeningScreenProps = {
  data: Pick<WeddingData, "couple" | "event">;
};

const botanicalEase = [0.16, 1, 0.3, 1] as const;

const coupleSlides = [
  { image: walkingPortrait, position: "50% 50%" },
  { image: sittingPortrait, position: "50% 46%" },
  { image: runningPortrait, position: "50% 56%" },
] as const;

export function OpeningScreen({ data }: OpeningScreenProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % coupleSlides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isOpen, reduceMotion]);

  const openInvitation = () => {
    window.dispatchEvent(new Event(invitationOpenedEvent));
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${data.couple.groom.firstName} and ${data.couple.bride.firstName}'s wedding invitation`}
          className="fixed inset-0 z-[100] h-dvh overflow-hidden bg-wedding-sage-deep text-wedding-paper"
          initial={{ opacity: 1, scale: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.035, filter: "blur(8px)" }
          }
          transition={{ duration: 0.72, ease: botanicalEase }}
        >
          <div className="absolute inset-0" aria-hidden="true">
            {coupleSlides.map((slide, index) => (
              <motion.div
                key={slide.image.src}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: activeSlide === index ? 1 : 0,
                  scale:
                    reduceMotion || activeSlide !== index ? 1.08 : 1.015,
                }}
                transition={{
                  opacity: { duration: reduceMotion ? 0 : 1.45, ease: "easeInOut" },
                  scale: { duration: 6.5, ease: "easeOut" },
                }}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === 0}
                  loading={index === 0 ? undefined : "eager"}
                  quality={90}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: slide.position }}
                />
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-0 bg-wedding-sage-deep/55 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--wedding-color-ink)/.72),rgb(var(--wedding-color-sage-deep)/.2)_42%,rgb(var(--wedding-color-ink)/.8))]" />
          <div className="absolute inset-3 border border-wedding-paper/20 sm:inset-5" />

          <div
            aria-hidden="true"
            className="absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex"
          >
            {coupleSlides.map((slide, index) => (
              <span
                key={slide.image.src}
                className="relative grid size-5 place-items-center"
              >
                <span
                  className={`rounded-full bg-wedding-paper transition-all duration-700 ${
                    activeSlide === index
                      ? "size-1.5 opacity-100"
                      : "size-1 opacity-40"
                  }`}
                />
                {activeSlide === index ? (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-wedding-paper/45"
                    initial={{ scale: 0.65, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: botanicalEase }}
                  />
                ) : null}
              </span>
            ))}
          </div>

          <div className="relative flex h-full flex-col items-center justify-between px-7 py-10 text-center sm:py-12">
            <motion.div
              className="flex items-center gap-4"
              initial={reduceMotion ? false : { opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.2, ease: botanicalEase }}
            >
              <span className="h-px w-8 bg-wedding-paper/45" />
              <div className="relative size-12 overflow-hidden rounded-full border border-wedding-paper/40 bg-wedding-paper/90">
                <Image
                  src={clientLogo}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <span className="h-px w-8 bg-wedding-paper/45" />
            </motion.div>

            <div>
              <motion.p
                className="mb-7 font-sans text-[0.58rem] font-medium uppercase tracking-[0.38em] text-wedding-paper/75"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.32, ease: botanicalEase }}
              >
                The wedding invitation of
              </motion.p>

              <h1
                aria-label={`${data.couple.groom.firstName} and ${data.couple.bride.firstName}`}
                className="font-wedding-display text-[clamp(4.4rem,13vw,10rem)] leading-[0.76] tracking-[-0.06em] drop-shadow-2xl"
              >
                <span
                  aria-hidden="true"
                  className="block overflow-hidden px-[0.06em] pb-[0.2em]"
                >
                  <motion.span
                    className="block"
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: "110%", filter: "blur(9px)" }
                    }
                    animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                    transition={{
                      duration: 2.15,
                      delay: 0.42,
                      ease: botanicalEase,
                    }}
                  >
                    {data.couple.groom.firstName}
                  </motion.span>
                </span>

                <motion.span
                  aria-hidden="true"
                  className="my-1 block font-wedding-script text-[0.45em] font-normal leading-none text-wedding-gold"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, scale: 0.6, rotate: -9, filter: "blur(6px)" }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.62,
                    ease: botanicalEase,
                  }}
                >
                  &amp;
                </motion.span>

                <span
                  aria-hidden="true"
                  className="block overflow-hidden px-[0.06em] pb-[0.2em]"
                >
                  <motion.span
                    className="block"
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: "110%", filter: "blur(9px)" }
                    }
                    animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                    transition={{
                      duration: 2.15,
                      delay: 0.58,
                      ease: botanicalEase,
                    }}
                  >
                    {data.couple.bride.firstName}
                  </motion.span>
                </span>
              </h1>

              <motion.p
                className="mt-8 font-sans text-[0.58rem] uppercase tracking-[0.3em] text-wedding-paper/75 sm:text-[0.65rem]"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.9, ease: botanicalEase }}
              >
                {data.event.dateDisplay}
              </motion.p>
            </div>

            <motion.button
              type="button"
              onClick={openInvitation}
              className="group flex min-w-[16rem] items-center justify-between border border-wedding-paper/45 bg-wedding-ink/25 px-6 py-4 font-sans text-[0.6rem] font-medium uppercase tracking-[0.27em] text-wedding-paper backdrop-blur-md transition duration-300 hover:scale-[1.025] hover:bg-wedding-paper hover:text-wedding-sage-deep active:scale-[0.98]"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 1.05, ease: botanicalEase }}
            >
              Open invitation
              <ArrowRight className="size-4 stroke-[1.25] transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
