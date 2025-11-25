"use client";

import { motion } from "motion/react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Choose Your Design & Confirm Your Slot",
      description:
        "Choose from our collection of elegant templates that matches your event and complete your order.",
    },
    {
      number: "2",
      title: "Send Your Event Details",
      description:
        "Fill out the form with your event details and upload any photos or files you want to include.",
    },
    {
      number: "3",
      title: "Review & Receive Your Invitation",
      description:
        "You'll receive your draft for review. Request revisions if needed, and once approved, your final digital invitation will be delivered—ready to share with your guests.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 bg-stone-50">
      {/* Gradient Background Section */}
      {/* <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-sage-600 via-sage-500 to-sage-400" /> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 md:text-5xl font-elegant mb-4"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Creating your perfect invitation is simple and straightforward
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Number Badge */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-white border-4 border-sage-600 flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold text-sage-800">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Card */}
              <div className="bg-gradient-to-br from-sage-100 to-white rounded-2xl p-8 pt-12 border border-sage-100 shadow-md hover:shadow-xl transition-shadow h-full">
                <h3 className="text-xl font-bold text-sage-800 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
