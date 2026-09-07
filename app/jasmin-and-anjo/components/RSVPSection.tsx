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
    <section id="rsvp" className="relative overflow-hidden bg-[#456252] px-5 py-24 text-[#fffaf3] sm:px-8 sm:py-32 lg:px-12 lg:py-44">
      <div className="ambient-wash absolute inset-0 bg-[radial-gradient(circle_at_15%_90%,rgba(224,188,201,.14),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(183,204,171,.22),transparent_32%)]" />
      <div className="hero-grain absolute inset-0 opacity-20" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.92fr_1.08fr] lg:gap-24">
        <div>
          <Reveal><SectionLabel light>Kindly respond</SectionLabel></Reveal>
          <Reveal delay={0.08}><h2 className="mt-8 font-instrumentSerif text-[clamp(4rem,8vw,8.5rem)] leading-[0.8] tracking-[-0.06em]">Will you<br /><span className="font-meaCulpa text-[0.72em] font-normal text-[#eac8cd]">join us?</span></h2></Reveal>
          <Reveal delay={0.16}><p className="mt-8 max-w-md font-libreBaskerville text-sm leading-8 text-[#e9dfe0]/65">Your presence would make our celebration complete. {deadline}</p></Reveal>
        </div>

        <Reveal delay={0.12} className="border border-white/15 bg-[#263d35]/45 p-6 backdrop-blur-sm sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div key="success" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-[#eac8cd]/45 text-[#eac8cd]"><Check size={26} strokeWidth={1.4} /></div>
                <h3 className="mt-7 font-instrumentSerif text-4xl">Your response preview.</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">This is a preview only. Your reply has not been sent or saved. RSVP collection will open once the final details are ready.</p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-[0.6rem] uppercase tracking-[0.26em] text-[#eac8cd] underline underline-offset-8">Edit preview</button>
              </motion.div>
            ) : (
              <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-8">
                <p className="text-xs leading-6 text-white/75">RSVP preview · Replies are not sent or saved yet.</p>
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block text-[0.6rem] uppercase tracking-[0.24em] text-[#e9dfe0]">First name<input required name="firstName" autoComplete="given-name" className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#eac8cd]" placeholder="First name" /></label>
                  <label className="block text-[0.6rem] uppercase tracking-[0.24em] text-[#e9dfe0]">Last name<input required name="lastName" autoComplete="family-name" className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#eac8cd]" placeholder="Last name" /></label>
                </div>
                <fieldset>
                  <legend className="text-[0.6rem] uppercase tracking-[0.24em] text-[#e9dfe0]">Joyfully attending?</legend>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {["Yes, with joy", "Regretfully, no"].map((answer, index) => (
                      <label key={answer} className="cursor-pointer border border-white/20 p-4 text-center text-xs text-white/70 transition-colors has-[:checked]:border-[#eac8cd] has-[:checked]:bg-[#eac8cd]/10 has-[:checked]:text-white">
                        <input required type="radio" name="attending" value={index === 0 ? "yes" : "no"} className="sr-only" />{answer}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="block text-[0.6rem] uppercase tracking-[0.24em] text-[#e9dfe0]">A note for the couple<textarea name="message" rows={3} className="mt-3 w-full resize-none border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base normal-case leading-7 tracking-normal text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#eac8cd]" placeholder="Share a wish, a song request, or dietary need…" /></label>
                <button disabled={status === "sending"} type="submit" className="group flex w-full items-center justify-between bg-[#f2dce0] px-6 py-5 text-[0.64rem] font-medium uppercase tracking-[0.25em] text-[#456252] transition-colors hover:bg-[#f2dce0] disabled:cursor-wait">
                  {status === "sending" ? "Preparing preview" : "Preview my response"}
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
