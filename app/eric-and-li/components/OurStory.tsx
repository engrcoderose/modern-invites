"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

import ourStoryImage from "../assets/images/our-story-image.jpg";
import aPromiseForALifetimeImage from "../assets/images/a-promise-for-a-lifetime-image.jpg";
import ourStoryBackground from "../assets/our-story-background.jpg";

import initialsDeco from "../assets/deco/eric-and-li-initials.png";
import ringsDeco from "../assets/deco/rings.png";
import giftDeco from "../assets/deco/gift.png";
import wineBottleDeco from "../assets/deco/wine-bottle.png";
import flowerDeco from "../assets/deco/flower.png";
import tulipFlowersDeco from "../assets/deco/tulip-flowers.png";
import weddingCakeDeco from "../assets/deco/wedding-cake.png";

export default function OurStory() {
  return (
    <section id="our-story" className="w-full flex flex-col">
      {/* Top Section */}
      <div
        className="relative w-full bg-cover bg-no-repeat py-16 md:py-24 px-8 md:px-16 lg:px-24 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12"
        style={{ backgroundImage: `url(${ourStoryBackground.src})` }}
      >
        {/* Decorative Elements
        <div className="absolute top-8 left-8 w-24 md:w-32 opacity-60">
          <Image src={flowerDeco} alt="Flower" className="w-full h-auto" />
        </div>
        <div className="absolute top-8 right-1/2 w-16 md:w-24 opacity-60">
          <Image
            src={weddingCakeDeco}
            alt="Wedding Cake"
            className="w-full h-auto"
          />
        </div>
        <div className="absolute top-8 right-8 w-16 md:w-20 opacity-60">
          <Image
            src={wineBottleDeco}
            alt="Wine Bottle"
            className="w-full h-auto"
          />
        </div>
        <div className="absolute bottom-8 left-8 w-32 md:w-48 opacity-60">
          <Image
            src={tulipFlowersDeco}
            alt="Tulip Flowers"
            className="w-full h-auto"
          />
        </div>
        <div className="absolute bottom-8 right-8 w-32 md:w-48 opacity-60">
          <Image src={giftDeco} alt="Gift" className="w-full h-auto" />
        </div> */}

        {/* Text Content */}
        <motion.div
          className="relative z-10 w-full md:w-1/2 flex flex-col gap-6 text-[#4e2a0d]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-serif leading-tight">
            A CHANCE
            <br />
            ENCOUNTER
          </h2>

          <div className="flex flex-col gap-4 text-sm md:text-base font-medium leading-relaxed max-w-lg">
            <p>
              We first met in December 2018 at a Christmas party in Manila. What
              began as a friendly chat over coffee turned into endless
              conversations and spontaneous adventures around the city.
            </p>
            <p>
              After five wonderful years together, filled with road trips, late-
              night movies, and growing side by side, our love became stronger
              than ever. On April 14, 2023 at a beach in La Union, under a sky
              full of stars, John asked the question that changed everything—and
              Anna joyfully said yes.
            </p>
            <p>
              Now, on June 16, 2025 at Daraga Church, Daraga, Albay, we are so
              excited to celebrate the beginning of forever with all of you.
            </p>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative z-10 w-full md:w-1/2 aspect-[4/3] md:aspect-[4/3] shadow-xl"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src={ourStoryImage}
            alt="Our Story"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col md:flex-row">
        {/* Left Image */}
        <motion.div
          className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-auto md:min-h-[600px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src={aPromiseForALifetimeImage}
            alt="A Promise for a Lifetime"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 bg-[#8c6b42] p-12 md:p-16 lg:p-24 flex flex-col justify-center text-white relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10 flex flex-col gap-8 max-w-lg"
          >
            <div className="w-24 md:w-32">
              <Image
                src={initialsDeco}
                alt="E&L Initials"
                className="w-full h-auto brightness-0 invert"
              />
            </div>

            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight">
                A PROMISE
                <br />
                FOR LIFE
              </h2>
              <div className="absolute -right-8 md:right-16 bottom-0 w-20 md:w-24">
                <Image
                  src={ringsDeco}
                  alt="Rings"
                  className="w-full h-auto brightness-0 invert"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 text-sm md:text-base font-medium leading-relaxed mt-4">
              <p>
                Join us for a day filled with love, laughter, and cherished
                memories as we unite in marriage.
              </p>
              <p>
                After years of love, laughter, and countless memories, we&apos;re
                excited to begin our forever together. We would be honored to
                have you join us as we exchange our vows and celebrate this
                special milestone surrounded by the people we love most.
              </p>
              <p>We will exchange our wedding vows on June 20, 2026 at 3pm in Daraga Church.</p>
              <p>Reception to follow.</p>
              <p>
                Kindly RSVP by May 15, 2026 to ensure your spot in our special
                day.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
