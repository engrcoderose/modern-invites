import Image from "next/image";
import HeroGardenArtwork from "../components/HeroGardenArtwork";
import HeroIntroduction from "../components/HeroIntroduction";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import background from "../assets/designs/gradient-bg.png";
import floralCorner from "../assets/designs/pink-flowers.png";
import floralBorder from "../assets/designs/pink-flowers-3.png";

export default function HeroSection() {
  return (
    <ScrollScene hero id="top" aria-labelledby="jb-couple" className="relative isolate flex min-h-[820px] flex-col items-center overflow-hidden bg-[#e7e7dd] px-5 pb-[340px] pt-16 text-center sm:min-h-[1040px] sm:pb-[390px] sm:pt-20 lg:pt-16">
      <ScrollLayer profile="hero-background" aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image src={background} alt="" fill priority sizes="100vw" className="select-none object-cover" />
      </ScrollLayer>
      <ScrollLayer profile="seam" aria-hidden className="jb-hero-blend pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-48" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-48 overflow-hidden sm:h-64">
        <ScrollLayer profile="floral-left" className="absolute -left-2 -top-2 w-[150px] sm:w-[240px] lg:w-[270px]"><Image src={floralCorner} alt="" priority sizes="(min-width: 1024px) 270px, (min-width: 640px) 240px, 150px" draggable={false} className="h-auto w-full select-none" /></ScrollLayer>
        <ScrollLayer profile="floral-right" className="absolute -right-2 -top-2 w-[150px] sm:w-[240px] lg:w-[270px]"><Image src={floralCorner} alt="" priority sizes="(min-width: 1024px) 270px, (min-width: 640px) 240px, 150px" draggable={false} className="h-auto w-full -scale-x-100 select-none" /></ScrollLayer>
      </div>
      <div data-ambient aria-hidden="true" className="jb-petal absolute left-[17%] top-[31%] h-3 w-2 rotate-12" />
      <div data-ambient aria-hidden="true" className="jb-petal jb-petal-late absolute right-[14%] top-[39%] h-4 w-2 -rotate-45" />
      <ScrollLayer profile="hero-copy" className="relative z-10 w-full max-w-xl">
        <HeroIntroduction />
      </ScrollLayer>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-24 left-1/2 w-[115%] max-w-[560px] -translate-x-1/2 sm:w-full">
        <ScrollLayer profile="hero-garden"><HeroGardenArtwork /></ScrollLayer>
      </div>
      <ScrollLayer profile="floral-left" aria-hidden className="pointer-events-none absolute -bottom-1 -left-8 w-[90%] max-w-[600px] sm:left-[calc(50%-420px)]"><Image data-ambient src={floralBorder} alt="" priority sizes="(min-width: 667px) 600px, 90vw" draggable={false} className="jb-garden-left h-auto w-full select-none" /></ScrollLayer>
      <ScrollLayer profile="floral-right" aria-hidden className="pointer-events-none absolute -bottom-1 -right-8 w-[90%] max-w-[600px] sm:right-[calc(50%-420px)]"><Image data-ambient src={floralBorder} alt="" priority sizes="(min-width: 667px) 600px, 90vw" draggable={false} className="jb-garden-right h-auto w-full select-none" /></ScrollLayer>
    </ScrollScene>
  );
}
