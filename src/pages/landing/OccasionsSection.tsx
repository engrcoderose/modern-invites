import React from 'react'
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function OccasionsSection() {
    return (
        <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-gray-900 mb-12">
              Perfect for Any Celebration
            </h3>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center"
          >
            {['Weddings', 'Debut & Birthdays', 'Corporate Events', 'Workshops', 'Baptismal', 'Graduation'].map((occasion, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-700 font-medium"
              >
                {occasion}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    )
}