"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import Reveal from "./motion/Reveal";
import SectionPetals from "./SectionPetals";

interface RSVPSectionProps {
  deadline: string;
}

const fieldClass = "mt-2 w-full rounded-none border-0 border-b border-[#dfcfd4] bg-transparent px-0 py-3 text-base font-normal normal-case tracking-normal text-[#624451] transition-colors placeholder:text-[#aa929c] focus:border-[#a97b8e] lg:text-lg";
const labelClass = "block text-sm font-normal text-[#876675] lg:text-base";

export default function RSVPSection({ deadline }: RSVPSectionProps) {
  const [preview, setPreview] = useState(false);
  const [response, setResponse] = useState({ firstName: "", lastName: "", attending: "", message: "" });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreview(true);
  }

  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="relative overflow-hidden border-t border-[#ead7df] bg-[#f5e9ed] px-5 py-20 text-[#624451] sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <SectionPetals />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b9c7] bg-[#fff9f4]/70 lg:mx-0">
            <Mail size={26} strokeWidth={1.2} aria-hidden="true" />
          </div>
          <div className="text-center lg:text-left">
            <p className="mt-7 text-xs uppercase tracking-[.3em] text-[#946879] lg:text-sm">A seat, a smile, a celebration</p>
            <h2 id="rsvp-title" className="mt-6 font-instrumentSerif text-[clamp(4rem,7vw,7rem)] leading-[.95] tracking-[-.035em]">Will you<br /><span className="font-meaCulpa font-normal text-[#946879]">join us?</span></h2>
            <p className="mx-auto mt-8 max-w-md text-base leading-8 text-[#756770] lg:mx-0 lg:text-xl lg:leading-9">Our day would be even more beautiful with you in it. We look forward to sharing our joy with the people we love.</p>
            <div className="mx-auto mt-8 max-w-md border-t border-[#d8b9c7]/60 pt-6 lg:mx-0">
              <p className="text-sm leading-7 text-[#876675] lg:text-base lg:leading-8">{deadline}</p>
              <p className="mt-5 font-meaCulpa text-3xl text-[#946879] lg:text-4xl">With love, Anjo &amp; Jasmin</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="relative rounded-lg bg-[#fffdf8] p-6 sm:p-9 lg:p-11">
          {preview ? (
            <div className="flex min-h-[32rem] flex-col items-center justify-center text-center">
              <div className="grid h-12 w-12 place-items-center text-[#637b65]"><Check size={28} strokeWidth={1.4} aria-hidden="true" /></div>
              <h3 className="mt-7 font-instrumentSerif text-4xl lg:text-5xl">Your response preview</h3>
              <p role="status" className="mt-5 max-w-sm text-base leading-8 text-[#756770] lg:text-lg">Thank you, {response.firstName}. This is a preview only. Your reply has not been sent or saved.</p>
              <p className="mt-4 text-sm leading-7 text-[#876675] lg:text-base">RSVP collection will open once the final details are ready.</p>
              <button type="button" onClick={() => setPreview(false)} className="mt-8 min-h-11 border-b border-[#cba4b6] py-2 text-sm text-[#876675] transition-colors hover:text-[#624451]">Edit preview</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="pb-2">
                <h3 className="font-instrumentSerif text-3xl lg:text-4xl">Kindly reply</h3>
                <p className="mt-3 text-xs leading-6 text-[#876675] lg:text-sm">RSVP preview · Replies are not sent or saved yet.</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className={labelClass}>First name<input required name="firstName" autoComplete="given-name" value={response.firstName} onChange={e => setResponse({ ...response, firstName: e.target.value })} className={fieldClass} placeholder="First name" /></label>
                <label className={labelClass}>Last name<input required name="lastName" autoComplete="family-name" value={response.lastName} onChange={e => setResponse({ ...response, lastName: e.target.value })} className={fieldClass} placeholder="Last name" /></label>
              </div>
              <fieldset>
                <legend className={labelClass}>Joyfully attending?</legend>
                <div className="mt-2 flex flex-wrap gap-x-7 gap-y-1">
                  {[{ value: "yes", label: "Yes, with joy" }, { value: "no", label: "Regretfully, no" }].map(answer => (
                    <label key={answer.value} className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-[#756770] transition-colors has-[:checked]:text-[#465a48] lg:text-base">
                      <input required type="radio" name="attending" value={answer.value} checked={response.attending === answer.value} onChange={e => setResponse({ ...response, attending: e.target.value })} className="h-3.5 w-3.5 shrink-0 accent-[#718463]" />{answer.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className={labelClass}>A note for the couple<textarea name="message" rows={3} value={response.message} onChange={e => setResponse({ ...response, message: e.target.value })} className={`${fieldClass} resize-y leading-7`} placeholder="A wish, a song, or something we should know…" /></label>
              <button type="submit" className="group flex min-h-14 w-full items-center justify-between gap-3 rounded-md bg-[#946879] px-6 py-4 text-sm font-medium text-[#fffaf3] transition-colors hover:bg-[#7e5666] lg:text-base">Submit my Response<ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
