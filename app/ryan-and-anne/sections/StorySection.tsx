import Image from "next/image";
import StoryCollage from "../components/StoryCollage";
import StoryFlower from "../components/StoryFlower";
import heartKeychain from "../assets/design/heart-keychain-ribbon.png";
import { storyParagraphs } from "../data/story";
import styles from "../styles/wedding.module.css";

export default function StorySection() {
  return (
    <section
      id="story"
      className="bg-[#f1f0ed] px-6 pb-16 pt-8 sm:px-10 md:pb-32 md:pt-12 lg:px-16"
      aria-labelledby="ra-story-title"
    >
      <div className="mx-auto max-w-[900px]">
        <StoryCollage />
        <div data-reveal="image" className="mb-10">
          <StoryFlower />
        </div>
        <div
          data-reveal-group
          className={`${styles.storyCopy} mx-auto max-w-[720px] space-y-6 px-4 text-[#4e493f] sm:px-0`}
        >
          {storyParagraphs.map((paragraph) => (
            <p data-reveal key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
        <div data-reveal="image" className="mt-8 sm:mt-12">
          <Image
            src={heartKeychain}
            alt=""
            aria-hidden="true"
            sizes="(min-width: 640px) 320px, 256px"
            className={`${styles.heartKeychain} mx-auto h-auto w-64 max-w-full sm:w-80`}
          />
        </div>
      </div>
    </section>
  );
}
