"use client";

import React from "react";
import { motion } from "motion/react";
import { DebutData } from "../types";

interface InvitationDetailsProps {
  data: DebutData;
}

export default function InvitationDetails({ data }: InvitationDetailsProps) {
  const formattedDate = data.eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayOfWeek = data.eventDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <section className="relative py-20 bg-gradient-to-b from-yellow-50 to-yellow-100 overflow-hidden">
      {/* Floral decorations */}
      <div className="absolute top-0 left-0 text-yellow-300 opacity-20 text-6xl">🌺</div>
      <div className="absolute bottom-0 right-0 text-pink-300 opacity-20 text-6xl">✨</div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-8">
              You are Invited!
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Message */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                As I celebrate one of the most special milestones in my life, I would be most grateful to have you by my side.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Join me for a magical night filled with laughter, memories, and the people who matter most to me.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                This precious gift will make this special occasion truly unforgettable.
              </p>

              <div className="mt-8 space-y-3 pt-6 border-t border-yellow-300">
                <p className="text-base text-gray-600">
                  <span className="font-semibold">Date:</span> {formattedDate}
                </p>
                <p className="text-base text-gray-600">
                  <span className="font-semibold">Time:</span> {dayOfWeek} | {data.eventTime}
                </p>
                <p className="text-base text-gray-600">
                  <span className="font-semibold">Venue:</span> {data.venue.name}
                </p>
                <p className="text-sm text-gray-500">
                  {data.venue.address}
                </p>
              </div>
            </motion.div>

            {/* Right side - Photo */}
            <motion.div
              className="relative mt-8 md:mt-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full h-64 sm:h-80 md:h-96 bg-white p-4 shadow-xl transform rotate-3">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs sm:text-sm">Photo Placeholder</span>
                </div>
                {/* Decorative butterflies */}
                <div className="absolute -top-4 -right-4 text-pink-300 text-2xl sm:text-3xl">🦋</div>
                <div className="absolute -bottom-4 -left-4 text-yellow-300 text-xl sm:text-2xl">✨</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
