import { CalendarPlus } from "lucide-react";
import { event } from "../data/event";
import styles from "../styles/invitation.module.css";

const calendar = "data:text/calendar;charset=utf-8," + encodeURIComponent([
  "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Modern Invites//Portfolio sample//EN", "BEGIN:VEVENT",
  "UID:olive-theo-sample-20270320@moderninvites.example", "DTSTAMP:20261109T000000Z",
  "DTSTART:20270320T073000Z", "DTEND:20270320T140000Z", "SUMMARY:Olive & Theo — fictional wedding sample",
  `LOCATION:${event.venue} — fictional venue`, "DESCRIPTION:Portfolio demonstration only. This is not a real event.", "END:VEVENT", "END:VCALENDAR", "",
].join("\r\n"));

export default function Celebration() {
  return <section id="celebration" aria-label="Event details" className="mx-auto max-w-[1280px] px-6 py-14 md:px-12 md:py-20">
    <h2 className={`${styles.sectionTitle} text-center`}>{event.names}</h2>
    <dl className="mt-10 grid gap-8 border-y border-[var(--ot-line)] py-8 md:grid-cols-2 md:gap-12">
      <div>
        <dt className="text-xs text-[var(--ot-muted)]">Date & time</dt>
        <dd className={`${styles.display} mt-3 text-3xl`}>{event.date}</dd>
        <dd className="mt-2 text-sm text-[var(--ot-muted)]">{event.time}</dd>
      </div>
      <div>
        <dt className="text-xs text-[var(--ot-muted)]">Venue</dt>
        <dd className={`${styles.display} mt-3 text-3xl`}>{event.venue}</dd>
        <dd className="mt-2 text-sm leading-7 text-[var(--ot-muted)]">{event.address}</dd>
      </div>
    </dl>
    <a download="olive-and-theo-sample.ics" href={calendar} className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs underline underline-offset-4"><CalendarPlus size={16} aria-hidden="true" />Save the date</a>
  </section>;
}
