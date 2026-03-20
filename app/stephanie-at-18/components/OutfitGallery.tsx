"use client";

import React from "react";
import { motion } from "motion/react";

interface OutfitGalleryProps {
  theme: "red" | "yellow";
  photos: number; // Number of photos to display
}

export default function OutfitGallery({ theme, photos = 3 }: OutfitGalleryProps) {
  const bgColor = theme === "red" ? "bg-gradient-to-b from-red-50 to-red-100" : "bg-gradient-to-b from-yellow-50 to-yellow-100";
  const borderColor = theme === "red" ? "border-yellow-600" : "border-yellow-500";
  const titleColor = theme === "red" ? "text-red-800" : "text-yellow-800";

  return (
    <section className={`relative py-20 ${bgColor} overflow-hidden`}>
      {/* Floral decorations */}
      <div className="absolute top-0 left-0 text-yellow-300 opacity-20 text-6xl">🌺</div>
      <div className="absolute bottom-0 right-0 text-pink-300 opacity-20 text-6xl">✨</div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 ${photos === 2 ? 'md:grid-cols-2' : photos === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-6 md:gap-8`}>
            {Array.from({ length: photos }).map((_, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`relative w-full aspect-[3/4] bg-white p-2 shadow-xl border-4 ${borderColor} ${theme === "yellow" ? "rounded-t-full" : ""}`}>
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">
                      {theme === "red" ? "Red Outfit" : "Yellow Outfit"} {index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
