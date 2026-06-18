"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import BlackFilmBg from "../assets/backgrounds/black-film-bg.jpg";
import HeroImage from "../assets/outfits/hero-image.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#211d1a] px-5 py-10 text-[#d9ff4e] sm:px-8 lg:px-12">
      <div className="absolute inset-0">
        <Image
          src={BlackFilmBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[#211d1a]/80" />
      </div>

      <div className="pointer-events-none absolute right-[6%] top-[7%] hidden h-24 w-28 rotate-[-18deg] rounded-[55%_45%_60%_40%] border border-[#d9ff4e]/75 md:block" />
      <div className="pointer-events-none absolute right-[8%] top-[11%] hidden h-14 w-20 rotate-[28deg] rounded-[55%_45%_60%_40%] border border-[#d9ff4e]/75 md:block" />
      <div className="pointer-events-none absolute bottom-[7%] right-[5%] h-24 w-24 text-[#c9a300]">
        <span className="absolute left-3 top-9 h-1 w-7 rotate-12 bg-current" />
        <span className="absolute left-8 top-12 h-1 w-7 rotate-75 bg-current" />
        <span className="absolute left-12 top-8 h-1 w-6 rotate-[135deg] bg-current" />
        <span className="absolute left-14 top-2 h-1 w-8 rotate-[-45deg] bg-current" />
        <span className="absolute left-2 top-16 h-1 w-5 rotate-[55deg] bg-current" />
        <span className="absolute left-12 top-16 h-1 w-5 rotate-[-20deg] bg-current" />
      </div>
      <div className="pointer-events-none absolute bottom-[3%] left-[54%] hidden h-28 w-28 text-[#ff59df] md:block">
        <span className="absolute left-0 top-9 h-px w-3 bg-current" />
        <span className="absolute left-1 top-8 h-3 w-px bg-current" />
        <span className="absolute left-8 top-4 h-10 w-px bg-current" />
        <span className="absolute left-4 top-8 h-px w-10 bg-current" />
        <span className="absolute left-8 top-4 h-10 w-px rotate-45 bg-current" />
        <span className="absolute left-8 top-4 h-10 w-px -rotate-45 bg-current" />
        <span className="absolute left-14 top-16 h-12 w-px bg-current" />
        <span className="absolute left-8 top-[5.5rem] h-px w-12 bg-current" />
        <span className="absolute left-14 top-16 h-12 w-px rotate-45 bg-current" />
        <span className="absolute left-14 top-16 h-12 w-px -rotate-45 bg-current" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          className="relative order-2 mx-auto flex w-full max-w-[390px] justify-center lg:order-1 lg:max-w-[520px]"
          initial={{ opacity: 0, x: -28, rotate: -2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={HeroImage}
            alt="Black and white Claudia birthday photo strip"
            priority
            sizes="(min-width: 1024px) 44vw, 88vw"
            className="h-auto w-full drop-shadow-[0_18px_26px_rgba(0,0,0,0.35)]"
          />
        </motion.div>

        <motion.div
          className="order-1 mx-auto flex w-full max-w-[620px] flex-col items-center text-center lg:order-2 lg:pt-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <h1 className="font-meaCulpa text-[5.5rem] leading-none text-[#ff59df] sm:text-[7rem] md:text-[8.5rem] lg:text-[9rem]">
            Claudia
          </h1>

          <div className="-mt-4 flex w-full max-w-[450px] flex-col items-center gap-1 sm:-mt-6">
            <p className="-rotate-2 font-sans text-2xl font-black uppercase tracking-wide text-[#d9ff4e] sm:text-3xl">
              is turning
            </p>
            <p className="-my-3 font-meaCulpa text-[7rem] leading-none text-[#ff59df] sm:text-[9rem] md:text-[10.5rem]">
              18
            </p>
            <p className="-rotate-2 font-sans text-xl font-black uppercase tracking-wide text-[#d9ff4e] sm:text-2xl md:text-3xl">
              this October 15, 2030
            </p>
          </div>

          <p className="mt-10 max-w-[520px] text-balance font-sans text-base font-bold leading-tight text-[#d9ff4e] sm:text-lg">
            Please join us for a fun birthday celebration filled with drinks,
            music, and lots of dancing!
          </p>

          <a
            href="#rsvp"
            className="mt-10 inline-flex h-10 min-w-36 items-center justify-center bg-[#d9ff4e] px-10 font-sans text-base font-black uppercase tracking-[0.35em] text-[#211d1a] transition hover:bg-[#ff59df] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ff59df] focus:ring-offset-2 focus:ring-offset-[#211d1a]"
          >
            RSVP
          </a>
        </motion.div>
      </div>
    </section>
  );
}
