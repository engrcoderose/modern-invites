import Image from "next/image";
import { heroArtwork } from "../data/hero-artwork";
import HeroBirdFlight from "./HeroBirdFlight";

const GARDEN_SIZES = "(min-width: 840px) 840px, (min-width: 768px) 100vw, max(128vw, calc(84dvh - 60px))";

/** Decorative garden illustration; this scene does not depict either venue. */
export default function HeroGardenArtwork() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      <div className="absolute bottom-0 left-1/2 w-[calc(100%_+_2px)] -translate-x-1/2 translate-y-[10%]">
        <div data-hero-art="grass">
          <Image src={heroArtwork.grass} alt="" priority sizes="100vw" draggable={false} className="h-auto w-full" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[840px]">
        <div className="absolute bottom-[clamp(36px,10vw,84px)] left-1/2 w-[max(128%,calc(84dvh_-_60px))] -translate-x-1/2 md:w-full lg:bottom-[100px]">
          <div className="relative">
            <div data-hero-art="arch">
              <Image src={heroArtwork.arch} alt="" priority sizes={GARDEN_SIZES} draggable={false} className="h-auto w-full" />
            </div>
            <div className="absolute -top-[28%] left-[20%] w-[17%] -translate-x-3 translate-y-[18px] -rotate-1 md:-top-[14%] md:left-[10%]">
              <div data-hero-art="left-birds">
                <HeroBirdFlight side="left">
                  <Image src={heroArtwork.leftBirds} alt="" sizes="(min-width: 840px) 143px, (min-width: 768px) 17vw, max(22vw, calc(14.28dvh - 10.2px))" draggable={false} className="h-auto w-full" />
                </HeroBirdFlight>
              </div>
            </div>
            <div className="absolute -top-[24%] right-[15%] w-[19%] -translate-x-3 translate-y-[18px] -rotate-1 md:-top-[10%] md:right-[9%]">
              <div data-hero-art="right-birds">
                <HeroBirdFlight side="right">
                  <Image src={heroArtwork.rightBirds} alt="" sizes="(min-width: 840px) 160px, (min-width: 768px) 19vw, max(24.32vw, calc(15.96dvh - 11.4px))" draggable={false} className="h-auto w-full" />
                </HeroBirdFlight>
              </div>
            </div>
          </div>
        </div>
        <div data-hero-art="couple" className="absolute bottom-2 left-[26%] z-10 w-[35%] origin-bottom">
          <Image src={heroArtwork.couple} alt="" priority sizes="(min-width: 840px) 294px, 35vw" draggable={false} className="h-auto w-full" />
        </div>
      </div>
    </div>
  );
}
