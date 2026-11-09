"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { wedding } from "../data/wedding";
import { artwork, photos } from "../data/media";
import styles from "../styles/invitation.module.css";
import rsvpStyles from "../styles/rsvp.module.css";

type Reply = { fullName: string; attendance: string; dietary: string; message: string };

// Intentionally local: connect to the established RSVP flow after admin setup.
export default function RsvpSlide() {
  const [step, setStep] = useState(0);
  const [reply, setReply] = useState<Reply>({ fullName: "", attendance: "", dietary: "", message: "" });
  const [error, setError] = useState("");
  const heading = useRef<HTMLParagraphElement>(null);

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 0 && reply.fullName.trim().length < 2) { setError("Please enter your complete invited name."); return; }
    if (step === 0 && !reply.attendance) { setError("Please choose your attendance."); return; }
    setError("");
    setStep(current => current + 1);
    requestAnimationFrame(() => heading.current?.focus());
  }

  return <div className="relative h-full">
    {photos.rsvp.src && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[42%] sm:h-full">
      <Image src={photos.rsvp.src} alt="" fill sizes={photos.rsvp.sizes} quality={photos.rsvp.quality} placeholder={typeof photos.rsvp.src === "object" ? "blur" : "empty"} className="object-cover" style={{ objectPosition: photos.rsvp.position }} />
      <div className={`${styles.rsvpPhotoWash} absolute inset-0`} />
    </div>}
    <div data-invitation-scroll tabIndex={0} role="region" aria-label="RSVP form" className={`${styles.sponsorScroller} absolute inset-0 overflow-y-auto overscroll-contain outline-none`}>
      <div className="relative mx-auto flex min-h-full w-full max-w-[624px] flex-col items-center justify-center gap-7 px-4 py-8 text-center sm:px-8">
        <div className={`${rsvpStyles.plaque} relative w-[245px] max-w-[85%] shrink-0 px-7 py-5`}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-3 flex justify-center">
            <span className={`${rsvpStyles.plaqueOrnament} relative h-6 w-[76px] rounded-full`}><Image src={artwork.ornament} alt="" fill sizes="76px" className="object-cover object-[50%_34%]" /></span>
          </div>
          <h2 className={rsvpStyles.heading}>Kindly RSVP</h2>
        </div>
        <div className={`${rsvpStyles.card} w-full shrink-0 rounded-md border px-[22px] py-6 sm:px-[35px] sm:py-[30px]`}>
      <p className="text-[13px] leading-6">Please respond by <strong className="font-medium">{wedding.deadline}</strong></p>
      <p className="mt-2 border-b border-[var(--cr-line)] pb-4 text-[11px] leading-5">RSVP preview · Replies are not sent or saved.</p>
      {step < 2 ? <form onSubmit={advance} className="mt-5 flex w-full flex-col gap-4 text-left">
        <p ref={heading} tabIndex={-1} className="text-center text-xs outline-none">{step === 0 ? "Your invitation · 1 of 2" : "A few little details · 2 of 2"}</p>
        {step === 0 ? <>
          <label className="text-xs">Complete invited name<input className={`${styles.field} mt-2 w-full px-3 py-2.5 text-base`} autoComplete="name" required maxLength={150} value={reply.fullName} onChange={event => setReply({ ...reply, fullName: event.target.value })} /></label>
          <label className="text-xs">Will you be celebrating with us?<select className={`${styles.field} mt-2 w-full px-3 py-2.5 text-base`} required value={reply.attendance} onChange={event => setReply({ ...reply, attendance: event.target.value })}><option value="">Please select</option><option value="attending">Joyfully attending</option><option value="declined">Regretfully unable to attend</option></select></label>
        </> : <>
          {reply.attendance === "attending" && <label className="text-xs">Dietary restrictions <span>(optional)</span><input className={`${styles.field} mt-2 w-full px-3 py-2.5 text-base`} maxLength={500} value={reply.dietary} onChange={event => setReply({ ...reply, dietary: event.target.value })} /></label>}
          <label className="text-xs">A message for the couple <span>(optional)</span><textarea rows={2} className={`${styles.field} mt-2 w-full resize-none px-3 py-2.5 text-base`} maxLength={1000} value={reply.message} onChange={event => setReply({ ...reply, message: event.target.value })} /></label>
        </>}
        {error && <p role="alert" className="text-xs">{error}</p>}
        <button className={`${styles.primary} flex min-h-11 items-center justify-center gap-3 px-5 py-3 font-sans text-[10px] uppercase tracking-[.1em]`} type="submit">{step === 0 ? "Continue" : "Complete preview reply"}<ArrowRight size={15} aria-hidden="true" /></button>
        {step === 1 && <button type="button" onClick={() => setStep(0)} className={`${styles.textLink} min-h-11 text-center text-xs`}>Back to your details</button>}
      </form> : <div className="mt-5 flex flex-col items-center gap-4 text-center">
        <Check size={28} strokeWidth={1.3} aria-hidden="true" /><p ref={heading} tabIndex={-1} className={`${styles.smallScript} outline-none`}>Thank you, {reply.fullName}.</p>
        <p role="status" className="text-sm leading-7">Your preview reply is complete.<br />No RSVP has been sent or saved.</p>
        <button type="button" onClick={() => setStep(0)} className={`${styles.textLink} min-h-11 text-xs`}>Edit preview reply</button>
      </div>}
        </div>
      </div>
    </div>
  </div>;
}
