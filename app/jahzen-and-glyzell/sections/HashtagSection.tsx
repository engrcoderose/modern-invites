import Reveal from "../components/Reveal";
import Image from "next/image";
import { Ornament } from "../components/Ornament";
import { photos } from "../data/photos";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function HashtagSection() {
  return <section id="hashtag" tabIndex={-1} aria-labelledby="jg-hashtag-title" className={`${styles.hashtagSection} relative isolate flex min-h-[640px] scroll-mt-24 items-center overflow-hidden px-5 py-14 sm:min-h-[680px] sm:px-10 sm:py-20`}>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <Image src={photos.invitation} alt="" fill sizes="(max-width: 639px) max(100vw, 960px), max(100vw, 1020px)" className={`${styles.hashtagPhoto} object-cover object-[50%_65%]`} />
      <div className={`${styles.hashtagShade} absolute inset-0`} />
    </div>
    <Reveal className={`${styles.hashtagPanel} mx-auto w-full max-w-3xl px-5 py-14 text-center sm:px-14 sm:py-20`}>
      <p className={styles.hashtagLabel}>Our wedding hashtag</p>
      <h2 id="jg-hashtag-title" className={`${styles.hashtagHeading} mt-5`}>Share the love.</h2>
      <Ornament className={`${styles.hashtagOrnament} mx-auto my-7 sm:my-8`} />
      <p className={`${styles.prose} mx-auto max-w-md`}>Capture your favorite moments and share them with our wedding hashtag.</p>
      <p className={`${styles.hashtagText} mt-7 select-text break-words`}>{wedding.hashtag}</p>
    </Reveal>
  </section>;
}
