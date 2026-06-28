"use client";

import Link from "next/link";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
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

          {/* desktop navigatiom */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              Portfolio
            </Link>
            {/* <a
              // href="/gallery"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              Gallery
            </a> */}
            <a
              href="https://www.facebook.com/moderneenvites/"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              Contact Us
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-sage-600 text-white px-6 py-2 rounded-full hover:bg-sage-700 transition-colors"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/moderneenvites/",
                  "_blank",
                )
              }
            >
              Get Started
            </motion.button>
          </div>

          {/* mobile navigation */}
          <button
            className="md:hidden text-sage-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden md:hidden"
        >
          <div className="flex flex-col py-4 space-y-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-sage-600"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-sage-600"
            >
              About Us
            </Link>

            <Link
              href="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-sage-600"
            >
              Pricing
            </Link>

            <Link
              href="/portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-sage-600"
            >
              Portfolio
            </Link>

            <a
              href="https://www.facebook.com/moderneenvites/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-sage-600"
            >
              Contact Us
            </a>

            <button
              className="bg-sage-600 text-white rounded-full py-3"
              onClick={() => {
                window.open(
                  "https://www.facebook.com/moderneenvites/",
                  "_blank",
                );
                setIsMobileMenuOpen(false);
              }}
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
