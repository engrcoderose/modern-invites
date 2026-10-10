"use client";

import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import type { SmartRsvpTheme } from "@/components/smart-rsvp/theme";
import styles from "../styles/rsvp.module.css";

const SmartRsvpFlow = dynamic(() => import("@/components/smart-rsvp/SmartRsvpFlow").then((module) => module.SmartRsvpFlow));

const theme: SmartRsvpTheme = {
  accent: "#526445",
  accentHover: "#36472e",
  heading: "#36472e",
  border: "#9ba486",
  borderSoft: "#b9bea880",
  soft: "#faf8f0",
  softStrong: "#e8ebdf",
};

export default function RsvpFlow({ eventSlug, pendingMessage }: { eventSlug: string | null; pendingMessage: string }) {
  if (eventSlug) {
    return (
      <SmartRsvpFlow
        eventSlug={eventSlug}
        accessMode="name_search"
        theme={theme}
        searchAppearance="minimal"
        className={styles.flow}
        searchHeader={{
          title: "Kindly reply",
          titleClassName: styles.heading,
          description: "Find your invitation to let us know if you can join us.",
          showVerification: false,
        }}
        partyDisplay={{ appearance: "minimal", householdLabel: "Your household" }}
      />
    );
  }

  return (
    <div>
      <h2 id="jb-rsvp-title" className={`${styles.heading} text-balance`}>Kindly reply</h2>
      <p className="mx-auto mt-3 max-w-[38ch] text-balance text-base leading-8 sm:text-lg lg:max-w-none">Find your invitation to let us know if you can join us.</p>
      <form aria-labelledby="jb-rsvp-title" className="mt-10 sm:mt-12" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="jb-rsvp-name" className="block text-xs uppercase tracking-[.18em]">Full Name</label>
        <p id="jb-rsvp-name-hint" className="mt-3 text-base leading-7">Enter your first and last name</p>
        <input id="jb-rsvp-name" name="fullName" type="text" autoComplete="name" required minLength={3} maxLength={150} aria-describedby="jb-rsvp-name-hint jb-rsvp-status" className={`${styles.input} mt-4 min-h-14 w-full px-2 py-3 text-center text-base`} />
        <button type="submit" disabled aria-describedby="jb-rsvp-status" className={`${styles.action} relative mt-7 flex min-h-16 w-full items-center justify-center px-12 py-4 text-xs uppercase sm:text-sm`}>
          Find My Invitation <Search size={18} className="absolute right-5" aria-hidden="true" />
        </button>
      </form>
      <p id="jb-rsvp-status" className={`${styles.status} mt-7 text-sm leading-7`}>{pendingMessage}</p>
    </div>
  );
}
