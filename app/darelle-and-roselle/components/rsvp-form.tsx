"use client";

import { SmartRsvpFlow } from "@/components/smart-rsvp";
import type { SmartRsvpTheme } from "@/components/smart-rsvp/theme";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const theme: SmartRsvpTheme = {
  accent: "#5a6946",
  accentHover: "#4b502a",
  heading: "#414636",
  border: "#8c997f",
  borderSoft: "#bfb59a",
  soft: "#f2ede0",
  softStrong: "#e4dac2",
};

export default function RsvpForm() {
  return (
    <SmartRsvpFlow eventSlug={wedding.slug} accessMode="open" theme={theme} openFormAppearance="minimal"
      className={[
        styles.rsvpForm,
        "[&>section]:rounded-none [&>section]:border-0 [&>section]:bg-transparent [&>section]:p-0 [&>section]:text-[var(--dr-ink)]",
        "[&>div]:border-0 [&>div]:bg-transparent [&>div]:shadow-none",
        "[&_button[type=submit]]:min-h-12 [&_button[type=submit]]:rounded-none [&_button[type=submit]]:bg-[var(--dr-olive)] [&_button]:shadow-none",
      ].join(" ")} />
  );
}
