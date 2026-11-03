import { storyMilestones } from "../data/love-story";
import StoryPortrait from "../components/StoryPortrait";
import StoryMilestone from "../components/StoryMilestone";
import Reveal from "../components/Reveal";
import styles from "../styles/invitation.module.css";
import StoryBackground from "../components/StoryBackground";
import Image from "next/image";
import heartRecord from "../assets/artwork/story-heart-record.webp";

export default function StorySection() {
  return <section id="story" tabIndex={-1} aria-labelledby="jg-story-title" className={`${styles.story} relative isolate scroll-mt-24 px-6 py-20 sm:px-10 sm:py-28 lg:px-16`}>
    <StoryBackground />
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <div aria-hidden="true" className="mx-auto mb-4 w-32 sm:w-36">
          <Image src={heartRecord} alt="" sizes="(max-width: 639px) 128px, 144px" className="h-auto w-full" />
        </div>
        <h2 id="jg-story-title" className={`${styles.heading} text-center italic`}>Our story</h2>
      </Reveal>
      <div className="mt-12 grid items-start gap-12 sm:mt-16 sm:gap-16 lg:grid-cols-[.9fr_1.1fr] xl:gap-20">
        <div className="mx-auto w-full max-w-md lg:sticky lg:top-28 lg:self-start">
          <Reveal stagger={false}><StoryPortrait /></Reveal>
        </div>
        <ol>
          {storyMilestones.map((milestone, index) => <StoryMilestone key={milestone.id} milestone={milestone} index={index} last={index === storyMilestones.length - 1} />)}
        </ol>
      </div>
    </div>
  </section>;
}


