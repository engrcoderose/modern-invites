import Reveal from "../components/Reveal";
import TimelineIcon from "../components/TimelineIcon";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function TimelineSection() {
  return <section id="timeline" tabIndex={-1} aria-labelledby="jg-timeline-title" className={`${styles.timeline} relative isolate scroll-mt-24 overflow-hidden px-6 py-14 sm:px-10 sm:py-20 lg:py-28`}>
    <div aria-hidden="true" className={`${styles.timelineArc} pointer-events-none absolute right-5 top-16 h-[740px] w-80 sm:right-12 lg:right-24 lg:top-20 lg:w-[520px]`} />
    <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
      <Reveal>
        <p className={`${styles.timelineLabel} mb-6 flex items-center gap-4`}><span aria-hidden="true" className="h-px w-10 shrink-0" />The order of events</p>
        <h2 id="jg-timeline-title" className={styles.timelineHeading}>The Wedding<br />Timeline</h2>
        <p className={`${styles.timelineIntro} mt-6 max-w-md`}>Here’s what to expect as we celebrate our love and begin this new chapter together.</p>
      </Reveal>
      <Reveal className="relative lg:pt-3">
        <div className="relative">
        <span aria-hidden="true" className={`${styles.timelineRule} pointer-events-none absolute bottom-0 left-[68px] top-3 w-px`} />
        <ol className="relative">
          {wedding.timeline.map((item, index) => <li data-reveal-item key={item.time} className="relative grid grid-cols-[3.25rem_.5rem_2.25rem_minmax(0,1fr)] gap-x-3 pb-8 last:pb-0 sm:pb-10">
            <time className={`${styles.timelineTime} pt-3`}>{item.time}</time>
            <span aria-hidden="true" className={`${styles.timelineDot} relative mt-4 size-2 rounded-full`} />
            <span className={`${styles.timelineIcon} mt-1`}><TimelineIcon index={index} /></span>
            <div><h3 className={styles.timelineTitle}>{item.title.replace(/^The /, "")}</h3><p className={`${styles.timelineDescription} mt-1`}>{item.description}</p></div>
          </li>)}
        </ol>
        </div>
      </Reveal>
    </div>
  </section>;
}
