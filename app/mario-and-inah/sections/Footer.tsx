import FloralArtwork from "../components/FloralArtwork";
import ParallaxLayer from "../components/ParallaxLayer";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.sage} relative overflow-hidden px-6 pb-7 pt-14 text-center sm:px-10`}>
      <ParallaxLayer inline className="mx-auto mb-5 w-36">
        <FloralArtwork reveal name="entourageBouquet" className="h-auto w-full" sizes="144px" />
      </ParallaxLayer>
      <p data-reveal="heading" className={`${styles.footerNames} mt-6`}>{wedding.couple.display}</p>
      <p data-reveal="text" data-reveal-delay="0.08" className="mt-4 text-xs tracking-wide">{wedding.date.display} · Tagaytay</p>
      <div data-reveal="text" className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:justify-between">
        <a href="#top" className={`${styles.textLink} inline-flex min-h-11 items-center`}>Back to the beginning</a>
        <p>Made with love by <a href="https://www.moderninvites.com" className={styles.textLink}>Modern Invites</a></p>
      </div>
    </footer>
  );
}
