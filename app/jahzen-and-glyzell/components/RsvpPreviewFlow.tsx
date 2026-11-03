"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SearchStep } from "@/components/smart-rsvp/SearchStep";
import { OpenRsvpForm } from "@/components/smart-rsvp/OpenRsvpForm";
import type { EventInformation } from "@/components/smart-rsvp/types";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const previewEvent: EventInformation = {
  name: wedding.couple.display,
  slug: wedding.slug,
  rsvpDeadline: "2027-05-01",
  accessMode: "name_search",
  responseMode: "individual",
};

const previewReply = async () => undefined;

// This draft reuses the shared layout without querying a guest list or API.
// Replace it with SmartRsvpFlow after the real event and guest list are ready.
export default function RsvpPreviewFlow() {
  const [fullName, setFullName] = useState("");
  const [previewName, setPreviewName] = useState<string | null>(null);

  function returnToNameEntry() {
    setPreviewName(null);
    requestAnimationFrame(() => document.getElementById("guest-full-name")?.focus());
  }

  if (previewName !== null) return <div>
    <button type="button" onClick={returnToNameEntry} className={`${styles.textLink} mb-6 inline-flex min-h-11 items-center gap-3`}>
      <ArrowLeft size={15} aria-hidden="true" />Back to name entry
    </button>
    <OpenRsvpForm event={previewEvent} appearance="minimal" preview onSubmit={previewReply}
      // This is the name entered for the visual preview, not a verified guest.
      verifiedName={previewName} fields={{ email: true, dietaryRestrictions: true, message: true }} />
  </div>;

  return <>
    <SearchStep appearance="minimal" event={previewEvent} fullName={fullName} onNameChange={setFullName}
      header={{
        title: "Kindly reply",
        titleClassName: styles.rsvpTitle,
        description: "Find your invitation to let us know if you can join us.",
        showVerification: false,
      }}
      matches={[]} isSearching={false} errorMessage="" loadingInvitationId={null} partyError=""
      onSearch={async () => { if (fullName.trim().length >= 3) setPreviewName(fullName.trim()); }}
      onReset={() => setFullName("")} onSelectMatch={async () => undefined} />
    <p className={`${styles.rsvpNote} mt-6 text-center`}>Preview only. Names are not checked against a guest list, and replies are not sent or saved.</p>
  </>;
}
