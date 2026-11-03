"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { StaticImageData } from "next/image";
import lilies from "../assets/artwork/venue-lily-linework.webp";
import blooms from "../assets/artwork/venue-bloom-linework.webp";
import styles from "../styles/invitation.module.css";

function maskStyle(image: StaticImageData) {
  return { maskImage: `url("${image.src}")`, WebkitMaskImage: `url("${image.src}")`, aspectRatio: `${image.width} / ${image.height}` };
}

export default function VenueFlorals() {
  const ref = useRef<HTMLDivElement>(null);
  const nearby = useInView(ref, { once: true, margin: "200px" });

  return <div ref={ref} aria-hidden="true" data-venue-florals className="pointer-events-none absolute inset-0 -z-10">
    {nearby && <>
      <span style={maskStyle(blooms)} className={`${styles.venueBotanical} absolute -right-12 -top-6 w-44 -rotate-12 opacity-25 sm:-right-12 sm:-top-8 sm:w-56 lg:-right-8 lg:w-64`} />
      <span style={maskStyle(lilies)} className={`${styles.venueBotanical} absolute -bottom-20 -left-20 w-40 rotate-12 opacity-20 sm:-bottom-24 sm:-left-24 sm:w-56 lg:w-64 xl:w-72`} />
    </>}
  </div>;
}
