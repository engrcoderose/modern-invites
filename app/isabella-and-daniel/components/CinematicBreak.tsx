"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export default function CinematicBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.45 });

  const clipPath = useTransform(
    progress,
    [0, 0.3, 0.72, 1],
    ["inset(13% 8% round 22px)", "inset(0% 0% round 0px)", "inset(0% 0% round 0px)", "inset(9% 6% round 18px)"],
  );
  const imageScale = useTransform(progress, [0, 0.35, 0.72, 1], [1.16, 1.04, 1, 1.08]);
  const imageY = useTransform(progress, [0, 1], ["-5%", "5%"]);
  const shade = useTransform(progress, [0, 0.35, 0.65, 1], [0.48, 0.28, 0.34, 0.62]);
  const copyOpacity = useTransform(progress, [0.22, 0.42, 0.7, 0.9], [0, 1, 1, 0]);
  const copyY = useTransform(progress, [0.22, 0.48, 0.78, 0.95], [60, 0, -12, -70]);
  const lineScale = useTransform(progress, [0.28, 0.52], [0, 1]);

  return (
    <section id="cinematic" ref={sectionRef} aria-label="A favorite moment" className="relative h-[190vh] bg-[#24070d]">
      <div className="sticky top-0 h-[100svh] overflow-hidden p-3 sm:p-5 lg:p-8">
        <motion.div
          style={reduceMotion ? undefined : { clipPath }}
          className="relative h-full overflow-hidden bg-[#3b0b17] will-change-[clip-path]"
        >
          <motion.div style={reduceMotion ? undefined : { scale: imageScale, y: imageY }} className="absolute -inset-y-[7%] inset-x-0 will-change-transform">
            <Image
              src="/images/hero-scroll-cinematic.jpg"
              alt="Isabella and Daniel sharing a joyful moment"
              fill
              unoptimized
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div style={reduceMotion ? undefined : { opacity: shade }} className="absolute inset-0 bg-[#26040d]" />
          <div className="hero-grain absolute inset-0 opacity-20" />

          <motion.div
            style={reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-[#fff7ec] will-change-transform"
          >
            <p className="text-[0.58rem] uppercase tracking-[0.38em] text-[#e4c98e]">A moment we will keep forever</p>
            <h2 className="mt-7 max-w-5xl font-instrumentSerif text-[clamp(3.8rem,9vw,9rem)] leading-[0.82] tracking-[-0.055em]">
              In every lifetime,<br /><span className="font-meaCulpa text-[0.6em] font-normal text-[#e2c689]">I would find you.</span>
            </h2>
            <motion.span style={reduceMotion ? undefined : { scaleX: lineScale }} className="mt-9 h-px w-24 origin-center bg-[#e4c98e]/75" />
          </motion.div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[0.52rem] uppercase tracking-[0.28em] text-white/55 sm:bottom-8 sm:left-8 sm:right-8">
            <span>Isabella &amp; Daniel</span><span>Antipolo · 2027</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
