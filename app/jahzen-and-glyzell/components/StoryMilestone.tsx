import type { StoryMilestoneData } from "../data/love-story";
import Image from "next/image";
import storyFlower from "../assets/artwork/story-flower.webp";
import Reveal from "./Reveal";
import StoryPoint from "./StoryPoint";
import styles from "../styles/invitation.module.css";

export default function StoryMilestone({ milestone, index, last }: { milestone: StoryMilestoneData; index: number; last: boolean }) {
  return <li>
    <Reveal className="grid grid-cols-[12px_minmax(0,1fr)] gap-x-5 lg:grid-cols-[5.5rem_12px_minmax(0,1fr)] lg:gap-x-6">
      <p data-reveal-item className={`${styles.storyDate} col-start-2 row-start-1 mb-3 lg:col-start-1 lg:mb-0 lg:pt-1`}>
        {milestone.dateTime ? <time dateTime={milestone.dateTime}>{milestone.label}</time> : milestone.label}
      </p>
      <div aria-hidden="true" className="relative col-start-1 row-span-2 row-start-1 lg:col-start-2">
        {!last && <span className={`${styles.storyRail} absolute -bottom-3 left-1/2 top-3 w-px -translate-x-1/2`} />}
        <StoryPoint />
      </div>
      <div className={`col-start-2 row-start-2 min-w-0 lg:col-start-3 lg:row-start-1 ${last ? "" : "pb-12 sm:pb-16"}`}>
        <span data-reveal-item aria-hidden="true" className={styles.storyOrdinal}>{String(index + 1).padStart(2, "0")}</span>
        <h3 data-reveal-item className={`${styles.storyMilestoneTitle} mt-1`}>{milestone.title}</h3>
        <div className={`${styles.storyCopy} mt-5 space-y-5`}>
          {milestone.paragraphs.map(paragraph => <p data-reveal-item key={paragraph}>{paragraph}</p>)}
        </div>
        {last && <Reveal stagger={false} className="mx-auto mt-10 w-20 sm:w-24"><Image src={storyFlower} alt="" aria-hidden="true" sizes="(max-width: 639px) 80px, 96px" className="h-auto w-full" /></Reveal>}
      </div>
    </Reveal>
  </li>;
}
