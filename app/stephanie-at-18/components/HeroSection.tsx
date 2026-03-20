"use client";

import React from "react";
import { motion } from "motion/react";
import { DebutData } from "../types";
import Image from "next/image";
import HeroPhoto from "../assets/HeroPhoto.png";
import HeroBackground from "../assets/bg/hero-background.jpg";

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
    <section className="relative px-10 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={HeroBackground}
          alt="Debut hero background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

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
              className="font-imperial text-4xl text-[5rem] lg:text-[9rem] text-[#b12a56] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {data.celebrant}&apos;s
            </motion.h1>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#b12a56] mb-6 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              TURNING EIGHTEEN!
            </motion.h2>

            <motion.div
              className="space-y-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="font-libreBaskerville text-xl md:text-2xl text-[#b12a56] font-light">
                {formattedDate.toUpperCase()}
              </p>
              <p className="font-libreBaskerville text-lg md:text-xl text-[#b12a56]">
                TO START {data.eventTime}
              </p>
              <p className="font-libreBaskerville text-base md:text-lg text-[#b12a56] mt-4">
                at {data.venue.name}
              </p>
                <p className="font-libreBaskerville text-sm md:text-base text-[#b12a56]">
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
            <Image
              src={HeroPhoto}
              alt={`${data.celebrant} hero photo collage`}
              className="w-full max-w-md md:max-w-lg h-auto object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
