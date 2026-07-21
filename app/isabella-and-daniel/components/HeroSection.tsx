"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  bride: string;
  groom: string;
  dateDisplay: string;
  location: string;
}

export default function HeroSection({ bride, groom, dateDisplay, location }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.4 });
  const mediaScale = useTransform(progress, [0, 1], [1.02, 1.16]);
  const mediaY = useTransform(progress, [0, 1], ["0%", "5%"]);
  const contentY = useTransform(progress, [0, 0.8], ["0%", "-22%"]);
  const contentOpacity = useTransform(progress, [0, 0.65, 0.92], [1, 1, 0]);
  const scrollOpacity = useTransform(progress, [0, 0.25], [1, 0]);

  return (
    <section id="top" ref={heroRef} className="relative h-[165vh] bg-[#2c0711] text-[#fbf4e9]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="hero-scroll-media absolute inset-0 will-change-transform" style={reduceMotion ? undefined : { scale: mediaScale, y: mediaY }}>
          <Image
            src="/images/hero-scroll-romantic-couple.jpg"
            alt={`${bride} and ${groom} together`}
            fill
            loading="eager"
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[#4b0c1c]/45 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,2,7,.65)_0%,rgba(56,6,19,.08)_38%,rgba(25,2,8,.76)_100%)]" />
        <div className="hero-grain absolute inset-0 opacity-25" />

        <motion.div style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }} className="hero-scroll-content absolute inset-0 flex items-center justify-center px-5 pt-10 text-center">
          <div className="flex flex-col items-center">
            <p className="hero-text-reveal mb-7 text-[0.62rem] font-medium uppercase tracking-[0.42em] text-[#e1cc9e] sm:text-xs">
              Together with their families
            </p>
            <div className="hero-text-reveal mb-4 h-12 w-px bg-gradient-to-b from-transparent via-[#d8bd83] to-transparent [animation-delay:160ms] sm:h-16" />
            <h1 className="hero-text-reveal font-instrumentSerif text-[clamp(4.25rem,12vw,10.5rem)] leading-[0.72] tracking-[-0.055em] drop-shadow-2xl [animation-delay:280ms]">
              <span className="block">{bride}</span>
              <span className="relative my-1 block font-meaCulpa text-[0.48em] font-normal leading-none text-[#e0c58d] sm:my-2">and</span>
              <span className="block">{groom}</span>
            </h1>
            <div className="hero-text-reveal mt-9 flex max-w-[90vw] flex-col items-center gap-2 text-[0.58rem] uppercase tracking-[0.24em] text-[#f8eee1]/85 [animation-delay:440ms] sm:mt-10 sm:flex-row sm:gap-6 sm:text-[0.7rem] sm:tracking-[0.28em]">
              <span>{dateDisplay}</span><span className="hidden h-1 w-1 rotate-45 bg-[#d8bd83] sm:block" /><span className="text-center">{location}</span>
            </div>
          </div>
        </motion.div>

        <motion.a href="#invitation" style={{ opacity: scrollOpacity }} className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.56rem] uppercase tracking-[0.3em] text-white/65 sm:bottom-9">
          Discover our story
          <motion.span animate={reduceMotion ? undefined : { y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={16} strokeWidth={1.25} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
