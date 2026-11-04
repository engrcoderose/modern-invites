"use client";

import Image from "next/image";
import { motion, useTransform } from "motion/react";
import type { GalleryPhoto } from "../types/wedding";
import ScrollScene, { useScrollScene } from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";

const MAX_PHOTO_SCALE = 1.16;

function ParallaxPhoto({ photo }: { photo: GalleryPhoto }) {
  const { progress, enabled } = useScrollScene();
  const y = useTransform(progress, [0, 1], [-20, 20]);
  const scale = useTransform(progress, [0, 0.5, 1], [MAX_PHOTO_SCALE, 1.08, 1.12]);
  const ratio = typeof photo.src === "string" ? null : photo.src.width / photo.src.height;
  // Account for the height-driven cover crop and maximum parallax zoom.
  const sizes = ratio === null ? "100vw" :
    `max(${MAX_PHOTO_SCALE * 100}vw, calc(${(ratio * MAX_PHOTO_SCALE * 100).toFixed(2)}svh - ${(ratio * MAX_PHOTO_SCALE * 72).toFixed(2)}px), ${(ratio * MAX_PHOTO_SCALE * 420).toFixed(2)}px)`;
  return <motion.div style={{ y: enabled ? y : 0, scale: enabled ? scale : 1 }} className="absolute inset-0"><Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" loading="lazy" /></motion.div>;
}

export default function PhotoBreakSection({
  id,
  photo,
}: {
  id: string;
  photo: GalleryPhoto;
}) {
  return (
    <ScrollScene
      id={id}
      aria-label="Full screen photo break"
      className="jb-photo-stage relative h-[calc(100svh-72px)] min-h-[420px] overflow-hidden"
    >
      <ScrollLayer profile="photo" className="absolute inset-0">
        <ScrollLayer profile="photo-stage" className="absolute inset-0 overflow-hidden"><ParallaxPhoto photo={photo} /></ScrollLayer>
      </ScrollLayer>
    </ScrollScene>
  );
}
