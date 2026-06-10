"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Clock, Mail, UtensilsCrossed, Wine } from "lucide-react";
import { ProgramSchedule as ProgramScheduleType } from "../types";
import programBg from "../assets/bg/program-bg.jpg";
import programRoses from "../assets/step-design-assets/roses.png";

interface ProgramScheduleProps {
  schedule: ProgramScheduleType;
}

export default function ProgramSchedule({ schedule }: ProgramScheduleProps) {
  const scheduleItems = [
    { icon: Clock, text: schedule.callTime },
    { icon: Mail, text: schedule.programProper },
    { icon: UtensilsCrossed, text: schedule.dinner },
    { icon: Wine, text: schedule.afterParty },
  ];

  return (
    <section id="program" className="relative py-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={programBg}
          alt="Program background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Roses — top left */}
      <div className="absolute top-0 left-0 w-24 md:w-64 z-10">
        <Image src={programRoses} alt="Roses decoration" className="object-contain" />
      </div>

      {/* Roses — top right (mirrored) */}
      <div className="absolute top-0 right-0 w-24 md:w-64 z-10 scale-x-[-1]">
        <Image src={programRoses} alt="Roses decoration" className="object-contain" />
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base md:text-xl font-libreBaskerville text-[#ac243d] mb-5">
            November 08, 2026
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-5xl md:text-8xl font-meaCulpa text-[#ac243d]">
            Program Schedule
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-16">
          {scheduleItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <p className="text-sm md:text-base font-medium text-gray-700">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
