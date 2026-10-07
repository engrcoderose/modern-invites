import Image from "next/image";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import TextReveal from "../components/TextReveal";
import { wedding } from "../data/wedding-data";
import { storyPhotos } from "../data/story-photos";
import { floralDivider, gardenUrn, flowerVine } from "../data/design-media";

export default function StorySection() {
  const [opening, relationship, ...chapters] = wedding.story;

  return (
    <ScrollScene id="story" aria-labelledby="jb-story-title" className="jb-story relative isolate overflow-hidden px-5 pb-24 pt-14 sm:px-8 sm:pb-36 sm:pt-20">
      <div className="mx-auto max-w-4xl">
        <div className="flow-root">
          <ScrollScene as="figure" className="mx-auto mb-6 w-[80%] max-w-[320px] sm:float-left sm:mb-8 sm:ml-0 sm:mr-8 sm:w-[48%] sm:max-w-[400px]"><ScrollLayer profile="portrait">
            <Image src={storyPhotos.portrait.src} alt={storyPhotos.portrait.alt} sizes="(min-width: 1024px) 400px, (min-width: 640px) 48vw, (min-width: 440px) 320px, 80vw" className="h-auto w-full" />
          </ScrollLayer></ScrollScene>
          <ScrollLayer as="h2" profile="heading" id="jb-story-title" className="jb-story-title mb-5 overflow-hidden whitespace-pre-line py-1 text-center sm:mb-7">{opening.title}</ScrollLayer>
          <div className="jb-story-prose space-y-5 text-sm leading-[1.75] text-[#35412f] sm:space-y-7 sm:text-base">
            <TextReveal>{opening.description}</TextReveal>
            <div>
              <h3 className="sr-only">{relationship.title}</h3>
              <TextReveal>{relationship.description}</TextReveal>
            </div>
          </div>
        </div>

        <Image src={floralDivider} alt="" aria-hidden="true" sizes="(min-width: 640px) 180px, 130px" draggable={false} className="pointer-events-none mx-auto my-10 h-auto w-[130px] select-none sm:my-12 sm:w-[180px]" />

        <ScrollScene as="figure" className="mx-auto mb-7 w-[86%] max-w-[660px] sm:mb-10">
          <div className="relative aspect-[7/4] overflow-hidden">
            <ScrollLayer profile="photo" className="absolute inset-0">
            <Image src={storyPhotos.landscape.src} alt={storyPhotos.landscape.alt} fill sizes="(min-width: 1024px) 660px, 80vw" style={{ objectPosition: storyPhotos.landscape.position }} className="object-cover" />
            </ScrollLayer>
          </div>
        </ScrollScene>
        <div className="jb-story-prose mx-auto max-w-3xl space-y-5 text-sm leading-[1.75] text-[#35412f] sm:space-y-7 sm:text-base">
          {chapters.map((chapter) => (
            <div key={chapter.title}>
              <h3 className="sr-only">{chapter.title}</h3>
              <TextReveal>{chapter.description}</TextReveal>
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="jb-story-garden pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-[1100px]">
        <div className="jb-story-vine">
          <Image src={flowerVine} alt="" sizes="(min-width: 1100px) 1015px, (min-width: 1024px) calc((100vw - 144px) * 1.062), (min-width: 640px) calc((100vw - 80px) * 1.062), calc((100vw - 40px) * 1.062)" draggable={false} className="select-none" />
        </div>
        <Image src={gardenUrn} alt="" sizes="(min-width: 640px) 144px, 96px" draggable={false} className="absolute -left-7 bottom-0 h-auto w-24 select-none sm:-left-8 sm:w-36 lg:left-0" />
        <Image src={gardenUrn} alt="" sizes="(min-width: 640px) 144px, 96px" draggable={false} className="absolute -right-7 bottom-0 h-auto w-24 -scale-x-100 select-none sm:-right-8 sm:w-36 lg:right-0" />
      </div>
    </ScrollScene>
  );
}
