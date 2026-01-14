"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-sage-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-elegant font-bold text-sage-700"
              >
                Modern Invites
              </motion.h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              About Us
            </Link>
            {/* <a
              href="#gallery"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              Gallery
            </a> */}
            <a
              href="https://www.facebook.com/pixyartph/"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              Contact Us
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-sage-600 text-white px-6 py-2 rounded-full hover:bg-sage-700 transition-colors"
              onClick={() => window.open("https://www.facebook.com/pixyartph/", "_blank")}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

