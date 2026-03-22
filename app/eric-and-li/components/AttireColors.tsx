"use client";

import React from "react";
import { motion } from "motion/react";

import Image from "next/image";
import dressCodeImage from "../assets/deco/dress-code.png";
import giftImage from "../assets/deco/gift.png";

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
  return (
    <section className="py-24 px-4 bg-[#98754A] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <motion.div
          className="text-center md:text-left flex flex-col items-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-sm font-sans tracking-[0.2em] mb-2 uppercase">
            Attire and Colors
          </h3>
          <h2 className="text-6xl md:text-7xl font-serif mb-12 uppercase tracking-wide">
            Dress Code
          </h2>
          
          {/* Illustration - Barong and Dress */}
          <div className="flex justify-center opacity-80 mt-8">
            <Image 
              src={dressCodeImage} 
              alt="Dress Code Illustration" 
              width={250} 
              height={250}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="flex flex-col gap-12"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Colors Section */}
          <div className="border-t border-white/30 pt-8 flex flex-col md:flex-row gap-8 md:gap-16">
            <h3 className="text-xl font-bold tracking-wider w-32 shrink-0">COLORS</h3>
            <div className="flex flex-col items-center md:items-start w-full">
              <p className="text-lg mb-8 text-center md:text-left">
                We would love to see you in<br />these shades:
              </p>
              <div className="flex gap-12 justify-center md:justify-start w-full">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-[#E8D3A2]" />
                  <span className="font-serif tracking-widest text-lg uppercase">Beige</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-[#1A1A1A]" />
                  <span className="font-serif tracking-widest text-lg uppercase">Black</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attire Section */}
          <div className="border-t border-white/30 pt-8 flex flex-col md:flex-row gap-8 md:gap-16 relative">
            <h3 className="text-xl font-bold tracking-wider w-32 shrink-0">ATTIRE</h3>
            <div className="flex flex-col gap-8 w-full">
              <div>
                <h4 className="text-lg mb-2 uppercase tracking-wide">Principal Sponsors:</h4>
                <p className="text-lg opacity-90">Gents: Barong and Black Slacks</p>
                <p className="text-lg opacity-90">Ladies: Beige Gown</p>
              </div>
              <div>
                <h4 className="text-lg mb-2 uppercase tracking-wide">Guests:</h4>
                <p className="text-lg opacity-90">Semi-Formal</p>
              </div>
            </div>
            
            {/* Gift Illustration */}
            <div className="absolute bottom-0 right-0 opacity-80 hidden md:block">
              <Image 
                src={giftImage} 
                alt="Gift Illustration" 
                width={120} 
                height={120}
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
