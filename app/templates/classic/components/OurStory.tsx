"use client";

import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, Calendar } from "lucide-react";

interface StoryEvent {
  title: string;
  date: string;
  description: string;
}

interface OurStoryProps {
  title: string;
  content: StoryEvent[];
}

export default function OurStory({ title, content }: OurStoryProps) {
  const icons = [Heart, Sparkles, Calendar];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-rose-400 mx-auto" />
        </motion.div>

        <div className="space-y-16">
          {content.map((event, index) => {
            const Icon = icons[index % icons.length];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-rose-500" />
                    <span className="text-sm text-rose-600 font-semibold uppercase tracking-wide">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-4">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-rose-200 to-blue-200 flex items-center justify-center shadow-lg">
                    <Icon className="w-20 h-20 text-white" />
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

