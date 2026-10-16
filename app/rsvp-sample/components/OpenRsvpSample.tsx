"use client";

import { OpenRsvpFlow } from "@/components/smart-rsvp/OpenRsvpFlow";
import { RsvpApiError } from "@/components/smart-rsvp/api";
import { normalizeOpenRsvpName } from "@/features/rsvp/domain/open-rsvp";
import { weddingSmartRsvpTheme } from "@/components/smart-rsvp/theme";
import { useRef } from "react";

export default function OpenRsvpSample() {
  const theme = weddingSmartRsvpTheme;
  const respondedNames = useRef(new Set(["alex sample"]));
  const nameKey = (name: string) => normalizeOpenRsvpName(name).toLowerCase();
  return <main className="min-h-screen bg-ivory px-4 py-8 sm:py-14">
    <div className="mx-auto max-w-xl" style={{
      "--smart-rsvp-accent": theme.accent,
      "--smart-rsvp-accent-hover": theme.accentHover,
      "--smart-rsvp-heading": theme.heading,
      "--smart-rsvp-border": theme.border,
      "--smart-rsvp-border-soft": theme.borderSoft,
      "--smart-rsvp-soft": theme.soft,
    } as React.CSSProperties}>
      <h1 className="mb-3 font-libreBaskerville text-3xl">Open RSVP sample</h1>
      <p className="mb-5 text-sm leading-6">Use a fictional name to try the form, or Alex Sample to see an already submitted reply. Sample replies stay in this tab until you refresh; no real responses are saved.</p>
      <OpenRsvpFlow
        event={{ name: "Open RSVP sample", slug: "open-rsvp-sample", accessMode: "open", responseMode: "individual", rsvpDeadline: null }}
        preview
        onCheckName={async ({ fullName }) => ({ status: respondedNames.current.has(nameKey(fullName)) ? "responded" : "available", fullName })}
        onSubmit={async ({ fullName }) => {
          if (respondedNames.current.has(nameKey(fullName))) throw new RsvpApiError("Your sample RSVP is already submitted.", 409, "ALREADY_RESPONDED");
          respondedNames.current.add(nameKey(fullName));
        }}
      />
    </div>
  </main>;
}
