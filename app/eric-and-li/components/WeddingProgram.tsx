"use client";

import React from "react";
import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { TimelineEvent } from "../types";

interface WeddingProgramProps {
  events: TimelineEvent[];
}

export default function WeddingProgram({ events }: WeddingProgramProps) {
  return (
    <section className="py-20 px-4 bg-[#fcfaf8]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#4e2a0d] mb-4 uppercase tracking-wider">
            Wedding Program
          </h2>
          <p className="text-[#4e2a0d]/80 font-medium">
            Here&apos;s what to expect on our special day
          </p>
          <div className="w-20 h-1 bg-[#8c6b42] mx-auto mt-6" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#8c6b42]/30 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Time - Left side on desktop */}
                  <div className="md:flex-1 md:text-right pl-16 md:pl-0">
                    <div className="inline-flex items-center gap-2 bg-[#8c6b42]/10 px-5 py-2.5 rounded-full border border-[#8c6b42]/20 shadow-sm">
                      <Clock className="w-4 h-4 text-[#8c6b42]" />
                      <span className="text-[#4e2a0d] font-semibold tracking-wide">
                        {event.time}
                      </span>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:relative md:left-0 flex-shrink-0 z-10">
                    <div className="w-5 h-5 bg-[#8c6b42] rounded-full border-4 border-[#fcfaf8] shadow-md" />
                  </div>

                  {/* Content - Right side on desktop */}
                  <div className="md:flex-1 pl-16 md:pl-0">
                    <div className="bg-white rounded-xl p-6 shadow-md border border-[#8c6b42]/10 hover:shadow-lg transition-shadow duration-300">
                      <h3 className="text-xl font-serif font-semibold text-[#4e2a0d] mb-2">
                        {event.title}
                      </h3>
                      <p className="text-[#4e2a0d]/80 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

