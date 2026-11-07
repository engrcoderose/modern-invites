"use client";

import { SmartRsvpFlow } from "@/components/smart-rsvp/SmartRsvpFlow";
import { coupleRsvpClosedMessage } from "@/components/smart-rsvp/RsvpClosedNotice";
import type { SmartRsvpTheme } from "@/components/smart-rsvp/theme";
import { rsvpEventSlug, rsvpFields } from "../data/rsvp";
import wedding from "../data/wedding-details.json";
import { useInvitationOpen } from "./InvitationState";

const theme: SmartRsvpTheme = {
  accent: "var(--mj-ink)",
  accentHover: "var(--mj-secondary)",
  heading: "var(--mj-ink)",
  border: "var(--mj-palette-5)",
  borderSoft: "var(--mj-line)",
  soft: "var(--mj-palette-0)",
  softStrong: "var(--mj-palette-3)",
};

export default function RsvpFlow() {
  const open = useInvitationOpen();
  if (!open) return null;

  return (
    <SmartRsvpFlow
      eventSlug={rsvpEventSlug}
      accessMode="name_search"
      theme={theme}
      fields={rsvpFields}
      searchAppearance="minimal"
      openFormAppearance="minimal"
      closedMessage={coupleRsvpClosedMessage}
      closedAppearance="minimal"
      closedTitleClassName="mj-heading"
      className="mj-rsvp-flow"
      searchHeader={{
        title: "Kindly reply",
        titleClassName: "mj-heading",
        description: <>Find your invitation to let us know if you can join us.<span className="mt-2 block text-sm leading-7">Please reply by <strong className="font-medium">{wedding.rsvp.deadline}</strong>.</span></>,
        showVerification: false,
      }}
      partyDisplay={{
        appearance: "minimal",
        householdLabel: "Your household",
        householdNameClassName: "mj-script text-4xl font-normal leading-[1.3] sm:text-5xl",
        showBackToSearch: false,
      }}
    />
  );
}
