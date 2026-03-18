"use client";

import React from "react";
import { motion } from "motion/react";
import { Clock, Mail, UtensilsCrossed, Wine } from "lucide-react";
import { ProgramSchedule as ProgramScheduleType } from "../types";

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
    <section id="program" className="relative py-20 bg-gradient-to-b from-yellow-100 to-yellow-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floral decorations */}
      <div className="absolute top-10 left-10 text-yellow-300 opacity-30 text-6xl">🌹</div>
      <div className="absolute top-10 right-10 text-pink-300 opacity-30 text-6xl">🌹</div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">
            DEBUTANTE
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-4"></div>
          <h3 className="text-2xl md:text-3xl font-serif text-gray-700">
            Program Schedule
          </h3>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
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
