"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { AttireInfo } from "../types";
import yellowFlower from "../assets/step-design-assets/yellow-rose.png";
import pinkSparkle from "../assets/step-design-assets/pink-sparkle.png";

interface DressCodeProps {
  attire: AttireInfo;
}

function highlightYellow(text: string) {
  const parts = text.split(/(yellow)/i);
  return parts.map((part, index) =>
    part.toLowerCase() === "yellow" ? (
      <span key={index} className="font-bold text-[#d4af37]">
        {part}
      </span>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  );
}

export default function DressCode({ attire }: DressCodeProps) {
  return (
    <section
      id="dress-code"
      className="relative py-20 bg-[#fff6d2] overflow-hidden"
    >
      {/* Roses — top left */}
      <div className="absolute top-0 left-0 w-24 md:w-48 z-10">
        <Image
          src={yellowFlower}
          alt="Yellow flower decoration"
          className="object-contain"
        />
      </div>

      {/* Roses — top right (mirrored) */}
      <div className="absolute top-0 right-0 w-24 md:w-48 z-10 scale-x-[-1]">
        <Image
          src={yellowFlower}
          alt="Yellow flower decoration"
          className="object-contain"
        />
      </div>

      {/* Sparkles — bottom left */}
      <div className="absolute bottom-4 left-6 md:bottom-8 md:left-12 w-10 md:w-14 z-10">
        <Image
          src={pinkSparkle}
          alt="Sparkle decoration"
          className="object-contain"
        />
      </div>

      {/* Sparkles — bottom right */}
      <div className="absolute bottom-4 right-6 md:bottom-8 md:right-12 w-10 md:w-14 z-10">
        <Image
          src={pinkSparkle}
          alt="Sparkle decoration"
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm md:text-base font-libreBaskerville text-[#ac243d] mb-4 tracking-wide uppercase">
            Attire &amp; Colors
          </p>
          <p className="text-5xl md:text-8xl font-meaCulpa text-[#ac243d]">
            Dress Code
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 md:w-28 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-sm">✦</span>
            <div className="h-px w-20 md:w-28 bg-[#c9a227]" />
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Attire column */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-sm md:text-base font-libreBaskerville font-semibold text-[#ac243d] uppercase tracking-wide mb-5">
                Attire
              </h4>
              <p className="text-sm md:text-base font-libreBaskerville text-[#ac243d] leading-relaxed max-w-xs mx-auto">
                {highlightYellow(attire.dresscode)}
              </p>
            </motion.div>

            {/* Colors column */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-sm md:text-base font-libreBaskerville font-semibold text-[#ac243d] uppercase tracking-wide mb-5">
                Colors
              </h4>
              <div className="flex justify-center items-center">
                {attire.colors.map((color, index) => (
                  <motion.div
                    key={index}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full"
                    style={{
                      backgroundColor: color,
                      marginLeft: index > 0 ? "-2rem" : 0,
                      zIndex: index + 1,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
