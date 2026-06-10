"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import yellowFlower from "../assets/step-design-assets/yellow-flower.png";
import Image from "next/image";
import programBg from "../assets/bg/program-bg.jpg";
import venuePhoto from "../assets/step-design-assets/reception-photo.jpg";
import qrCode from "../assets/step-design-assets/qr-code.jpg";

interface ReceptionAddressProps {
  name: string;
  address: string;
  mapUrl?: string;
}

export default function ReceptionAddress({
  name,
  address,
  mapUrl,
}: ReceptionAddressProps) {
  return (
    <section
      id="location"
      className="relative py-20 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={programBg}
          alt="Program background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Roses — top left */}
      <div className="absolute top-0 left-0 w-24 md:w-64 z-10">
        <Image
          src={yellowFlower}
          alt="Yellow flower decoration"
          className="object-contain"
        />
      </div>

      {/* Roses — top right (mirrored) */}
      <div className="absolute top-0 right-0 w-24 md:w-64 z-10 scale-x-[-1]">
        <Image
          src={yellowFlower}
          alt="Yellow flower decoration"
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base md:text-xl font-libreBaskerville text-[#ac243d] mb-5 tracking-wide">
            STEPHANIE AT 18
          </p>
          <p className="text-5xl md:text-8xl font-meaCulpa text-[#ac243d]">
            Reception Address
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 md:w-28 bg-[#c9a227]" />
            <span className="text-[#c9a227] text-sm">✦</span>
            <div className="h-px w-20 md:w-28 bg-[#c9a227]" />
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left side - Image and address */}
            <motion.div
              className="flex flex-col items-center text-center space-y-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full max-w-[280px] aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={venuePhoto}
                  alt="Venue photo"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
              <h4 className="text-sm md:text-base font-libreBaskerville font-semibold text-[#ac243d] uppercase tracking-wide max-w-[300px]">
                {name}
              </h4>
              <p className="text-xs md:text-sm font-libreBaskerville text-[#ac243d] max-w-[280px] leading-relaxed">
                {address}
              </p>
            </motion.div>

            {/* Right side - QR Code and map button */}
            <motion.div
              className="flex flex-col items-center text-center space-y-5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full max-w-[220px] aspect-square bg-white p-3">
                <Image
                  src={qrCode}
                  alt="QR Code"
                  width={220}
                  height={220}
                  className="object-contain w-full h-full"
                />
              </div>
              <p className="text-xs md:text-sm font-libreBaskerville text-[#ac243d] max-w-[280px] leading-relaxed">
                Scan the QR Code or click the button for Google Map Direction.
              </p>
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#ac243d] hover:bg-[#8f1d32] text-white px-8 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  VIEW MAP
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
