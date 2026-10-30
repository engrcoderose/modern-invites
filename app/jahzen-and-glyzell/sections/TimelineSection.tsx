import { CalendarDays } from "lucide-react";
import Reveal from "../components/Reveal";
import TimelineIcon from "../components/TimelineIcon";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";
import PhotoPlaceholder from "../components/PhotoPlaceholder";

export default function TimelineSection() {
  return <section id="timeline" tabIndex={-1} aria-labelledby="jg-timeline-title" className={`${styles.timeline} relative isolate scroll-mt-24 overflow-hidden px-6 pb-64 pt-14 sm:px-10 sm:pb-80 sm:pt-20 lg:pt-28`}>
    <div className="absolute inset-x-6 bottom-6 h-44 sm:inset-x-10 sm:h-56 lg:left-auto lg:right-10 lg:w-[560px]"><PhotoPlaceholder label="Reception photo" dark /></div>
    <div aria-hidden="true" className={`${styles.timelineArc} pointer-events-none absolute right-5 top-16 h-[740px] w-80 sm:right-12 lg:right-24 lg:top-20 lg:w-[520px]`} />
    <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
      <Reveal>
        <p className={`${styles.timelineLabel} mb-6 flex items-center gap-4`}><span aria-hidden="true" className="h-px w-10 shrink-0" />The order of events</p>
        <h2 id="jg-timeline-title" className={styles.timelineHeading}>The timeline<br />of our day.</h2>
        <p className={`${styles.timelineIntro} mt-6 max-w-md`}>Here’s what to expect as we celebrate our love and begin this new chapter together.</p>
        <a href="/jahzen-and-glyzell/calendar" download="jahzen-and-glyzell.ics" className={`${styles.timelineCalendar} mt-8 hidden min-h-11 items-center gap-3 lg:inline-flex`}><CalendarDays size={16} aria-hidden="true" />Add to calendar</a>
      </Reveal>
      <Reveal className="relative lg:pt-3">
        <div className="relative">
        <span aria-hidden="true" className={`${styles.timelineRule} pointer-events-none absolute -bottom-12 left-[68px] top-3 w-px`} />
        <ol className="relative">
          {wedding.timeline.map((item, index) => <li key={item.time} className="relative grid grid-cols-[3.25rem_.5rem_2.25rem_minmax(0,1fr)] gap-x-3 pb-8 last:pb-0 sm:pb-10">
            <time className={`${styles.timelineTime} pt-3`}>{item.time}</time>
            <span aria-hidden="true" className={`${styles.timelineDot} relative mt-4 size-2 rounded-full`} />
            <span className={`${styles.timelineIcon} mt-1`}><TimelineIcon index={index} /></span>
            <div><h3 className={styles.timelineTitle}>{item.title.replace(/^The /, "")}</h3><p className={`${styles.timelineDescription} mt-1`}>{item.description}</p></div>
          </li>)}
        </ol>
        </div>
        <a href="/jahzen-and-glyzell/calendar" download="jahzen-and-glyzell.ics" className={`${styles.timelineCalendar} mt-12 inline-flex min-h-11 items-center gap-3 lg:hidden`}><CalendarDays size={16} aria-hidden="true" />Add to calendar</a>
      </Reveal>
    </div>
  </section>;
}
