"use client";

import React from "react";
import { motion } from "motion/react";
import { Shirt, Palette } from "lucide-react";

interface AttireColorsProps {
  dresscode: string;
  colors: string[];
  description: string;
}

export default function AttireColors({
  dresscode,
  colors,
  description,
}: AttireColorsProps) {
  const colorMap: Record<string, string> = {
    "Navy Blue": "bg-blue-900",
    "Dusty Rose": "bg-rose-300",
    Gold: "bg-yellow-500",
    White: "bg-white border-2 border-gray-300",
    Black: "bg-black",
    Green: "bg-green-600",
    Purple: "bg-purple-600",
    Red: "bg-red-600",
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            Attire & Colors
          </h2>
          <div className="w-20 h-1 bg-rose-400 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Dress Code */}
          <motion.div
            className="bg-gradient-to-br from-rose-50 to-blue-50 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-rose-400 p-3 rounded-full">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif text-gray-800">Dress Code</h3>
            </div>
            <p className="text-3xl font-semibold text-rose-600 mb-4">
              {dresscode}
            </p>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <p>Ladies: Floor-length gowns or cocktail dresses</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <p>Gentlemen: Suits or tuxedos</p>
              </div>
            </div>
          </motion.div>

          {/* Wedding Colors */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-rose-50 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-400 p-3 rounded-full">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif text-gray-800">
                Wedding Colors
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Our color palette for the celebration
            </p>
            <div className="flex gap-4 justify-center">
              {colors.map((color, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div
                    className={`w-20 h-20 rounded-full shadow-lg mb-2 ${
                      colorMap[color] || "bg-gray-300"
                    }`}
                  />
                  <p className="text-sm text-gray-700 font-medium">{color}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          className="bg-gradient-to-r from-rose-100 via-pink-50 to-blue-100 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

