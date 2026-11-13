"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { rsvpPreview } from "../data/rsvp-preview";
import { buttonClass, inputClass, labelClass } from "./rsvp-form-styles";

type Attendance = "attending" | "declined";

export function RsvpPreviewReply({ onBack }: { onBack: () => void }) {
  const [responses, setResponses] = useState<Record<string, Attendance>>({});
  const [complete, setComplete] = useState(false);
  const confirmation = useRef<HTMLHeadingElement>(null);
  const attending = Object.values(responses).filter((status) => status === "attending").length;
  const answered = Object.keys(responses).length;

  useEffect(() => {
    if (complete) confirmation.current?.focus();
  }, [complete]);

  if (complete) {
    return (
      <div className="py-4 text-center">
        <Check className="mx-auto mb-4 size-8 text-[#5a6946]" aria-hidden="true" />
        <h3 ref={confirmation} tabIndex={-1} className="op-heading !my-3 !text-[38px]">Preview complete</h3>
        <p role="status" className="text-sm leading-relaxed">Your sample reply has not been sent or saved.</p>
        <p className="mt-4 text-sm">{attending} attending · {rsvpPreview.guests.length - attending} unable to attend</p>
        <button type="button" onClick={onBack} className="mt-5 min-h-11 text-xs underline underline-offset-4">Try the preview again</button>
      </div>
    );
  }

  return (
    <form className="mt-6" onSubmit={(event) => {
      event.preventDefault();
      if (!complete && answered === rsvpPreview.guests.length) setComplete(true);
    }}>
      <h3 className="op-rsvp-form-heading my-3">{rsvpPreview.householdName}</h3>
      <p className="text-xs leading-relaxed">Please respond for everyone listed below.</p>
      <p className="mt-2 text-[10px] tracking-wide">{answered} of {rsvpPreview.guests.length} answered · Maximum {rsvpPreview.guests.length} attending</p>
      <div className="mt-6 space-y-6">
        {rsvpPreview.guests.map((name) => (
          <fieldset key={name} className="border-t border-[#bfb59a66] pt-3 text-left">
            <legend className="pr-3 text-sm font-semibold">{name}</legend>
            <div className="mt-2 grid gap-2">
              {([["attending", "Joyfully attending"], ["declined", "Regretfully unable to attend"]] as const).map(([status, label]) => (
                <label key={status} className="flex min-h-11 cursor-pointer items-center gap-3 border border-[#bfb59a80] px-3 py-3 text-xs has-[:checked]:border-[#5a6946] has-[:checked]:bg-[#5a694615]">
                  <input type="radio" required name={`op-preview-${name}`} value={status} checked={responses[name] === status} onChange={() => setResponses((current) => ({ ...current, [name]: status }))} className="size-4 accent-[#5a6946]" />
                  {label}
                </label>
              ))}
            </div>
            {responses[name] === "attending" && (
              <label className={`${labelClass} mt-4`}>
                Dietary restrictions or allergies (optional)
                <input type="text" maxLength={500} className={inputClass} />
              </label>
            )}
          </fieldset>
        ))}
      </div>
      <fieldset className="mt-6 space-y-4 border-t border-[#bfb59a66] pt-5">
        <legend className="sr-only">Sample contact details</legend>
        <p className="text-xs leading-relaxed">Use sample contact details to try the form.</p>
        <label className={labelClass}>
          Contact number
          <input required type="tel" autoComplete="off" minLength={6} maxLength={40} placeholder="09123456789" className={inputClass} />
        </label>
        <label className={labelClass}>
          Email address
          <input required type="email" autoComplete="off" maxLength={254} placeholder="alex@example.com" className={inputClass} />
        </label>
      </fieldset>
      <button type="submit" disabled={answered !== rsvpPreview.guests.length} className={`${buttonClass} mt-6`}>
        Preview confirmation <ArrowRight size={15} aria-hidden="true" />
      </button>
      <button type="button" onClick={onBack} className="mt-5 min-h-11 text-[11px] underline underline-offset-4">Back to sample name search</button>
    </form>
  );
}
