"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowUpRight, Check, Heart } from "lucide-react";
import { rsvpConfig } from "../data/event";
import ReplyFields from "../components/ReplyFields";
import RsvpDetails from "../components/RsvpDetails";
import { emptyReply, normalizeReply, validateReply, type Reply } from "../utilities/reply";
import styles from "../styles/invitation.module.css";

export default function Rsvp() {
  const [step, setStep] = useState<"reply" | "confirmed">("reply");
  const [reply, setReply] = useState<Reply>(emptyReply);
  const [error, setError] = useState("");
  const [reserved, setReserved] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);

  useEffect(() => {
    if (previousStep.current !== step) heading.current?.focus();
    previousStep.current = step;
  }, [step]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const problem = validateReply(reply);
    if (problem) { setError(problem); return; }
    setError("");
    setReply(normalizeReply(reply));
    setReserved(reply.attendance === "yes" ? rsvpConfig.maxGuests : 0);
    setStep("confirmed");
  }

  return <section id="rsvp" className={`${styles.rsvpSection} px-6 py-16 md:px-12 md:py-24`}>
    <div className="mx-auto grid max-w-[1184px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <Heart size={28} strokeWidth={1.2} aria-hidden="true" className="mb-6" />
        <h2 className={styles.sectionTitle}>It wouldn’t be<br />the same <em>without you.</em></h2>
        <p className="mt-6 max-w-sm text-sm leading-7 text-[var(--ot-muted)]">Whether you’re joining us at the table or sending love from afar, we’d love to hear from you.</p>
        <RsvpDetails reserved={reserved} />
      </div>
      <div className={`${styles.replyPaper} min-w-0 rounded-2xl p-6 sm:p-9`}>
        <div className="mb-7 border-b border-[var(--ot-line)] pb-5"><h3 ref={heading} tabIndex={-1} className={`${styles.display} text-4xl outline-none`}>{step === "reply" ? "Your RSVP" : reply.attendance === "yes" ? "We’ll save you a seat." : "You’ll be with us in spirit."}</h3>{step === "reply" && <p className="mt-3 text-sm text-[var(--ot-muted)]">We’ve reserved one seat for you.</p>}</div>
        {step === "reply" ? <form onSubmit={submit} className="mt-7" aria-label="Your RSVP">
          <ReplyFields reply={reply} onChange={changes => { setReply(current => ({ ...current, ...changes })); setError(""); }} />
          {error && <p role="alert" className="mt-4 text-sm text-[var(--ot-clay)]">{error}</p>}
          <button type="submit" className={`${styles.primaryButton} mt-8 flex min-h-12 w-full items-center justify-between gap-4 rounded-full px-6 py-4 text-sm`}>Send my RSVP<ArrowUpRight size={18} aria-hidden="true" /></button>
        </form> : <div>
          <p role="status" className="mb-4 flex items-center gap-2 text-sm"><Check size={18} aria-hidden="true" />Thank you, {reply.name}.</p>
          <p className="mb-6 text-sm leading-7 text-[var(--ot-muted)]">{reply.attendance === "yes" ? "We look forward to celebrating with you." : "Thank you for keeping us in your thoughts."}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><button type="button" onClick={() => setStep("reply")} className="inline-flex min-h-11 items-center gap-2 text-xs underline underline-offset-4"><ArrowLeft size={14} aria-hidden="true" />Edit my reply</button>{step === "confirmed" && <button type="button" onClick={() => { setReply(emptyReply); setReserved(0); setError(""); setStep("reply"); }} className="min-h-11 text-xs underline underline-offset-4">Start a new reply</button>}</div>
        </div>}
      </div>
    </div>
  </section>;
}
