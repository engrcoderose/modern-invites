"use client";

import Image, { type ImageProps, type StaticImageData } from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type ScenicBackgroundProps = Pick<ImageProps, "priority" | "onLoad" | "onError" | "className"> & {
  src: StaticImageData;
  initialSizes?: string;
};

export default function ScenicBackground({ src, initialSizes = "100vw", className = "", ...props }: ScenicBackgroundProps) {
  const image = useRef<HTMLImageElement>(null);
  const [sizes, setSizes] = useState(initialSizes);

  useLayoutEffect(() => {
    const frame = image.current?.parentElement;
    if (!frame) return;
    const updateSizes = () => {
      const { width, height } = frame.getBoundingClientRect();
      // A portrait frame enlarges a landscape image beyond the visible width.
      setSizes(`${Math.ceil(Math.max(width, height * src.width / src.height))}px`);
    };
    updateSizes();
    const observer = new ResizeObserver(updateSizes);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [src.width, src.height]);

  return <Image ref={image} src={src} alt="" fill quality={85} sizes={sizes} className={`object-cover ${className}`} {...props} />;
}
