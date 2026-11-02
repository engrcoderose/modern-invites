"use client";

import { useRef, useState, type FormEvent } from "react";
import { Search, X } from "lucide-react";
import { Ornament } from "./Stationery";
import RsvpReplyPreview from "./RsvpReplyPreview";
import styles from "../styles/wedding.module.css";

export default function RsvpNameEntry() {
  const [name, setName] = useState("");
  const [replyName, setReplyName] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);

  function openReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 3 || dialog.current?.open) return;
    setReplyName(name.trim());
    dialog.current?.showModal();
  }

  return <>
    <form className="mt-7 space-y-6" onSubmit={openReply}>
      <label className={`${styles.rsvpNameLabel} block text-center`}>
        Full Name
        <span className="mt-1 block text-[11px] normal-case tracking-normal">Enter your first and last name</span>
        <input required autoComplete="name" type="text" minLength={3} maxLength={150}
          value={name} onChange={(event) => setName(event.target.value)}
          className={`${styles.rsvpNameInput} mt-3 w-full px-0 py-3 text-center text-base normal-case tracking-normal`} />
      </label>
      <button ref={searchButton} type="submit" disabled={name.trim().length < 3}
        className={`${styles.button} relative flex min-h-14 w-full items-center justify-center px-10 py-4 text-center`}>
        Find my invitation<Search className="absolute right-4" size={16} aria-hidden="true" />
      </button>
    </form>
    <p className={`${styles.previewNote} mt-5 text-center`}>Preview only. Guest-list matching and sending replies are not available yet.</p>
    <dialog ref={dialog} className={`${styles.rsvpDialog} fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%_-_36px)] max-w-[490px] overflow-y-auto px-5 py-10 text-center sm:px-[30px]`}
      aria-labelledby="ae-rsvp-dialog-title" onKeyDown={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()}
      onClose={() => searchButton.current?.focus({ preventScroll: true })}>
      <button type="button" className="absolute right-2 top-2 flex size-11 items-center justify-center" aria-label="Close RSVP" onClick={() => dialog.current?.close()}><X size={21} aria-hidden="true" /></button>
      <div className="mb-5 flex justify-center"><Ornament /></div>
      <p className={styles.label}>Aljay & Erlyn</p>
      <h2 id="ae-rsvp-dialog-title" className={`${styles.heading} my-3`}>Kindly Reply</h2>
      <p className={`${styles.previewNote} mb-4`}>Preview your reply. Nothing will be sent or saved.</p>
      <RsvpReplyPreview key={replyName} name={replyName} onBack={() => dialog.current?.close()} />
    </dialog>
  </>;
}
