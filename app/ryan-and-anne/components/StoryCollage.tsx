import Image from "./OptimizedPhoto";
import { sectionPhotos } from "../data/section-photos";
import styles from "../styles/wedding.module.css";

export default function StoryCollage() {
  const walking = sectionPhotos.storyWalking;
  const portrait = sectionPhotos.storyPortrait;

  return (
    <div data-reveal-group className="relative mx-auto aspect-[1/1.45] w-full max-w-[900px]">
      <h2 id="ra-story-title" className={styles.storyTitle}>
        <span data-reveal className={`${styles.storyFirstLine} absolute left-0 top-[30%] w-[48%] text-center`}>Our</span>{" "}
        <span data-reveal className={`${styles.storySecondLine} absolute right-0 top-[54%] w-[48%] text-center`}>Lovestory</span>
      </h2>
      <div data-reveal="image" className={`${styles.storyLeftPhoto} absolute left-[5%] top-[44%] aspect-[2/3] w-[44%] overflow-hidden`}>
        <Image src={walking.src} alt={walking.alt} fill className={`${styles.storyWalkingPhoto} object-cover object-center`}
          sizes="(min-width:1028px) 1206px, (min-width:1024px) calc((100vw - 128px) * 1.34), (min-width:640px) calc((100vw - 80px) * 1.34), calc((100vw - 48px) * 1.34)" />
      </div>
      <div data-reveal="image" className={`${styles.storyRightPhoto} absolute right-[2%] top-[5%] aspect-[2/3] w-[44%] overflow-hidden`}>
        <Image src={portrait.src} alt={portrait.alt} fill className="object-cover object-[15%_50%]"
          sizes="(min-width:1028px) 891px, (min-width:1024px) calc((100vw - 128px) * 0.99), (min-width:640px) calc((100vw - 80px) * 0.99), calc((100vw - 48px) * 0.99)" />
      </div>
    </div>
  );
}
