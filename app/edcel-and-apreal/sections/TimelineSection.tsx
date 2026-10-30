import Image, { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import lace from "../assets/timeline/flower_laced_design.png";
import laceCard from "../assets/timeline/cream-lace-card.webp";
import velvet from "../assets/timeline/burgundy-ribbed-velvet.webp";
import waxSeal from "../assets/ephemera/oval-rose-wax-seal.webp";
import ScheduleTimeline from "../components/ScheduleTimeline";
import { wedding } from "../data/wedding";
import styles from "../styles/timeline.module.css";
import DecorativeParallax from "../components/DecorativeParallax";

const { props: { src: laceUrl } } = getImageProps({ src: laceCard, alt: "", width: 500, height: Math.round(laceCard.height * 500 / laceCard.width) });
const { props: { src: velvetUrl } } = getImageProps({ src: velvet, alt: "", width: 480, height: 480 });

export default function TimelineSection() {
  return (
    <section id="schedule" aria-labelledby="ea-schedule-title"
      className={`${styles.section} relative isolate overflow-hidden px-3 py-20 sm:px-10 sm:py-24`}
      style={{ "--timeline-fabric": `url("${velvetUrl}")` } as CSSProperties}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none">
        {[
          "-left-5 -top-3 rotate-180",
          "-right-5 -top-3 -scale-y-100",
          "-bottom-3 -left-5 -scale-x-100",
          "-bottom-3 -right-5",
        ].map((position, index) => (
          <div key={position} className={`absolute w-[136px] opacity-75 sm:w-60 ${position}`}>
            <DecorativeParallax reverse={index % 2 === 1} distance={10}>
              <Image src={lace} alt="" sizes="(min-width: 640px) 240px, 136px" className="h-auto w-full" />
            </DecorativeParallax>
          </div>
        ))}
      </div>
      <div className={`${styles.card} relative mx-auto max-w-[760px]`}
        style={{ "--timeline-lace": `url("${laceUrl}")` } as CSSProperties}>
        <DecorativeParallax distance={6} className="pointer-events-none absolute -top-10 left-1/2 z-10 w-20 -translate-x-1/2 -translate-y-1/2 select-none sm:-top-12 sm:w-24">
          <Image src={waxSeal} alt="" sizes="(min-width: 640px) 96px, 80px" className="h-auto w-full" />
        </DecorativeParallax>
        <div className="bg-[var(--timeline-paper)] px-1 pb-6 pt-8 sm:px-6 sm:pb-10 sm:pt-10">
          <header data-reveal className="relative mx-auto max-w-3xl text-center">
            <h2 id="ea-schedule-title" className={styles.title}>Order of the day</h2>
            <p className="mt-2 text-xs sm:text-sm">{wedding.date.day}, {wedding.date.display}</p>
          </header>
          <ScheduleTimeline />
        </div>
      </div>
    </section>
  );
}
