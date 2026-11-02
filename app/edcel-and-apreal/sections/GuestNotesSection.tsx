import SectionHeading from "../components/SectionHeading";
import FloralAccent from "../components/FloralAccent";
import { guestReminders } from "../data/guest-notes";
import styles from "../styles/invitation.module.css";

export default function GuestNotesSection() {
  return <section id="guest-notes" aria-labelledby="ea-notes-title" className={`${styles.guestNotes} relative isolate flex min-h-[calc(100svh-64px)] items-center overflow-hidden px-6 py-28 sm:px-10 sm:py-40 lg:py-28`}>
    <FloralAccent variant="cosmos" className="absolute -left-5 -top-5 w-28 opacity-80 sm:-left-6 sm:-top-6 sm:w-40 lg:-left-8 lg:-top-8 lg:w-48 xl:w-56" sizes="(min-width: 1280px) 224px, (min-width: 1024px) 192px, (min-width: 640px) 160px, 112px" />
    <FloralAccent variant="cosmos" className="absolute -bottom-5 -right-5 w-28 rotate-180 opacity-80 sm:-bottom-6 sm:-right-6 sm:w-40 lg:-bottom-8 lg:-right-8 lg:w-48 xl:w-56" sizes="(min-width: 1280px) 224px, (min-width: 1024px) 192px, (min-width: 640px) 160px, 112px" />
    <div className="relative mx-auto w-full max-w-2xl">
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
