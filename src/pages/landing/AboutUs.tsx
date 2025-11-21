import React from "react";
import { motion } from "motion/react";

export default function AboutUs() {
  return (
    <section className="w-full">
      <div className="bg-stone-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-elegant font-bold text-sage-800 text-center mb-16"
          >
            Get to know us
          </motion.h2>

          <div className="flex justify-center">
            <div className="relative max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-sage-800 leading-relaxed mt-8 text-center"
              >
                Modern Invites brings a modern, heartfelt touch to invitation
                design. Every piece is thoughtfully crafted to reflect your
                story, your style, and the atmosphere you want to create. We
                focus on clean, elegant aesthetics paired with meaningful
                details that make each invitation feel personal and intentional.
                From announcing your event to welcoming your guests, Modern
                Invites delivers designs that are simple, stylish, and
                memorable—setting the perfect tone for your celebration.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sage-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-stone-50 mb-6 text-center">
                MISSION
              </h3>
              <p className="text-lg md:text-xl text-stone-100 leading-relaxed text-center">
                To deliver high-quality, modern invitation designs that capture
                each client's unique vision while providing a smooth,
                personalized, and professional experience from start to finish.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-stone-50 mb-6 text-center">
                VISION
              </h3>
              <p className="text-lg md:text-xl text-stone-100 leading-relaxed text-center">
                To be a trusted and loved go-to designer for modern, memorable,
                and meaningful invitations that bring every special occasion to
                life.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
