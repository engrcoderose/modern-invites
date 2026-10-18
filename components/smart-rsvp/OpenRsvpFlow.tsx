"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { openRsvpNameSchema, type OpenRsvpInput, type OpenRsvpNameInput, type OpenRsvpNameResult } from "@/features/rsvp/domain/open-rsvp";
import { isRsvpClosedError, requestOpenRsvpNameCheck } from "./api";
import { RsvpClosedNotice } from "./RsvpClosedNotice";
import { OpenRsvpForm } from "./OpenRsvpForm";
import type { EventInformation, RsvpFieldOptions } from "./types";

interface Props {
  closedMessage?: string;
  closedAppearance?: "card" | "minimal";
  closedTitleClassName?: string;
  event: EventInformation;
  fields?: RsvpFieldOptions;
  appearance?: "card" | "minimal";
  onCheckName?: (input: OpenRsvpNameInput) => Promise<OpenRsvpNameResult>;
  onSubmit?: (input: OpenRsvpInput) => Promise<unknown>;
  preview?: boolean;
}

export function OpenRsvpFlow({ event, fields, appearance = "card", onCheckName = requestOpenRsvpNameCheck, onSubmit, preview = false, closedMessage, closedAppearance, closedTitleClassName }: Props) {
  const id = useId();
  const [name, setName] = useState("");
  const [result, setResult] = useState<OpenRsvpNameResult | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [rsvpClosed, setRsvpClosed] = useState(false);
  const pending = useRef(false);
  const input = useRef<HTMLInputElement>(null);
  const notice = useRef<HTMLHeadingElement>(null);

  async function checkName(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    if (pending.current) return;
    const parsed = openRsvpNameSchema.safeParse({ slug: event.slug, fullName: name });
    if (!parsed.success) { setError(parsed.error.issues[0].message); return; }
    pending.current = true;
    setChecking(true); setError("");
    try {
      const checked = await onCheckName(parsed.data);
      setName(checked.fullName);
      setResult(checked);
      requestAnimationFrame(() => notice.current?.focus());
    } catch (cause) {
      if (isRsvpClosedError(cause)) setRsvpClosed(true);
      setError(cause instanceof Error ? cause.message : "We could not check your name. Please try again.");
    } finally { pending.current = false; setChecking(false); }
  }

  function startOver() {
    setResult(null); setError("");
    requestAnimationFrame(() => input.current?.focus());
  }

  if (rsvpClosed) return <RsvpClosedNotice message={closedMessage} appearance={closedAppearance ?? appearance} titleClassName={closedTitleClassName} />;

  if (result?.status === "available") return <>
    <OpenRsvpForm key={result.fullName} event={event} fields={fields} appearance={appearance} verifiedName={result.fullName} preview={preview} onSubmit={onSubmit}
      closedMessage={closedMessage} closedAppearance={closedAppearance} closedTitleClassName={closedTitleClassName} onClosed={() => setRsvpClosed(true)}
      onNameConflict={(status) => {
        setResult({ status, fullName: result.fullName });
        requestAnimationFrame(() => notice.current?.focus());
      }} />
    <Button type="button" variant="ghost" onClick={startOver} className="mt-4 min-h-11 text-[var(--smart-rsvp-heading)]">Use a different name</Button>
  </>;

  if (result) return <section aria-label="RSVP name status" className="space-y-5 text-center">
    <h3 ref={notice} tabIndex={-1} className="font-libreBaskerville text-2xl text-[var(--smart-rsvp-heading)]">
      {result.status === "responded" ? "RSVP already submitted" : "Please contact the couple"}
    </h3>
    <p role="status" className="text-sm leading-7">
      {result.status === "responded"
        ? `An RSVP has already been submitted for ${result.fullName}. You cannot submit another response for this name. Please contact the couple if you need to make a change.`
        : "More than one guest shares this name. Please contact the couple so we can confirm the correct person."}
    </p>
    <Button type="button" variant="outline" onClick={startOver} className="min-h-11 border-[var(--smart-rsvp-border)]">Use a different name</Button>
  </section>;

  return <section aria-label="Start your RSVP" className="text-center">
    <h3 ref={notice} tabIndex={-1} className="font-libreBaskerville text-2xl text-[var(--smart-rsvp-heading)]">Your RSVP</h3>
    <p className="mt-3 text-sm leading-7">Enter your full name to continue. We’ll check whether you have already sent a reply.</p>
    {preview && <p className="mt-3 text-sm leading-6">Preview only. No real RSVPs are sent or saved.</p>}
    <form onSubmit={checkName} className="mt-7 space-y-6">
      <div className="space-y-3">
        <Label htmlFor={`${id}-name`}>Full name</Label>
        <Input ref={input} id={`${id}-name`} value={name} autoComplete="name" required minLength={2} maxLength={150} disabled={checking}
          onChange={(e) => { setName(e.target.value); setError(""); }} aria-describedby={error ? `${id}-error` : undefined}
          className={appearance === "minimal"
            ? "min-h-12 rounded-none border-0 border-b border-[var(--smart-rsvp-border)] bg-transparent px-0 text-center text-base shadow-none focus-visible:border-[var(--smart-rsvp-heading)] focus-visible:ring-0"
            : "min-h-12 border-[var(--smart-rsvp-border)] bg-transparent text-center text-base focus-visible:ring-[var(--smart-rsvp-accent)]"} />
      </div>
      {error && <p id={`${id}-error`} role="alert" className="text-sm leading-6 text-red-700">{error}</p>}
      <Button type="submit" disabled={checking} className="min-h-12 w-full bg-[var(--smart-rsvp-accent)] text-white hover:bg-[var(--smart-rsvp-accent-hover)]">
        {checking && <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />}{checking ? "Checking your name…" : "Continue"}
      </Button>
    </form>
  </section>;
}
