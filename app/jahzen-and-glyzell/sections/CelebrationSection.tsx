import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function CelebrationSection() {
  return <section id="celebration" tabIndex={-1} className={`${styles.celebration} scroll-mt-24 px-6 py-24 sm:px-10 lg:py-40`}>
    <div className="mx-auto max-w-7xl">
      <div className="grid items-end gap-8 lg:grid-cols-2"><Reveal><h2 className={styles.heading}>The details<br /><em>of our day.</em></h2></Reveal><div className="lg:text-right"><p className={styles.venueDate}>{wedding.date.day} · {wedding.date.display}</p><p className={`${styles.smallText} mt-4`}>Capas, Tarlac, Philippines</p></div></div>
      <div className={`${styles.venueGrid} mt-14 grid gap-px lg:mt-20 lg:grid-cols-2`}>
        {[{title:"The ceremony", time:"4:30 PM", detail:"Guest arrival at 4:00 PM"},{title:"The reception",time:"6:00 PM",detail:"Cocktail hour at 5:00 PM"}].map(event => <Reveal key={event.title} className={`${styles.venuePanel} px-7 py-10 sm:p-12`}><h3 className={`${styles.subheading} mb-7`}>{event.title}</h3><p className={styles.venueName}>{wedding.venue.name}</p><p className={`${styles.venueDetail} mt-2`}>{wedding.venue.detail}</p><p className={`${styles.venueTime} mt-8`}>{event.time}</p><p className={`${styles.sectionIntro} mt-2`}>{event.detail}</p><p className={`${styles.sectionIntro} mt-5 max-w-sm`}>{wedding.venue.address}</p><a className={`${styles.textLink} mt-7 inline-flex min-h-11 items-center gap-3`} href={wedding.venue.mapsUrl} target="_blank" rel="noreferrer">View on map <ArrowUpRight size={15} aria-hidden="true" /></a></Reveal>)}
      </div>
    </div>
  </section>;
}
