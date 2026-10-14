"use client";

import { useState } from "react";
import type { GuestResponseDraft, PartyInformation } from "@/components/smart-rsvp/types";
import { sampleParties } from "../data/sample-event";
import GuestReply from "./GuestReply";

const normalize = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();
const button = "min-h-11 rounded-md bg-forest px-5 py-3 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50";

export default function OpenHouseholdSample() {
  const [name, setName] = useState("");
  const [party, setParty] = useState<PartyInformation | null>(null);
  const [responses, setResponses] = useState<GuestResponseDraft[]>([]);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  return <section className="space-y-5 rounded-xl border border-[var(--smart-rsvp-border)] bg-white p-6 sm:p-8">
    <h2 className="font-libreBaskerville text-2xl">{complete ? "Sample reply complete" : party ? party.householdName : "Find your household"}</h2>
    {!party ? <>
      <p className="text-sm leading-6">Try <strong>Isabel Santos</strong> for a three-person household or <strong>Daniel Reyes</strong> for a single guest.</p>
      <form className="space-y-4" onSubmit={e => {
        e.preventDefault();
        const match = sampleParties.find(item => item.guests.some(guest => normalize(guest.fullName) === normalize(name)));
        if (!match) { setError("No matching sample guest. Check the name, or choose RSVP without a guest-list entry."); return; }
        setParty(match); setError("");
        setResponses(match.guests.map(guest => ({ guestId: guest.id, status: null, dietaryRestrictions: "" })));
      }}>
        <label className="block text-sm">Full name<input required minLength={3} maxLength={150} value={name} onChange={e => { setName(e.target.value); setError(""); }} className="mt-2 min-h-11 w-full rounded-md border border-[var(--smart-rsvp-border)] px-3 text-base" /></label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button className={button}>Find my household</button>
      </form>
    </> : complete ? <div role="status" className="space-y-3 text-sm leading-6">
      <p>{party.householdName}: {responses.filter(response => response.status === "attending").length} attending.</p>
      <p>This was a sample only. No guest records or RSVP responses were saved.</p>
    </div> : <form className="space-y-5" onSubmit={e => { e.preventDefault(); if (responses.every(response => response.status)) setComplete(true); }}>
      <p className="text-sm leading-6">You belong to {party.householdName}. Reply for each of the {party.guests.length} guests below.</p>
      {party.guests.map((guest, index) => <GuestReply key={guest.id} guest={guest} response={responses[index]} onChange={changes => setResponses(current => current.map(response => response.guestId === guest.id ? { ...response, ...changes } : response))} />)}
      <button className={button} disabled={responses.some(response => !response.status)}>Submit household RSVP</button>
    </form>}
    {party && <button type="button" className="min-h-11 text-sm underline underline-offset-4" onClick={() => { setParty(null); setComplete(false); setName(""); }}>Try another guest</button>}
  </section>;
}
