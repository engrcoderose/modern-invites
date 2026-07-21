"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Reveal from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

interface InvitationSectionProps {
  message: string;
  bride: string;
  groom: string;
  image: StaticImageData;
}

export default function InvitationSection({
  message,
  bride,
  groom,
  image,
}: InvitationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    mass: 0.4,
  });
  const imageY = useTransform(progress, [0, 1], ["-7%", "7%"]);
  const sealY = useTransform(progress, [0, 1], [42, -42]);

  return (
    <section
      id="invitation"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f5efe6] px-5 py-24 text-[#32151b] sm:px-8 sm:py-32 lg:px-12 lg:py-44"
    >
      <div className="ambient-mark pointer-events-none absolute -right-24 top-20 select-none font-instrumentSerif text-[22rem] leading-none text-[#742438]/[0.035] sm:text-[32rem]">
        &amp;
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-[32rem] lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#dbcfc2]">
            <motion.div
              className="absolute -inset-y-[10%] inset-x-0 will-change-transform"
              style={reduceMotion ? undefined : { y: imageY }}
            >
              <Image
                src={image}
                alt={`${bride} and ${groom} together`}
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#3b0814]/35 via-transparent to-transparent" />
          </div>
          <motion.div
            style={reduceMotion ? undefined : { y: sealY }}
            className="absolute -bottom-10 -right-2 grid h-24 w-24 place-items-center rounded-full border border-[#d4b483]/40 bg-[#6d172d] text-[#f6e8d7] shadow-[0_18px_50px_rgba(58,8,21,.25)] sm:-right-10 sm:h-28 sm:w-28"
          >
            <span className="font-meaCulpa text-4xl">I&amp;D</span>
            <span className="absolute inset-2 rounded-full border border-[#d4b483]/35" />
          </motion.div>
        </Reveal>

        <div className="lg:py-12">
          <Reveal>
            <SectionLabel>The invitation</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-8 max-w-3xl font-instrumentSerif text-[clamp(3.4rem,7vw,7.2rem)] leading-[0.9] tracking-[-0.045em]">
              To love, laughter,{" "}
              <span className="text-[#7a2138]">and forever.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl font-libreBaskerville text-sm leading-8 text-[#654c50] sm:text-base sm:leading-9">
              {message}
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex items-center gap-4">
            <span className="h-px w-14 bg-[#7a2138]/40" />
            <span className="font-meaCulpa text-3xl text-[#7a2138]">
              With all our love
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
