"use client";

import { useRef } from "react";
import Image from "next/image";
import PrenupMoment from "../assets/images/prenup/pexels-king-caplis-471600979-36266137.jpg";
import PinkFlower from "../assets/images/designs/pink-flower.png";
import YellowFlower from "../assets/images/designs/yellow-flower.png";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export default function CinematicBreak() {
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
    [0, 0.3, 0.72, 1],
    [
      "inset(13% 8% round 22px)",
      "inset(0% 0% round 0px)",
      "inset(0% 0% round 0px)",
      "inset(9% 6% round 18px)",
    ],
  );
  const imageScale = useTransform(
    progress,
    [0, 0.35, 0.72, 1],
    [1.16, 1.04, 1, 1.08],
  );
  const imageY = useTransform(progress, [0, 1], ["-5%", "5%"]);
  const shade = useTransform(
    progress,
    [0, 0.35, 0.65, 1],
    [0.55, 0.42, 0.46, 0.65],
  );
  const copyOpacity = useTransform(
    progress,
    [0.22, 0.42, 0.7, 0.9],
    [0, 1, 1, 0],
  );
  const copyY = useTransform(
    progress,
    [0.22, 0.48, 0.78, 0.95],
    [60, 0, -12, -70],
  );
  const lineScale = useTransform(progress, [0.28, 0.52], [0, 1]);

  return (
    <section
      id="cinematic"
      ref={sectionRef}
      aria-label="A favorite moment"
      className="relative h-[190vh] bg-[#f4d1b6]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden p-3 sm:p-5 lg:p-8">
        <motion.div
          style={reduceMotion ? undefined : { clipPath }}
          className="relative h-full overflow-hidden bg-[#dfe7d8] will-change-[clip-path]"
        >
          <motion.div
            style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}
            className="absolute -inset-y-[7%] inset-x-0 will-change-transform"
          >
            <Image
              src={PrenupMoment}
              alt="Anjo and Jasmin embracing in the garden, photographed from above"
              fill
              quality={85}
              sizes="100vw"
              className="object-cover object-[42%_center]"
            />
          </motion.div>
          <motion.div
            style={{ opacity: reduceMotion ? 0.46 : shade }}
            className="absolute inset-0 bg-[#583e4a]"
          />
          <div className="hero-grain absolute inset-0 opacity-20" />

          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <Image
              src={PinkFlower}
              alt=""
              sizes="(max-width: 640px) 112px, 200px"
              className="absolute -bottom-2 -left-6 h-auto w-28 -rotate-12 opacity-90 sm:-left-4 sm:w-[200px]"
            />
            <Image
              src={YellowFlower}
              alt=""
              sizes="(max-width: 640px) 88px, 160px"
              className="absolute -bottom-2 -right-3 h-auto w-[88px] rotate-12 opacity-90 sm:right-2 sm:w-40"
            />
          </div>

          <motion.div
            style={
              reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }
            }
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-[#fff4fa] [text-shadow:0_2px_16px_#263d3570] will-change-transform"
          >
            <p className="text-[0.58rem] uppercase tracking-[0.38em] text-[#ffe1ee]">
              A moment we will keep forever
            </p>
            <h2 className="mt-7 max-w-5xl font-instrumentSerif text-[clamp(3.8rem,9vw,9rem)] leading-[0.82] tracking-[-0.055em]">
              In every lifetime,
              <br />
              <span className="font-meaCulpa text-[0.6em] font-normal tracking-[0.025em] [word-spacing:0.12em] text-[#ffe1ee]">
                I would find you.
              </span>
            </h2>
            <motion.span
              style={reduceMotion ? undefined : { scaleX: lineScale }}
              className="mt-9 h-px w-24 origin-center bg-[#ffe1ee]/75"
            />
          </motion.div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[0.52rem] uppercase tracking-[0.28em] text-[#ffe1ee]/85 sm:bottom-8 sm:left-8 sm:right-8">
            <span>Anjo &amp; Jasmin</span>
            <span>Malabon · 2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
