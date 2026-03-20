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
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            Wedding Program
          </h2>
          <p className="text-gray-600">
            Here&apos;s what to expect on our special day
          </p>
          <div className="w-20 h-1 bg-rose-400 mx-auto mt-4" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-rose-200 transform md:-translate-x-1/2" />

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
                    <div className="inline-flex items-center gap-2 bg-rose-100 px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4 text-rose-600" />
                      <span className="text-rose-800 font-semibold">
                        {event.time}
                      </span>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:relative md:left-0 flex-shrink-0">
                    <div className="w-4 h-4 bg-rose-500 rounded-full border-4 border-white shadow-md" />
                  </div>

                  {/* Content - Right side on desktop */}
                  <div className="md:flex-1 pl-16 md:pl-0">
                    <div className="bg-gradient-to-br from-rose-50 to-blue-50 rounded-lg p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600">{event.description}</p>
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

