import Image from "next/image";
import { heroPhotos } from "../data/hero-photos";

export default function OpeningHeroBackdrop() {
  const photo = heroPhotos[0];
  return <div aria-hidden="true" className="absolute inset-0">
    <Image src={photo.src} alt="" fill priority quality={85} sizes="(max-width: 639px) max(100vw, calc(150svh - 111px), 1080px), max(100vw, calc(150svh - 111px), 1020px)" className="object-cover" style={{ objectPosition: photo.position }} />
    <div className="mj-hero-wash absolute inset-0" />
  </div>;
}
