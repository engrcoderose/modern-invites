import Image from "next/image";
import type { CSSProperties } from "react";
import { heroPhotos } from "../data/hero-photos";

export default function OpeningHeroBackdrop() {
  const photo = heroPhotos[0];
  return <div aria-hidden="true" className="absolute inset-0">
    <Image src={photo.src} alt="" fill priority quality={85} sizes="(max-width: 639px) max(100vw, calc(150svh - 111px), 1080px), max(100vw, calc(150svh - 111px), 1020px)"
      className="object-cover [object-position:var(--mj-hero-mobile-position)] sm:[object-position:var(--mj-hero-position)]"
      style={{ "--mj-hero-position": photo.position, "--mj-hero-mobile-position": photo.mobilePosition ?? photo.position } as CSSProperties} />
    <div className="mj-hero-wash absolute inset-0" />
  </div>;
}
