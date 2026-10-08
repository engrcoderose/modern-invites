import { ChevronDown } from "lucide-react";
import HeroPhoto from "../components/HeroPhoto";
import { wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function HeroSection() {
  return (
    <section id="top" aria-labelledby="ra-title" className={`${styles.heroSequence} relative isolate flex min-h-[max(520px,calc(100svh-76px))] items-center justify-center overflow-hidden bg-[#171714] text-[#f5f0e6]`}>
      <HeroPhoto />
      <div className={`${styles.heroShade} absolute inset-0 -z-10`} />
      <div className="mt-[12svh] w-full max-w-5xl px-6 text-center sm:px-10">
        <h1 id="ra-title" tabIndex={-1} aria-label={`${wedding.groomShort} and ${wedding.brideShort}`} className={`${styles.heroNames} text-[#e4cca3] outline-none`}>
          <span aria-hidden="true" className={`${styles.heroWrittenName} ${styles.heroGroom}`}>{wedding.groomShort}</span>
          <span aria-hidden="true" className={`${styles.heroConnector} ${styles.heroWrittenName} ${styles.heroAnd}`}> and </span>
          <span aria-hidden="true" className={`${styles.heroWrittenName} ${styles.heroBride}`}>{wedding.brideShort}</span>
        </h1>
        <p className={`${styles.heroDetailsIntro} mt-3 text-lg uppercase tracking-[0.04em] sm:text-2xl lg:text-3xl`}>Are getting married</p>
      </div>
      <div className="absolute inset-x-0 bottom-5 flex flex-col gap-5 px-6 sm:bottom-6 sm:px-10 lg:px-12">
        <div className={`${styles.heroMetadata} ${styles.heroMetadataIntro} flex flex-col items-center gap-3 text-center text-[10px] uppercase tracking-[0.02em] sm:flex-row sm:justify-between sm:text-left lg:text-xs`}>
          <p>{wedding.date}, {wedding.ceremonyTime}</p>
          <p className="sm:text-right">{wedding.locationLabel}</p>
        </div>
        <a href="#invitation" aria-label="Scroll down to the invitation" className={`${styles.heroScrollIntro} flex h-11 flex-col items-center justify-center gap-1 self-center px-3 text-[#f5f0e6]/80 hover:text-[#e4cca3]`}>
          <span className="text-[8px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={20} strokeWidth={1} aria-hidden="true" className={styles.scrollCue} />
        </a>
      </div>
    </section>
  );
}
