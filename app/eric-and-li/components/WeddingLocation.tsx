"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import bgImage from "../assets/images/walking-couple.jpg";

interface Venue {
  name: string;
  address: string;
  mapUrl: string;
  image?: string | StaticImageData;
}

interface WeddingLocationProps {
  ceremony: Venue;
  reception: Venue;
  bride: string;
  groom: string;
}

export default function WeddingLocation({
  ceremony,
  reception,
  bride,
  groom,
}: WeddingLocationProps) {
  const VenueCard = ({
    title,
    venue,
    delay,
  }: {
    title: string;
    venue: Venue;
    delay: number;
  }) => (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <h3 className="text-3xl md:text-4xl font-libreBaskerville text-[#4e2a0d] mb-6">
        {title}
      </h3>
      
      <div className="w-full aspect-[4/3] relative mb-6 overflow-hidden rounded-md">
        <Image
          src={venue.image || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop"}
          alt={venue.name}
          fill
          className="object-cover"
        />
      </div>

      <h4 className="text-lg md:text-xl font-libreBaskerville text-[#4e2a0d] mb-4 max-w-[300px]">
        {venue.name}
      </h4>

      <p className="text-xs text-[#4e2a0d] mb-6 max-w-[280px] leading-relaxed">
        {venue.address}
      </p>

      <a
        href={venue.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#c79d5f] hover:bg-[#c79d5f]/80 text-white px-8 py-2.5 rounded-full text-xs font-medium tracking-wide transition-colors"
      >
        View Map <MapPin className="w-3.5 h-3.5 text-white" />
      </a>
    </motion.div>
  );

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Walking Couple"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-white/40 to-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 mt-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.2em] text-white uppercase mb-2 font-medium drop-shadow-md">
            {groom.split(' ')[0]} and {bride.split(' ')[0]}
          </p>
          <h2 className="text-6xl md:text-8xl font-imperial text-white drop-shadow-lg">
            Join Us!
          </h2>
          <div className="w-16 h-[1px] bg-white mx-auto mt-6" />
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <VenueCard 
              title="Ceremony" 
              venue={ceremony} 
              delay={0.3} 
            />
            <VenueCard 
              title="Reception" 
              venue={reception} 
              delay={0.5} 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

