"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/landing/ScrollReveal";
import useMarketingReducedMotion from "@/components/landing/useMarketingReducedMotion";

type Props = { src: StaticImageData; alt: string; sizes: string; className?: string };

export default function MediaReveal({ src, alt, sizes, className = "" }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const reducedMotion = useMarketingReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [12, -12]);

  return (
    <ScrollReveal direction="scale" distance={12} className={className}>
      <div ref={frame} className="relative">
        <motion.div style={{ y: reducedMotion ? 0 : y }}>
          <Image src={src} alt={alt} sizes={sizes} className="h-auto w-full" />
        </motion.div>
      </div>
    </ScrollReveal>
  );
}
