"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import RingFocus from "./assets/ring-focus.jpg";

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Track the scroll progress of our 200vh height runway wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scale up the background image slightly as we scroll (e.g., from 1x to 1.15x)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Smoothly fade out the entire hero frame towards the very end of the scroll track
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  
  // Move headline up as user scrolls through the hero track
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);

  const textY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);

  return (
    <div className="bg-black text-white antialiased">
      {/* Scroll runway container */}
      <div ref={containerRef} className="relative h-[200vh]">
        
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
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.h1 
              style={{ y: textY }}
              className="text-[12vw] font-black leading-none font-imperial select-none drop-shadow-2xl"
            >
              Eric and Li
            </motion.h1>
            <motion.p
              style={{ y: textY }}
              className="text-lg font-light tracking-tighter uppercase leading-none font-sans select-none drop-shadow-2xl"
            >
              are getting married on October 15, 2030!
            </motion.p>
          </div>
          
        </div>
      </div>

      {/* Content section that naturally scrolls up into view */}
      <section className="relative z-10 min-h-screen bg-[#0d1312] px-8 py-24 flex flex-col items-center justify-center">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Fin</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Your next content section smoothly glides over the zoomed-out hero background layer.
          </p>
        </div>
      </section>
    </div>
  );
}