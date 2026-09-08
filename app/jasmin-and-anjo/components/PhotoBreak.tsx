import Image from "next/image";
import { Together } from "../prenup-media";

export default function PhotoBreak() {
  return (
    <section
      id="photo-break"
      aria-label="Anjo and Jasmin together"
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <Image
        src={Together}
        alt="Anjo and Jasmin sitting together, holding hands in the garden"
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-[52%_center] sm:object-center"
      />
    </section>
  );
}
