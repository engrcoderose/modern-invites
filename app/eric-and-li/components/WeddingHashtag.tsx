"use client";

import React from "react";
import { motion } from "motion/react";

export default function WeddingHashtag() {
  return (
    <section id="wedding-hashtag" className="w-full">
      <div className="bg-[#eae4cc] text-[#4e2a0d] py-24 px-4">
        <motion.div
          className=" flex flex-col items-center justify-center gap-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm md:text-lg tracking-wider font-medium uppercase">
            Capture the love
          </p>
          <div>
            <p className="font-meaCulpa text-5xl md:text-7xl">
              Share the Moment
            </p>
          </div>
          <div>
            <p className="font-libreBaskerville text-2xl md:text-5xl">
              #EricandLiAreHappilyMarried
            </p>
          </div>
          <div className="text-sm md:text-base text-center">
            Capture and share the love using our hashtag. <br /> We&apos;d love to
            relive every moment through your eyes.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
