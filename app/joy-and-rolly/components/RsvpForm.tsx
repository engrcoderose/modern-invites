"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OpenRsvpForm } from "@/components/smart-rsvp/OpenRsvpForm";
import { SearchStep } from "@/components/smart-rsvp/SearchStep";
import type { EventInformation } from "@/components/smart-rsvp/types";
import { openRsvpNameSchema } from "@/features/rsvp/domain/open-rsvp";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const previewEvent: EventInformation = {
  name: `${wedding.couple.display}’s Wedding`, slug: wedding.slug,
  rsvpDeadline: wedding.rsvp.deadlineIso, accessMode: "open", responseMode: "individual",
};

// Draft-only adapter: no guest-list lookup, event records, or persisted replies.
async function previewReply() { return Promise.resolve(); }

export default function RsvpForm() {
  const [fullName, setFullName] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [error, setError] = useState("");

  async function continuePreview() {
    const parsed = openRsvpNameSchema.safeParse({ slug: wedding.slug, fullName });
    if (!parsed.success) { setError(parsed.error.issues[0].message); return; }
    setError("");
    setSelectedName(parsed.data.fullName);
  }

  function restart() {
    setSelectedName("");
    setError("");
    requestAnimationFrame(() => document.getElementById("guest-full-name")?.focus());
  }

  return <>
    {selectedName ? <>
      <OpenRsvpForm event={previewEvent} verifiedName={selectedName} preview onSubmit={previewReply}
        appearance="minimal" fields={{ email: true, dietaryRestrictions: false, message: false }} />
      <Button type="button" variant="ghost" onClick={restart} className="mt-4 h-auto min-h-11 max-w-full whitespace-normal py-3 text-[var(--smart-rsvp-heading)]">Use a different name</Button>
    </> : <div className="[&_button[type=submit]]:h-auto [&_button[type=submit]]:min-h-16 [&_button[type=submit]]:flex-row-reverse [&_button[type=submit]]:whitespace-normal [&_button[type=submit]]:px-[12px] [&_button[type=submit]]:py-4 [&_button[type=submit]_svg]:static [&_button[type=submit]_svg]:size-[16px]"><SearchStep event={previewEvent} fullName={fullName} matches={[]} isSearching={false} errorMessage={error}
      appearance="minimal" loadingInvitationId={null} partyError="" onSearch={continuePreview} onSelectMatch={continuePreview} onReset={restart}
      onNameChange={value => { setFullName(value); setError(""); }}
      header={{ title: "Kindly reply", titleClassName: `${styles.heading} tracking-normal`, description: "Find your invitation to let us know if you can join us.", showVerification: false }} /></div>}
    <p className={`${styles.serif} mt-7 text-center text-lg`}>Kindly reply by {wedding.rsvp.deadline}.</p>
    {!selectedName && <p className={`${styles.muted} mt-3 text-center text-sm leading-6`}>Design preview — guest lookup and replies aren’t connected.</p>}
  </>;
}
