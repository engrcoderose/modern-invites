"use client";

import { motion } from "motion/react";
import Image from "next/image";
import websiteInvitationsImg from "@/public/images/website-invitaions.png";
import readyToPrintImg from "@/public/images/ready-to-print.png";

export default function OurProducts() {
  return (
    <section id="products" className="px-4 py-20 sm:px-6 lg:px-8 bg-stone-50">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-4xl font-bold text-center text-gray-900 md:text-5xl font-elegant"
        >
          Our Products
        </motion.h2>
        {/* Website Invitation Section */}
        <div className="grid gap-12 items-center mb-32 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-sage-800 md:text-4xl font-elegant">
              Website Invitation
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Your celebration, beautifully shared online.
            </p>
            <p className="text-base leading-relaxed text-gray-600">
              Transform your special occasion into an elegant digital
              experience. Our interactive website invitations seamlessly blend
              stunning design with practical features—share effortlessly across
              platforms, track guest responses in real-time, and create a
              memorable first impression that sets the perfect tone for your
              celebration.
            </p>

            {/* <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 text-base font-semibold text-white rounded-full transition-colors bg-sage-900 hover:bg-sage-800"
              >
                TEMPLATES
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 text-base font-semibold rounded-full border-2 transition-all border-sage-900 text-sage-900 hover:bg-sage-900 hover:text-white"
              >
                SEE DEMO
              </motion.button>
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Image
              src={websiteInvitationsImg}
              alt="Website Invitations on multiple devices"
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </div>

        {/* Ready to Print Section */}
        <div className="grid gap-12 items-center lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <Image
              src={readyToPrintImg}
              alt="Ready to print invitation designs"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-1 space-y-6 lg:order-2"
          >
            <h2 className="text-3xl font-bold text-sage-800 md:text-4xl font-elegant">
              Ready-to-Print Layouts
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Timeless elegance, ready for your hands.
            </p>
            <p className="text-base leading-relaxed text-gray-600">
              Experience the charm of tangible invitations with our
              professionally crafted print-ready designs. Each layout is
              meticulously formatted to professional standards, ensuring
              flawless results whether you print at home or with your preferred
              print shop. Simply download, personalize, and deliver
              sophistication directly to your guests.
            </p>
            {/* <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 text-base font-semibold text-white rounded-full transition-colors bg-sage-900 hover:bg-sage-800"
              >
                TEMPLATES
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 text-base font-semibold rounded-full border-2 transition-all border-sage-900 text-sage-900 hover:bg-sage-900 hover:text-white"
              >
                SEE DEMO
              </motion.button>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
