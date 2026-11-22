import Image from "next/image";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import { floralDivider } from "../data/design-media";
import { giftRegistry } from "../data/guest-information";
import { giftPhoto } from "../data/photo-layout";
import cornerFlowers from "../assets/designs/entourage_flower_top_left.png";

const CORNER_SIZES = "(min-width: 1273px) 280px, (min-width: 640px) 22vw, 28vw";
// A 3:2 source cropped to 4:5 needs 1.875 times the frame width for sharpness.
const PHOTO_SIZES =
  "(min-width: 1080px) 720px, (min-width: 1024px) calc(79.6875vw - 140.25px), (min-width: 768px) calc(79.6875vw - 114.75px), (min-width: 640px) 600px, 450px";

export default function GiftSection() {
  return (
    <ScrollScene
      id="gifts"
      aria-labelledby="jb-gifts-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-[#f5e1e6] px-6 py-20 text-center sm:px-12 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none opacity-80"
      >
        <Image
          src={cornerFlowers}
          alt=""
          sizes={CORNER_SIZES}
          draggable={false}
          className="absolute -left-4 -top-4 h-auto w-[28vw] max-w-[280px] sm:w-[22vw]"
        />
        <Image
          src={cornerFlowers}
          alt=""
          sizes={CORNER_SIZES}
          draggable={false}
          className="absolute -bottom-4 -right-4 h-auto w-[28vw] max-w-[280px] rotate-180 sm:w-[22vw]"
        />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-12 lg:gap-20">
        <ScrollLayer
          as="figure"
          profile="portrait"
          className="mx-auto w-full max-w-[240px] sm:max-w-xs md:max-w-sm"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
            <Image
              src={giftPhoto.src}
              alt={giftPhoto.alt}
              fill
              sizes={PHOTO_SIZES}
              loading="lazy"
              className="object-cover object-[25%_center]"
            />
          </div>
        </ScrollLayer>
        <div>
          <ScrollLayer
            as="h2"
            profile="heading"
            id="jb-gifts-title"
            className="jb-details-title"
          >
            {giftRegistry.title}
          </ScrollLayer>
          <Image
            src={floralDivider}
            alt=""
            aria-hidden="true"
            sizes="(min-width: 1024px) 160px, 112px"
            draggable={false}
            className="pointer-events-none mx-auto mt-4 h-auto w-28 select-none lg:w-40"
          />
          <ScrollLayer
            as="p"
            profile="text"
            staggerIndex={1}
            className="mx-auto mt-8 max-w-xl text-base leading-8 sm:text-lg sm:leading-9"
          >
            {giftRegistry.message}
          </ScrollLayer>
        </div>
      </div>
    </ScrollScene>
  );
}
