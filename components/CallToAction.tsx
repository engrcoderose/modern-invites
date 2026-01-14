"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-sage-300 h-[300px] flex flex-col items-center justify-center text-center px-6 shadow-2xl">
          {/* Geometric Background Layers */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Base layer (Left) */}
            <div className="absolute inset-0 bg-sage-300" />

            {/* Middle angled layer */}
            <div className="absolute top-0 bottom-0 left-[45%] w-[40%] bg-sage-400/80 transform -skew-x-12 origin-bottom-left" />

            {/* Right angled layer */}
            <div className="absolute top-0 bottom-0 left-[85%] w-full bg-sage-500/80 transform -skew-x-12 origin-bottom-left" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-sage-950 font-elegant leading-tight"
            >
              Your Perfect Invitation Awaits!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-sage-900 font-medium"
            >
              Great events start with great invitations. Share your joy with
              custom digital designs that capture your unique style, while RSVP
              features keep everything organized and stress-free from the first
              save-the-date to the final headcount.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button className="group flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-200 mx-auto">
                <a href="https://www.facebook.com/pixyartph/">
                  Getting started
                </a>
                <span className="bg-sage-500 rounded-full p-1 group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="w-4 h-4 text-black" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
