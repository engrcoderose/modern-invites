"use client";

import React from "react";
import { motion } from "motion/react";
import { BirthdayProgram as BirthdayProgramType } from "../types";
import programBg from "../assets/bg/yellow-bg-long.jpg";
import Image from "next/image";
import dress from "../assets/step-design-assets/green-dress.png";
import outfit from '../assets/outfits/yellow-outfit-3.jpg'

interface BirthdayProgramProps {
  program: BirthdayProgramType;
}

export default function BirthdayProgram({ program }: BirthdayProgramProps) {
  const sections = [
    { key: "roses" as const, color: "text-red-600" },
    { key: "blueBills" as const, color: "text-blue-600" },
    { key: "treasures" as const, color: "text-purple-600" },
    { key: "candles" as const, color: "text-yellow-600" },
  ];

  return (
    <section id="birthday-program" className="relative py-20 overflow-hidden">
      {/* Background image effect */}
      <div className="absolute inset-0">
        <Image
          src={outfit}
          alt="Program background"
          fill
          className="object-cover opacity-8"
        />
      </div>
      <div className="absolute inset-0 bg-[#fdea9f] opacity-80"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5">
            <Image
            src={dress}
            alt="dress"
            width={100}
            height={100}
            className="object-contain flex justify-center items-center mx-auto"
            />
          </div>
          <p className="text-base md:text-xl font-libreBaskerville text-[#ac243d] mb-5">
            STEPHANIE AT 18
          </p>
          <p className="text-5xl md:text-8xl font-meaCulpa text-[#ac243d]">
            Birthday Program
          </p>
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
                  {/* <span className="text-4xl">{section.icon}</span> */}
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
