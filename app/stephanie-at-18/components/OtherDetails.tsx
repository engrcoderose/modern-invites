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
      title: "GIFT NOTE",
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
      text: "Capture your memories & share them on social media using our official hashtag:",
      hashtag: details.hashtag,
      bgColor: "bg-pink-50",
      borderColor: "border-pink-300",
    },
  ];

  return (
    <section
      id="other-details"
      className="relative py-20 bg-gradient-to-b from-yellow-100 to-yellow-50 overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base md:text-xl font-libreBaskerville text-[#ac243d] mb-5 uppercase">
            Other Useful Information
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-5xl md:text-8xl font-meaCulpa text-[#ac243d]">
            Other Details
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          
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
                    <h3 className="text-lg font-serif text-gray-800">
                      {box.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {box.text}
                  </p>
                  {"hashtag" in box && box.hashtag && (
                    <p className="mt-16 text-center text-2xl md:text-3xl font-libreBaskerville font-bold text-[#ac243d]">
                      {box.hashtag}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
