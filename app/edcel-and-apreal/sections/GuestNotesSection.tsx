import SectionHeading from "../components/SectionHeading";
import { guestReminders } from "../data/guest-notes";
import styles from "../styles/invitation.module.css";

export default function GuestNotesSection() {
  return <section id="guest-notes" aria-labelledby="ea-notes-title" className={`${styles.guestNotes} px-6 py-20 sm:px-10 md:py-24`}>
    <div className="mx-auto max-w-2xl">
      <SectionHeading id="ea-notes-title">Gentle Reminders</SectionHeading>
      <div className="space-y-12 text-center sm:space-y-14">
        {guestReminders.map(({ id, title, paragraphs }) => <article key={id} aria-labelledby={`ea-reminder-${id}`}>
          <h3 id={`ea-reminder-${id}`} className={`${styles.reminderTitle} mb-4 text-3xl sm:text-4xl`}>{title}</h3>
          <div className="space-y-3">{paragraphs.map(paragraph => <p key={paragraph} className={styles.body}>{paragraph}</p>)}</div>
        </article>)}
      </div>
    </div>
  </section>;
}
