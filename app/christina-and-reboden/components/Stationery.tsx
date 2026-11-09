import type { ReactNode } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { artwork, type Photo } from "../data/media";
import styles from "../styles/invitation.module.css";

export function Ornament() {
  return <div className={`${styles.ornament} relative mx-auto shrink-0 overflow-hidden`} aria-hidden="true"><Image src={artwork.ornament} alt="" fill sizes="180px" className="object-cover" /></div>;
}

export function SlideHeading({ children }: { children: ReactNode }) {
  return <h2 className={`${styles.heading} text-center`}>{children}</h2>;
}

export function Stationery({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return <div className={`${styles.stationery} ${className} relative mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center gap-5 px-5 py-5 text-center sm:gap-7 sm:px-12`}>
    <Ornament /><SlideHeading>{title}</SlideHeading>{children}
  </div>;
}

export function PhotoFrame({ photo, className = "", priority = false, compact = false }: { photo: Photo; className?: string; priority?: boolean; compact?: boolean }) {
  return <figure className={`${styles.photo} ${className} relative overflow-hidden`}>
    {photo.src ? <Image src={photo.src} alt={photo.alt} fill sizes={photo.sizes} quality={photo.quality} priority={priority} placeholder={typeof photo.src === "object" ? "blur" : "empty"} className={photo.fit === "contain" ? "object-contain" : "object-cover"} style={{ objectPosition: photo.position }} /> : <div role="img" aria-label={`Photo placeholder: ${photo.alt}`} className={`${compact ? "gap-1" : "gap-3"} flex h-full w-full flex-col items-center justify-center px-4 text-center`}>
      <ImageIcon size={compact ? 14 : 26} strokeWidth={1} className="shrink-0" aria-hidden="true" /><span className={styles.photoCaption}>{photo.caption}</span><span className="font-sans text-[10px] uppercase tracking-[.16em]">{compact ? "Photo to come" : "Photograph to come"}</span>
    </div>}
  </figure>;
}
