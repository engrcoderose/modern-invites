"use client";

import React from "react";
import { motion } from "motion/react";
import { BirthdayProgram as BirthdayProgramType } from "../types";

interface BirthdayProgramProps {
  program: BirthdayProgramType;
}

export default function BirthdayProgram({ program }: BirthdayProgramProps) {
  const sections = [
    { key: "roses" as const, icon: "🌹", color: "text-red-600" },
    { key: "blueBills" as const, icon: "💵", color: "text-blue-600" },
    { key: "treasures" as const, icon: "💎", color: "text-purple-600" },
    { key: "candles" as const, icon: "🕯️", color: "text-yellow-600" },
  ];

  return (
    <section id="birthday-program" className="relative py-20 bg-gradient-to-b from-yellow-50 to-yellow-100 overflow-hidden">
      {/* Background image effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Background Photo Placeholder</span>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">
            DEBUTANTE
          </h2>
          <h3 className="text-2xl md:text-3xl font-serif text-gray-700">
            Birthday Program
          </h3>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {sections.map((section, sectionIndex) => {
            const programSection = program[section.key];
            return (
              <motion.div
                key={section.key}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{section.icon}</span>
                  <h4 className={`text-2xl md:text-3xl font-serif ${section.color}`}>
                    {programSection.title}
                  </h4>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {programSection.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {programSection.participants.map((participant, index) => (
                    <div
                      key={index}
                      className="bg-yellow-50 p-3 rounded text-center text-sm text-gray-700 border border-yellow-200"
                    >
                      {participant}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
