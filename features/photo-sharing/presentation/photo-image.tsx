"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { AlbumPhoto } from "../domain/photo-sharing";
import styles from "./photo-sharing.module.css";

export function PhotoImage({ photo, sizes = "(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 300px", contain = false }: { photo: AlbumPhoto; sizes?: string; contain?: boolean }) {
  const [blobUrl, setBlobUrl] = useState("");
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
    if (typeof photo.source === "string") return;
    const url = URL.createObjectURL(photo.source);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photo.source]);
  const src = typeof photo.source === "string" ? photo.source : blobUrl;
  if (failed) return <span className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm">Photo unavailable. Try another photo.</span>;
  if (!src) return <span role="status" className="absolute inset-0 flex items-center justify-center text-sm">Loading photo…</span>;
  return <Image src={src} alt={photo.caption || `Photo shared by ${photo.guestName}`} fill sizes={sizes} unoptimized={typeof photo.source !== "string"} onError={() => setFailed(true)} className={contain ? "object-contain" : styles.photo} />;
}
