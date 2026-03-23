"use client";

import React from "react";
import { motion } from "motion/react";
import { Hotel, Bus, Gift, Camera } from "lucide-react";

interface InfoItem {
  title: string;
  description: string;
}

interface UsefulInformationProps {
  infoItems: InfoItem[];
}

export default function UsefulInformation({
  infoItems,
}: UsefulInformationProps) {
  const icons = [Hotel, Bus, Gift, Camera];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-meaCulpa text-[#4e2a0d] mb-4">
            Other Useful Information
          </h2>
          <p className="text-[#4e2a0d]/80 font-medium">
            Important details to help you prepare for our wedding
          </p>
          <div className="w-20 h-1 bg-[#c79d5f] mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {infoItems.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.div
                key={index}
                className="bg-[#eae4cc]/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-[#e2d5b3]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-[#c79d5f] p-4 rounded-full">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-libreBaskerville text-[#4e2a0d] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#4e2a0d]/80 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

