"use client";

import { useRef, useState, type FormEvent } from "react";
import { SmartRsvpFlow } from "@/components/smart-rsvp";
import { wedding } from "../data/wedding";
import { PageHeading } from "./Stationery";
import styles from "../styles/wedding.module.css";

type ReplyDraft = { name: string; attendance: string; email: string; dietary: string; message: string };

function ReplyPreview() {
  const [draft, setDraft] = useState<ReplyDraft | null>(null);
  const summary = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") ?? "").trim();
    const input = event.currentTarget.elements.namedItem("name") as HTMLInputElement;
    if (name.length < 2) { input.setCustomValidity("Please enter your full name."); input.reportValidity(); return; }
    setDraft({ name, attendance: String(values.get("attendance")), email: String(values.get("email")), dietary: String(values.get("dietary")), message: String(values.get("message")) });
    requestAnimationFrame(() => summary.current?.focus());
  }
  return <>
    <div hidden={!draft} ref={summary} tabIndex={-1} className="py-5 text-center" role="status">
      <h3 className={`${styles.venueName} mb-5`}>Your reply preview</h3>
      <p className={`${styles.body} mb-4`}>{draft?.name} · {draft?.attendance === "attending" ? "Joyfully attending" : "Sending love from afar"}</p>
      {draft?.email && <p className={`${styles.small} mb-3`}>{draft.email}</p>}
      {draft?.dietary && <p className={`${styles.small} mb-3`}>Dietary needs: {draft.dietary}</p>}
      {draft?.message && <p className={`${styles.small} mb-3`}>{draft.message}</p>}
      <p className={`${styles.body} mb-5`}>This is a preview. No reply has been sent or saved. Please contact us directly to confirm your attendance.</p>
      <button type="button" className={`${styles.textLink} min-h-11 px-3 py-2`} onClick={() => { setDraft(null); requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>("input")?.focus()); }}>Edit preview</button>
    </div>
    <form ref={form} onSubmit={review} hidden={Boolean(draft)} className="mt-6 text-left">
      <label className={`${styles.formLabel} block`}>Full name<input name="name" autoComplete="name" required minLength={2} maxLength={150} onInput={(event) => event.currentTarget.setCustomValidity("")} className={`${styles.input} mt-2 block min-h-12 w-full px-3 py-3`} /></label>
      <fieldset className="mt-5"><legend className={`${styles.formLabel} mb-3`}>Will you be joining us?</legend><div className="grid gap-2 sm:grid-cols-2">
        <label className={`${styles.radioLabel} flex min-h-12 cursor-pointer items-center gap-3 px-3 py-3`}><input type="radio" name="attendance" value="attending" required />Joyfully attending</label>
        <label className={`${styles.radioLabel} flex min-h-12 cursor-pointer items-center gap-3 px-3 py-3`}><input type="radio" name="attendance" value="declined" required />Sending love from afar</label>
      </div></fieldset>
      <label className={`${styles.formLabel} mt-5 block`}>Email <span className={styles.optional}>(optional)</span><input name="email" type="email" autoComplete="email" maxLength={254} className={`${styles.input} mt-2 block min-h-12 w-full px-3 py-3`} /></label>
      <label className={`${styles.formLabel} mt-5 block`}>Dietary needs <span className={styles.optional}>(optional)</span><input name="dietary" maxLength={500} className={`${styles.input} mt-2 block min-h-12 w-full px-3 py-3`} /></label>
      <label className={`${styles.formLabel} mt-5 block`}>A little note for us <span className={styles.optional}>(optional)</span><textarea name="message" rows={2} maxLength={1000} className={`${styles.input} mt-2 block w-full px-3 py-3`} /></label>
      <button type="submit" className={`${styles.button} mt-6 min-h-12 w-full px-6 py-3`}>Preview reply</button>
    </form>
  </>;
}

export default function RsvpSection() {
  const enabled = wedding.rsvp.enabled && Boolean(wedding.rsvp.eventSlug);
  return <div className="w-full max-w-[520px]"><PageHeading>Kindly reply</PageHeading><p className={`${styles.body} mb-3 text-center`}>We’ve saved a little place for you.<br />Please reply by <strong>{wedding.rsvpDeadline}</strong>.</p>
    {enabled && wedding.rsvp.eventSlug ? <SmartRsvpFlow eventSlug={wedding.rsvp.eventSlug} accessMode="name_search" allowUnlistedReplies={false} searchAppearance="minimal" openFormAppearance="minimal" fields={{ email: true, dietaryRestrictions: true, message: true }} theme={{ accent: "#536044", accentHover: "#3d4933", heading: "#394331", border: "#b6baa3", borderSoft: "#d8d8c6", soft: "#f8f5e9", softStrong: "#e8e9da" }} /> : <><p className={`${styles.previewNote} mt-5 px-4 py-3 text-center`}>Invitation preview · Online replies are not open yet.<br />You can try the form below; nothing will be sent or saved.</p><ReplyPreview /></>}
    <p className={`${styles.small} mt-6 text-center`}>To confirm your attendance, <a className={styles.textLink} href={`mailto:${wedding.email}`}>email Aljay & Erlyn</a>.</p>
  </div>;
}
