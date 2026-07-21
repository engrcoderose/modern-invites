"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import Reveal from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

interface RSVPSectionProps {
  deadline: string;
}

export default function RSVPSection({ deadline }: RSVPSectionProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 850);
  };

  return (
    <section id="rsvp" className="relative overflow-hidden bg-[#5a1024] px-5 py-24 text-[#f9efe4] sm:px-8 sm:py-32 lg:px-12 lg:py-44">
      <div className="ambient-wash absolute inset-0 bg-[radial-gradient(circle_at_15%_90%,rgba(223,180,126,.14),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(174,83,95,.22),transparent_32%)]" />
      <div className="hero-grain absolute inset-0 opacity-20" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.92fr_1.08fr] lg:gap-24">
        <div>
          <Reveal><SectionLabel light>Kindly respond</SectionLabel></Reveal>
          <Reveal delay={0.08}><h2 className="mt-8 font-instrumentSerif text-[clamp(4rem,8vw,8.5rem)] leading-[0.8] tracking-[-0.06em]">Will you<br /><span className="font-meaCulpa text-[0.72em] font-normal text-[#e0c58d]">join us?</span></h2></Reveal>
          <Reveal delay={0.16}><p className="mt-8 max-w-md font-libreBaskerville text-sm leading-8 text-[#eadad0]/65">Your presence would make our celebration complete. Please reply on or before {deadline}.</p></Reveal>
        </div>

        <Reveal delay={0.12} className="border border-white/15 bg-[#3b0917]/45 p-6 backdrop-blur-sm sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div key="success" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-[#d8bd83]/45 text-[#d8bd83]"><Check size={26} strokeWidth={1.4} /></div>
                <h3 className="mt-7 font-instrumentSerif text-4xl">We received your reply.</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">Thank you. We cannot wait to celebrate this beautiful day with you.</p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-[0.6rem] uppercase tracking-[0.26em] text-[#d8bd83] underline underline-offset-8">Send another response</button>
              </motion.div>
            ) : (
              <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block text-[0.6rem] uppercase tracking-[0.24em] text-[#decaa9]">First name<input required name="firstName" autoComplete="given-name" className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d8bd83]" placeholder="Isabella" /></label>
                  <label className="block text-[0.6rem] uppercase tracking-[0.24em] text-[#decaa9]">Last name<input required name="lastName" autoComplete="family-name" className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d8bd83]" placeholder="Santos" /></label>
                </div>
                <fieldset>
                  <legend className="text-[0.6rem] uppercase tracking-[0.24em] text-[#decaa9]">Joyfully attending?</legend>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {["Yes, with joy", "Regretfully, no"].map((answer, index) => (
                      <label key={answer} className="cursor-pointer border border-white/20 p-4 text-center text-xs text-white/70 transition-colors has-[:checked]:border-[#d8bd83] has-[:checked]:bg-[#d8bd83]/10 has-[:checked]:text-white">
                        <input required type="radio" name="attending" value={index === 0 ? "yes" : "no"} className="sr-only" />{answer}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="block text-[0.6rem] uppercase tracking-[0.24em] text-[#decaa9]">A note for the couple<textarea name="message" rows={3} className="mt-3 w-full resize-none border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base normal-case leading-7 tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d8bd83]" placeholder="Share a wish, a song request, or dietary need…" /></label>
                <button disabled={status === "sending"} type="submit" className="group flex w-full items-center justify-between bg-[#e8d3ad] px-6 py-5 text-[0.64rem] font-medium uppercase tracking-[0.25em] text-[#4b0e1d] transition-colors hover:bg-[#f5e7cd] disabled:cursor-wait">
                  {status === "sending" ? "Sending your reply" : "Send my response"}
                  {status === "sending" ? <LoaderCircle size={16} className="animate-spin" /> : <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
