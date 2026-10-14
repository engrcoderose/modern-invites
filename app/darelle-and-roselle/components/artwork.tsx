import Image from "next/image";
import type { StaticImageData } from "next/image";
import { media } from "../data/media";
import styles from "../styles/invitation.module.css";
import Monogram from "./monogram";
import ScenicBackground from "./scenic-background";

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg data-dr-reveal className={`${styles.ornament} ${className}`} viewBox="0 0 170 34" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth=".9">
        <path d="M0 17h52c19 0 15-16 5-12-9 4 7 20 28 12 21 8 37-8 28-12-10-4-14 12 5 12h52M63 23c13 7 17-2 22-6 5 4 9 13 22 6" />
        <path d="m85 7 4 10-4 10-4-10Z" />
        <circle cx="40" cy="17" r="2" /><circle cx="130" cy="17" r="2" />
      </g>
    </svg>
  );
}

export function WoodlandBackdrop({ background = media.woodland }: { background?: StaticImageData }) {
  return (
    <div className={`${styles.woodlandBackdrop} pointer-events-none absolute inset-0`} aria-hidden="true">
      {background === media.venueBackground
        ? <ScenicBackground src={background} />
        : <Image src={background} alt="" fill sizes="100vw" className="object-cover" />}
    </div>
  );
}

export function FormalMonogram() {
  return (
    <div data-dr-formal-logo className="relative aspect-[320/413] h-[clamp(140px,28svh,240px)] shrink-0">
      <Monogram className="h-full w-full" sizes="290px" />
    </div>
  );
}
