"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import heroBackground from "../assets/hero-background.png";

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroBackground}
          alt="Wedding background"
          fill
          className="object-cover"
          priority
          quality={90}
        />

      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm md:text-base text-white mb-4 tracking-[0.3em] uppercase">
            We&apos;re Getting Married
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.h1
              className="text-5xl md:text-7xl font-serif text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {bride}
            </motion.h1>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Heart className="w-8 h-8 md:w-12 md:h-12 text-rose-400 fill-rose-400" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-serif text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {groom}
            </motion.h1>
          </div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-white font-light">
              {formattedDate}
            </p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="inline-block border-2 border-rose-300 rounded-full px-8 py-3">
              <p className="text-white text-sm tracking-wide">
                Join us as we celebrate our love
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

