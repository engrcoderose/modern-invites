"use client";

import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-elegant font-bold text-gray-900 mb-6 leading-tight"
          >
            Elegant E-Invites for <br />
            <span className="text-gradient">Every Occasion</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-gray-600 mb-8 leading-relaxed"
          >
            Create beautiful, personalized digital invitations that leave a
            lasting impression. <br /> Perfect for weddings, birthdays,
            corporate events, and more.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-sage-600 text-sage-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-sage-400 hover:text-white hover:border-none transition-all"
            >
              See Our Sample Works
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

