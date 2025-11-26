"use client";

import React from "react";
import { motion } from "motion/react";

interface InvitationMessageProps {
  bride: string;
  groom: string;
}

export default function InvitationMessage({
  bride,
  groom,
}: InvitationMessageProps) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="w-20 h-1 bg-rose-300 mx-auto" />

          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 leading-relaxed">
            Together with our families,
            <br />
            we request the honor of your presence
            <br />
            at the celebration of our marriage
          </h2>

          <div className="py-8">
            <p className="text-2xl md:text-3xl font-serif text-rose-600 mb-2">
              {bride} & {groom}
            </p>
            <p className="text-gray-600 italic">
              are tying the knot!
            </p>
          </div>

          <div className="max-w-2xl mx-auto text-gray-700 leading-relaxed space-y-4">
            <p className="text-lg">
              After years of love, laughter, and countless memories,
              we're excited to begin our forever together.
            </p>
            <p className="text-lg">
              We would be honored to have you join us
              as we exchange our vows and celebrate this special milestone
              surrounded by the people we love most.
            </p>
          </div>

          <div className="w-20 h-1 bg-rose-300 mx-auto mt-8" />
        </motion.div>
      </div>
    </section>
  );
}

