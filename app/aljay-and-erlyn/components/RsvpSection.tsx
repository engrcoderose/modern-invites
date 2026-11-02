"use client";

import { SmartRsvpFlow } from "@/components/smart-rsvp";
import { wedding } from "../data/wedding";
import NameEntryPreview from "./RsvpNameEntry";
import { FramedHeading } from "./Stationery";
import styles from "../styles/wedding.module.css";

export default function RsvpSection() {
  const enabled = wedding.rsvp.enabled && Boolean(wedding.rsvp.eventSlug);
  return <div className="w-full max-w-[560px]">
    <div className="mx-auto mb-3 w-[clamp(230px,35svh,280px)] max-w-full">
      <FramedHeading headingClassName={styles.rsvpHeading} sizes="min(calc(100vw - 48px), clamp(230px, 35svh, 280px))">Kindly Reply</FramedHeading>
    </div>
    <div className={`${styles.rsvpCard} px-5 py-7 sm:px-9`} data-reveal>
      <p className={`${styles.body} mb-3 text-center`}>Find your invitation to let us know if you can join us.</p>
      <p className={`${styles.small} text-center`}>Please reply by <strong>{wedding.rsvpDeadline}</strong>.</p>
      {enabled && wedding.rsvp.eventSlug ? <SmartRsvpFlow
        eventSlug={wedding.rsvp.eventSlug} accessMode="name_search" allowUnlistedReplies={false}
        searchAppearance="minimal" openFormAppearance="minimal"
        fields={{ email: true, dietaryRestrictions: true, message: true }}
        theme={{ accent: "#5a6946", accentHover: "#4b502a", heading: "#414636", border: "#bfb59a", borderSoft: "#d8d8c6", soft: "#f2ede0", softStrong: "#e8e9da" }}
      /> : <NameEntryPreview />}
    </div>
  </div>;
}
