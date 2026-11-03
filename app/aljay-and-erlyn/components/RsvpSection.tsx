"use client";

import { wedding } from "../data/wedding";
import RsvpNameEntry from "./RsvpNameEntry";
import styles from "../styles/wedding.module.css";

export default function RsvpSection() {
  return <div className="w-full max-w-[560px]">
    <div className={`${styles.rsvpCard} px-5 py-7 sm:px-9`} data-reveal>
      <p className={`${styles.body} mb-3 text-center`}>Find your invitation to let us know if you can join us.</p>
      <p className={`${styles.small} text-center`}>Please reply by <strong>{wedding.rsvpDeadline}</strong>.</p>
      <RsvpNameEntry eventSlug={wedding.rsvp.eventSlug} />
    </div>
  </div>;
}
