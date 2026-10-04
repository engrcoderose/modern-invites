"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import type { GalleryImage } from "../types";

type GalleryPhotoProps = Omit<ImageProps, "src" | "onError"> & { src: GalleryImage["src"] };
const r2PhotoPrefix = "https://assets.moderninvites.com/anjo-and-jasmin/images/prenups/";

/** Retry a failed optimized request with the already-optimized R2 original. */
export default function GalleryPhoto({ src, alt, unoptimized, ...props }: GalleryPhotoProps) {
  const source = typeof src === "string" ? src : src.src;
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const useOriginal = failedSource === source;

  return (
    <Image
      {...props}
      key={`${source}:${useOriginal ? "original" : "optimized"}`}
      src={src}
      alt={alt}
      unoptimized={unoptimized || useOriginal}
      onError={() => {
        if (!useOriginal && source.startsWith(r2PhotoPrefix)) setFailedSource(source);
      }}
    />
  );
}
