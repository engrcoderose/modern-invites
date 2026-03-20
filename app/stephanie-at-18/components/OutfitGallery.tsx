"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import redOutfit1 from "../assets/outfits/red-outfit-1.jpg";
import redOutfit2 from "../assets/outfits/red-outfit-2.jpg";
import redOutfit3 from "../assets/outfits/red-outfit-3.jpg";
import yellowOutfit1 from "../assets/outfits/yellow-outfit-1.jpg";
import yellowOutfit2 from "../assets/outfits/yellow-outfit-2.jpg";
import yellowOutfit3 from "../assets/outfits/yellow-outfit-3.jpg";

const RED_OUTFITS = [redOutfit1, redOutfit2, redOutfit3] as const;
const YELLOW_OUTFITS = [yellowOutfit1, yellowOutfit2, yellowOutfit3] as const;

interface OutfitGalleryProps {
  theme: "red" | "yellow";
  photos: number; // Number of photos to display
}

export default function OutfitGallery({ theme, photos = 3 }: OutfitGalleryProps) {
  const bgColor = theme === "red" ? "bg-gradient-to-b from-red-50 to-red-100" : "bg-gradient-to-b from-yellow-50 to-yellow-100";
  const borderColor = theme === "red" ? "border-yellow-600" : "border-yellow-500";
  const outfitSources = theme === "red" ? RED_OUTFITS : YELLOW_OUTFITS;

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
                  <div
                    className={`relative w-full h-full overflow-hidden bg-gray-200 ${
                      theme === "yellow" ? "rounded-t-full" : ""
                    }`}
                  >
                    {index < outfitSources.length ? (
                      <Image
                        src={outfitSources[index]}
                        alt={`${theme === "red" ? "Red" : "Yellow"} outfit ${index + 1}`}
                        fill
                        className={`object-cover ${theme === "yellow" ? "rounded-t-full" : ""}`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          {theme === "red" ? "Red Outfit" : "Yellow Outfit"} {index + 1}
                        </span>
                      </div>
                    )}
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
