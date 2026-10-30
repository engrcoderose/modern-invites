import { loveStory } from "../data/love-story";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import StoryChapter from "../components/StoryChapter";
import Reveal from "../components/Reveal";
import { Ornament } from "../components/Ornament";
import styles from "../styles/invitation.module.css";

const chapterPhotoLabels = {
  hands: "A simple beginning",
  together: "Meeting in person",
  proposal: "The proposal",
};

export default function StorySection() {
  return <section id="story" tabIndex={-1} aria-labelledby="jg-story-title" className={`${styles.story} relative isolate scroll-mt-24 overflow-hidden px-5 py-16 sm:px-10 sm:py-24 lg:py-28`}>
    <div aria-hidden="true" className={`${styles.storyMonogram} pointer-events-none absolute -right-2 top-5 select-none sm:right-10`}>J<span>&</span>G</div>
    <div aria-hidden="true" className={`${styles.storyArc} pointer-events-none absolute -right-40 top-12 h-[560px] w-[460px] sm:-right-20`} />
    <div className="relative mx-auto max-w-6xl">
      <Reveal className="mb-10 text-center sm:mb-14"><p className={`${styles.storyOverline} mb-2`}>Our love story</p><Ornament className="mx-auto mb-5" /><h2 id="jg-story-title" className={styles.storyHeading}>{loveStory.title.map(line => <span className="block" key={line}>{line}</span>)}</h2><p data-story-intro className={`${styles.storyIntro} mx-auto mt-5 max-w-sm`}>{loveStory.intro}</p></Reveal>
      <div>
        {loveStory.chapters.map(chapter => {
          const photo = chapter.photo ? chapterPhotoLabels[chapter.photo] : null;
          const reversed = chapter.number === "02";
          return <article key={chapter.number} aria-labelledby={`jg-story-${chapter.number}`} className={`${styles.storyRow} border-b py-7 first:pt-0 last:border-b-0 last:pb-0 sm:py-9`}>
            <Reveal className={photo ? "grid grid-cols-[.94fr_1.06fr] items-stretch gap-4 sm:gap-8 lg:gap-12 [@media(max-width:359px)]:grid-cols-1" : ""}>
              <div className={reversed ? "order-2" : "order-1"}><StoryChapter chapter={chapter} /></div>
              {photo && <div className={`relative min-h-48 sm:min-h-64 [@media(max-width:359px)]:h-48 ${reversed ? "order-1" : "order-2"}`}><PhotoPlaceholder label={photo} /></div>}
            </Reveal>
          </article>;
        })}
      </div>
    </div>
  </section>;
}


