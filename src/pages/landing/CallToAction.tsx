import React from "react";
import { motion } from "motion/react";

export default function CallToAction() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gradient-to-br from-sage-600 to-sage-800 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-elegant font-bold mb-6"
          >
            Ready to Create Your Perfect Invitation?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl mb-8 text-sage-100"
          >
            Join thousands of satisfied customers who have made their events
            unforgettable
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-sage-700 px-10 py-4 rounded-full text-lg font-semibold hover:bg-sage-50 transition-all shadow-lg"
          >
            Start Creating Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
