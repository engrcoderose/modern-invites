"use client";

import { useState, type SyntheticEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Venue } from "../data/wedding";
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

  async function prepareArtwork(event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    await image.decode().catch(() => undefined);
    if (image.isConnected) setDecoded(true);
  }

  return (
    <section className="mx-auto flex min-h-full w-full max-w-[760px] flex-col items-center justify-center gap-2 px-6 py-4 text-center">
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
        animate={showDetails ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: reducedMotion ? 0 : 0.55, ease: entranceEase }}
      >
        <p className={styles.label}>{venue.type}</p>
        <h2 className={`${styles.venueName} max-w-[560px]`}>{venue.name}</h2>
        <p className={styles.small}>{venue.time}</p>
        <p className={`${styles.body} max-w-[440px]`}>{venue.address}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapQuery)}`}
          target="_blank" rel="noopener noreferrer"
          className={`${styles.textLink} inline-flex min-h-11 items-center gap-2 py-2`}
        >
          View map<ArrowUpRight size={15} aria-hidden="true" />
          <span className="sr-only"> for {venue.name} (opens a new tab)</span>
        </a>
      </motion.div>
    </section>
  );
}
