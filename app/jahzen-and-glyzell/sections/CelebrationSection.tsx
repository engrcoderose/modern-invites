import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Reveal from "../components/Reveal";
import VenueFlorals from "../components/VenueFlorals";
import { wedding } from "../data/wedding";
import { venueEvents } from "../data/venue";
import styles from "../styles/invitation.module.css";

export default function CelebrationSection() {
  return <section id="celebration" tabIndex={-1} aria-labelledby="jg-venue-heading" className={`${styles.celebration} relative isolate scroll-mt-24 overflow-hidden px-6 py-20 sm:px-10 sm:py-28`}>
    <VenueFlorals />
    <div className="relative mx-auto max-w-5xl">
      <Reveal><h2 id="jg-venue-heading" className={styles.venueHeading}>The Wedding Venue</h2></Reveal>
      <div className="mt-10 sm:mt-14">
        <div className={`${styles.venueRules} grid divide-y border-y md:grid-cols-2 md:divide-x md:divide-y-0`}>
          {venueEvents.map((event, index) => <article key={event.id} aria-labelledby={`jg-venue-${event.id}`} className={`${styles.venueRules} min-w-0 py-8 md:px-8 md:py-9 md:first:pl-0 md:last:pr-0`}>
            <Reveal>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 data-reveal-item id={`jg-venue-${event.id}`} className={styles.smallText}>{event.title}</h3>
              <span data-reveal-item aria-hidden="true" className={styles.venueNumber}>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <figure data-reveal-item className="relative aspect-[4/3] overflow-hidden">
              <Image src={event.src} alt={event.alt} fill placeholder="blur"
                sizes="(max-width: 639px) calc(112.5vw - 54px), (max-width: 767px) calc(112.5vw - 90px), (max-width: 1103px) calc(56.25vw - 81px), 540px"
                className="object-cover" />
            </figure>
            <div className="mt-7 text-center">
              <p data-reveal-item className={styles.venueName}>{wedding.venue.name}</p>
              <p data-reveal-item className={`${styles.venueDetail} mt-2`}>{wedding.venue.detail}</p>
              <p data-reveal-item className={`${styles.smallText} mt-6`}>{event.time} · <time dateTime={wedding.date.iso.slice(0, 10)}>{wedding.date.display}</time></p>
              <address data-reveal-item className={`${styles.venueNote} mx-auto mt-5 max-w-sm not-italic`}><MapPin size={14} className="mr-1.5 inline-block align-text-bottom" aria-hidden="true" />{wedding.venue.address}</address>
              <a data-reveal-item className={`${styles.textLink} ${styles.venueRules} mt-5 inline-flex min-h-11 items-center gap-3 border-b`} href={wedding.venue.mapsUrl} target="_blank" rel="noreferrer" aria-label={`View ${event.id} venue map (opens in a new tab)`}>View map <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
            </Reveal>
          </article>)}
        </div>
        <Reveal className="mt-6"><p className={`${styles.venueNote} mx-auto max-w-lg text-center`}>{wedding.venue.arrivalNote}</p></Reveal>
      </div>
    </div>
  </section>;
}
