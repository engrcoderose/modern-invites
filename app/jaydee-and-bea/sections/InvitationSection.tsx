import Image from "next/image";
import Countdown from "../components/Countdown";
import { wedding } from "../data/wedding-data";
import ScrollLayer from "../components/ScrollLayer";
import flowers from "../assets/designs/countdown-timer-flowers-watercolor.png";
import styles from "../styles/countdown.module.css";

// Both clipped edges reuse the same height-sized optimized image.
const FLOWER_SIZES = "(min-width: 783px) 100vw, 782px";

export default function InvitationSection() {
  return (
    <section id="invitation" aria-labelledby="jb-invitation-title" className={`${styles.section} relative isolate flex min-h-[440px] w-full min-w-0 items-center overflow-hidden px-8 py-20 text-center sm:aspect-video sm:px-12 lg:px-16`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none opacity-70 sm:opacity-85">
        <div className={`${styles.leftFlowers} absolute inset-y-0 left-0 w-[26%] overflow-hidden sm:w-[44%]`}>
          <Image src={flowers} alt="" sizes={FLOWER_SIZES} loading="lazy" draggable={false} className="absolute left-0 top-0 h-full w-auto max-w-none" />
        </div>
        <div className={`${styles.rightFlowers} absolute inset-y-0 right-0 w-[18%] overflow-hidden sm:w-[22%]`}>
          <Image src={flowers} alt="" sizes={FLOWER_SIZES} loading="lazy" draggable={false} className="absolute right-0 top-0 h-full w-auto max-w-none" />
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-5xl">
        <ScrollLayer as="time" profile="countdown-copy" dateTime={wedding.date.iso} className={`${styles.date} block text-sm leading-6 sm:text-base lg:text-lg`}>{wedding.date.display}</ScrollLayer>
        <ScrollLayer as="h2" profile="countdown-copy" staggerIndex={1} id="jb-invitation-title" className={`${styles.heading} mt-2 text-balance`}>Counting down to our wedding day</ScrollLayer>
        <p className="sr-only">Together with our families, we, {wedding.couple.display}, invite you to join us as we begin our married life. Your presence would make our day all the more beautiful.</p>
        <Countdown />
      </div>
    </section>
  );
}
