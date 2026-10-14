"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { openRsvpSchema, type OpenRsvpInput } from "@/features/rsvp/domain/open-rsvp";
import { requestOpenRsvpSubmission } from "./api";
import type { EventInformation } from "./types";

const fieldClass = "min-h-11 border-[var(--smart-rsvp-border)] bg-white text-base focus-visible:ring-[var(--smart-rsvp-accent)]";
const buttonClass = "min-h-11 bg-[var(--smart-rsvp-heading)] px-6 text-white hover:bg-[var(--smart-rsvp-heading)] hover:opacity-90";

interface OpenRsvpFormProps {
  event: EventInformation;
  // An isolated preview may inject an in-memory submitter; production uses the API.
  onSubmit?: (input: OpenRsvpInput) => Promise<unknown>;
  preview?: boolean;
}

export function OpenRsvpForm({ event, onSubmit = requestOpenRsvpSubmission, preview = false }: OpenRsvpFormProps) {
  const id = useId();
  const [attendance, setAttendance] = useState("");
  const [pending, setPending] = useState(false);
  const [savedName, setSavedName] = useState("");
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const receipt = useRef<{ payload: string; requestId: string } | null>(null);
  const confirmation = useRef<HTMLHeadingElement>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    const form = new FormData(e.currentTarget);
    const values = {
      slug: event.slug,
      fullName: String(form.get("fullName") ?? ""),
      attendance,
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? ""),
      dietaryRestrictions: attendance === "attending" ? String(form.get("dietaryRestrictions") ?? "") : "",
      message: String(form.get("message") ?? ""),
    };
    const payload = JSON.stringify(values);
    if (receipt.current?.payload !== payload) receipt.current = { payload, requestId: crypto.randomUUID() };
    const parsed = openRsvpSchema.safeParse({ ...values, requestId: receipt.current.requestId });
    if (!parsed.success) { setError(parsed.error.issues[0].message); return; }
    submitting.current = true;
    setPending(true);
    setError("");
    try {
      await onSubmit(parsed.data);
      setSavedName(parsed.data.fullName);
      requestAnimationFrame(() => confirmation.current?.focus());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not save your reply. Please try again.");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return <section aria-label={`RSVP for ${event.name}`} className="rounded-xl border border-[var(--smart-rsvp-border)] bg-white p-6 text-gray-800 sm:p-8">
    {savedName ? <div className="space-y-4 text-center">
      <Check aria-hidden="true" className="mx-auto size-8 text-[var(--smart-rsvp-heading)]" />
      <h3 ref={confirmation} tabIndex={-1} className="font-libreBaskerville text-2xl text-[var(--smart-rsvp-heading)] focus-visible:outline focus-visible:outline-2">Thank you, {savedName}.</h3>
      <p className="text-sm leading-6">{preview ? "Your sample reply is complete. It has not been sent or saved." : "Your reply has been saved."}</p>
    </div> : <>
      <h3 className="font-libreBaskerville text-2xl text-[var(--smart-rsvp-heading)]">Will you join us?</h3>
      <p className="mt-3 text-sm leading-6">Anyone can RSVP. Enter your details below to reply for yourself.</p>
      {preview && <p className="mt-3 text-sm leading-6 text-gray-600">Preview only. Replies are not sent or saved.</p>}
      <form onSubmit={submit} className="mt-6 space-y-5">
        <fieldset disabled={pending} className="min-w-0 space-y-5 disabled:opacity-70">
          <legend className="sr-only">Your RSVP details</legend>
          <div className="space-y-2">
            <Label htmlFor={`${id}-name`}>Full name</Label>
            <Input id={`${id}-name`} name="fullName" autoComplete="name" required minLength={2} maxLength={150} className={fieldClass} />
          </div>
          <fieldset className="space-y-2">
            <legend className="mb-2 text-sm font-medium">Will you attend?</legend>
            {[["attending", "Yes, I’ll be there"], ["declined", "Sorry, I can’t attend"]].map(([value, label]) => <label key={value} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-[var(--smart-rsvp-border-soft)] px-4 py-3 text-sm has-[:checked]:bg-[var(--smart-rsvp-soft)]">
              <input type="radio" name="attendance" value={value} checked={attendance === value} onChange={() => setAttendance(value)} required className="size-4 accent-[var(--smart-rsvp-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" />{label}
            </label>)}
          </fieldset>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor={`${id}-email`}>Email <span className="font-normal">(optional)</span></Label><Input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={254} className={fieldClass} /></div>
            <div className="space-y-2"><Label htmlFor={`${id}-phone`}>Phone <span className="font-normal">(optional)</span></Label><Input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40} className={fieldClass} /></div>
          </div>
          {attendance === "attending" && <div className="space-y-2"><Label htmlFor={`${id}-diet`}>Dietary needs <span className="font-normal">(optional)</span></Label><Input id={`${id}-diet`} name="dietaryRestrictions" maxLength={500} className={fieldClass} /></div>}
          <div className="space-y-2"><Label htmlFor={`${id}-message`}>Message <span className="font-normal">(optional)</span></Label><textarea id={`${id}-message`} name="message" rows={3} maxLength={2000} className={`${fieldClass} w-full rounded-md border px-3 py-2 focus-visible:outline-none focus-visible:ring-1`} /></div>
        </fieldset>
        {error && <p role="alert" className="text-sm leading-6 text-red-700">{error}</p>}
        <Button type="submit" disabled={pending} className={`${buttonClass} w-full`}>
          {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />}{pending ? "Saving your reply…" : "Submit RSVP"}
        </Button>
      </form>
    </>}
  </section>;
}
