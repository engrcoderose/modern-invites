"use client";

import React from "react";
import { motion } from "motion/react";
import { DebutData } from "../types";

interface HeroSectionProps {
  data: DebutData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const formattedDate = data.eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayOfWeek = data.eventDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-yellow-50 to-yellow-100">
      {/* Decorative floral elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Floral decorations */}
      <div className="absolute top-10 left-10 text-yellow-300 opacity-30 text-8xl">🌸</div>
      <div className="absolute bottom-20 right-20 text-pink-300 opacity-30 text-6xl">✨</div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {data.celebrant}&apos;s
            </motion.h1>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-yellow-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              TURNING EIGHTEEN
            </motion.h2>

            <motion.div
              className="space-y-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-xl md:text-2xl text-gray-700 font-light">
                {formattedDate.toUpperCase()}
              </p>
              <p className="text-lg md:text-xl text-gray-600">
                TO START {data.eventTime}
              </p>
              <p className="text-base md:text-lg text-gray-600 mt-4">
                at {data.venue.name}
              </p>
              <p className="text-sm md:text-base text-gray-500">
                {data.venue.address}
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Photos */}
          <motion.div
            className="flex flex-col gap-4 items-center md:items-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Top photo */}
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-96 bg-white p-2 shadow-lg transform rotate-2">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs sm:text-sm">Photo Placeholder 1</span>
              </div>
            </div>
            {/* Bottom photo */}
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-96 bg-white p-2 shadow-lg transform -rotate-2">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs sm:text-sm">Photo Placeholder 2</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
