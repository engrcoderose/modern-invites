"use client";

import { OpenRsvpForm } from "@/components/smart-rsvp/OpenRsvpForm";
import type { EventInformation } from "@/components/smart-rsvp/types";
import { wedding } from "../data/wedding";
import Reveal from "../components/Reveal";
import { Ornament } from "../components/Ornament";
import styles from "../styles/invitation.module.css";

const previewEvent: EventInformation = {
  name: wedding.couple.display,
  slug: wedding.slug,
  rsvpDeadline: "2027-05-01",
  accessMode: "open",
  responseMode: "individual",
};

// Draft only. Replace this boundary with the established named-guest flow after
// the user creates the admin record and confirms its access/response modes.
const previewReply = async () => undefined;

export default function RsvpSection() {
  return <section id="rsvp" tabIndex={-1} className={`${styles.rsvp} scroll-mt-24 px-6 py-24 sm:px-10 lg:py-32`}>
    <div className="mx-auto grid max-w-5xl items-start gap-14 lg:grid-cols-2 lg:gap-24">
      <Reveal><Ornament className="mb-7" /><h2 className={styles.heading}>A seat saved<br /><em>just for you.</em></h2><p className={`${styles.prose} mt-7`}>We look forward to sharing this meaningful day with you. Kindly let us know if you can join us by <strong>{wedding.rsvpDeadline}.</strong></p><p className={`${styles.prose} mt-5`}>Please respond only for the guests named on your invitation.</p><p className={`${styles.rsvpPreview} mt-8 px-5 py-4`}>RSVP preview · You can try the form below. Replies are not sent or saved. Online responses will open once the guest list is ready.</p></Reveal>
      <div className={`${styles.rsvpForm} px-5 py-8 sm:px-8 sm:py-10`}>
        <OpenRsvpForm event={previewEvent} appearance="minimal" preview onSubmit={previewReply} description="Please enter your name as it appears on your invitation and let us know if you can attend." fields={{ email: true, dietaryRestrictions: true, message: true }} />
      </div>
    </div>
  </section>;
}
