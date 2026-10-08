import Image from "../components/OptimizedPhoto";
import ScheduleMonogram from "../components/ScheduleMonogram";
import { sectionPhotos } from "../data/section-photos";
import { dateLabels, timeline, wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function TimelineSection() {
  const photo = sectionPhotos.schedule;

  return (
    <section id="schedule" aria-labelledby="ra-schedule-title" className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-[#171714] px-6 py-14 text-[#f5f0e6] sm:min-h-[760px] sm:px-10 sm:py-20 lg:px-16">
      <Image src={photo.src} alt="" fill sizes="(min-width:640px) max(100vw, 1140px), max(100vw, 960px)" className="-z-20 object-cover object-[45%_center] grayscale" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
      <div className="mx-auto w-full max-w-3xl">
        <div data-reveal-group className="relative ml-auto flex min-h-[520px] w-[82%] max-w-[520px] flex-col justify-center bg-black px-5 py-20 sm:min-h-[600px] sm:w-[78%] sm:px-12 sm:py-24">
          <div data-reveal="image" aria-hidden="true" className="pointer-events-none absolute -left-12 top-32 w-24 sm:-left-20 sm:top-36 sm:w-40">
            <ScheduleMonogram />
          </div>
          <header data-reveal className="text-center">
            <time dateTime={wedding.dateISO} className={`${styles.eyebrow} block`}>{dateLabels.schedule}</time>
            <h2 id="ra-schedule-title" className="mt-3 text-xs leading-5 tracking-[0.04em] sm:text-sm">The Wedding Day<br />Schedule</h2>
            <p className={`${styles.scheduleWeekday} mt-1`}>{dateLabels.weekday}</p>
          </header>
          <ol className="mx-auto mt-10 grid w-fit max-w-full gap-y-4 sm:mt-12 sm:gap-y-5">
            {timeline.map((event) => (
              <li data-reveal key={event.label} className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 sm:gap-x-6">
                <span className="whitespace-nowrap text-[10px] tabular-nums sm:text-xs">{event.time}</span>
                <h3 className="text-[10px] uppercase leading-5 tracking-[0.04em] sm:text-xs">{event.label}</h3>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
