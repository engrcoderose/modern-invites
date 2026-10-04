"use client";

import { SmartRsvpFlow } from "@/components/smart-rsvp";
import type { SmartRsvpTheme } from "@/components/smart-rsvp/theme";
import { rsvpEventSlug } from "../data";

const theme: SmartRsvpTheme = {
  accent: "rgb(var(--aj-accent))",
  accentHover: "rgb(var(--aj-accent-dark))",
  heading: "rgb(var(--aj-ink))",
  border: "rgb(var(--aj-line))",
  borderSoft: "rgb(var(--aj-line) / 0.5)",
  soft: "rgb(var(--aj-paper))",
  softStrong: "rgb(var(--aj-sand))",
};

export default function RsvpFlow() {
  return (
    <SmartRsvpFlow
      eventSlug={rsvpEventSlug}
      accessMode="name_search"
      theme={theme}
      searchAppearance="minimal"
      className="[&>div]:rounded-none [&>div]:border-0 [&>div]:bg-transparent [&>div]:shadow-none [&>div>div]:px-0"
      searchHeader={{
        title: "Kindly reply",
        description: "Find your invitation to let us know if you can join us.",
        titleClassName: "font-meaCulpa text-5xl font-normal leading-[1.2] tracking-normal sm:text-6xl",
        showVerification: false,
      }}
    />
  );
}
