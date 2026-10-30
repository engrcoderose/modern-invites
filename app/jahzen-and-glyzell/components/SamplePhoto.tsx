"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type MotionValue } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import styles from "../styles/invitation.module.css";

export default function SamplePhoto({ src, alt, sizes, priority = false, position = "center", shade = false, zoom }: {
  src: StaticImageData; alt: string; sizes: string; priority?: boolean; position?: string; shade?: boolean; zoom?: MotionValue<number>;
}) {
  const frame = useRef<HTMLElement>(null);
  const [nearby, setNearby] = useState(false);
  useEffect(() => {
    if (priority || !frame.current || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setNearby(true);
      observer.disconnect();
    }, { rootMargin: "200px" });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, [priority]);
  return <figure ref={frame} className={`${styles.photo} relative h-full w-full overflow-hidden`}>
    <motion.div className="absolute inset-0" style={zoom ? { scale: zoom } : { scale: 1 }}><Image src={src} alt={alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : nearby ? "eager" : "lazy"} className="object-cover" style={{ objectPosition: position }} /></motion.div>
    {shade && <div className={`${styles.photoShade} pointer-events-none absolute inset-0`} />}
    <figcaption className={`${styles.sampleCaption} absolute bottom-3 left-3 z-10 px-3 py-1.5`}>Placeholder photo · to be replaced</figcaption>
  </figure>;
}
