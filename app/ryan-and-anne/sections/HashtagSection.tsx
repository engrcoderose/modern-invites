import ElegantDivider from "../components/ElegantDivider";
import Image from "../components/OptimizedPhoto";
import { sectionPhotos } from "../data/section-photos";
import { wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function HashtagSection() {
  const photo = sectionPhotos.hashtagBackground;

  return (
    <section id="hashtag" aria-labelledby="ra-hashtag-title" className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-[#171714] px-6 py-14 text-[#f5f0e6] sm:min-h-[680px] sm:px-10 sm:py-20 lg:px-16">
      <Image src={photo.src} alt="" fill sizes="(min-width:640px) max(100vw, 1020px), max(100vw, 960px)" className="-z-20 object-cover object-[50%_65%] grayscale" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
      <div data-reveal-group className="mx-auto w-full max-w-3xl bg-black px-6 py-16 text-center sm:px-14 sm:py-20">
        <p data-reveal className={`${styles.eyebrow} mb-5 text-[#d1b788]`}>Our wedding hashtag</p>
        <h2 data-reveal id="ra-hashtag-title" className={styles.sectionTitle}>Share the love.</h2>
        <div data-reveal className="my-8"><ElegantDivider /></div>
        <p data-reveal className="mx-auto max-w-md text-sm leading-7 text-[#f5f0e6]/75">Capture your favorite moments and share them with our wedding hashtag.</p>
        <p data-reveal className={`${styles.hashtagText} mt-6 text-[#d1b788]`}>{wedding.hashtag}</p>
      </div>
    </section>
  );
}
