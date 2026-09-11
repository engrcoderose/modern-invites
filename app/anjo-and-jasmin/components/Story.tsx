import Image from "next/image";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import FloralAccent from "./FloralAccent";
import { StoryWalk, StoryEmbrace } from "../../jasmin-and-anjo/media";
import PrenupMoment from "../../jasmin-and-anjo/assets/images/prenup/pexels-king-caplis-471600979-36266137.jpg";
import { wedding } from "../data";

export default function Story() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="text-[#624451]"
    >
      <div className="relative overflow-hidden bg-[#fff4fa] bg-[radial-gradient(ellipse_at_bottom_left,#e5eadd99,transparent_60%)] px-6 py-16 sm:px-10 md:py-24 lg:px-20">
        <FloralAccent
          kind="blue"
          className="-right-10 top-8 w-28 rotate-12 opacity-65 sm:w-44"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[.3em] text-[#946879] sm:text-xs">
              Our story
            </p>
            <h2
              id="story-title"
              className="mt-5 font-serif text-[clamp(2.75rem,4.5vw,4.5rem)] uppercase leading-[1.12] tracking-[-.035em]"
            >
              A love in
              <br />
              full bloom
            </h2>
            <div className="mt-8 max-w-lg space-y-7">
              {wedding.story.slice(0, 2).map((chapter) => (
                <article key={chapter.date}>
                  <h3 className="font-instrumentSerif text-2xl leading-tight sm:text-3xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-3 text-sm leading-8 text-[#756770] lg:text-base">
                    {chapter.description}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative aspect-[4/3] w-full overflow-hidden border-[8px] border-[#fffdf8] shadow-[10px_10px_0_#d8b9c733,0_18px_35px_-20px_#62445155]"
          >
            <Image
              src={StoryWalk}
              alt="Anjo and Jasmin walking hand in hand in the garden"
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              className="object-cover object-[50%_45%]"
            />
          </Reveal>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        <Reveal
          y={0}
          className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[600px]"
        >
          <Image
            src={StoryEmbrace}
            alt="Anjo and Jasmin sharing a quiet embrace"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[85%_center]"
          />
        </Reveal>
        <div className="relative flex items-center overflow-hidden bg-[#946879] px-8 py-16 text-[#fffaf5] sm:px-12 md:py-20 lg:p-20">
          <FloralAccent
            kind="cosmos"
            className="-right-24 -bottom-16 w-80 opacity-25 sm:w-[440px]"
            sizes="440px"
          />
          <Reveal className="relative mx-auto w-full max-w-lg">
            <p
              aria-label="Anjo and Jasmin initials"
              className="font-imperial text-6xl sm:text-7xl"
            >
              A &amp; J
            </p>
            {wedding.story.slice(2).map((chapter) => (
              <article key={chapter.date} className="mt-8">
                <h3 className="font-serif text-[clamp(2.5rem,4.5vw,4.5rem)] uppercase leading-[1.12] tracking-[-.035em]">
                  {chapter.title}
                </h3>
                <p className="mt-7 text-sm leading-8 text-[#fff4f8] lg:text-base">
                  {chapter.description}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </div>

      <div aria-hidden="true" className="h-12 bg-[#fbf8f1] sm:h-20 lg:h-24" />

      <div className="relative isolate grid items-center overflow-hidden bg-[#263d35] text-center text-[#fff4fa]">
        <Image
          src={PrenupMoment}
          alt="Anjo and Jasmin embracing in the garden, photographed from above"
          sizes="100vw"
          className="col-start-1 row-start-1 block h-auto w-full"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#263d35]/50 via-[#263d35]/45 to-[#263d35]/65"
        />
        <Reveal className="relative col-start-1 row-start-1 mx-auto max-w-4xl px-6 py-6 sm:py-16">
          <p className="text-[9px] uppercase tracking-[.2em] sm:text-[10px] sm:tracking-[.3em]">
            A moment we will keep forever
          </p>
          <h3 className="mt-4 font-instrumentSerif text-3xl leading-tight sm:mt-8 sm:text-6xl">
            In every lifetime,
            <br />
            <span className="font-meaCulpa text-[#ffe1ee]">
              I would find you.
            </span>
          </h3>
          <p className="mt-5 text-[9px] uppercase tracking-[.15em] sm:mt-10 sm:text-xs sm:tracking-[.2em]">
            Anjo &amp; Jasmin <span className="mx-2 sm:mx-3">·</span> Malabon ·
            2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}
