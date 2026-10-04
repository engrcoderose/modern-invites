import Image from "next/image";
import { BrownLineFlower } from "../design-media";
import Reveal from "./motion/Reveal";
import FloralAccent from "./FloralAccent";
import { storyPhotos, storyQuotePhoto } from "../media";
import { wedding } from "../data";
import Monogram from "./Monogram";

export default function Story() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="text-[rgb(var(--aj-ink))]"
    >
      <div className="relative overflow-hidden bg-[rgb(var(--aj-sand))] bg-[radial-gradient(ellipse_at_bottom_left,#cfa99933,transparent_60%)] px-6 py-16 sm:px-10 md:py-24 lg:px-20">
        <FloralAccent
          kind="blue"
          className="-right-10 top-8 w-28 rotate-12 opacity-65 sm:w-44"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[.3em] text-[rgb(var(--aj-accent-dark))] sm:text-xs">
              Our story
            </p>
            <h2
              id="story-title"
              className="mt-5 font-serif text-[clamp(2.25rem,4vw,3.5rem)] uppercase leading-[1.12] tracking-[-.035em]"
            >
              {wedding.story.title}
            </h2>
            <div className="mt-8 max-w-lg space-y-5 text-sm leading-8 text-[rgb(var(--aj-muted))] lg:text-base">
              {wedding.story.chapters[0].paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative aspect-[4/3] w-full overflow-hidden border-[8px] border-[rgb(var(--aj-paper))] shadow-[10px_10px_0_#d3b6a133,0_18px_35px_-20px_#51423755]"
          >
            <Image
              src={storyPhotos[0].src}
              alt={storyPhotos[0].alt}
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              style={{ objectPosition: storyPhotos[0].position }}
              className="object-cover"
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
            src={storyPhotos[1].src}
            alt={storyPhotos[1].alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectPosition: storyPhotos[1].position }}
            className="object-cover"
          />
        </Reveal>
        <div className="relative flex items-center overflow-hidden bg-[rgb(var(--aj-sand))] px-8 pb-36 pt-16 text-[rgb(var(--aj-ink))] sm:px-12 sm:pb-48 md:pt-20 lg:px-20">
          <Reveal className="relative mx-auto w-full max-w-lg">
            <Monogram className="h-28 w-28 sm:h-32 sm:w-32" sizes="128px" />
            {wedding.story.chapters.slice(1).map((chapter) => (
              <article key={chapter.title} className="mt-8">
                <h3 className="font-serif text-[clamp(2.5rem,4.5vw,4.5rem)] uppercase leading-[1.12] tracking-[-.035em]">
                  {chapter.title}
                </h3>
                <div className="mt-7 space-y-5 text-sm leading-8 text-[rgb(var(--aj-muted))] lg:text-base">
                  {chapter.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative h-12 bg-[rgb(var(--aj-sand))] sm:h-20 lg:h-24"
      >
        <Image
          src={BrownLineFlower}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-auto w-80 max-w-full select-none sm:w-[440px] md:max-w-[50%]"
          sizes="(max-width: 639px) 320px, 440px"
        />
      </div>

      <div className="relative isolate grid items-center overflow-hidden bg-[rgb(var(--aj-olive-deep))] text-center text-[#f2dcdf]">
        <Image
          src={storyQuotePhoto.src}
          alt={storyQuotePhoto.alt}
          sizes="100vw"
          className="col-start-1 row-start-1 block h-auto w-full"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--aj-olive-deep))]/50 via-[rgb(var(--aj-olive-deep))]/45 to-[rgb(var(--aj-olive-deep))]/65"
        />
        <Reveal className="relative col-start-1 row-start-1 mx-auto max-w-4xl px-6 py-6 sm:py-16">
          <h3 className="font-instrumentSerif text-3xl leading-tight sm:text-6xl">
            In every lifetime,
            <br />
            <span className="font-meaCulpa text-[#ead0ba]">
              I would find you.
            </span>
          </h3>
        </Reveal>
      </div>
    </section>
  );
}
