"use client";

import { SmartRsvpFlow, coupleRsvpClosedMessage } from "@/components/smart-rsvp";
import type { SmartRsvpTheme } from "@/components/smart-rsvp/theme";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const theme: SmartRsvpTheme = {
  accent: "var(--ea-wine)",
  accentHover: "var(--ea-burgundy)",
  heading: "var(--ea-ink)",
  border: "var(--ea-old-rose)",
  borderSoft: "var(--ea-line)",
  soft: "var(--ea-paper)",
  softStrong: "var(--ea-blush)",
};

export default function RsvpForm() {
  return (
    <div data-text-motion-skip>
      <SmartRsvpFlow
        eventSlug={wedding.rsvp.eventSlug}
        accessMode="name_search"
        allowUnlistedReplies={false}
        theme={theme}
        searchAppearance="minimal"
        closedMessage={coupleRsvpClosedMessage}
        closedAppearance="minimal"
        closedTitleClassName={styles.rsvpTitle}
        fields={{ dietaryRestrictions: false }}
        partyDisplay={{
          appearance: "minimal",
          householdLabel: "Your invitation",
          householdNameClassName: styles.rsvpHousehold,
          showBackToSearch: true,
        }}
        className={`${styles.rsvpFlow} [&>div]:rounded-none [&>div]:border-0 [&>div]:bg-transparent [&>div]:shadow-none [&>div>div]:px-0`}
        searchHeader={{
          title: "Kindly response",
          titleClassName: styles.rsvpTitle,
          description: <>
            Find your invitation to let us know if you can join us.
            <strong className="mt-3 block text-balance font-semibold">On or before {wedding.rsvp.deadline}</strong>
          </>,
          showVerification: false,
        }}
      />
    </div>
  );
}
