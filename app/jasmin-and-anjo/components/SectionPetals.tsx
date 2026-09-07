import Image from "next/image";
import Petals from "../assets/images/designs/white-petals.png";

/** Scattered petals kept behind the section's text and interactive content. */
export default function SectionPetals() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <Image
        src={Petals}
        alt=""
        sizes="(max-width: 640px) 240px, 420px"
        className="absolute -left-16 -top-16 h-auto w-[240px] rotate-[-18deg] opacity-90 drop-shadow-[0_2px_3px_rgba(148,104,121,0.12)] sm:-left-12 sm:w-[420px]"
      />
      <Image
        src={Petals}
        alt=""
        sizes="(max-width: 640px) 220px, 380px"
        className="absolute -bottom-20 -right-14 h-auto w-[220px] rotate-[155deg] opacity-80 drop-shadow-[0_2px_3px_rgba(148,104,121,0.12)] sm:-right-8 sm:w-[380px]"
      />
    </div>
  );
}
