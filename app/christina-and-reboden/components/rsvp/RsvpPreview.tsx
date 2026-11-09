"use client";

import { useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import type { AttendanceChoice } from "../../../../components/smart-rsvp/types";
import { previewHouseholds, type PreviewMatch, type PreviewResponses } from "../../data/rsvp-preview";
import { createPreviewResponses, findPreviewHouseholds, getPreviewSummary, validatePreviewResponses } from "../../utilities/rsvpPreview";
import HouseholdSearch from "./HouseholdSearch";
import HouseholdReply from "./HouseholdReply";

export default function RsvpPreview() {
  const [view, setView] = useState<"search" | "household" | "complete">("search");
  const [fullName, setFullName] = useState("");
  const [matches, setMatches] = useState<PreviewMatch[] | null>(null);
  const [selected, setSelected] = useState<PreviewMatch | null>(null);
  const [responses, setResponses] = useState<PreviewResponses>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const focusHeading = () => requestAnimationFrame(() => heading.current?.focus());

  function search() {
    if (fullName.trim().split(/\s+/).length < 2) { setError("Please enter your first and last name."); return; }
    setError("");
    setMatches(findPreviewHouseholds(previewHouseholds, fullName));
    focusHeading();
  }

  function select(match: PreviewMatch) {
    if (selected?.household.key !== match.household.key) {
      setResponses(createPreviewResponses(match.household));
      setMessage("");
    }
    setSelected(match); setError(""); setView("household"); focusHeading();
  }

  function back() {
    setError(""); setView("search");
    requestAnimationFrame(() => input.current?.focus());
  }

  function attendance(key: string, status: AttendanceChoice) {
    setResponses(current => ({ ...current, [key]: { ...current[key], status } }));
    setError("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const validation = validatePreviewResponses(selected.household, responses);
    if (validation) { setError(validation); return; }
    setError(""); setView("complete"); focusHeading();
  }

  if (view === "search" || !selected) return <HouseholdSearch fullName={fullName} matches={matches} error={error}
    inputRef={input} headingRef={heading} onSearch={search} onSelect={select}
    onNameChange={name => { setFullName(name); setMatches(null); setError(""); }} />;

  if (view === "complete") {
    const summary = getPreviewSummary(selected.household, responses);
    return <div className="mt-5 flex flex-col items-center gap-4 text-center">
      <Check size={28} strokeWidth={1.3} aria-hidden="true" />
      <h3 ref={heading} tabIndex={-1} className="text-base font-semibold outline-none">Preview reply complete</h3>
      <p className="text-sm">{selected.household.householdName}</p>
      <p className="text-xs">{summary.attendingCount} attending · {summary.declinedCount} unable to attend</p>
      <p role="status" className="text-xs leading-5">No RSVP has been sent or saved.</p>
      <button type="button" onClick={() => { setView("household"); focusHeading(); }} className="min-h-11 text-xs underline underline-offset-4">Edit preview reply</button>
      <button type="button" onClick={back} className="min-h-11 text-xs underline underline-offset-4">Search another name</button>
    </div>;
  }

  return <HouseholdReply match={selected} responses={responses} message={message} error={error} headingRef={heading}
    onAttendance={attendance} onDietary={(key, value) => setResponses(current => ({ ...current, [key]: { ...current[key], dietaryRestrictions: value } }))}
    onMessage={setMessage} onSubmit={submit} onBack={back} />;
}
