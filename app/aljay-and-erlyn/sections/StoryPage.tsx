"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ribbonFlower from "../assets/design/flower-with-whiteribbon.png";
import { FramedHeading } from "../components/Stationery";
import { storyPhoto } from "../data/photos";
import { wedding } from "../data/wedding";
import { textRevealEase, textRevealTiming } from "../utils/text-reveal";
import styles from "../styles/wedding.module.css";

export default function StoryPage({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : -18 },
    visible: (index: number) => ({
      opacity: 1, y: 0,
      transition: { ...textRevealTiming(index, false, Boolean(reducedMotion)), ease: textRevealEase },
    }),
  };

  return (
    <motion.div
      className="flex min-h-full w-full flex-col items-center justify-center gap-6 px-6 py-5 sm:px-10"
      initial={false} animate={active ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: {} }} data-reveal-managed
    >
      <motion.figure className="relative mb-4 aspect-[3/4] w-[clamp(180px,32svh,250px)] shrink-0" variants={reveal} custom={0} data-story-artwork>
        <Image
          src={storyPhoto.src} alt={storyPhoto.alt} fill quality={85}
          sizes="clamp(180px, 32svh, 250px)"
          className="object-cover" style={{ objectPosition: storyPhoto.position }}
        />
        <Image
          src={ribbonFlower} alt="" sizes="clamp(76px, 13.5svh, 105px)"
          className="pointer-events-none absolute -left-[14%] -top-[7%] z-10 h-auto w-[42%] -rotate-12"
        />
        <figcaption className="absolute -bottom-7 -right-8 z-10 w-[clamp(174px,23svh,220px)] sm:-right-10 md:-bottom-[6%] md:-right-[8%] md:w-[78%]">
          <FramedHeading headingClassName={styles.storyHeading} sizes="(min-width: 768px) clamp(141px, 25svh, 195px), clamp(174px, 23svh, 220px)" label="Our Love Story">
            <span>Our Love</span><span>Story</span>
          </FramedHeading>
        </figcaption>
      </motion.figure>
      <div className={`${styles.storyCopy} w-full max-w-[580px] space-y-3`}>
        {wedding.story.map((paragraph, index) => <motion.p key={paragraph} variants={reveal} custom={index + 1} data-story-paragraph>{paragraph}</motion.p>)}
      </div>
    </motion.div>
  );
}
