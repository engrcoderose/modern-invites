import Image from "next/image";
import { artwork, photos } from "../data/media";
import { story } from "../data/story";
import { PhotoFrame } from "../components/Stationery";
import styles from "../styles/invitation.module.css";

export default function StorySlide() {
  return <div data-invitation-scroll tabIndex={0} role="region" aria-label="Our love story" className={`${styles.storyScroller} absolute inset-0 overflow-y-auto overscroll-contain outline-none`}>
    <div className="relative mx-auto flex min-h-full w-full max-w-3xl flex-col items-center gap-9 px-6 pb-12 pt-16 sm:px-10 sm:pt-20">
      <div className="relative mb-5 aspect-[3/4] w-[clamp(180px,32svh,250px)] shrink-0">
        <PhotoFrame photo={photos.story} className="h-full w-full" />
        <Image src={artwork.storyFrame} alt="" className="pointer-events-none absolute -left-[12.5%] -top-[12.5%] h-[125%] w-[125%] max-w-none object-contain" sizes="clamp(225px, 40svh, 313px)" />
        <div className="absolute -bottom-[12%] -right-[14%] w-[90%]">
          <Image src={artwork.scroll} alt="" className="h-auto w-full" sizes="clamp(162px, 29svh, 225px)" />
          <h2 className={`${styles.storyHeading} absolute inset-x-[18%] inset-y-[18%] flex flex-col items-center justify-center text-center`} aria-label="Our Love Story"><span>Our Love</span><span>Story</span></h2>
        </div>
      </div>
      <div className={`${styles.storyCopy} w-full max-w-[580px] space-y-5 text-center`}>
        {story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </div>
  </div>;
}
