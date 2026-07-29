"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import heroPortrait from "../../assets/sitting.webp";
import { invitationOpenedEvent } from "../../lib/events";

type HeroProps = {
  data: Pick<WeddingData, "couple" | "event">;
};

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(7px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero({ data }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [invitationOpened, setInvitationOpened] = useState(false);
  const reduceMotion = useReducedMotion();
  const { couple, event } = data;
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });
  const mediaScale = useTransform(progress, [0, 1], [1, 1.12]);
  const mediaY = useTransform(progress, [0, 1], ["0%", "5%"]);
  const copyY = useTransform(progress, [0, 0.82], ["0%", "-15%"]);
  const copyOpacity = useTransform(progress, [0, 0.7, 0.98], [1, 0.88, 0]);
  const scrollOpacity = useTransform(progress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const revealInvitation = () => setInvitationOpened(true);
    window.addEventListener(invitationOpenedEvent, revealInvitation);

    return () =>
      window.removeEventListener(invitationOpenedEvent, revealInvitation);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-wedding-ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_8%_8%,rgb(var(--wedding-color-sage-soft)/.62),transparent_24%),radial-gradient(circle_at_82%_92%,rgb(var(--wedding-color-mist)/.9),transparent_30%)]"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-wedding-wide items-center gap-12 px-wedding-gutter pb-12 pt-20 sm:pb-16 sm:pt-24 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:py-16 xl:gap-24">
        <motion.div
          className="order-2 mx-auto flex w-full max-w-[37rem] flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
          initial="hidden"
          animate={invitationOpened || reduceMotion ? "visible" : "hidden"}
          style={
            reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }
          }
          transition={{ staggerChildren: 0.14, delayChildren: 0.32 }}
        >
          <motion.div
            variants={reveal}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 flex items-center gap-3 text-wedding-sage lg:mb-9"
          >
            <span className="h-px w-8 bg-wedding-line" aria-hidden="true" />
            <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em]">
              Together with our families
            </p>
            <span className="h-px w-8 bg-wedding-line" aria-hidden="true" />
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={reveal}
            transition={{ duration: 1.65, ease: [0.16, 1, 0.3, 1] }}
            className="grid w-fit font-wedding-display text-[clamp(4.5rem,13vw,9.4rem)] font-normal leading-[0.72] tracking-[-0.065em] text-wedding-sage-deep"
          >
            <span className="block pb-[0.08em]">{couple.groom.firstName}</span>
            <span className="my-4 block justify-self-center font-wedding-script text-[0.42em] font-normal leading-none text-wedding-gold lg:my-5 pt-5">
              &amp;
            </span>
            <span className="block pt-[0.04em] lg:translate-x-[0.28em]">
              {couple.bride.firstName}
            </span>
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-md font-wedding-body text-[0.72rem] italic leading-7 tracking-[0.2em] text-wedding-sage sm:text-sm lg:mt-10"
          >
            {couple.tagline}
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex items-center gap-4 text-wedding-sage-deep lg:mt-10"
          >
            <span className="h-px w-10 bg-wedding-line/80" aria-hidden="true" />
            <p className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.24em] sm:text-xs">
              {event.dateDisplay}, 2PM
            </p>
            <span className="h-px w-10 bg-wedding-line/80" aria-hidden="true" />
          </motion.div>

          <motion.p
            variants={reveal}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-wedding-body text-[0.7rem] tracking-[0.08em] text-wedding-sage sm:text-xs lg:pl-14"
          >
            {event.ceremony.name}
          </motion.p>
        </motion.div>

        <motion.div
          className="relative order-1 mx-auto w-full max-w-[35rem] lg:order-2 lg:max-w-[42rem]"
          initial={false}
          animate={
            invitationOpened || reduceMotion
              ? { opacity: 1, x: 0, filter: "blur(0px)" }
              : { opacity: 0, x: 40, filter: "blur(9px)" }
          }
          transition={{
            duration: 1.65,
            delay: 0.18,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[999px_999px_1.7rem_1.7rem] border border-wedding-line/55 sm:-inset-5"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_1.25rem_1.25rem] bg-wedding-sage-soft shadow-wedding-soft">
            <motion.div
              className="absolute inset-0"
              initial={false}
              style={
                reduceMotion ? undefined : { scale: mediaScale, y: mediaY }
              }
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={heroPortrait}
                alt={`${couple.groom.firstName} offering flowers to ${couple.bride.firstName} beside the lake`}
                fill
                priority
                quality={92}
                sizes="(min-width: 1024px) 48vw, (min-width: 640px) 72vw, 90vw"
                className="object-cover object-[50%_46%]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(41,58,38,.04)_30%,rgba(35,51,32,.52)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-wedding-sage-deep/45 to-transparent" />

            <div className="absolute inset-x-8 bottom-8 hidden items-end justify-between gap-6 text-wedding-paper sm:flex">
              <p className="max-w-[12rem] font-wedding-body text-[0.65rem] uppercase leading-5 tracking-[0.24em] drop-shadow-sm">
                A promise renewed,
                <br />
                a lifetime continued
              </p>
              <span className="font-wedding-script text-4xl leading-none text-wedding-paper/95 sm:text-5xl">
                2027
              </span>
            </div>

            <div className="absolute inset-x-12 bottom-7 flex flex-col items-center text-center text-wedding-paper sm:hidden">
              <p className="font-wedding-body text-[0.55rem] uppercase leading-4 tracking-[0.2em] drop-shadow-md">
                A promise renewed,
                <br />
                a lifetime continued
              </p>
              <span className="mt-1.5 font-wedding-script text-4xl leading-none drop-shadow-md">
                2027
              </span>
            </div>
          </div>

        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-wedding-sage lg:flex"
        initial={false}
        animate={invitationOpened || reduceMotion ? { y: 0 } : { y: -8 }}
        style={reduceMotion ? undefined : { opacity: scrollOpacity }}
        transition={{ duration: 1.1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-sans text-[0.55rem] uppercase tracking-[0.28em]">
          Scroll to begin
        </span>
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-3.5 stroke-[1.25]" aria-hidden="true" />
        </motion.span>
      </motion.div>
    </section>
  );
}
