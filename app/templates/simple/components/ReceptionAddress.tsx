"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin, ExternalLink } from "lucide-react";

interface ReceptionAddressProps {
  name: string;
  address: string;
  mapUrl?: string;
}

export default function ReceptionAddress({ name, address, mapUrl }: ReceptionAddressProps) {
  return (
    <section id="location" className="relative py-20 bg-gradient-to-b from-yellow-100 to-yellow-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floral decorations */}
      <div className="absolute top-10 left-10 text-pink-300 opacity-30 text-6xl">🦋</div>
      <div className="absolute bottom-10 right-10 text-yellow-300 opacity-30 text-6xl">✨</div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">
            DEBUTANTE
          </h2>
          <h3 className="text-2xl md:text-3xl font-serif text-gray-700">
            Reception Address
          </h3>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Image and address */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full h-64 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Venue Photo Placeholder</span>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-serif text-gray-800 mb-2">{name}</h4>
                <p className="text-gray-600 flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {address}
                </p>
              </div>
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition-colors mx-auto block text-center"
                >
                  <ExternalLink className="w-5 h-5" />
                  VIEW HERE
                </a>
              )}
            </motion.div>

            {/* Right side - QR Code */}
            <motion.div
              className="flex justify-center mt-8 md:mt-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-48 h-48 sm:w-64 sm:h-64 bg-white p-4 rounded-lg shadow-lg">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs sm:text-sm">QR Code Placeholder</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
