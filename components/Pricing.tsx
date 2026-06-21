"use client";

import { motion } from "motion/react";

const FACEBOOK_URL = "https://www.facebook.com/moderneenvites/";

type Feature = string;

type Package = {
  name: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  features: Feature[];
  popular?: boolean;
  accentColor: "ivory" | "sage" | "luxury";
};

const PACKAGES: Package[] = [
  {
    name: "Classic",
    tagline: "Everything you need to get started",
    price: "799",
    originalPrice: "999",
    accentColor: "ivory",
    features: [
      "Custom Invitation Link",
      "Event Details Section",
      "RSVP Form",
      "Photo Gallery (Up to 10 Photos)",
      "Dress Code Section",
      "Program / Entourage Section",
      "Event Hashtag Section",
      "Mobile-Friendly Design",
      "Shareable via Messenger, Facebook & QR Code",
      "1 Revision Round",
    ],
  },
  {
    name: "Signature",
    tagline: "The most loved package for couples",
    price: "1,999",
    originalPrice: "2,499",
    popular: true,
    accentColor: "sage",
    features: [
      "Everything in Classic",
      "Custom Design Theme",
      "Story / About Us Section",
      "Countdown Timer",
      "Google Maps Integration",
      "Photo Gallery (Up to 50 Photos)",
      "Background Music",
      "Save-the-Date Section",
      "Premium Animations & Effects",
      "Smooth Scroll Experience",
      "3 Revision Rounds",
    ],
  },
  {
    name: "Luxury",
    tagline: "A fully bespoke, white-glove experience",
    price: "3,199",
    originalPrice: "3,999",
    accentColor: "luxury",
    features: [
      "Everything in Signature",
      "Fully Custom Design",
      "Event Timeline",
      "Gift Registry Section",
      "FAQ Section",
      "Video Integration",
      "Custom RSVP Questions",
      "Priority Support",
      "Free Ready-to-Print Invitation Layout",
      "Unlimited Design Revisions",
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="7.5"
        stroke="currentColor"
        strokeOpacity="0.25"
      />
      <path
        d="M5 8.5L7 10.5L11 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiamondIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L22 9L12 22L2 9L12 2Z" opacity="0.9" />
    </svg>
  );
}

function PricingCard({ pkg, index }: { pkg: Package; index: number }) {
  const isPopular = pkg.popular;
  const isLuxury = pkg.accentColor === "luxury";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative flex flex-col rounded-[2rem] overflow-hidden group transition-all duration-500 ${
        isPopular
          ? "shadow-[0_32px_80px_-16px_rgba(61,133,96,0.35)] md:-translate-y-4 z-10"
          : isLuxury
            ? "shadow-[0_16px_48px_-12px_rgba(146,64,14,0.15)] hover:shadow-[0_24px_64px_-12px_rgba(146,64,14,0.22)]"
            : "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.10)] hover:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.14)]"
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="bg-gold-500 text-white text-[11px] font-bold tracking-[0.22em] uppercase text-center py-2.5">
            ✦ &nbsp; Most Popular &nbsp; ✦
          </div>
        </div>
      )}

      {/* Card body */}
      <div
        className={`flex flex-col flex-1 ${
          isPopular ? "bg-sage-700" : isLuxury ? "bg-[#faf7f2]" : "bg-white"
        }`}
      >
        {/* Top section */}
        <div className={`px-8 pb-7 ${isPopular ? "pt-14" : "pt-9"}`}>
          {/* Package label */}
          <div className="flex items-center gap-2 mb-5">
            <DiamondIcon
              className={`w-3 h-3 ${
                isPopular
                  ? "text-gold-300"
                  : isLuxury
                    ? "text-gold-600"
                    : "text-sage-400"
              }`}
            />
            <span
              className={`text-[11px] font-bold tracking-[0.28em] uppercase ${
                isPopular
                  ? "text-sage-200"
                  : isLuxury
                    ? "text-gold-700"
                    : "text-sage-500"
              }`}
            >
              {pkg.name}
            </span>
          </div>

          {/* Package name */}
          <h3
            className={`text-4xl font-elegant font-bold leading-tight mb-2 ${
              isPopular
                ? "text-white"
                : isLuxury
                  ? "text-stone-800"
                  : "text-sage-900"
            }`}
          >
            {pkg.name}
          </h3>
          <p
            className={`text-sm leading-relaxed mb-7 ${
              isPopular ? "text-sage-200" : "text-stone-500"
            }`}
          >
            {pkg.tagline}
          </p>

          {/* Price */}
          <div className="flex items-end gap-2 mb-1">
            <span
              className={`text-lg font-semibold leading-none mb-1 ${
                isPopular
                  ? "text-sage-300"
                  : isLuxury
                    ? "text-gold-600"
                    : "text-sage-500"
              }`}
            >
              ₱
            </span>
            <span
              className={`text-6xl font-elegant font-bold leading-none tracking-tight ${
                isPopular
                  ? "text-white"
                  : isLuxury
                    ? "text-stone-800"
                    : "text-sage-800"
              }`}
            >
              {pkg.price}
            </span>
          </div>
          {pkg.originalPrice && (
            <p
              className={`text-sm line-through mb-1 ${
                isPopular ? "text-sage-400" : "text-stone-400"
              }`}
            >
              ₱{pkg.originalPrice}
            </p>
          )}
          <p
            className={`text-xs font-medium ${
              isPopular ? "text-sage-300" : "text-stone-400"
            }`}
          >
            one-time payment
          </p>
        </div>

        {/* Divider */}
        <div
          className={`mx-8 h-px ${
            isPopular
              ? "bg-sage-500/50"
              : isLuxury
                ? "bg-stone-200"
                : "bg-sage-100"
          }`}
        />

        {/* Features */}
        <div className="flex-1 px-8 py-7 space-y-3.5">
          {pkg.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className={
                  isPopular
                    ? "text-gold-300 mt-0.5"
                    : isLuxury
                      ? "text-gold-600 mt-0.5"
                      : "text-sage-500 mt-0.5"
                }
              >
                <CheckIcon />
              </span>
              <span
                className={`text-sm leading-snug ${
                  isPopular
                    ? "text-sage-100"
                    : isLuxury
                      ? "text-stone-700"
                      : "text-stone-700"
                }`}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-8 pb-9 pt-4">
          <motion.a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            className={`block w-full text-center py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 ${
              isPopular
                ? "bg-white text-sage-700 hover:bg-sage-50 shadow-lg shadow-sage-900/20"
                : isLuxury
                  ? "bg-stone-800 text-white hover:bg-stone-900 shadow-md shadow-stone-300"
                  : "bg-sage-600 text-white hover:bg-sage-700 shadow-md shadow-sage-200"
            }`}
          >
            Book Now
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-[#fdfcf9]">
      {/* Subtle decorative background */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-sage-50/70 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-stone-100/80 blur-3xl" />
      </div> */}

      <div className="relative z-10 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Launch Promo Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="sticky top-16 z-40 overflow-hidden bg-gradient-to-r from-sage-600 to-sage-700 text-white rounded-2xl py-4 mb-16"
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap"
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="inline-flex items-center gap-3 px-10 text-sm font-semibold tracking-wide">
                      <span className="text-base">🎉</span>
                      <span className="font-bold">Launch Special:</span>
                      <span>Get</span>
                      <span className="text-gold-300 font-bold">20% OFF</span>
                      <span>on all packages — limited time only!</span>
                      
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Section header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.3em] uppercase text-sage-500 mb-4"
            >
              Website Invitation Packages
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-stone-900 mb-6 leading-[1.1]"
            >
              Celebrate Your{" "}
              <span className="relative inline-block">
                <span className="text-sage-600">Special Day</span>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-base md:text-lg text-stone-500 leading-relaxed font-libreBaskerville italic"
            >
              Beautiful, handcrafted digital website invitations tailored to
              your celebration.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="text-sm text-stone-400 mt-3 leading-relaxed"
            >
              Modern, elegant, and shareable website invitations designed to
              make every celebration unforgettable.
            </motion.p>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-end md:items-start">
            {PACKAGES.map((pkg, i) => (
              <PricingCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-24 text-center"
          >
            {/* Ornamental divider */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-stone-300" />
              <DiamondIcon className="w-3 h-3 text-gold-400" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-stone-300" />
            </div>

            <p className="text-xs font-bold tracking-[0.3em] uppercase text-sage-500 mb-4">
              Let&apos;s Get Started
            </p>
            <h3 className="text-3xl md:text-4xl font-elegant font-bold text-stone-900 mb-4">
              Ready to create your{" "}
              <span className="text-sage-600">dream invitation</span> website?
            </h3>
            <p className="text-stone-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              Have something custom in mind? We&apos;d love to hear about your
              vision and build something just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 bg-sage-600 text-white px-9 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-sage-700 shadow-lg shadow-sage-200 transition-all"
              >
                Get Started Today
              </motion.a>
              <motion.a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 border-2 border-sage-200 text-sage-700 px-9 py-4 rounded-full font-semibold text-sm tracking-wide hover:border-sage-400 hover:bg-sage-50 transition-all"
              >
                Ask a Question
              </motion.a>
            </div>

            <p className="text-xs text-stone-400 mt-6">
              No hidden fees · One-time payment · Delivered within 3–7 business
              days
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
