import Image from "next/image";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import Botanicals from "../../jasmin-and-anjo/components/Botanicals";
import { StoryWalk, StoryEmbrace } from "../../jasmin-and-anjo/media";
import PrenupMoment from "../../jasmin-and-anjo/assets/images/prenup/pexels-king-caplis-471600979-36266137.jpg";
import { wedding } from "../data";

export default function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="text-[#624451]">
      <div className="relative overflow-hidden bg-[#fff4fa] bg-[radial-gradient(ellipse_at_bottom_left,#e5eadd99,transparent_60%)] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Botanicals className="-left-16 bottom-0 w-56 opacity-25" />
        <Botanicals className="-right-20 top-0 w-56 rotate-180 opacity-25" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <p className="text-[10px] uppercase tracking-[.3em] text-[#946879] sm:text-xs">Our story</p>
            <h2 id="story-title" className="mt-5 font-instrumentSerif text-[clamp(3.4rem,6vw,5.75rem)] leading-[1.05] tracking-[-.035em]">A love in <span className="font-meaCulpa font-normal text-[#946879]">full bloom</span></h2>
          </Reveal>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <Reveal className="relative mx-auto w-full max-w-xl">
              <div className="grid grid-cols-2 items-start gap-4 sm:gap-5">
                <figure className="rounded-t-[8rem] rounded-b-xl border border-[#d8c8ce] bg-[#fffdf8] p-2 pb-4 shadow-[0_15px_40px_-20px_#62445155]">
                  <div className="relative aspect-[3/5] overflow-hidden rounded-t-[7rem] rounded-b-md">
                    <Image src={StoryWalk} alt="Anjo and Jasmin walking hand in hand in the garden" fill sizes="(max-width: 640px) 43vw, (max-width: 1024px) 260px, 270px" className="object-cover object-[50%_45%]" />
                  </div>
                  <figcaption className="mt-4 text-center font-meaCulpa text-2xl text-[#946879] sm:text-3xl">Anjo &amp; Jasmin</figcaption>
                </figure>
                <figure className="mt-12 rounded-t-[8rem] rounded-b-xl border border-[#d8c8ce] bg-[#fffdf8] p-2 pb-4 shadow-[0_15px_40px_-20px_#62445155] sm:mt-20">
                  <div className="relative aspect-[3/5] overflow-hidden rounded-t-[7rem] rounded-b-md">
                    <Image src={StoryEmbrace} alt="Anjo and Jasmin sharing a quiet embrace" fill sizes="(max-width: 640px) 43vw, (max-width: 1024px) 260px, 270px" className="object-cover object-[85%_center]" />
                  </div>
                  <figcaption className="mt-4 text-center font-meaCulpa text-2xl text-[#637b65] sm:text-3xl">Together, in bloom</figcaption>
                </figure>
              </div>
            </Reveal>

            <ol className="relative space-y-9 sm:space-y-12">
              {wedding.story.map((chapter, index) => (
                <li key={chapter.date} className="relative pl-14 sm:pl-16">
                  {index < wedding.story.length - 1 && <span aria-hidden="true" className="absolute bottom-[-3rem] left-5 top-10 w-px bg-[#d8b9c7]/70" />}
                  <Reveal y={18} className="relative">
                    <article>
                      <span aria-hidden="true" className="absolute -left-14 top-0 grid h-10 w-10 place-items-center rounded-full border border-[#d8b9c7] bg-[#fffdf8] font-instrumentSerif text-lg text-[#946879] sm:-left-16">{chapter.date}</span>
                      <h3 className="font-instrumentSerif text-3xl leading-tight tracking-[-.02em] sm:text-4xl">{chapter.title}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-8 text-[#756770] sm:text-base">{chapter.description}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden bg-[#263d35] px-6 py-24 text-center text-[#fff4fa] sm:min-h-[540px]">
        <Image src={PrenupMoment} alt="Anjo and Jasmin embracing in the garden, photographed from above" fill sizes="100vw" className="-z-20 object-cover object-[42%_center]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#263d35]/50 via-[#263d35]/45 to-[#263d35]/65" />
        <Reveal className="mx-auto max-w-4xl">
          <p className="text-[10px] uppercase tracking-[.3em]">A moment we will keep forever</p>
          <h3 className="mt-8 font-instrumentSerif text-4xl leading-tight sm:text-6xl">In every lifetime,<br /><span className="font-meaCulpa text-[#ffe1ee]">I would find you.</span></h3>
          <p className="mt-10 text-xs uppercase tracking-[.2em]">Anjo &amp; Jasmin <span className="mx-3">·</span> Malabon · 2026</p>
        </Reveal>
      </div>
    </section>
  );
}
