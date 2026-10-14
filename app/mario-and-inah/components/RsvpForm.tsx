"use client";

import { SmartRsvpFlow } from "@/components/smart-rsvp/SmartRsvpFlow";
import type { SmartRsvpTheme } from "@/components/smart-rsvp/theme";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const theme: SmartRsvpTheme = {
  accent: "#414b36",
  accentHover: "#56634b",
  heading: "#414b36",
  border: "#a9b69e",
  borderSoft: "#d0e1d8",
  soft: "#f5f0e4",
  softStrong: "#d0e1d8",
};

export default function RsvpForm() {
  return (
    <SmartRsvpFlow
      eventSlug={wedding.rsvp.eventSlug}
      accessMode="name_search"
      allowUnlistedReplies={false}
      theme={theme}
      className="mx-auto w-full"
      searchAppearance="minimal"
      partyDisplay={{ appearance: "minimal", showBackToSearch: true }}
      searchHeader={{
        title: "Kindly reply",
        titleClassName: styles.rsvpTitle,
        description: "Find your invitation to let us know if you can join us.",
        showVerification: false,
      }}
    />
  );
}
