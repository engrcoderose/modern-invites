"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// A failed optimizer request gets one fallback to the same compressed source.
export default function OptimizedPhoto({ src, onError, unoptimized, ...props }: ImageProps) {
  const sourceKey = typeof src === "string" ? src : "src" in src ? src.src : src.default.src;
  const [failedSource, setFailedSource] = useState<string | null>(null);
  return <Image {...props} src={src} unoptimized={unoptimized || failedSource === sourceKey} onError={(event) => { setFailedSource(sourceKey); onError?.(event); }} alt={props.alt} />;
}
