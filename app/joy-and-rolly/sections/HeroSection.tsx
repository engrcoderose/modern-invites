import Image from "next/image";
import HeroFlorals from "../components/HeroFlorals";
import backdrop from "../assets/hero-lavender-wash.webp";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function HeroSection() {
  return <section id="invitation" className={`${styles.hero} relative isolate flex min-h-[calc(100svh-61px)] items-center justify-center overflow-hidden px-5 py-14 text-center sm:px-10 sm:py-12 lg:py-20`}>
    <Image src={backdrop} alt="" fill sizes="100vw" className="pointer-events-none -z-20 select-none object-cover" />
    <HeroFlorals />
    <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
      <div className={`${styles.heroDetails} ${styles.heroIntroDetails} space-y-3`}>
        <p>{wedding.date.display}</p>
        <p>Friday · 3:00 PM · Davao City</p>
      </div>
      <h1 id="jr-title" aria-label={wedding.couple.display} tabIndex={-1} className={`${styles.heroNames} ${styles.heroIntroNames} my-7 flex flex-wrap items-center justify-center gap-x-[clamp(0.75rem,2vw,2rem)] gap-y-0 outline-none sm:my-8`}>
        <span>Joy</span><span className={styles.heroAmpersand}>&amp;</span><span>Rolly</span>
      </h1>
      <p data-hero-arrival-end className={`${styles.heroInvitation} ${styles.heroIntroMessage} mx-auto max-w-[48ch] sm:max-w-none`}>With grateful hearts, we invite you to share in the joy of our wedding day.</p>
    </div>
  </section>;
}
