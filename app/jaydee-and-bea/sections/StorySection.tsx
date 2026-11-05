import Image from "next/image";
import ScrollLayer from "../components/ScrollLayer";
import TextReveal from "../components/TextReveal";
import { wedding } from "../data/wedding-data";
import { storyPhotos } from "../data/story-photos";
import flowerBorder from "../assets/designs/story-flower-border.webp";
import photoFlowers from "../assets/designs/flower.png";
import styles from "../styles/story.module.css";

function storyText(description: string) {
  return description.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") ? <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong> : part,
  );
}

export default function StorySection() {
  const [opening, relationship, ...chapters] = wedding.story;

  return (
    <section id="story" aria-labelledby="jb-story-title" className={`${styles.section} relative isolate overflow-hidden px-5 pb-24 pt-8 sm:px-8 sm:pb-32 sm:pt-12 lg:px-16 lg:pb-40 lg:pt-16`}>
      <div className="mx-auto max-w-5xl">
        <div className="flow-root sm:grid sm:grid-cols-[0.9fr_1.1fr] sm:items-center sm:gap-8 lg:gap-12">
          <ScrollLayer as="figure" profile="portrait" staggerIndex={1} className="float-left mb-3 mr-4 w-[49%] sm:float-none sm:m-0 sm:w-full">
            {/* Compensate for the transparent canvas; the painted right edge stays inside the figure. */}
            <Image src={storyPhotos.portrait.src} alt={storyPhotos.portrait.alt} sizes="(min-width: 1152px) 549px, (min-width: 1024px) calc(56.25vw - 99px), (min-width: 640px) calc(56.25vw - 54px), calc(61.25vw - 24.5px)" loading="lazy" className="-ml-[12%] h-auto w-[125%] max-w-none" />
          </ScrollLayer>
          <div className="text-sm leading-[1.8] sm:text-base lg:text-[1.0625rem] lg:leading-[1.85]">
            <ScrollLayer as="h2" profile="heading" id="jb-story-title" className={`${styles.heading} mb-5 whitespace-pre-line py-1 text-center sm:mb-7`}>{opening.title}</ScrollLayer>
            <div className="space-y-5 sm:space-y-7">
              <TextReveal staggerIndex={2} className="whitespace-pre-line">{storyText(opening.description)}</TextReveal>
              <div>
                <h3 className="sr-only">{relationship.title}</h3>
                <TextReveal staggerIndex={3} className="whitespace-pre-line">{storyText(relationship.description)}</TextReveal>
              </div>
            </div>
          </div>
        </div>

        <ScrollLayer as="figure" profile="photo" className="relative mx-auto mt-10 w-[84%] max-w-[840px] sm:mt-14 lg:mt-20">
          <div className="relative aspect-[5/3] overflow-hidden">
            <Image src={storyPhotos.landscape.src} alt={storyPhotos.landscape.alt} fill sizes="(min-width: 1128px) 840px, (min-width: 1024px) calc(84vw - 107.52px), (min-width: 640px) calc(84vw - 53.76px), calc(84vw - 33.6px)" style={{ objectPosition: storyPhotos.landscape.position }} className="object-cover" loading="lazy" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -right-5 -top-5 w-20 select-none sm:-right-7 sm:-top-7 sm:w-28 lg:-right-10 lg:-top-10 lg:w-40">
            <Image src={photoFlowers} alt="" sizes="(min-width: 1024px) 160px, (min-width: 640px) 112px, 80px" loading="lazy" draggable={false} className="h-auto w-full" />
          </div>
        </ScrollLayer>
        <div className="mx-auto mt-6 w-[84%] max-w-[840px] space-y-6 text-sm leading-[1.85] sm:mt-8 sm:space-y-8 sm:text-base lg:text-[1.0625rem]">
          {chapters.map((chapter, index) => (
            <div key={chapter.title}>
              <h3 className="sr-only">{chapter.title}</h3>
              <TextReveal staggerIndex={index + 1} className="whitespace-pre-line">{storyText(chapter.description)}</TextReveal>
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden select-none">
        <Image src={flowerBorder} alt="" sizes="(min-width: 640px) 100vw, 640px" loading="lazy" draggable={false} className="h-auto w-full min-w-[640px] max-w-none flex-none" />
      </div>
    </section>
  );
}
