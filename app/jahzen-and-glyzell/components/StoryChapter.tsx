import type { LoveStoryChapter } from "../data/love-story";
import styles from "../styles/invitation.module.css";

export default function StoryChapter({ chapter }: { chapter: LoveStoryChapter }) {
  return <div className={`${styles.storyChapter} relative h-full pl-4 sm:pl-6`}>
    <h3 id={`jg-story-${chapter.number}`} className={`${styles.storyChapterLabel} mb-4 flex items-start gap-3 sm:gap-4`}>
      <span className={styles.storyChapterNumber}>{chapter.number}</span><span>{chapter.title}</span>
    </h3>
    <div className={`${styles.storyCopy} space-y-4`}>{chapter.paragraphs.map(paragraph => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}</div>
  </div>;
}
