"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

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
              src="https://plus.unsplash.com/premium_photo-1661963139522-22525f644234?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              className="text-[12vw] font-black tracking-tighter uppercase leading-none font-sans select-none drop-shadow-2xl"
            >
              Prague
            </motion.h1>
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