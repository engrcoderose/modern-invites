"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { openRsvpSchema, type OpenRsvpInput } from "@/features/rsvp/domain/open-rsvp";
import { isRsvpClosedError, requestOpenRsvpSubmission, RsvpApiError } from "./api";
import { RsvpClosedNotice } from "./RsvpClosedNotice";
import type { EventInformation, RsvpFieldOptions } from "./types";

const defaultFieldClass = "min-h-11 border-[var(--smart-rsvp-border)] bg-white text-base focus-visible:ring-[var(--smart-rsvp-accent)]";
const buttonClass = "min-h-11 bg-[var(--smart-rsvp-heading)] px-6 text-white hover:bg-[var(--smart-rsvp-heading)] hover:opacity-90";

interface OpenRsvpFormProps {
  closedMessage?: string;
  closedAppearance?: "card" | "minimal";
  closedTitleClassName?: string;
  onClosed?: () => void;
  event: EventInformation;
  fields?: RsvpFieldOptions;
  appearance?: "card" | "minimal";
  // An isolated preview may inject an in-memory submitter; production uses the API.
  onSubmit?: (input: OpenRsvpInput) => Promise<unknown>;
  preview?: boolean;
  verifiedName?: string;
  onNameConflict?: (status: "responded" | "ambiguous") => void;
}

export function OpenRsvpForm({ event, fields, appearance = "card", onSubmit = requestOpenRsvpSubmission, preview = false, verifiedName, onNameConflict, closedMessage, closedAppearance, closedTitleClassName, onClosed }: OpenRsvpFormProps) {
  const minimal = appearance === "minimal";
  const fieldClass = minimal
    ? "min-h-12 rounded-none border border-[var(--smart-rsvp-border-soft)] bg-transparent px-3 text-base shadow-none focus-visible:ring-[var(--smart-rsvp-accent)] sm:min-h-14 md:text-base"
    : defaultFieldClass;
  const id = useId();
  const [attendance, setAttendance] = useState("");
  const [pending, setPending] = useState(false);
  const [savedName, setSavedName] = useState("");
  const [error, setError] = useState("");
  const [rsvpClosed, setRsvpClosed] = useState(false);
  const submitting = useRef(false);
  const receipt = useRef<{ payload: string; requestId: string } | null>(null);
  const confirmation = useRef<HTMLHeadingElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (verifiedName) heading.current?.focus(); }, [verifiedName]);
  const labelClass = minimal ? "font-normal" : undefined;
  const emailField = fields?.email !== false && <div className="space-y-2"><Label htmlFor={`${id}-email`} className={labelClass}>{minimal ? "Email address" : "Email"} <span className="font-normal">(optional)</span></Label><Input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={254} className={fieldClass} /></div>;
  const phoneField = <div className="space-y-2"><Label htmlFor={`${id}-phone`} className={labelClass}>{minimal ? "Contact number" : "Phone"} <span className="font-normal">(optional)</span></Label><Input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40} className={fieldClass} /></div>;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    const form = new FormData(e.currentTarget);
    const values = {
      slug: event.slug,
      fullName: verifiedName ?? String(form.get("fullName") ?? ""),
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
      if (isRsvpClosedError(cause)) {
        setRsvpClosed(true);
        onClosed?.();
        return;
      }
      if (cause instanceof RsvpApiError && onNameConflict && (cause.code === "ALREADY_RESPONDED" || cause.code === "AMBIGUOUS_NAME")) {
        onNameConflict(cause.code === "ALREADY_RESPONDED" ? "responded" : "ambiguous");
        return;
      }
      setError(cause instanceof Error ? cause.message : "We could not save your reply. Please try again.");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  if (rsvpClosed) return <RsvpClosedNotice message={closedMessage} appearance={closedAppearance ?? appearance} titleClassName={closedTitleClassName} />;

  return <section aria-label={`RSVP for ${event.name}`} className={minimal ? "text-[var(--smart-rsvp-heading)]" : "rounded-xl border border-[var(--smart-rsvp-border)] bg-white p-6 text-gray-800 sm:p-8"}>
    {savedName ? <div className="space-y-4 text-center">
      <Check aria-hidden="true" className="mx-auto size-8 text-[var(--smart-rsvp-heading)]" />
      <h3 ref={confirmation} tabIndex={-1} className="font-libreBaskerville text-2xl text-[var(--smart-rsvp-heading)] focus-visible:outline focus-visible:outline-2">Thank you, {savedName}.</h3>
      <p className="text-sm leading-6">{preview ? "Your sample reply is complete. It has not been sent or saved." : "Your reply has been saved."}</p>
    </div> : <>
      <h3 ref={heading} tabIndex={-1} data-rsvp-title={minimal ? "true" : undefined} className={`font-libreBaskerville text-2xl text-[var(--smart-rsvp-heading)] ${minimal ? "text-center" : ""}`}>{minimal ? "Your RSVP" : "Will you join us?"}</h3>
      {minimal && verifiedName && <div className="mt-3 space-y-3 text-center">
        <p className="text-lg font-medium">{verifiedName}</p>
        <p className="text-sm leading-6">Please confirm your attendance below.</p>
        <p className="text-xs leading-6" aria-live="polite">{attendance ? 1 : 0} of 1 answered</p>
      </div>}
      {(!minimal || !verifiedName) && <p className="mt-3 text-sm leading-6">{verifiedName ? "Your name is ready. Please complete your RSVP below." : "Anyone can RSVP. Enter your details below to reply for yourself."}</p>}
      {preview && <p className="mt-3 text-sm leading-6 text-gray-600">Preview only. Replies are not sent or saved.</p>}
      <form onSubmit={submit} className={minimal ? "mt-7 space-y-6 text-left" : "mt-6 space-y-5"}>
        <fieldset disabled={pending} className="min-w-0 space-y-5 disabled:opacity-70">
          <legend className="sr-only">Your RSVP details</legend>
          {verifiedName ? <div className={minimal ? "flex items-center gap-4" : "space-y-2"}>
            {!minimal && <p className="text-sm">Full name</p>}<p className="min-w-0 font-medium">{verifiedName}</p>
            {minimal && <span aria-hidden="true" className="h-px flex-1 bg-[var(--smart-rsvp-border-soft)]" />}
            <input type="hidden" name="fullName" value={verifiedName} />
          </div> : <div className="space-y-2">
            <Label htmlFor={`${id}-name`}>Full name</Label>
            <Input id={`${id}-name`} name="fullName" autoComplete="name" required minLength={2} maxLength={150} className={fieldClass} />
          </div>}
          <fieldset className="space-y-2">
            <legend className={minimal ? "sr-only" : "mb-2 text-sm font-medium"}>Will you attend?</legend>
            <div className={minimal ? "grid grid-cols-2 gap-3" : "space-y-2"}>
              {[["attending", "Yes, I’ll be there"], ["declined", "Sorry, I can’t attend"]].map(([value, label]) => <label key={value} className={minimal
                ? "flex min-h-12 cursor-pointer items-center gap-3 whitespace-nowrap border border-[var(--smart-rsvp-border-soft)] px-4 py-3 text-base has-[:checked]:border-[var(--smart-rsvp-accent)] has-[:checked]:bg-[var(--smart-rsvp-soft)]"
                : "flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-[var(--smart-rsvp-border-soft)] px-4 py-3 text-sm has-[:checked]:bg-[var(--smart-rsvp-soft)]"}>
                <input type="radio" name="attendance" value={value} aria-label={label} checked={attendance === value} onChange={() => setAttendance(value)} required className="size-4 accent-[var(--smart-rsvp-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" />{minimal ? (value === "attending" ? "Yes" : "No") : label}
              </label>)}
            </div>
          </fieldset>
          <div className={minimal ? "grid gap-5 border-t border-[var(--smart-rsvp-border-soft)] pt-6" : `grid gap-5 ${fields?.email !== false ? "sm:grid-cols-2" : ""}`}>
            {minimal ? <>{phoneField}{emailField}</> : <>{emailField}{phoneField}</>}
          </div>
          {fields?.dietaryRestrictions !== false && attendance === "attending" && <div className="space-y-2"><Label htmlFor={`${id}-diet`} className={labelClass}>Dietary needs <span className="font-normal">(optional)</span></Label><Input id={`${id}-diet`} name="dietaryRestrictions" maxLength={500} className={fieldClass} /></div>}
          {fields?.message !== false && <div className="space-y-2"><Label htmlFor={`${id}-message`} className={labelClass}>Message <span className="font-normal">(optional)</span></Label><textarea id={`${id}-message`} name="message" rows={minimal ? 2 : 3} maxLength={2000} className={`${fieldClass} w-full py-2 focus-visible:outline-none focus-visible:ring-1 ${minimal ? "resize-y" : "rounded-md border px-3"}`} /></div>}
        </fieldset>
        {error && <p role="alert" className="text-sm leading-6 text-red-700">{error}</p>}
        <Button type="submit" disabled={pending} className={`${buttonClass} w-full`}>
          {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />}{pending ? "Saving your reply…" : "Submit RSVP"}
        </Button>
      </form>
    </>}
  </section>;
}
