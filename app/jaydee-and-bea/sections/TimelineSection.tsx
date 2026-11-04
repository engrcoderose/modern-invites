import Image from "next/image";
import { Church, Clapperboard, Flower2, Heart, Music2, UsersRound, Wine } from "lucide-react";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import { wedding } from "../data/wedding-data";
import flowers from "../assets/designs/timeline-border-flowers.jpg";
import styles from "../styles/timeline.module.css";

const EVENT_ICONS = [UsersRound, Clapperboard, Flower2, Church, Wine, Music2];
const FRAME_SIZES = "(min-width: 784px) 720px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 24px)";

export default function TimelineSection() {
  return (
    <ScrollScene id="timeline" aria-labelledby="jb-timeline-title" className="relative isolate overflow-hidden bg-[#faf8f0] px-3 py-10 sm:px-8 sm:py-16">
      <div className={`${styles.poster} relative mx-auto max-w-[720px] overflow-hidden bg-white`}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
          {/* Crop the two halves independently so taller phone layouts never stretch the flowers. */}
          <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden">
            <Image src={flowers} alt="" sizes={FRAME_SIZES} loading="lazy" draggable={false} className="h-full w-full object-cover object-top" />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
            <Image src={flowers} alt="" sizes={FRAME_SIZES} loading="lazy" draggable={false} className="h-full w-full object-cover object-bottom" />
          </div>
        </div>
        <div className="relative mx-auto my-[clamp(44px,11.8vw,106px)] w-[72%] bg-white px-3 py-6 sm:px-6 sm:py-9">
          <ScrollLayer as="header" profile="heading" className="mb-8 text-center sm:mb-12">
            <h2 id="jb-timeline-title" className={styles.title}>Wedding Timeline</h2>
            <time dateTime={wedding.date.iso} aria-label={wedding.date.display} className={`${styles.date} mt-1 block text-[10px] leading-6 tracking-[0.24em] sm:text-xs`}>{wedding.date.short}</time>
          </ScrollLayer>
          <ol>
            {wedding.timeline.map((event, index) => {
              const Icon = EVENT_ICONS[index] ?? Heart;
              return (
                <ScrollLayer as="li" profile="text" staggerIndex={index + 1} key={event.time}
                  className="grid min-h-[76px] grid-cols-[minmax(2rem,0.65fr)_0.75rem_minmax(0,1fr)] gap-x-2.5 pb-5 last:min-h-0 last:pb-0 sm:min-h-[104px] sm:grid-cols-[minmax(3.25rem,0.65fr)_1rem_minmax(0,1fr)] sm:gap-x-5 sm:pb-8">
                  <div aria-hidden="true" className={`${styles.icon} -mt-1 flex justify-end pr-1 sm:-mt-3 sm:pr-2`}>
                    <Icon strokeWidth={1} className="h-8 w-8 sm:h-[52px] sm:w-[52px]" />
                  </div>
                  <div aria-hidden="true" className="relative">
                    {index < wedding.timeline.length - 1 && <span className={`${styles.stem} absolute -bottom-7 left-1/2 top-2 w-px -translate-x-1/2 sm:-bottom-10`} />}
                    <Heart className="relative mx-auto mt-1.5 h-2.5 w-2.5 sm:h-3 sm:w-3" fill="currentColor" strokeWidth={0} />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[13px] leading-5 sm:text-base sm:leading-6">{event.time}</p>
                    <h3 className="text-[12px] leading-[1.65] sm:text-sm">{event.title}</h3>
                  </div>
                </ScrollLayer>
              );
            })}
          </ol>
        </div>
      </div>
    </ScrollScene>
  );
}
