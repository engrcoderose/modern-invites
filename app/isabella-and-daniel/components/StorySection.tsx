import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { StoryChapter } from "../types";
import Reveal from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

interface StorySectionProps {
  title: string;
  chapters: StoryChapter[];
  image: StaticImageData;
}

export default function StorySection({ title, chapters, image }: StorySectionProps) {
  return (
    <section id="story" className="relative overflow-hidden bg-[#4b0e1d] px-5 py-24 text-[#f9f0e4] sm:px-8 sm:py-32 lg:px-12 lg:py-44">
      <div className="ambient-wash absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(187,111,103,.2),transparent_30%),linear-gradient(135deg,#3c0916_0%,#5b1326_55%,#380812_100%)]" />
      <div className="hero-grain absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <Reveal><SectionLabel light>Our story</SectionLabel></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 max-w-4xl font-instrumentSerif text-[clamp(3.6rem,8vw,8rem)] leading-[0.86] tracking-[-0.05em]">{title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-md border-l border-[#d8bd83]/35 pl-6 font-libreBaskerville text-sm leading-8 text-[#e8d9cd]/70 sm:ml-auto">
              Not a whirlwind, but a steady unfolding—one ordinary moment after another becoming a life we could not imagine without.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
          <Reveal className="relative lg:sticky lg:top-28 lg:h-fit">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={image} alt="The couple sharing a tender moment" fill sizes="(max-width: 1024px) 90vw, 38vw" className="object-cover transition-transform duration-[1.4s] hover:scale-[1.025]" />
              <div className="absolute inset-0 border border-white/10" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/30 pt-4 text-[0.58rem] uppercase tracking-[0.25em] text-white/75">
                <span>Isabella &amp; Daniel</span><span>Since 2016</span>
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute bottom-0 left-[2.7rem] top-0 w-px bg-gradient-to-b from-[#d8bd83]/0 via-[#d8bd83]/40 to-[#d8bd83]/0 sm:left-[4.6rem]" />
            {chapters.map((chapter, index) => (
              <Reveal key={chapter.date} delay={index * 0.06} className="relative grid grid-cols-[5.4rem_1fr] gap-5 pb-16 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-10 sm:pb-24">
                <div className="relative pt-2 text-xs tracking-[0.25em] text-[#d8bd83]">
                  {chapter.date}
                  <span className="absolute right-[2.2rem] top-2.5 h-2 w-2 rotate-45 border border-[#d8bd83] bg-[#511020] sm:right-[4rem]" />
                </div>
                <div>
                  <span className="font-instrumentSerif text-sm italic text-[#d8bd83]/70">0{index + 1}</span>
                  <h3 className="mt-2 font-instrumentSerif text-4xl tracking-[-0.025em] sm:text-5xl">{chapter.title}</h3>
                  <p className="mt-5 max-w-xl font-libreBaskerville text-sm leading-8 text-[#e8d9cd]/65">{chapter.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
