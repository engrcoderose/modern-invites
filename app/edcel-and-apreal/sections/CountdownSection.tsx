import Countdown from "../components/Countdown";
import CountdownArtwork from "../components/CountdownArtwork";
import styles from "../styles/countdown.module.css";

export default function CountdownSection() {
  return <section id="countdown" aria-labelledby="ea-countdown-title" className={`${styles.section} relative isolate flex min-h-[500px] items-center overflow-hidden px-5 py-24 text-center sm:min-h-[540px] sm:px-10 sm:py-28 lg:min-h-[620px]`}>
    <CountdownArtwork />
    <div aria-hidden="true" className={`${styles.shade} pointer-events-none absolute inset-0 -z-10`} />
    <div className="mx-auto w-full max-w-6xl">
      <h2 id="ea-countdown-title" className={`${styles.title} mb-9 sm:mb-12`}>Counting Down to forever</h2>
      <Countdown />
    </div>
  </section>;
}
