"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { DebutData } from "../types";
import invitationPhoto from "../assets/2.png";

interface InvitationDetailsProps {
  data: DebutData;
}

export default function InvitationDetails({ data }: InvitationDetailsProps) {
  const formattedDate = data.eventDate.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  const dayOfWeek = data.eventDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <section className="relative py-16 bg-[#fff6d2] overflow-hidden">
      <div className="w-full px-8 md:px-14 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Message */}
          <motion.div
            className="space-y-16 md:w-[550px] mx-auto"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl text-center md:text-left md:text-6xl font-meaCulpa text-[#ac243d] not-semibold">
              ✦ You are Invited! ✦
            </h2>

            <p className="text-lg md:text-xl font-petitFormalScript text-[#ac243d] leading-relaxed text-justify text-wrap font-semibold">
              As I celebrate one of the most special milestones in my life, I
              would be truly grateful to have you by my side. <br /> <br /> Join
              me for a magical night filled with laughter, memories, and the
              people who matter most to me. <br /> <br /> Your presence will
              make this moment even more unforgettable. 💗
            </p>

            <div className="pt-4 space-y-2 text-center">
              <p className="text-base md:text-lg font-petitFormalScript italic text-[#ac243d] font-semibold">
                <span className="not-italic font-bold">Date:</span>{" "}
                {formattedDate}
              </p>
              <p className="text-base md:text-lg font-petitFormalScript italic text-[#ac243d] font-semibold">
                <span className="not-italic font-bold">Time:</span>{" "}
                {dayOfWeek} | {data.eventTime}
              </p>
              <p className="text-base md:text-lg font-petitFormalScript italic text-[#ac243d] font-semibold">
                <span className="not-italic font-bold">Where:</span>{" "}
                {data.venue.name}, {data.venue.address}
              </p>
            </div>
          </motion.div>

          {/* Right side - Photo */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full h-[450px] md:h-[800px]">
              <Image
                src={invitationPhoto}
                alt={`${data.celebrant} invitation photo`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
