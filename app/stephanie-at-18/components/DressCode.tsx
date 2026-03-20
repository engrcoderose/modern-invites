"use client";

import React from "react";
import { motion } from "motion/react";
import { AttireInfo } from "../types";

interface DressCodeProps {
  attire: AttireInfo;
}

export default function DressCode({ attire }: DressCodeProps) {
  return (
    <section id="dress-code" className="relative py-20 bg-gradient-to-b from-yellow-50 to-yellow-100 overflow-hidden">
      {/* Floral decorations */}
      <div className="absolute top-10 left-10 text-yellow-300 opacity-30 text-6xl">🌹</div>
      <div className="absolute top-10 right-10 text-yellow-300 opacity-30 text-6xl">🌹</div>
      <div className="absolute bottom-10 left-10 text-pink-300 opacity-30 text-4xl">✨</div>
      <div className="absolute bottom-10 right-10 text-pink-300 opacity-30 text-4xl">✨</div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">
            ATTIRE & COLORS
          </h2>
          <h3 className="text-2xl md:text-3xl font-serif text-gray-700">
            Dress Code
          </h3>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {attire.description}
            </p>

            <div className="flex justify-center gap-6 mb-8">
              {attire.colors.map((color, index) => (
                <motion.div
                  key={index}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                  style={{ backgroundColor: color }}
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
    </section>
  );
}
