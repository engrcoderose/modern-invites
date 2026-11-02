"use client";

import { useState, type SyntheticEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Venue } from "../data/wedding";
import { textRevealEase, textRevealTiming } from "../utils/text-reveal";
import church from "../assets/design/laced-church.png";
import reception from "../assets/design/laced-reception.png";
import styles from "../styles/wedding.module.css";

const artwork = { ceremony: church, reception };
const entranceEase = [0.22, 1, 0.36, 1] as const;

export default function VenuePage({ venue, active }: { venue: Venue; active: boolean }) {
  const [decoded, setDecoded] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const visible = active && decoded;
  const showDetails = visible && (reducedMotion || detailsVisible);
  const reveal = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 10 },
    visible: (index: number) => ({
      opacity: 1, y: 0,
      transition: { ...textRevealTiming(index, false, Boolean(reducedMotion)), ease: textRevealEase },
    }),
  };

  async function prepareArtwork(event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    await image.decode().catch(() => undefined);
    if (image.isConnected) setDecoded(true);
  }

  return (
    <section className="mx-auto flex min-h-full w-full max-w-[760px] flex-col items-center justify-center gap-2 px-6 py-4 text-center" data-reveal-managed>
      <motion.div
        className="flex h-[clamp(170px,32svh,300px)] w-full max-w-[460px] shrink-0 items-center justify-center"
        data-venue-artwork initial={false}
        animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.94 }}
        transition={{ duration: reducedMotion ? 0 : 1, ease: entranceEase }}
        onAnimationComplete={() => { if (visible) setDetailsVisible(true); }}
        style={{ transformOrigin: "center bottom" }}
      >
        <Image
          src={artwork[venue.id]}
          alt=""
          sizes={venue.id === "ceremony"
            ? "clamp(136px, 25.5svh, 239px)"
            : "min(calc(100vw - 48px), 460px, clamp(268px, 50.5svh, 473px))"}
          className={`h-full w-auto max-w-full object-contain ${venue.id === "reception" ? "-translate-x-[6.5%]" : ""}`}
          onLoad={prepareArtwork}
          onError={() => setDecoded(true)}
        />
      </motion.div>
      <motion.div
        className="flex w-full flex-col items-center gap-2"
        data-venue-details initial={false} inert={!showDetails} aria-hidden={!showDetails || undefined}
        animate={showDetails ? "visible" : "hidden"}
        variants={{ hidden: {}, visible: {} }} style={{ opacity: showDetails ? 1 : 0 }}
      >
        <motion.p className={styles.label} variants={reveal} custom={0}>{venue.type}</motion.p>
        <motion.h2 className={`${styles.venueName} max-w-[560px]`} variants={reveal} custom={1}>{venue.name}</motion.h2>
        <motion.p className={styles.small} variants={reveal} custom={2}>{venue.time}</motion.p>
        <motion.p className={`${styles.body} max-w-[440px]`} variants={reveal} custom={3}>{venue.address}</motion.p>
        <motion.a
          variants={reveal} custom={4}
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapQuery)}`}
          target="_blank" rel="noopener noreferrer"
          className={`${styles.textLink} inline-flex min-h-11 items-center gap-2 py-2`}
        >
          View map<ArrowUpRight size={15} aria-hidden="true" />
          <span className="sr-only"> for {venue.name} (opens a new tab)</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
