import Reveal from "../components/Reveal";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const questions = [
  { question: "When should I arrive?", answer: "Guest arrival is at 4:00 PM. The ceremony begins at 4:30 PM." },
  { question: "Where is the reception?", answer: `The ceremony and reception are both at ${wedding.venue.name} ${wedding.venue.detail}. The reception begins at 6:00 PM.` },
  { question: "When should I reply?", answer: `Kindly respond by ${wedding.rsvpDeadline}. Please reply only for the guests named on your invitation.` },
];

export default function FaqSection() {
  return <section id="faq" tabIndex={-1} aria-labelledby="jg-faq-title" className={`${styles.attire} scroll-mt-24 px-6 py-24 sm:px-10 lg:py-40`}>
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
      <Reveal><h2 id="jg-faq-title" className={styles.heading}>Questions,<br /><em>answered.</em></h2></Reveal>
      <Reveal className={styles.faq}>
        {questions.map(item => <details key={item.question} className="border-t py-6 last:border-b">
          <summary className={`${styles.subheading} cursor-pointer`}>{item.question}</summary>
          <p className={`${styles.prose} mt-4`}>{item.answer}</p>
        </details>)}
      </Reveal>
    </div>
  </section>;
}
