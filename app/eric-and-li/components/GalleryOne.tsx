"use client";

import Image from "next/image";
import { motion } from "motion/react";

import groomPhoto from "../assets/images/gallery-one-groom.jpg";
import couplePhoto from "../assets/images/gallery-one-couple.jpg";
import bridePhoto from "../assets/images/gallery-one-bride.jpg";
import laughingCouplePhoto from "../assets/images/gallery-one-laughing-couple.jpg";

import boyShoes from "../assets/deco/boy-shoes.png";
import wine from "../assets/deco/wine.png";
import girlShoes from "../assets/deco/girl-shoes.png";
import keys from "../assets/deco/keys.png";
import invitationEnv from "../assets/deco/invitation-env.png";
import wineBottle from "../assets/deco/wine-bottle.png";

export default function GalleryOne() {
  const photos = [
    { src: groomPhoto, alt: "Groom" },
    { src: couplePhoto, alt: "Couple" },
    { src: bridePhoto, alt: "Bride" },
    { src: laughingCouplePhoto, alt: "Laughing Couple" },
  ];

  return (
    <section
      id="gallery"
      className="relative min-h-screen flex items-center justify-center py-16 md:py-24 px-8 md:px-24 overflow-hidden"
      style={{ backgroundColor: "#e8d5a5" }}
    >
      {/* Left Decorations */}
      <div className="absolute left-4 top-12 md:left-8 md:top-24 w-16 md:w-24 opacity-80 z-20">
        <Image src={boyShoes} alt="Boy Shoes" className="w-full h-auto" />
      </div>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 md:left-8 w-12 md:w-16 opacity-80 z-20">
        <Image src={wine} alt="Wine Glass" className="w-full h-auto" />
      </div>
      <div className="absolute left-4 bottom-12 md:left-8 md:bottom-24 w-16 md:w-24 opacity-80 z-20">
        <Image src={girlShoes} alt="Girl Shoes" className="w-full h-auto" />
      </div>

      {/* Right Decorations */}
      <div className="absolute right-4 top-12 md:right-8 md:top-24 w-16 md:w-24 opacity-80 z-20">
        <Image src={keys} alt="Keys" className="w-full h-auto" />
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 md:right-8 w-16 md:w-24 opacity-80 z-20">
        <Image src={invitationEnv} alt="Invitation Envelope" className="w-full h-auto" />
      </div>
      <div className="absolute right-4 bottom-12 md:right-8 md:bottom-24 w-12 md:w-16 opacity-80 z-20">
        <Image src={wineBottle} alt="Wine Bottle" className="w-full h-auto" />
      </div>

      {/* Main Gallery Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* 2x2 Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] overflow-hidden bg-black/5"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}