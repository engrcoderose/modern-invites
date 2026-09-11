"use client";

import Image from "next/image";
import { Together } from "../../jasmin-and-anjo/prenup-media";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import FloralAccent from "./FloralAccent";

interface RSVPSectionProps {
  deadline: string;
}

const fieldClass = "mt-2 w-full rounded-xl border border-[#dfcfd4] bg-[#fffdfa] px-4 py-3 text-base font-normal normal-case tracking-normal text-[#624451] transition-colors placeholder:text-[#a28b95] focus:border-[#946879] focus:outline-none focus:ring-2 focus:ring-[#946879]/20";
const labelClass = "block text-sm font-medium text-[#624451]";

export default function RSVPSection({ deadline }: RSVPSectionProps) {
  const [preview, setPreview] = useState(false);
  const [response, setResponse] = useState({ firstName: "", lastName: "", attending: "", message: "" });
  const previewHeading = useRef<HTMLHeadingElement>(null);
  const firstNameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (preview) previewHeading.current?.focus({ preventScroll: true });
  }, [preview]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreview(true);
  }

  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="relative overflow-hidden border-t border-[#ead7df] bg-[#f5e9ed] bg-[radial-gradient(ellipse_at_top_left,#fff9f4,transparent_65%)] px-5 py-20 text-[#624451] sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <FloralAccent kind="blue" className="-left-12 top-20 w-36 -rotate-12 opacity-60 sm:w-56" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="text-[10px] uppercase tracking-[.3em] text-[#946879] sm:text-xs">A seat, a smile, a celebration</p>
          <h2 id="rsvp-title" className="mt-5 font-instrumentSerif text-[clamp(3.5rem,7vw,6rem)] leading-[1.1] tracking-[-.035em]">Will you <span className="font-meaCulpa font-normal text-[#946879]">join us?</span></h2>
        </Reveal>

        <Reveal className="overflow-hidden rounded-[1.75rem] border border-[#dfcbd3] bg-[#fffdf8] shadow-[0_20px_70px_-35px_#62445155] sm:rounded-[2rem]">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="flex flex-col border-b border-[#ead7df] bg-[#f8eff0] lg:border-b-0 lg:border-r">
              <div className="relative aspect-[3/2] overflow-hidden lg:aspect-[4/3]">
                <Image src={Together} alt="Anjo and Jasmin sitting together, holding hands in the garden" fill sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 90vw, 520px" className="object-cover object-[center_55%]" />
              </div>
              <div className="flex flex-1 flex-col justify-center px-6 py-8 text-center sm:px-10 sm:py-10 lg:text-left">
                <p className="text-base leading-8 text-[#756770]">Our day would be even more beautiful with you in it. We look forward to sharing our joy with the people we love.</p>
                <p className="mt-5 font-meaCulpa text-3xl text-[#946879] sm:text-4xl">With love, Anjo &amp; Jasmin</p>
                <div className="mt-7 flex items-start gap-3 border-t border-[#d8b9c7]/60 pt-6 text-left">
                  <Mail size={18} strokeWidth={1.4} aria-hidden="true" className="mt-1 shrink-0 text-[#946879]" />
                  <p className="text-sm leading-7 text-[#876675]">{deadline}</p>
                </div>
              </div>
            </div>

            <div className="min-w-0 px-6 py-8 sm:p-10 lg:p-12">
          {preview ? (
            <div className="flex min-h-[32rem] flex-col items-center justify-center text-center">
              <div className="grid h-12 w-12 place-items-center text-[#637b65]"><Check size={28} strokeWidth={1.4} aria-hidden="true" /></div>
              <h3 ref={previewHeading} tabIndex={-1} className="mt-7 font-instrumentSerif text-4xl outline-none lg:text-5xl">Your response preview</h3>
              <p role="status" className="mt-5 max-w-sm text-base leading-8 text-[#756770] lg:text-lg">Thank you, {response.firstName}. This is a preview only. Your reply has not been sent or saved.</p>
              <p className="mt-4 text-sm leading-7 text-[#876675] lg:text-base">RSVP collection will open once the final details are ready.</p>
              <button type="button" onClick={() => { setPreview(false); requestAnimationFrame(() => firstNameInput.current?.focus({ preventScroll: true })); }} className="mt-8 min-h-11 rounded-full border border-[#cba4b6] px-6 py-3 text-sm text-[#876675] transition-colors hover:bg-[#f8eff0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879]">Edit preview</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="pb-2">
                <h3 className="font-instrumentSerif text-4xl lg:text-5xl">Kindly reply</h3>
                <p className="mt-3 text-sm leading-6 text-[#876675]">RSVP preview Â· Replies are not sent or saved yet.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>First name<input ref={firstNameInput} required name="firstName" autoComplete="given-name" value={response.firstName} onChange={e => setResponse({ ...response, firstName: e.target.value })} className={fieldClass} placeholder="First name" /></label>
                <label className={labelClass}>Last name<input required name="lastName" autoComplete="family-name" value={response.lastName} onChange={e => setResponse({ ...response, lastName: e.target.value })} className={fieldClass} placeholder="Last name" /></label>
              </div>
              <fieldset>
                <legend className={labelClass}>Joyfully attending?</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[{ value: "yes", label: "Yes, with joy" }, { value: "no", label: "Regretfully, no" }].map(answer => (
                    <label key={answer.value} className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-[#dfcfd4] px-4 py-3 text-sm text-[#756770] transition-colors hover:bg-[#f8f5ef] has-[:checked]:border-[#718463] has-[:checked]:bg-[#edf0e5] has-[:checked]:text-[#465a48] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#718463]">
                      <input required type="radio" name="attending" value={answer.value} checked={response.attending === answer.value} onChange={e => setResponse({ ...response, attending: e.target.value })} className="h-4 w-4 shrink-0 accent-[#718463]" />{answer.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className={labelClass}>A note for the couple <span className="font-normal text-[#876675]">(optional)</span><textarea name="message" rows={3} value={response.message} onChange={e => setResponse({ ...response, message: e.target.value })} className={`${fieldClass} resize-y leading-7`} placeholder="A wish, a song, or something we should knowâ€¦" /></label>
              <button type="submit" className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#946879] px-6 py-4 text-sm font-medium text-[#fffaf3] transition-colors hover:bg-[#7e5666] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879] sm:text-base">Preview my response<ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></button>
            </form>
          )}
            </div>
          </div>
        </Reveal>
      </div>
      <div aria-hidden="true" className="relative mx-auto -mb-20 mt-12 aspect-[1366/396] max-w-6xl sm:-mb-28 sm:mt-16 lg:-mb-32">
        <FloralAccent kind="wildflowers" className="inset-x-0 bottom-0 w-full" sizes="(max-width: 1024px) 95vw, 1152px" />
      </div>
    </section>
  );
}

