import Reveal from "../components/Reveal";
import SamplePhoto from "../components/SamplePhoto";
import { wedding } from "../data/wedding";
import { photos } from "../data/photos";
import styles from "../styles/invitation.module.css";

export default function GuestDetailsSection() {
  return <>
    <section id="details" tabIndex={-1} className={`${styles.attire} scroll-mt-24 px-6 py-24 sm:px-10 lg:py-40`}>
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="order-2 lg:order-1"><Reveal><h2 className={styles.heading}>Dressed for<br /><em>the occasion.</em></h2><p className={`${styles.attireSubtitle} mt-6`}>Formal attire</p></Reveal>
          <div className="mt-10 space-y-7"><Reveal><h3 className={`${styles.subheading} mb-3`}>Gentlemen</h3><p className={styles.prose}>{wedding.attire.gentlemen}</p></Reveal><Reveal><h3 className={`${styles.subheading} mb-3`}>Ladies</h3><p className={styles.prose}>{wedding.attire.ladies}</p></Reveal></div>
          <Reveal className="mt-9"><ul aria-label="Guest attire colors" className="flex flex-wrap gap-6">{wedding.attire.palette.map(color=><li key={color.name} className="text-center"><span className="mx-auto mb-3 block size-11 rounded-full" style={{backgroundColor:color.color}}/><span className={styles.swatchLabel}>{color.name}</span></li>)}</ul><div className={`${styles.reservedColors} mt-9 border-t pt-7`}><h3 className={`${styles.subheading} mb-3`}>Reserved for the couple</h3><p className={styles.prose}>White is reserved for the bride and mocha brown for the groom. We kindly request that guests refrain from wearing these reserved colors.</p></div></Reveal>
        </div>
        <Reveal className="relative order-1 lg:order-2"><div className="ml-auto aspect-[4/5] w-[92%]"><SamplePhoto src={photos.portrait} alt="Sample couple portrait illustrating the attire section layout" sizes="(max-width: 640px) 84vw, (max-width: 1024px) 85vw, 42vw" position="center 35%" /></div><div className={`${styles.attireCaption} relative mt-4 inline-block px-6 py-4 sm:px-9`}><span className={styles.signature}>Dress beautifully</span></div></Reveal>
      </div>
    </section>
    <section className={`${styles.guestNotes} px-6 py-24 sm:px-10 lg:py-40`} aria-labelledby="jg-guest-notes"><div className="mx-auto max-w-7xl">
      <div className="grid items-end gap-8 lg:grid-cols-2"><Reveal><h2 id="jg-guest-notes" className={styles.heading}>A few loving<br /><em>notes.</em></h2></Reveal><p className={`${styles.sectionIntro} max-w-xl lg:ml-auto`}>A little guidance to help you prepare for our celebration. Thank you for making this day so meaningful to us.</p></div>
      <div className={`${styles.notesGrid} mt-14 grid gap-px lg:mt-20 lg:grid-cols-3`}>{wedding.guestNotes.map(note=><Reveal className={`${styles.guestNote} px-6 py-9 sm:p-10`} key={note.title}><h3 className={`${styles.subheading} mb-5`}>{note.title}</h3><p className={styles.prose}>{note.text}</p></Reveal>)}</div>
      <div className="mt-16 grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><h3 className={styles.signature}>Questions, answered</h3><div className={styles.faq}>
        <details className="border-t py-6"><summary className={`${styles.subheading} cursor-pointer`}>When should I arrive?</summary><p className={`${styles.prose} mt-4`}>Guest arrival is at 4:00 PM. The ceremony begins at 4:30 PM.</p></details>
        <details className="border-t py-6"><summary className={`${styles.subheading} cursor-pointer`}>Where is the reception?</summary><p className={`${styles.prose} mt-4`}>The ceremony and reception are both at {wedding.venue.name} {wedding.venue.detail}. The reception begins at 6:00 PM.</p></details>
        <details className="border-y py-6"><summary className={`${styles.subheading} cursor-pointer`}>When should I reply?</summary><p className={`${styles.prose} mt-4`}>Kindly respond by {wedding.rsvpDeadline}. Please reply only for the guests named on your invitation.</p></details>
      </div></div>
    </div></section>
  </>;
}

