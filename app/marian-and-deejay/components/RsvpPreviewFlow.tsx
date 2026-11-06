"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SearchStep } from "@/components/smart-rsvp/SearchStep";
import { OpenRsvpForm } from "@/components/smart-rsvp/OpenRsvpForm";
import { normalizeGuestName } from "@/components/smart-rsvp/utils";
import { rsvpFields, rsvpPreviewEvent } from "../data/rsvp";
import wedding from "../data/wedding-details.json";

// Explicitly replace the shared form's API submitter. Preview replies stay in React state.
const previewReply = async () => undefined;

export default function RsvpPreviewFlow() {
  const [fullName, setFullName] = useState("");
  const [previewName, setPreviewName] = useState<string | null>(null);

  function returnToNameEntry() {
    setPreviewName(null);
    requestAnimationFrame(() => document.getElementById("guest-full-name")?.focus());
  }

  return (
    <div className="mj-rsvp-flow">
      {previewName !== null ? <>
        <button type="button" onClick={returnToNameEntry} className="mj-text-link mb-6 inline-flex min-h-11 items-center gap-3 py-2 text-sm"><ArrowLeft size={16} aria-hidden="true" /> Back to name entry</button>
        <p className="mb-6 text-center text-sm leading-7">Kindly reply by <strong className="font-medium">{wedding.rsvp.deadline}</strong>.</p>
        <OpenRsvpForm event={rsvpPreviewEvent} appearance="minimal" preview onSubmit={previewReply} verifiedName={previewName} fields={rsvpFields} />
      </> : <>
        <SearchStep appearance="minimal" event={rsvpPreviewEvent} fullName={fullName} onNameChange={setFullName}
          header={{
            title: "Kindly reply",
            titleClassName: "mj-heading",
            description: <>Find your invitation to let us know if you can join us.<span className="mt-2 block text-sm leading-7">Please reply by <strong className="font-medium">{wedding.rsvp.deadline}</strong>.</span></>,
            showVerification: false,
          }}
          matches={[]} isSearching={false} errorMessage="" loadingInvitationId={null} partyError=""
          onSearch={async () => {
            const name = normalizeGuestName(fullName);
            if (name.length >= 3) setPreviewName(name);
          }}
          onReset={() => setFullName("")} onSelectMatch={async () => undefined} />
        <p className="mj-rsvp-preview-note mt-6 text-center text-sm leading-7">Preview only. Names are not checked against a guest list, and replies are not sent or saved.</p>
      </>}
    </div>
  );
}
