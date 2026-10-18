import { ArrowDown } from "lucide-react";
import FloralArtwork from "../components/FloralArtwork";
import HeroSlideshow from "../components/HeroSlideshow";
import ParallaxLayer from "../components/ParallaxLayer";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function HeroSection() {
  const [groomName, brideName] = wedding.couple.display.split(" & ");
  return (
    <section id="mi-invitation" aria-labelledby="mi-title" className={`${styles.hero} relative isolate flex min-h-dvh items-center justify-center overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-16 [@media(max-height:500px)]:py-3`}>
      <HeroSlideshow />
      <div aria-hidden="true" className={`${styles.heroShade} pointer-events-none absolute inset-0`} />
      <div data-hero-copy className={`${styles.heroCopy} relative z-20 mx-auto max-w-4xl`}>
        <p className={`${styles.heroLabel} ${styles.serifDetail} mb-3 text-sm italic tracking-[.06em] sm:mb-4 sm:text-base`}>The wedding of</p>
        <h1 id="mi-title" aria-label={wedding.couple.display} tabIndex={-1} className={`${styles.coupleNames} flex flex-col items-center justify-center sm:flex-row sm:gap-4`}>
          <span className={`${styles.heroWrittenName} inline-block`}>{groomName}</span>
          <span aria-hidden="true" className={`${styles.heroWrittenName} ${styles.coupleAmpersand} inline-block`}>&amp;</span>
          <span className={`${styles.heroWrittenName} inline-block`}>{brideName}</span>
        </h1>
        <p data-hero-detail="date" className={`${styles.heroDetail} ${styles.date} mt-5`}>{wedding.date.display}</p>
        <p data-hero-detail="location" className={`${styles.heroDetail} ${styles.date} mt-2`}>Tagaytay City, Philippines</p>
        <ParallaxLayer inline className="mx-auto mt-6 w-[clamp(3rem,12dvh,7rem)] sm:w-[clamp(3rem,15dvh,9rem)] [@media(max-height:500px)]:w-12">
          <FloralArtwork name="heroRight" className="h-auto w-full" sizes="(max-height: 500px) 48px, (min-width: 640px) clamp(48px, 15dvh, 144px), clamp(48px, 12dvh, 112px)" />
        </ParallaxLayer>
        <a data-hero-detail="explore" href="#countdown" aria-label="Explore our wedding invitation" className={`${styles.heroDetail} mx-auto mt-8 flex size-11 items-center justify-center [@media(max-height:500px)]:mt-3`}><ArrowDown size={20} strokeWidth={1.2} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
