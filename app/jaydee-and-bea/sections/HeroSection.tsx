import Image from "next/image";
import HeroGardenArtwork from "../components/HeroGardenArtwork";
import HeroIntroduction from "../components/HeroIntroduction";
import HeroEntrance from "../components/HeroEntrance";
import { heroArtwork } from "../data/hero-artwork";

const CORNER_SIZES = "(min-width: 858px) 300px, (min-width: 768px) 35vw, (min-width: 750px) 300px, 40vw";

export default function HeroSection() {
  return (
    <section id="top" aria-labelledby="jb-couple" className="jb-hero relative isolate min-h-[max(calc(100dvh_-_72px),clamp(460px,125vw,900px))] overflow-hidden text-center md:min-h-[clamp(520px,125vw,900px)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-75">
        <Image
          src={heroArtwork.background}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 100vw, max(100vw, calc(66.67dvh - 48px), 307px)"
          draggable={false}
          className="object-cover object-center"
        />
      </div>
      <HeroEntrance>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
          <div className="absolute inset-x-0 top-0 z-20">
            <div className="absolute -left-1 -top-0.5 w-[40%] max-w-[300px] md:w-[35%]">
              <div data-hero-art="upper-flower" className="origin-top-left">
                <Image src={heroArtwork.leftFlowers} alt="" priority sizes={CORNER_SIZES} draggable={false} className="h-auto w-full select-none" />
              </div>
            </div>
            <div className="absolute -right-1 top-0 w-[40%] max-w-[300px] md:w-[35%]">
              <div data-hero-art="upper-flower" className="origin-top-right">
                <Image src={heroArtwork.rightFlowers} alt="" priority sizes={CORNER_SIZES} draggable={false} className="h-auto w-full select-none" />
              </div>
            </div>
          </div>
          <HeroGardenArtwork />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-xl px-5 pt-8 sm:pt-10 md:pt-12">
          <HeroIntroduction />
        </div>
      </HeroEntrance>
    </section>
  );
}
