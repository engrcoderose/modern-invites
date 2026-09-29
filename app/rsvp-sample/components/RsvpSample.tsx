"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Search } from "lucide-react";
import type { GuestResponseDraft, PartyInformation } from "@/components/smart-rsvp/types";
import { summarizeHouseholdAttendance } from "@/features/rsvp/domain/household-attendance-summary";
import { sampleEvent, sampleParties } from "../data/sample-event";
import styles from "../styles/sample.module.css";
import InvitationDetails from "./InvitationDetails";
import GuestReply from "./GuestReply";

const normalizeName = (name: string) => name.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-PH");
const primaryButton = "flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#294d3b] px-5 py-3 text-sm text-white transition-colors hover:bg-[#1e3a30] disabled:cursor-not-allowed disabled:opacity-50";
const steps = ["Find invitation", "Your reply", "Confirmation"];

export default function RsvpSample() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [party, setParty] = useState<PartyInformation | null>(null);
  const [responses, setResponses] = useState<GuestResponseDraft[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);
  const summary = summarizeHouseholdAttendance(party?.maxAttendees ?? 0, responses.map(response => response.status ?? "pending"));

  useEffect(() => {
    if (previousStep.current !== step) heading.current?.focus();
    previousStep.current = step;
  }, [step]);

  function findInvitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const match = sampleParties.find(candidate => candidate.guests.some(guest => normalizeName(guest.fullName) === normalizeName(name)));
    if (!match) {
      setError("We couldn’t find your invitation. Please check your complete name and spelling, or contact the couple for assistance.");
      return;
    }
    setParty(match);
    setResponses(match.guests.map(guest => ({ guestId: guest.id, status: null, dietaryRestrictions: "" })));
    setMessage("");
    setError("");
    setStep(1);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!party || summary.pendingGuests || summary.attendingGuests > party.maxAttendees) {
      setError("Please answer for every guest within your invitation’s reserved places.");
      return;
    }
    // Deliberately in-memory only: no API, server action, database, or browser storage.
    setError("");
    setStep(2);
  }

  function reset() {
    setName(""); setParty(null); setResponses([]); setMessage(""); setError(""); setStep(0);
  }

  return (
    <main className={`${styles.sample} min-h-screen px-4 py-6 sm:px-8 lg:px-12 lg:py-9`}>
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">{sampleEvent.names}<span className="ml-2 font-normal text-[#798273]">/ RSVP</span></span>
        <span className="text-[10px] uppercase tracking-[0.15em] text-[#657368]">{sampleEvent.date}</span>
      </header>
      <div className={`${styles.card} mx-auto mt-7 grid max-w-6xl overflow-hidden rounded-2xl border border-[#dfe4dc] bg-[#fffefa] lg:grid-cols-[0.85fr_1.15fr]`}>
        <InvitationDetails />
        <section aria-label="Wedding RSVP" className="min-w-0 px-5 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <ol aria-label="RSVP progress" className="mb-10 flex justify-between gap-2 border-b border-[#e3e7dd] pb-6">
            {steps.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className={`flex flex-col items-center gap-2 text-center text-[10px] sm:flex-row sm:text-[11px] ${index <= step ? "text-[#294d3b]" : "text-[#727b70]"}`}><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${index <= step ? "bg-[#294d3b] text-white" : "bg-[#eef0e8]"}`}>{index < step ? <Check size={12} aria-hidden="true" /> : `0${index + 1}`}</span>{label}</li>)}
          </ol>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#657b5d]">{step === 2 ? "With love & thanks" : "Kindly reply"}</p>
          <h2 ref={heading} tabIndex={-1} className={`${styles.display} mt-3 text-4xl leading-tight outline-none sm:text-5xl`}>{step === 0 ? "A seat just for you." : step === 1 ? "Will you join us?" : "Thank you for your reply."}</h2>

          {step === 0 && <>
            <p className="mt-4 text-sm leading-7 text-[#657368]">Find your invitation to let us know if you can celebrate with us. Kindly respond by <span className="font-medium text-[#263e35]">{sampleEvent.deadline}</span>.</p>
            <form onSubmit={findInvitation} className="mt-8 space-y-5">
              <label className="block text-xs font-medium">Your complete name
                <input required minLength={3} maxLength={150} autoComplete="off" value={name} onChange={event => { setName(event.target.value); setError(""); }} aria-describedby={error ? "lookup-error" : "name-help"} aria-invalid={Boolean(error)} placeholder="Enter your name as invited" className="mt-3 w-full rounded-lg border border-[#ccd5c8] bg-white px-4 py-4 text-base font-normal placeholder:text-[#747e74]" />
              </label>
              <p id="name-help" className="text-xs leading-6 text-[#657368]">One invitation, everyone in your party.</p>
              {error && <p id="lookup-error" role="alert" className="text-sm leading-6 text-[#a03d38]">{error}</p>}
              <button className={primaryButton} type="submit">Find my invitation<Search size={16} aria-hidden="true" /></button>
            </form>
            <p aria-label="Sample data notes" className="mt-5 text-center text-xs leading-6 text-[#657368]">
              Sample guest names · Try{" "}
              {sampleParties.map((sample, index) => (
                <span key={sample.householdName}>
                  {index > 0 && " or "}
                  <strong>{sample.guests[0].fullName}</strong>
                  {` (${sample.maxAttendees} ${sample.maxAttendees === 1 ? "guest" : "guests"})`}
                </span>
              ))}.
              {" "}Replies are not sent or saved and clear when you refresh.
            </p>
          </>}

          {step === 1 && party && <form onSubmit={submit} className="mt-5 space-y-6">
            <div><p className="text-sm font-medium">{party.householdName}</p><p className="mt-2 text-xs leading-6 text-[#657368]">We have reserved {party.maxAttendees} {party.maxAttendees === 1 ? "place" : "places"} for you. Please reply for each guest.</p></div>
            {party.guests.map((guest, index) => <GuestReply key={guest.id} guest={guest} response={responses[index]} onChange={changes => { setResponses(current => current.map(response => response.guestId === guest.id ? { ...response, ...changes } : response)); setError(""); }} />)}
            <label className="block text-xs font-medium">A note for the couple <span className="font-normal text-[#657368]">(optional)</span><textarea value={message} onChange={event => setMessage(event.target.value)} maxLength={600} rows={3} placeholder="Leave a little love…" className="mt-3 w-full resize-y rounded-lg border border-[#dfe4dc] bg-white px-4 py-3 text-base font-normal" /></label>
            <p aria-live="polite" className="text-xs text-[#657368]">{responses.length - summary.pendingGuests} of {responses.length} answered · {summary.attendingGuests} attending</p>
            {error && <p role="alert" className="text-sm text-[#a03d38]">{error}</p>}
            <button type="submit" className={primaryButton} disabled={summary.pendingGuests > 0 || summary.attendingGuests > party.maxAttendees}>Confirm my RSVP<ArrowRight size={16} aria-hidden="true" /></button>
            <button type="button" onClick={reset} className="flex min-h-11 items-center gap-2 text-xs text-[#657368]"><ArrowLeft size={14} aria-hidden="true" />Back to guest search</button>
          </form>}

          {step === 2 && party && <div className="mt-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#edf2e9]"><Check size={24} aria-hidden="true" /></div>
            <p role="status" className="text-sm leading-7 text-[#657368]">{summary.attendingGuests ? "We can’t wait to celebrate with you. Having you with us will make our day even more special." : "We’ll miss you on our special day. Thank you for being part of our lives and for keeping us in your thoughts."}</p>
            <div className="mt-6 rounded-xl border border-[#dfe4dc] bg-[#f6f7f0] p-5">
              <p className="text-sm font-medium">{party.householdName}</p><p className="mt-2 text-xs text-[#657368]">{summary.attendingGuests} attending · {summary.declinedGuests} unable to attend</p>
              <ul className="mt-5 space-y-4 border-t border-[#dfe4dc] pt-4">{party.guests.map((guest, index) => <li key={guest.id} className="text-xs"><div className="flex flex-wrap justify-between gap-2"><span>{guest.fullName}</span><span className="text-[#657368]">{responses[index].status === "attending" ? "Attending" : "Unable to attend"}</span></div>{responses[index].dietaryRestrictions && <p className="mt-2 break-words leading-6 text-[#657368]">Dietary note: {responses[index].dietaryRestrictions}</p>}</li>)}</ul>
              {message && <p className="mt-5 whitespace-pre-wrap break-words border-t border-[#dfe4dc] pt-4 text-xs leading-6 text-[#657368]">Your note: {message}</p>}
            </div>
            <button onClick={() => setStep(1)} type="button" className={`${primaryButton} mt-7`}>Edit my reply<ArrowLeft size={16} aria-hidden="true" /></button>
            <button onClick={reset} type="button" className="mx-auto mt-4 flex min-h-11 items-center gap-2 text-xs text-[#657368]"><Search size={14} aria-hidden="true" />Find another invitation</button>
          </div>}
          <p className="mt-8 border-t border-[#e3e7dd] pt-5 text-center text-[11px] leading-6 text-[#657368]">For any questions about your invitation, please get in touch with us.</p>
        </section>
      </div>
      <footer className="mx-auto mt-6 flex max-w-6xl flex-wrap justify-between gap-3 text-[10px] leading-5 text-[#727b70]"><span>With love, {sampleEvent.names}</span><span>Website by Modern Invites</span></footer>
    </main>
  );
}
