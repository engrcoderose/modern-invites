import Image from "next/image";
import { artwork } from "../data/media";
import { timeline } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function TimelineSlide() {
  return <div className="relative flex h-full w-full items-center justify-center p-3 sm:p-4">
    <Image src={artwork.garden} alt="" fill sizes="max(100vw, calc((100dvh - 130px) * 2))" className="pointer-events-none object-cover object-center" />
    <div className={`${styles.timelineFrame} relative h-full max-h-[800px] w-full max-w-[560px] overflow-hidden`}>
      <article className="absolute inset-[9px] flex flex-col px-[7%] pb-[4%]">
        <Image src={artwork.paper} alt="" fill sizes="(max-width: 640px) max(calc(100vw - 42px), min(calc((100dvh - 172px) * .594), 465px)), 542px" className="pointer-events-none object-cover" />
        <header data-cr-reveal className={`${styles.timelineHeader} relative shrink-0 pb-3 text-center`}>
          <div className={`${styles.timelineSeal} absolute`} aria-hidden="true">
            <Image src={artwork.waxSeal} alt="" fill sizes="80px" className="object-contain" />
            <span className={`${styles.timelineMonogram} absolute inset-0 flex items-center justify-center`}>C&amp;R</span>
          </div>
          <h2 className={styles.timelineHeading}>The Wedding Timeline</h2>
        </header>
        <ol className={`${styles.timeline} relative flex min-h-0 flex-1 flex-col`}>
          {timeline.map(({ time, lines }) => <li data-cr-reveal key={time} className="grid min-h-0 flex-1 grid-cols-[25%_1fr] items-center gap-3 border-b last:border-b-0">
            <time className={`${styles.timelineTime} text-center tabular-nums`}>{time}</time>
            <p className={`${styles.timelineTitle} text-center`}>{lines.map(line => <span key={line} className="block">{line}</span>)}</p>
          </li>)}
        </ol>
      </article>
    </div>
  </div>;
}
