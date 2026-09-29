import { CalendarDays, MapPin, Sprout } from "lucide-react";
import { sampleEvent } from "../data/sample-event";
import styles from "../styles/sample.module.css";

export default function InvitationDetails() {
  return (
    <aside className={`${styles.invitation} relative flex flex-col items-center px-7 py-12 text-center sm:px-10 lg:items-start lg:py-16 lg:text-left`}>
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#d4c9a5]">
        <Sprout size={18} strokeWidth={1.3} aria-hidden="true" /> A celebration of love
      </div>
      <div aria-hidden="true" className={`${styles.monogram} mt-10 flex h-28 w-24 items-center justify-center text-3xl text-[#d4c9a5] lg:mt-14`}>{sampleEvent.initials}</div>
      <p className="mt-8 text-xs tracking-[0.12em] text-[#ced8ce]">Together with our families</p>
      <h1 className={`${styles.display} mt-5 text-5xl leading-[1.08] sm:text-6xl`}>{sampleEvent.names.split(" & ")[0]}<span className="mx-2 text-[#d4c9a5] lg:my-1 lg:block"> &amp; </span>{sampleEvent.names.split(" & ")[1]}</h1>
      <p className="mt-6 max-w-xs text-sm leading-7 text-[#ced8ce]">The best moments are the ones we share. We would love for you to be part of ours.</p>
      <dl className="mt-10 w-full space-y-6 border-t border-white/20 pt-8 text-left lg:mt-14">
        <div className="flex gap-4"><CalendarDays size={19} className="mt-1 shrink-0 text-[#d4c9a5]" aria-hidden="true" /><div><dt className="text-sm">{sampleEvent.date}</dt><dd className="mt-1 text-xs leading-6 text-[#ced8ce]">{sampleEvent.time}</dd></div></div>
        <div className="flex gap-4"><MapPin size={19} className="mt-1 shrink-0 text-[#d4c9a5]" aria-hidden="true" /><div><dt className="text-sm">{sampleEvent.venue}</dt><dd className="mt-1 text-xs leading-6 text-[#ced8ce]">{sampleEvent.location}</dd></div></div>
      </dl>
      <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-[#d4c9a5] lg:mt-auto lg:pt-14">A little yes. A beautiful memory.</p>
    </aside>
  );
}
