"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import cinematicPortrait from "../../assets/romantically-running.webp";

type CinematicBreakProps = {
  data: Pick<WeddingData, "couple" | "event">;
};

export function CinematicBreak({ data }: CinematicBreakProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.45,
  });

  const clipPath = useTransform(
    progress,
    [0, 0.28, 0.72, 1],
    [
      "inset(12% 7% round 24px)",
      "inset(0% 0% round 0px)",
      "inset(0% 0% round 0px)",
      "inset(9% 6% round 20px)",
    ],
  );
  const imageScale = useTransform(
    progress,
    [0, 0.35, 0.72, 1],
    [1.16, 1.04, 1, 1.09],
  );
  const imageY = useTransform(progress, [0, 1], ["-5%", "5%"]);
  const shade = useTransform(
    progress,
    [0, 0.34, 0.7, 1],
    [0.62, 0.35, 0.4, 0.7],
  );
  const copyOpacity = useTransform(
    progress,
    [0.2, 0.4, 0.72, 0.9],
    [0, 1, 1, 0],
  );
  const copyY = useTransform(
    progress,
    [0.2, 0.46, 0.76, 0.94],
    [64, 0, -12, -72],
  );
  const lineScale = useTransform(progress, [0.28, 0.52], [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="A favorite moment"
      className="relative h-[185vh] bg-wedding-sage-deep"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden p-3 sm:p-5 lg:p-8">
        <motion.div
          className="relative h-full overflow-hidden bg-wedding-sage-deep will-change-[clip-path]"
          style={reduceMotion ? undefined : { clipPath }}
        >
          <motion.div
            className="absolute -inset-y-[7%] inset-x-0 will-change-transform"
            style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}
          >
            <Image
              src={cinematicPortrait}
              alt={`${data.couple.groom.firstName} and ${data.couple.bride.firstName} sharing a joyful moment`}
              fill
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-wedding-sage-deep"
            style={reduceMotion ? { opacity: 0.48 } : { opacity: shade }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--wedding-color-ink)/.2),transparent_42%,rgb(var(--wedding-color-ink)/.5))]" />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-wedding-paper will-change-transform"
            style={
              reduceMotion
                ? undefined
                : { opacity: copyOpacity, y: copyY }
            }
          >
            <p className="font-sans text-[0.58rem] uppercase tracking-[0.38em] text-wedding-paper/75">
              A promise renewed
            </p>
            <h2 className="mt-7 max-w-5xl font-wedding-display text-[clamp(3.8rem,9vw,8.5rem)] leading-[0.82] tracking-[-0.055em]">
              Two lives
              <br />
              <span className="mt-3 inline-block font-wedding-display text-[0.42em] font-normal italic leading-none tracking-[-0.025em] text-[#f4d99c] [text-shadow:0_3px_14px_rgb(20_31_20/.95)]">
                intertwined as one
              </span>
            </h2>
            <motion.span
              className="mt-9 h-px w-24 origin-center bg-wedding-gold/80"
              style={reduceMotion ? undefined : { scaleX: lineScale }}
            />
          </motion.div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-sans text-[0.5rem] uppercase tracking-[0.25em] text-wedding-paper/60 sm:bottom-8 sm:left-8 sm:right-8">
            <span>
              {data.couple.groom.firstName} &amp; {data.couple.bride.firstName}
            </span>
            <span>Est. 2024 · {data.event.dateISO.slice(0, 4)}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
