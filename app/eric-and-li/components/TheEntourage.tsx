"use client";

import React from "react";
import { motion } from "motion/react";
import { EntourageData } from "../types";
import Image from "next/image";
import bgImage from "../assets/images/wedding-schedule-image.jpg";

interface TheEntourageProps {
  data: EntourageData;
}

export default function TheEntourage({ data }: TheEntourageProps) {
  const renderNames = (names: { name: string }[], columns: number = 2) => {
    if (columns === 1) {
      return (
        <div className="flex flex-col items-center gap-4 mt-8">
          {names.map((person, idx) => (
            <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
              {person.name}
            </p>
          ))}
        </div>
      );
    }

    // Split into two columns
    const mid = Math.ceil(names.length / 2);
    const col1 = names.slice(0, mid);
    const col2 = names.slice(mid);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 mt-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          {col1.map((person, idx) => (
            <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
              {person.name}
            </p>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4">
          {col2.map((person, idx) => (
            <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
              {person.name}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-24 px-4 min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Entourage Background"
          fill
          className="object-cover"
          quality={100}
        />
        {/* Optional overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#eae4cc]/50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <h2 className="text-7xl md:text-9xl font-meaCulpa text-[#4e2a0d] mb-4 drop-shadow-lg shadow-white">
            Entourage
          </h2>
        </motion.div>

        <div className="space-y-20 w-full bg-[#eae4cc]/50 p-8 md:p-16 rounded-3xl backdrop-blur-sm shadow-xl border border-white/50">
          {/* Parents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase drop-shadow-sm">
              With the blessings of our parents
            </h3>
            {renderNames(data.parents)}
          </motion.div>

          {/* Principal Sponsors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase drop-shadow-sm">
              Principal Sponsors
            </h3>
            <p className="text-[#4e2a0d] font-medium italic font-serif mt-2 text-lg md:text-xl drop-shadow-sm">
              to stand as witnesses to our vows
            </p>
            {renderNames(data.principalSponsors)}
          </motion.div>

          {/* Best Man & Maid of Honor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase drop-shadow-sm">
              Best Man & Maid of Honor
            </h3>
            <p className="text-[#4e2a0d] font-medium italic font-serif mt-2 text-lg md:text-xl drop-shadow-sm">
              to assist us in our needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-4">
                {data.bestMan.map((person, idx) => (
                  <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
                    {person.name}
                  </p>
                ))}
              </div>
              <div className="flex flex-col items-center gap-4">
                {data.maidOfHonor.map((person, idx) => (
                  <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
                    {person.name}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Secondary Sponsors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase mb-12 drop-shadow-sm">
              Secondary Sponsors
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-3xl mx-auto mb-12">
              <div>
                <h4 className="text-lg font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase mb-6 drop-shadow-sm">
                  Veil
                </h4>
                <div className="flex flex-col items-center gap-4">
                  {data.secondarySponsors.veil.map((person, idx) => (
                    <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
                      {person.name}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase mb-6 drop-shadow-sm">
                  Cord
                </h4>
                <div className="flex flex-col items-center gap-4">
                  {data.secondarySponsors.cord.map((person, idx) => (
                    <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
                      {person.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase mb-6 drop-shadow-sm">
                Candle
              </h4>
              <div className="flex flex-col items-center gap-4">
                {data.secondarySponsors.candle.map((person, idx) => (
                  <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
                    {person.name}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Groomsmen & Bridesmaids */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-3xl mx-auto"
          >
            <div>
              <h3 className="text-lg md:text-xl font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase mb-8 drop-shadow-sm">
                Groomsmen
              </h3>
              <div className="flex flex-col items-center gap-4">
                {data.groomsmen.map((person, idx) => (
                  <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
                    {person.name}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase mb-8 drop-shadow-sm">
                Bridesmaids
              </h3>
              <div className="flex flex-col items-center gap-4">
                {data.bridesmaids.map((person, idx) => (
                  <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
                    {person.name}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Ring & Coin Bearers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-3xl mx-auto"
          >
            <div>
              <h3 className="text-lg md:text-xl font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase mb-8 drop-shadow-sm">
                Ring Bearer
              </h3>
              <div className="flex flex-col items-center gap-4">
                {data.ringBearer.map((person, idx) => (
                  <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
                    {person.name}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase mb-8 drop-shadow-sm">
                Coin Bearer
              </h3>
              <div className="flex flex-col items-center gap-4">
                {data.coinBearer.map((person, idx) => (
                  <p key={idx} className="text-[#4e2a0d] font-medium uppercase tracking-widest text-sm md:text-base drop-shadow-sm">
                    {person.name}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bible Bearer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-lg md:text-xl font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase mb-8 drop-shadow-sm">
              Bible Bearer
            </h3>
            {renderNames(data.bibleBearer, 1)}
          </motion.div>

          {/* Flower Girls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-lg md:text-xl font-serif font-bold text-[#4e2a0d] tracking-[0.2em] uppercase mb-8 drop-shadow-sm">
              Flower Girls
            </h3>
            {renderNames(data.flowerGirls, 1)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
