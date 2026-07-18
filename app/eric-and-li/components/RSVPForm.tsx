"use client";

import Image from "next/image";
import { motion } from "motion/react";

import {
  SmartRsvpFlow,
  weddingSmartRsvpTheme,
} from "@/components/smart-rsvp";

import coupleImage from "../assets/images/walking-couple.jpg";

interface RSVPFormProps {
  bride: string;
  groom: string;
  rsvpDeadline: string;
  eventSlug?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function RSVPForm({
  bride,
  groom,
  rsvpDeadline,
  eventSlug = "eric-and-li",
}: RSVPFormProps) {
  return (
    <section
      id="rsvp"
      className="overflow-hidden bg-[#eae4cc]/30 px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-16">
        <motion.div
          className="min-w-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-5 text-sm uppercase tracking-[0.24em] text-[#a47d45]"
          >
            {groom} <span className="mx-2">&hearts;</span> {bride}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-5 font-libreBaskerville text-5xl font-bold italic text-neutral-900 md:text-6xl"
          >
            RSVP
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-8 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base"
          >
            We are excited to celebrate our wedding with our closest family and
            friends. Kindly RSVP on or before{" "}
            <span className="font-semibold text-neutral-800">
              {rsvpDeadline}
            </span>
            . Thank you!
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <SmartRsvpFlow
              eventSlug={eventSlug}
              theme={weddingSmartRsvpTheme}
              className="max-w-2xl"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-xl lg:sticky lg:top-8"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={coupleImage}
              alt={`${groom} and ${bride}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 38vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
