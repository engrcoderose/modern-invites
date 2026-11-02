"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import wedding from "../data/wedding-details.json";

export default function RsvpSection() {
  const [reply, setReply] = useState<{ name: string; attendance: string; note: string } | null>(null);
  const [reviewed, setReviewed] = useState(false);
  const review = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    if (!name) { const input = form.elements.namedItem("name") as HTMLInputElement; input.setCustomValidity("Please enter your name."); input.reportValidity(); return; }
    setReply({ name, attendance: String(data.get("attendance")), note: String(data.get("note") || "").trim() });
    setReviewed(true);
  };
  const body = reply ? `Wedding RSVP for ${wedding.couple.display}\n\nName: ${reply.name}\nAttendance: ${reply.attendance}\nMessage: ${reply.note || "None"}` : "";
  return (
    <section id="rsvp" className="mj-rsvp px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-20">
        <div><h2 className="mj-heading">Will you join<br /><em>our forever?</em></h2><p className="mt-6 max-w-sm leading-7">Your presence would mean the world to us. Kindly reply on or before <strong className="font-medium">{wedding.rsvp.deadline}</strong>.</p><p className="mt-5 max-w-sm text-sm leading-7">Our celebration is reserved for our personally invited guests. Thank you for understanding.</p><p className="mt-8 text-sm leading-7">Questions? We’re happy to help.<br /><a className="mj-text-link" href={`tel:${wedding.contact.bridePhone.replaceAll(" ", "")}`}>Call Marian</a> · <a className="mj-text-link" href={`tel:${wedding.contact.coordinator.phone.replaceAll(" ", "")}`}>Call our coordinator</a></p></div>
        <div>
          <p id="mj-rsvp-note" className="mb-7 text-sm leading-7">Online RSVP is not open yet. You can prepare a reply below and email it to Marian. Replies are only sent when you send the email.</p>
          <form onSubmit={review} onChange={() => { setReviewed(false); }} aria-describedby="mj-rsvp-note" className="space-y-6">
            <div><label htmlFor="mj-name" className="mb-2 block text-sm">Your full name <span aria-hidden="true">*</span></label><input id="mj-name" name="name" required maxLength={120} autoComplete="name" onInput={(event) => event.currentTarget.setCustomValidity("")} className="mj-input w-full px-4 py-3" placeholder="As written on your invitation" /></div>
            <fieldset><legend className="mb-3 text-sm">Will you be attending? <span aria-hidden="true">*</span></legend><div className="space-y-3"><label className="flex cursor-pointer items-center gap-3 py-1 text-sm"><input type="radio" name="attendance" value="Joyfully accepts" required /> Joyfully accepts</label><label className="flex cursor-pointer items-center gap-3 py-1 text-sm"><input type="radio" name="attendance" value="Regretfully declines" required /> Regretfully declines</label></div></fieldset>
            <div><label htmlFor="mj-note" className="mb-2 block text-sm">A note for the couple <span className="text-xs">(optional)</span></label><textarea id="mj-note" name="note" rows={3} maxLength={1000} className="mj-input w-full px-4 py-3" placeholder="Leave a little love…" /></div>
            <button type="submit" className="mj-button inline-flex items-center gap-4 px-7 py-4">Review my reply <ArrowUpRight size={16} aria-hidden="true" /></button>
          </form>
          <div aria-live="polite">{reviewed && reply && <div className="mj-reply mt-7 border-t pt-6"><h3 className="mj-display text-2xl">Your reply is ready to email</h3><p className="my-3 text-sm leading-7">{reply.name} · {reply.attendance}<br />No response has been submitted or saved.</p><a className="mj-text-link inline-flex items-center gap-3 py-3 text-sm" href={`mailto:${wedding.contact.email}?subject=${encodeURIComponent(`Wedding RSVP — ${reply.name}`)}&body=${encodeURIComponent(body)}`}>Open email with my reply <ArrowUpRight size={15} aria-hidden="true" /></a><p className="mt-2 break-all text-xs leading-6">If your email app doesn’t open, send your reply to {wedding.contact.email}.</p></div>}</div>
        </div>
      </div>
    </section>
  );
}
