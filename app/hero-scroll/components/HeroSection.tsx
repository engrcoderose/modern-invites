"use client";

import React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Image from "next/image";
import RingFocus from "../assets/ring-focus.jpg";

interface HeroSectionProps {
  bride: string;
  groom: string;
  weddingDate: Date;
}

export default function HeroSection({
  bride,
  groom,
  weddingDate,
}: HeroSectionProps) {
  const formattedDate = weddingDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // 1. Track the scroll progress of our 200vh height runway wrapper
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Scale up the background image slightly as we scroll (e.g., from 1x to 1.15x)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Smoothly fade out the entire hero frame towards the very end of the scroll track
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  // Move headline up as user scrolls through the hero track
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);

  const textY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);

  const isInView = useInView(textRef, { once: true });

  const letters = bride.split("");
  const letters2 = groom.split("");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div 
      className="bg-black text-white antialiased"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Scroll runway container */}
      <div ref={scrollRef} className="relative h-[200vh]">
        {/* Sticky wrapper: stays locked to screen during scroll track */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Animated Background Image Wrapper */}
          <motion.div
            style={{ scale, opacity }}
            className="absolute inset-0 h-full w-full will-change-transform"
          >
            <Image
              className="absolute inset-0 h-full w-full object-cover"
              src={RingFocus}
              alt="Prague Night"
              fill
            />

            {/* Subtle dark ambient vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          </motion.div>

          {/* Foreground Hero Text */}
          <motion.div 
            ref={textRef}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.h1
              style={{ y: textY }}
              className="text-[10vw] leading-none font-imperial select-none drop-shadow-2xl text-center"
            >
              {letters.map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {bride[index]}
                </motion.span>
              ))}
              <br />
              and
              <br />
              {letters2.map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {groom[index]}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              style={{ y: textY }}
              className="text-lg font-light tracking-tighter uppercase leading-none font-sans select-none drop-shadow-2xl"
            >
              are getting married on {formattedDate}!
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Content section that naturally scrolls up into view */}
      {/* <section className="relative z-10 min-h-screen bg-[#0d1312] px-8 py-24 flex flex-col items-center justify-center">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Fin</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Your next content section smoothly glides over the zoomed-out hero
            background layer.
          </p>
        </div>
      </section> */}
    </motion.div>
  );
}
