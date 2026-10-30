"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useInvitationOpen } from "./InvitationState";
import satin from "../assets/countdown/wine-satin-background.webp";
import topFlowers from "../assets/countdown/floral-top-right.webp";
import bottomFlowers from "../assets/countdown/floral-bottom-left.webp";

// Separate artwork layers keep the satin and reading content still while flowers drift.
export default function CountdownArtwork() {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame);
  const invitationOpen = useInvitationOpen();
  const reducedMotion = useReducedMotion();
  const enabled = invitationOpen && reducedMotion === false;
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5 });
  const topY = useTransform(progress, [0, 1], [-18, 18]);
  const topX = useTransform(progress, [0, 1], [-6, 6]);
  const topRotation = useTransform(progress, [0, 1], [-2, 2]);
  const bottomY = useTransform(progress, [0, 1], [22, -22]);
  const bottomX = useTransform(progress, [0, 1], [5, -5]);
  const bottomRotation = useTransform(progress, [0, 1], [1.5, -1.5]);
  const willChange = enabled && inView ? "transform" : "auto";

  return <div ref={frame} aria-hidden="true" data-countdown-artwork data-floral-motion={enabled ? "scroll" : "still"} className="pointer-events-none absolute inset-0 -z-20">
    <Image src={satin} alt="" fill quality={90} sizes="(min-width: 1024px) max(100vw, 1103px), (min-width: 640px) max(100vw, 960px), max(100vw, 890px)" className="object-cover" />
    <motion.div data-floral-corner="top-right" className="absolute -right-8 -top-8 w-[44vw] origin-top-right sm:w-[25vw] xl:w-[340px]"
      style={{ x: enabled ? topX : 0, y: enabled ? topY : 0, rotate: enabled ? topRotation : 0, willChange }}>
      <Image src={topFlowers} alt="" quality={90} sizes="(min-width: 1280px) 340px, (min-width: 640px) 25vw, 44vw" className="h-auto w-full" />
    </motion.div>
    <motion.div data-floral-corner="bottom-left" className="absolute -bottom-8 -left-8 w-[50vw] origin-bottom-left sm:w-[28vw] xl:w-[380px]"
      style={{ x: enabled ? bottomX : 0, y: enabled ? bottomY : 0, rotate: enabled ? bottomRotation : 0, willChange }}>
      <Image src={bottomFlowers} alt="" quality={90} sizes="(min-width: 1280px) 380px, (min-width: 640px) 28vw, 50vw" className="h-auto w-full" />
    </motion.div>
  </div>;
}
