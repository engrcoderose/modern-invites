import Reveal from "../components/Reveal";
import Image from "next/image";
import noteFlowers from "../assets/artwork/guest-notes-flowers.webp";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function GuestDetailsSection() {
  return (
    <section id="guest-notes" tabIndex={-1} className={`${styles.guestNotes} relative isolate scroll-mt-24 overflow-hidden px-6 pb-40 pt-24 sm:px-10 sm:pb-48 lg:pb-56 lg:pt-40`} aria-labelledby="jg-guest-notes"><div className="mx-auto max-w-7xl">
      <div className="grid items-end gap-8 lg:grid-cols-2"><Reveal><h2 id="jg-guest-notes" className={styles.heading}>A few loving<br /><em>notes.</em></h2></Reveal><Reveal className="max-w-xl lg:ml-auto"><p className={styles.sectionIntro}>A little guidance to help you prepare for our celebration. Thank you for making this day so meaningful to us.</p></Reveal></div>
      <div className={`${styles.notesGrid} mt-14 grid gap-px lg:mt-20 lg:grid-cols-2`}>{wedding.guestNotes.map(note=><Reveal className={`${styles.guestNote} px-6 py-9 sm:p-10`} key={note.title}><h3 className={`${styles.subheading} mb-5`}>{note.title}</h3><p className={styles.prose}>{note.text}</p></Reveal>)}</div>
    </div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-6 right-3 -z-10 h-32 w-28 sm:right-6 sm:h-40 sm:w-36 lg:right-10 lg:h-44 lg:w-40">
        <Reveal stagger={false} className="relative h-full w-full">
          <Image src={noteFlowers} alt="" fill sizes="(max-width: 639px) 112px, (max-width: 1023px) 144px, 160px" className="object-contain object-right-bottom" />
        </Reveal>
      </div>
    </section>
  );
}

