"use client";

import { useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { rsvpPreview } from "../data/rsvp-preview";
import { RsvpPreviewReply } from "./rsvp-preview-reply";

export default function RsvpPreview() {
  const [fullName, setFullName] = useState(rsvpPreview.guests[0]);
  const [matchedName, setMatchedName] = useState("");
  const [error, setError] = useState("");
  const [replyOpen, setReplyOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const matchButton = useRef<HTMLButtonElement>(null);

  return (
    <div className="mt-7 space-y-6">
      <p id="op-preview-notice" className="op-body">{rsvpPreview.notice}</p>
      <form className="space-y-6" onSubmit={(event) => {
        event.preventDefault();
        const normalized = fullName.trim().replace(/\s+/g, " ").toLowerCase();
        const match = rsvpPreview.guests.find((name) => name.toLowerCase() === normalized);
        setMatchedName(match || "");
        setError(match ? "" : "This preview uses sample guests only. Try Alex Reyes or Jamie Reyes.");
      }}>
        <label className="block text-center text-[10px] uppercase leading-relaxed tracking-[0.16em]">
          Full Name
          <span className="mt-1 block text-[11px] normal-case tracking-normal">Try Alex Reyes or Jamie Reyes</span>
          <input required type="text" autoComplete="off" minLength={3} maxLength={150} value={fullName} aria-describedby={`op-preview-notice${error ? " op-preview-error" : ""}`} aria-invalid={!!error} onChange={(event) => {
            setFullName(event.target.value);
            setMatchedName("");
            setError("");
          }} className="mt-3 w-full border-0 border-b border-[#8c997f] bg-transparent px-0 py-3 text-center text-base normal-case tracking-normal text-[#414636] focus:outline-none focus:ring-1 focus:ring-[#5a6946]" />
        </label>
        {error && <p id="op-preview-error" role="alert" className="text-sm leading-relaxed text-[#803c32]">{error}</p>}
        <button type="submit" className="op-button op-button-solid relative flex min-h-14 w-full items-center justify-center px-10 py-4 text-center">
          Find my invitation <Search className="absolute right-4" size={16} aria-hidden="true" />
        </button>
      </form>
      {matchedName && (
        <div className="space-y-3 border-t border-[#bfb59a66] pt-4">
          <p role="status" className="text-xs">Sample invitation found. Select it to preview your reply.</p>
          <button ref={matchButton} type="button" className="w-full border border-[#bfb59a] p-4 text-left hover:bg-[#5a694615]" onClick={() => {
            setReplyOpen(true);
            dialog.current?.showModal();
          }}>
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">{rsvpPreview.householdName}<ArrowRight size={15} aria-hidden="true" /></span>
            <span className="mt-2 block text-xs">Matched: {matchedName}</span>
            <span className="mt-3 block text-[10px]">Maximum {rsvpPreview.guests.length} guests · Awaiting sample reply</span>
          </button>
        </div>
      )}
      <dialog ref={dialog} className="op-dialog overflow-y-auto overscroll-contain" aria-labelledby="op-preview-dialog-title" aria-describedby="op-preview-dialog-notice" onKeyDown={(event) => event.stopPropagation()} onPointerDown={(event) => event.stopPropagation()} onClose={() => {
        setReplyOpen(false);
        matchButton.current?.focus({ preventScroll: true });
      }}>
        <button type="button" autoFocus className="absolute right-3 top-3 p-3" aria-label="Close RSVP preview" onClick={() => dialog.current?.close()}><X size={21} /></button>
        <h2 id="op-preview-dialog-title" className="op-heading">Kindly Reply</h2>
        <p id="op-preview-dialog-notice" className="text-xs leading-relaxed">Preview only · No replies are sent or saved.</p>
        {replyOpen && <RsvpPreviewReply onBack={() => dialog.current?.close()} />}
      </dialog>
    </div>
  );
}
