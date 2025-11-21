import React from "react";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900 mb-4">
            Why Choose <span className="text-sage-600">Modern Invites</span>?
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create stunning digital invitations
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-sage-50 to-white p-8 rounded-2xl border border-sage-100 hover:shadow-xl transition-shadow"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center mb-6"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </motion.div>
            <h4 className="text-2xl font-elegant font-semibold text-gray-900 mb-3">
              Beautiful Designs
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Choose from our curated collection of elegant templates designed
              by professional artists.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-sage-50 to-white p-8 rounded-2xl border border-sage-100 hover:shadow-xl transition-shadow"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center mb-6"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </motion.div>
            <h4 className="text-2xl font-elegant font-semibold text-gray-900 mb-3">
              Fully Customizable
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Personalize every detail - colors, fonts, images, and text to
              match your unique style.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-sage-50 to-white p-8 rounded-2xl border border-sage-100 hover:shadow-xl transition-shadow"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center mb-6"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </motion.div>
            <h4 className="text-2xl font-elegant font-semibold text-gray-900 mb-3">
              Instant Delivery
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Send your invitations instantly via email or shareable link. Track
              RSVPs in real-time.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
