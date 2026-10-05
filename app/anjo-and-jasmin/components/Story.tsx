import { BrownLineFlower } from "../design-media";
import Image from "next/image";
import Reveal from "./motion/Reveal";
import SectionPetals from "./SectionPetals";
import { storyPhotos, storyQuotePhoto } from "../media";
import { wedding } from "../data";
import PhotoMotion from "./motion/PhotoMotion";
import StoryNarrative from "./StoryNarrative";

export default function Story() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="text-[rgb(var(--aj-ink))]"
    >
      <div className="relative overflow-hidden bg-[rgb(var(--aj-sand))] px-6 py-16 sm:px-10 md:py-24 lg:px-20">
        <SectionPetals />
        <div className="relative mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14 xl:gap-20">
          <div className="relative">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[.3em] text-[rgb(var(--aj-accent-dark))] sm:text-xs">
                Our story
              </p>
              <h2
                id="story-title"
                className="mt-4 max-w-xl font-instrumentSerif text-[clamp(2.1rem,3.4vw,3.5rem)] uppercase leading-[1.08] tracking-[.025em]"
              >
                {wedding.story.title}
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 items-start gap-3 sm:gap-5">
              {storyPhotos.map((photo, index) => (
                <Reveal key={photo.alt} delay={0.1 + index * 0.12} y={40} scale={0.98}>
                  <figure>
                    <div className={`relative w-full overflow-hidden ${index === 0 ? "aspect-[7/10]" : "aspect-[7/13]"}`}>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 1023px) 120vw, 800px"
                        style={{ objectPosition: index === 0 ? "18% 45%" : photo.position }}
                        className="object-cover"
                      />
                    </div>
                    {index === 0 && <figcaption aria-label="Anjo and Jasmin" className="mt-4 text-right font-imperial text-4xl leading-none text-[rgb(var(--aj-accent-dark))] sm:text-5xl">A &amp; J</figcaption>}
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:self-center">
            <Reveal y={16}>
              <Image src={BrownLineFlower} alt="" aria-hidden="true" sizes="(max-width: 639px) 256px, 288px" className="pointer-events-none mx-auto mb-7 h-auto w-64 max-w-full select-none sm:mb-8 sm:w-72" />
            </Reveal>
            <StoryNarrative />
          </div>
        </div>
      </div>

      <PhotoMotion>
        <Image
          src={storyQuotePhoto.src}
          alt={storyQuotePhoto.alt}
          sizes="100vw"
          className="block h-auto w-full"
        />
      </PhotoMotion>
    </section>
  );
}
