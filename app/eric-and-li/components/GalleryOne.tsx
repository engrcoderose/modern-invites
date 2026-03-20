"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function GalleryOne() {
  // Placeholder image URLs - replace with actual wedding photos
  const photos = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop",
  ];

  return (
    <section
      id="gallery"
      className="relative min-h-screen flex items-center justify-center py-12 md:py-20 px-4 overflow-hidden"
      style={{ backgroundColor: "#D4BA94" }}
    >

      {/* Main Gallery Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-6xl"
      >
        {/* 2x2 Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 lg:gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative border-2 border-gray-300 h-[300px] overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src={photo}
                alt={`Wedding photo ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}