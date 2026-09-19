"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, Search } from "lucide-react";
import { demoHouseholds } from "../data";
import { emptyResponse, findHouseholds, summarizeResponse, validateResponse, type DemoHousehold, type GuestResponse, type HouseholdResponse } from "../lib/demo-rsvp";

const labelClass = "block text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[#876675]";
const inputClass = "mt-3 w-full border-0 border-b border-[#d8b9c7] bg-transparent px-0 py-3 text-base font-normal normal-case tracking-normal text-[#624451] outline-none transition-colors placeholder:text-[#aa929c] focus:border-[#946879] focus:ring-0";
const buttonClass = "group flex min-h-14 w-full items-center justify-between gap-3 bg-[#946879] px-6 py-5 text-[0.64rem] font-medium uppercase tracking-[0.24em] text-[#fffaf3] transition-colors hover:bg-[#7e5666] disabled:cursor-not-allowed disabled:opacity-50";
const backClass = "mx-auto flex min-h-11 items-center justify-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-[#876675] underline underline-offset-8";
type Match = ReturnType<typeof findHouseholds>[number];
type Completed = Record<string, HouseholdResponse>;

export default function DemoRsvpFlow() {
  const reducedMotion = useReducedMotion();
  const heading = useRef<HTMLHeadingElement>(null);
  const [stage, setStage] = useState<"search" | "party" | "complete">("search");
  const [fullName, setFullName] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [selected, setSelected] = useState<DemoHousehold | null>(null);
  const [responses, setResponses] = useState<HouseholdResponse>({});
  const [completed, setCompleted] = useState<Completed>({});
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const summary = selected ? summarizeResponse(selected, responses) : null;
  const locked = stage === "party" && selected && Boolean(completed[selected.id]);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = findHouseholds(demoHouseholds, fullName);
    setMatches(found);
    setError(found.length ? "" : "We couldn't find that complete invited name. Please check the spelling and try again.");
  }

  function select(household: DemoHousehold) {
    setSelected(household);
    setResponses(completed[household.id] ?? emptyResponse(household));
    setEmail(""); setPhone(""); setError(""); setStage("party");
  }

  function update(id: string, changes: Partial<GuestResponse>) {
    setResponses(current => ({ ...current, [id]: { ...current[id], ...changes } }));
    setError("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    try {
      validateResponse(selected, responses);
      if (phone.trim().length < 6 || !email.trim()) throw new Error("Please complete the contact and email fields.");
      // Local React state only. Do not invoke the live smart-RSVP API.
      setCompleted(current => ({ ...current, [selected.id]: responses }));
      setEmail(""); setPhone(""); setStage("complete"); setError("");
    } catch (issue) { setError(issue instanceof Error ? issue.message : "Please check your response."); }
  }

  function back() { setStage("search"); setSelected(null); setError(""); setEmail(""); setPhone(""); }
  function reset() { back(); setFullName(""); setMatches([]); setResponses({}); setCompleted({}); }

  return <div>
    <p className="mb-5 text-center text-xs leading-6 text-[#876675]">RSVP demo · Replies are not sent or saved. Try <strong>Clara del Rosario</strong> or <strong>Lucia Navarro</strong>. Use made-up contact details.</p>
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => heading.current?.focus({ preventScroll: true })}>
      <motion.div key={`${stage}-${selected?.id ?? "search"}`} initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} onAnimationComplete={() => heading.current?.focus({ preventScroll: true })} className="border border-[#d8b9c7]/60 bg-[#fffdf8] p-6 shadow-[0_18px_60px_#62445108] sm:p-10 lg:p-12">
        {stage === "search" ? <>
          <div className="text-center">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[#946879]">Guest verification</p>
            <h3 ref={heading} tabIndex={-1} className="mt-4 font-instrumentSerif text-4xl outline-none">Find your invitation</h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#756770]">Enter your complete invited name exactly as it appears on the guest list for Joshua &amp; Bea.</p>
          </div>
          <form onSubmit={search} className="mt-9 space-y-7">
            <label className={labelClass}>Complete invited name<input required minLength={3} maxLength={150} value={fullName} onChange={event => { setFullName(event.target.value); setMatches([]); setError(""); }} autoComplete="off" placeholder="Your complete name" className={inputClass} /></label>
            {error && <p role="alert" className="border border-[#d8b9c7] bg-[#f5e9ed] px-4 py-3 text-sm leading-6">{error}</p>}
            <button type="submit" disabled={fullName.trim().length < 3} className={buttonClass}>Find my invitation<Search size={16} aria-hidden="true" /></button>
          </form>
          {matches.length > 0 && <div className="mt-8 space-y-3 border-t border-[#d8b9c7]/50 pt-7">
            <p role="status" className={labelClass}>Select your household</p>
            {matches.map(({ household, matchedName }) => {
              const totals = summarizeResponse(household, completed[household.id] ?? emptyResponse(household));
              return <button key={household.id} type="button" onClick={() => select(household)} className="group w-full border border-[#d8b9c7]/70 bg-[#f5e9ed]/40 px-5 py-4 text-left transition-colors hover:border-[#946879] hover:bg-[#f5e9ed]">
                <span className="flex items-center justify-between gap-4"><span><span className="block text-sm">{household.name}</span><span className="mt-1 block text-[0.58rem] uppercase tracking-[0.16em] text-[#876675]">Matched: {matchedName}</span></span><ArrowRight size={16} className="shrink-0" aria-hidden="true" /></span>
                <span className="mt-4 grid grid-cols-2 border-t border-[#d8b9c7]/50 pt-4 sm:grid-cols-4">{[["Maximum guests", totals.maximum], ["Attending", totals.attending], ["Not attending", totals.declined], ["Awaiting reply", totals.pending]].map(([label, value]) => <span key={label} className="px-2 py-2 text-center"><span className="block font-instrumentSerif text-2xl">{value}</span><span className="mt-1 block text-[0.48rem] uppercase tracking-[0.13em] text-[#876675]">{label}</span></span>)}</span>
              </button>;
            })}
          </div>}
        </> : selected && summary ? stage === "complete" || locked ? <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full border border-[#d8b9c7] bg-[#f5e9ed]">{locked ? <LockKeyhole size={28} strokeWidth={1.3} aria-hidden="true" /> : <Check size={28} strokeWidth={1.3} aria-hidden="true" />}</div>
          <h3 ref={heading} tabIndex={-1} className="mt-7 font-instrumentSerif text-4xl outline-none">{locked ? "Already completed" : "Your demo reply is complete."}</h3>
          <p role="status" className="mt-4 max-w-sm text-sm leading-7 text-[#756770]">{locked ? "This household has already completed the RSVP during this visit." : "Thank you for trying our RSVP experience."} No reply has been sent or saved.</p>
          <div className="mt-6 w-full border-y border-[#d8b9c7]/50 py-4 text-sm leading-7"><p>{selected.name}</p><p>{summary.attending} attending · {summary.declined} unable to attend</p>{selected.guests.map(guest => <p key={guest.id}>{guest.name}: {responses[guest.id].status === "attending" ? "Joyfully attending" : "Regretfully unable"}</p>)}</div>
          <button type="button" onClick={back} className={`${backClass} mt-7`}>Search another household</button>
          <button type="button" onClick={reset} className={`${backClass} mt-2`}>Restart demo</button>
        </div> : <>
          <div className="text-center">
            <p className={labelClass}>Your household</p>
            <h3 ref={heading} tabIndex={-1} className="mt-4 font-instrumentSerif text-4xl outline-none">{selected.name}</h3>
            <p className="mt-3 text-sm leading-7 text-[#756770]">Please respond for everyone listed in your household for Joshua &amp; Bea.</p>
            <p aria-live="polite" className="mt-2 text-[0.58rem] uppercase tracking-[0.16em] text-[#876675]">{selected.guests.length - summary.pending} of {selected.guests.length} answered · {summary.attending} attending · Maximum {selected.maxAttendees}</p>
          </div>
          <form onSubmit={submit} className="mt-8 space-y-8">
            <div className="space-y-6">{selected.guests.map(guest => <fieldset key={guest.id} className="border-t border-[#d8b9c7]/50 pt-6">
              <legend className="pr-4 font-instrumentSerif text-2xl">{guest.name}</legend><p className="mt-1 text-[0.56rem] uppercase tracking-[0.16em] text-[#876675]">{guest.type}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">{([{ value: "attending", label: "Joyfully Attending" }, { value: "declined", label: "Regretfully Unable" }] as const).map(answer => <label key={answer.value} className="flex min-h-14 cursor-pointer items-center justify-center gap-2 border border-[#d8b9c7]/70 p-4 text-center text-sm text-[#756770] transition-colors has-[:checked]:border-[#946879] has-[:checked]:bg-[#f5e9ed] has-[:checked]:text-[#624451] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#946879]">
                <input required type="radio" name={`attendance-${guest.id}`} value={answer.value} checked={responses[guest.id]?.status === answer.value} onChange={() => update(guest.id, { status: answer.value, ...(answer.value === "declined" ? { dietary: "" } : {}) })} className="sr-only" />{answer.label}
              </label>)}</div>
              {responses[guest.id]?.status === "attending" && <label className={`${labelClass} mt-4`}>Dietary restrictions<input value={responses[guest.id].dietary} onChange={event => update(guest.id, { dietary: event.target.value })} maxLength={500} placeholder="Optional" className={inputClass} /></label>}
            </fieldset>)}</div>
            <div className="grid gap-7 border-t border-[#d8b9c7]/50 pt-7 sm:grid-cols-2">
              <label className={labelClass}>Contact<input required type="tel" minLength={6} maxLength={40} autoComplete="off" value={phone} onChange={event => setPhone(event.target.value)} placeholder="+63 900 000 0000" className={inputClass} /></label>
              <label className={labelClass}>Email<input required type="email" maxLength={254} autoComplete="off" value={email} onChange={event => setEmail(event.target.value)} placeholder="guest@example.com" className={inputClass} /></label>
            </div>
            {summary.pending > 0 && <p className="text-sm text-[#876675]">Please answer for every member of your household.</p>}
            {summary.attending > selected.maxAttendees && <p role="alert" className="text-sm text-[#9b344a]">This invitation allows a maximum of {selected.maxAttendees} attendees.</p>}
            {error && <p role="alert" className="text-sm text-[#9b344a]">{error}</p>}
            <button type="submit" disabled={summary.pending > 0 || summary.attending > selected.maxAttendees} className={buttonClass}>Complete demo RSVP<ArrowRight size={16} aria-hidden="true" /></button>
            <button type="button" onClick={back} className={backClass}><ArrowLeft size={14} aria-hidden="true" />Back to name search</button>
          </form>
        </> : null}
      </motion.div>
    </AnimatePresence>
  </div>;
}
