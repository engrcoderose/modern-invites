"use client";

import { SmartRsvpFlow } from "@/components/smart-rsvp";
import type { SmartRsvpTheme } from "@/components/smart-rsvp/theme";
import styles from "../styles/wedding.module.css";

const theme: SmartRsvpTheme = {
  accent: "#171714",
  accentHover: "#393329",
  heading: "#25241f",
  border: "#ad8e57",
  borderSoft: "#d1b78880",
  soft: "#f5f0e6",
  softStrong: "#eadfcf",
};

export default function RsvpFlow({ eventSlug }: { eventSlug: string }) {
  return (
    <SmartRsvpFlow
      eventSlug={eventSlug}
      accessMode="name_search"
      theme={theme}
      searchAppearance="minimal"
      partyDisplay={{
        appearance: "minimal",
        householdLabel: "Your household",
        householdNameClassName: "font-meaCulpa text-4xl font-normal leading-[1.3] tracking-normal sm:text-5xl",
        showBackToSearch: false,
      }}
      className="[&>div]:rounded-none [&>div]:border-0 [&>div]:bg-transparent [&>div]:shadow-none [&>div>div]:px-0"
      searchHeader={{
        title: "Kindly reply",
        description: "Find your invitation to let us know if you can join us.",
        titleClassName: `${styles.invitationNames} font-normal tracking-normal`,
        showVerification: false,
      }}
    />
  );
}
