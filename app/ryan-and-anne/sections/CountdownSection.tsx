import Countdown from "../components/Countdown";
import { dateLabels, wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function CountdownSection() {
  return (
    <section data-reveal-group id="countdown" aria-labelledby="ra-countdown-title" className="border-t border-[#d1b788]/15 bg-[#171714] px-6 py-14 text-center text-[#f5f0e6] sm:px-10 sm:py-16">
      <h2 data-reveal id="ra-countdown-title" className={`${styles.eyebrow} text-[#d1b788]`}>Every moment brings us closer</h2>
      <Countdown />
      <p data-reveal className="mt-8 text-xs leading-6 text-[#f5f0e6]/75">{dateLabels.weekday}, {wedding.date} · {wedding.ceremonyTime}</p>
    </section>
  );
}
