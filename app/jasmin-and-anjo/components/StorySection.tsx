import Image, { type StaticImageData } from "next/image";
import type { StoryChapter } from "../types";
import Reveal from "./motion/Reveal";
import Petals from "../assets/images/designs/white-petals.png";
import Daisies from "../assets/images/designs/small-daisy.png";

interface StorySectionProps {
  title: string;
  chapters: StoryChapter[];
  image: StaticImageData;
  secondImage: StaticImageData;
}

export default function StorySection({
  title,
  chapters,
  image,
  secondImage,
}: StorySectionProps) {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative isolate overflow-hidden bg-[#fff4fa] px-6 py-20 text-[#465a48] sm:px-10 sm:py-24 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <Image
          src={Petals}
          alt=""
          fill
          sizes="100vw"
          className="object-contain opacity-70"
        />
        <Image
          src={Daisies}
          alt=""
          sizes="(max-width: 840px) 96px, 160px"
          className="absolute -right-4 -top-6 h-auto w-24 rotate-12 opacity-85 sm:w-40"
        />
        <Image
          src={Daisies}
          alt=""
          sizes="(max-width: 840px) 112px, 176px"
          className="absolute -bottom-6 -left-6 h-auto w-28 -rotate-12 opacity-85 sm:w-44"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-14 xl:gap-20">
        <div>
          <Reveal>
            <h2
              id="story-title"
              className="max-w-lg font-instrumentSerif text-[clamp(3.6rem,5.5vw,6rem)] leading-[0.95] tracking-[-0.045em]"
            >
              {title}
            </h2>
          </Reveal>
          <div className="mt-9 grid grid-cols-2 items-start gap-3 sm:mt-12 sm:gap-5">
            <Reveal delay={0.1}>
              <div className="relative aspect-[3/4.3] overflow-hidden bg-[#eadfe4]">
                <Image
                  src={image}
                  alt="Anjo and Jasmin together in the garden"
                  fill
                  sizes="(max-width: 1024px) 44vw, 26vw"
                  className="object-cover object-center"
                />
              </div>
              <p
                className="mt-6 text-right font-meaCulpa text-5xl text-[#637b65] sm:mt-8 sm:text-6xl"
                aria-label="Anjo and Jasmin"
              >
                A &amp; J
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative aspect-[3/5.6] overflow-hidden bg-[#eadfe4]">
                <Image
                  src={secondImage}
                  alt="Anjo and Jasmin sharing a quiet embrace"
                  fill
                  sizes="(max-width: 1024px) 44vw, 26vw"
                  className="object-cover object-[85%_center]"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10 lg:pt-5">
          {chapters.map((chapter, index) => (
            <Reveal key={chapter.date} delay={index * 0.1}>
              <article>
                <p className="font-sans text-xs tracking-[0.2em] text-[#97737a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-instrumentSerif text-3xl leading-tight tracking-[-0.025em] sm:text-4xl">
                  {chapter.title}
                </h3>
                <p className="mt-3 max-w-xl font-libreBaskerville text-sm leading-7 sm:leading-8">
                  {chapter.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
