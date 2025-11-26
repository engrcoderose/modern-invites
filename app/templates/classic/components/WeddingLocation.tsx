"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Venue {
  name: string;
  address: string;
  mapUrl: string;
}

interface WeddingLocationProps {
  ceremony: Venue;
  reception: Venue;
}

export default function WeddingLocation({
  ceremony,
  reception,
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
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="bg-gradient-to-br from-rose-400 to-blue-400 p-6">
        <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
          {title}
        </h3>
        <MapPin className="w-6 h-6 text-white opacity-80" />
      </div>

      <div className="p-6 md:p-8">
        <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          {venue.name}
        </h4>

        <div className="flex items-start gap-3 mb-6">
          <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0 mt-1" />
          <p className="text-gray-600">{venue.address}</p>
        </div>

        <Button
          asChild
          className="w-full bg-gradient-to-r from-rose-500 to-blue-500 hover:from-rose-600 hover:to-blue-600 text-white"
        >
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
          </a>
        </Button>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            Wedding Location & Reception
          </h2>
          <p className="text-gray-600">
            Join us at these beautiful venues
          </p>
          <div className="w-20 h-1 bg-rose-400 mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <VenueCard title="Ceremony" venue={ceremony} delay={0} />
          <VenueCard title="Reception" venue={reception} delay={0.2} />
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-gray-700">
              <span className="font-semibold">Pro tip:</span> We recommend
              arriving 30 minutes early to find parking and get settled before
              the ceremony begins!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

