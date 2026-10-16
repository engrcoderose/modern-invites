import ScheduleTimeline from "../components/ScheduleTimeline";
import { wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function TimelineSection() {
  return (
    <section id="schedule" aria-labelledby="ra-schedule-title" className="bg-[#171714] px-4 py-16 text-[#f5f0e6] sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#d1b788]/40 px-5 py-12 sm:px-14 sm:py-16">
        <header data-reveal className="text-center">
          <h2 id="ra-schedule-title" className={styles.sectionTitle}>Our Wedding Day</h2>
          <time dateTime={wedding.dateISO} className="mt-5 block text-xs tracking-[0.12em] text-[#d1b788] sm:text-sm">{wedding.date}</time>
        </header>
        <ScheduleTimeline />
      </div>
    </section>
  );
}
