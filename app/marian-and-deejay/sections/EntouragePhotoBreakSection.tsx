import Image from "next/image";
import { entouragePhotoBreak } from "../data/photo-break";

export default function EntouragePhotoBreakSection() {
  return (
    <section id="entourage-photo-break" aria-label="A moment together" className="mj-photo-break relative h-[100svh] w-full overflow-hidden">
      <Image
        src={entouragePhotoBreak.src}
        alt={entouragePhotoBreak.alt}
        fill
        quality={85}
        sizes="(max-aspect-ratio: 2/3) 67svh, 100vw"
        className="object-cover"
        style={{ objectPosition: entouragePhotoBreak.position }}
      />
    </section>
  );
}
