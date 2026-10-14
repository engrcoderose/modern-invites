"use client";

import { OpenRsvpForm } from "@/components/smart-rsvp/OpenRsvpForm";
import { weddingSmartRsvpTheme } from "@/components/smart-rsvp/theme";
import { useState } from "react";
import OpenHouseholdSample from "./OpenHouseholdSample";

export default function OpenRsvpSample() {
  const theme = weddingSmartRsvpTheme;
  const [path, setPath] = useState<"search" | "new">("search");
  const [attempt, setAttempt] = useState(0);
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
      <p className="mb-5 text-sm leading-6">Test either path. All guests are fictional and no replies are saved.</p>
      <div className="mb-5 flex flex-wrap gap-3">
        {([['search', 'Find my household'], ['new', 'RSVP without a guest-list entry']] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={path === value} onClick={() => setPath(value)} className={`min-h-11 rounded-md border border-forest px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${path === value ? 'bg-forest text-white' : 'bg-white text-forest'}`}>{label}</button>)}
      </div>
      {path === "search" ? <OpenHouseholdSample /> : <OpenRsvpForm key={attempt}
        event={{ name: "Open RSVP sample", slug: "open-rsvp-sample", accessMode: "open", responseMode: "individual", rsvpDeadline: null }}
        preview
        onSubmit={async () => undefined}
      />}
      {path === "new" && <button type="button" onClick={() => setAttempt(value => value + 1)} className="mt-4 min-h-11 text-sm underline underline-offset-4">Start another sample reply</button>}
    </div>
  </main>;
}
