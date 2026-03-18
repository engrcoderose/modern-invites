"use client";

import React from "react";
import { motion } from "motion/react";
import { Gift, Smartphone, Hash } from "lucide-react";
import { OtherDetails as OtherDetailsType } from "../types";

interface OtherDetailsProps {
  details: OtherDetailsType;
}

export default function OtherDetails({ details }: OtherDetailsProps) {
  const detailBoxes = [
    {
      icon: Gift,
      title: "GIFT HOW",
      text: details.giftMessage,
      bgColor: "bg-pink-50",
      borderColor: "border-pink-300",
    },
    {
      icon: Smartphone,
      title: "UNPLUGGED EVENT",
      text: details.unpluggedMessage,
      bgColor: "bg-pink-50",
      borderColor: "border-pink-300",
    },
    {
      icon: Hash,
      title: "MY HASHTAG",
      text: `Capture your memories & share them on social media using our official hashtag: ${details.hashtag}`,
      bgColor: "bg-pink-50",
      borderColor: "border-pink-300",
    },
  ];

  return (
    <section id="rsvp" className="relative py-20 bg-gradient-to-b from-yellow-100 to-yellow-50 overflow-hidden">
      {/* Floral decorations */}
      <div className="absolute top-0 left-0 text-pink-300 opacity-20 text-6xl">✨</div>
      <div className="absolute top-0 right-0 text-pink-300 opacity-20 text-6xl">✨</div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8">
            OTHER DETAILS
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Three detail boxes */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {detailBoxes.map((box, index) => {
              const Icon = box.icon;
              return (
                <motion.div
                  key={index}
                  className={`${box.bgColor} p-6 rounded-lg border-2 ${box.borderColor} shadow-md`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-serif text-gray-800">{box.title}</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{box.text}</p>
                </motion.div>
              );
            })}
          </div>

          {/* RSVP Section */}
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-700 mb-6">
              Do you have any special requests or dietary restrictions?
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">
              RSVP
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
