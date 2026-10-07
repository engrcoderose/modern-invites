import Image from "next/image";
import entrance from "../assets/designs/whimsical-entrance-place.png";
import couple from "../assets/designs/couples.png";

/** Supplied decorative illustrations; this scene does not depict either venue. */
export default function HeroGardenArtwork() {
  return (
    <div aria-hidden="true" className="relative w-full">
      <Image src={entrance} alt="" priority sizes="(min-width: 640px) 560px, 115vw" draggable={false} className="h-auto w-full" />
      <Image src={couple} alt="" priority sizes="(min-width: 640px) 151px, 31vw" draggable={false} className="absolute bottom-[3%] left-1/2 h-auto w-[27%] -translate-x-1/2" />
    </div>
  );
}
