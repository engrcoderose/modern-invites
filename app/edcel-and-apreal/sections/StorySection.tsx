import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import SectionHeading from "../components/SectionHeading";
import StoryPhoto, { type StoryOrnament } from "../components/StoryPhoto";
import VintageAccent from "../components/VintageAccent";
import { storyChapters } from "../data/story";
import styles from "../styles/invitation.module.css";
import pattern from "../assets/designs/lovestory-pattern-deco.png";

const storyOrnaments = ["brassClip", "burgundyButton", "butterfly", "pressedFlowers", "ivoryHibiscus"] satisfies StoryOrnament[];
const patternTileWidth = 480;
const { props: { src: patternUrl } } = getImageProps({
  src: pattern,
  alt: "",
  width: patternTileWidth,
  height: Math.round(pattern.height * patternTileWidth / pattern.width),
});

export default function StorySection() {
  return (
    <section id="story" aria-labelledby="ea-story-title" className={`${styles.story} relative overflow-hidden px-6 py-20 sm:px-10 md:py-28`}>
      <div aria-hidden="true" className={`${styles.storyPattern} pointer-events-none absolute inset-0`}
        style={{ "--story-pattern": `url("${patternUrl}")`, "--story-pattern-width": `${patternTileWidth}px` } as CSSProperties} />
      <div className="relative mx-auto max-w-6xl">
        <VintageAccent variant="heartSeal" className="mx-auto mb-7 w-20" sizes="80px" />
        <SectionHeading id="ea-story-title" description="From a simple “Hi” in 2017 to our promise of forever.">
          Our Love Story
        </SectionHeading>
        <ol aria-label="Our love story in five chapters" className="space-y-16 pt-3 md:space-y-24 md:pt-6">
          {storyChapters.map((chapter, index) => {
            const reverse = index % 2 === 1;
            return (
              <li key={chapter.id}>
                <article aria-labelledby={`ea-story-${chapter.id}`}>
                  <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                    <div className={reverse ? "md:order-2" : ""}>
                      <StoryPhoto photo={chapter.photo} reverse={reverse} ornament={storyOrnaments[index]} />
                    </div>
                    <div className={`mx-auto w-full max-w-md ${reverse ? "md:order-1" : ""}`} data-reveal>
                      <p id={`ea-story-${chapter.id}`} className={`${styles.storyChapterDate} ${styles.formal} mb-4 text-xs uppercase leading-6 tracking-[.12em]`}>
                        {chapter.chapter}<span aria-hidden="true"> · </span>
                        {chapter.dateTime ? <time dateTime={chapter.dateTime}>{chapter.date}</time> : <span>{chapter.date}</span>}
                      </p>
                      <div className={`${styles.body} space-y-5`}>
                        {chapter.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
