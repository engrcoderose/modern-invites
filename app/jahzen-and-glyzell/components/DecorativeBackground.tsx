"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { StaticImageData } from "next/image";

export default function DecorativeBackground({ image, className = "" }: { image: StaticImageData; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const nearby = useInView(ref, { once: true, margin: "200px" });

  return <div ref={ref} aria-hidden="true" className={`${className} pointer-events-none absolute inset-0 -z-10`}
    style={nearby ? { backgroundImage: `url("${image.src}")` } : undefined} />;
}
