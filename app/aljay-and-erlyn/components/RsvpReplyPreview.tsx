"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "../styles/wedding.module.css";

type ReplyDraft = { attendance: string; email: string; dietary: string; message: string };

export default function RsvpReplyPreview({ name, onBack }: { name: string; onBack: () => void }) {
  const [draft, setDraft] = useState<ReplyDraft | null>(null);
  const summary = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    setDraft({ attendance: String(values.get("attendance")), email: String(values.get("email")), dietary: String(values.get("dietary")), message: String(values.get("message")) });
    requestAnimationFrame(() => summary.current?.focus());
  }
  return <>
    <div hidden={!draft} ref={summary} tabIndex={-1} className="break-words py-5 text-center" role="status">
      <h3 className={`${styles.venueName} mb-5`}>Your reply preview</h3>
      <p className={`${styles.body} mb-4`}>{name} · {draft?.attendance === "attending" ? "Joyfully attending" : "Sending love from afar"}</p>
      {draft?.email && <p className={`${styles.small} mb-3`}>{draft.email}</p>}
      {draft?.dietary && <p className={`${styles.small} mb-3`}>Dietary needs: {draft.dietary}</p>}
      {draft?.message && <p className={`${styles.small} mb-3`}>{draft.message}</p>}
      <p className={`${styles.body} mb-5`}>This is a preview. No reply has been sent or saved.</p>
      <button type="button" className={`${styles.textLink} min-h-11 px-3 py-2`} onClick={() => { setDraft(null); requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>("input")?.focus()); }}>Edit preview</button>
    </div>
    <form ref={form} onSubmit={review} hidden={Boolean(draft)} className="mt-6 text-left">
      <p className={`${styles.rsvpGuestName} mb-5 text-center`}>{name}</p>
      <fieldset className="mt-5"><legend className={`${styles.formLabel} mb-3`}>Will you be joining us?</legend><div className="grid gap-2">
        <label className={`${styles.radioLabel} flex min-h-12 cursor-pointer items-center gap-3 px-3 py-3`}><input type="radio" name="attendance" value="attending" required />Joyfully attending</label>
        <label className={`${styles.radioLabel} flex min-h-12 cursor-pointer items-center gap-3 px-3 py-3`}><input type="radio" name="attendance" value="declined" required />Sending love from afar</label>
      </div></fieldset>
      <label className={`${styles.formLabel} mt-4 block`}>Email <span className={styles.optional}>(optional)</span><input name="email" type="email" autoComplete="email" maxLength={254} className={`${styles.input} mt-2 block min-h-12 w-full px-3 py-3`} /></label>
      <label className={`${styles.formLabel} mt-4 block`}>Dietary needs <span className={styles.optional}>(optional)</span><input name="dietary" maxLength={500} className={`${styles.input} mt-2 block min-h-12 w-full px-3 py-3`} /></label>
      <label className={`${styles.formLabel} mt-4 block`}>A little note for us <span className={styles.optional}>(optional)</span><textarea name="message" rows={2} maxLength={1000} className={`${styles.input} mt-2 block w-full px-3 py-3`} /></label>
      <button type="submit" className={`${styles.button} mt-6 min-h-12 w-full px-6 py-3`}>Preview reply</button>
    </form>
    <button type="button" className={`${styles.textLink} mt-5 min-h-11 px-3 py-2`} onClick={onBack}>Back to name entry</button>
  </>;
}

