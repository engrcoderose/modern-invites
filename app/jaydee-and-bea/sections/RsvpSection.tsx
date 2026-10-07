import { ArrowUpRight, Mail } from "lucide-react";
import { wedding } from "../data/wedding-data";
import BotanicalArtwork from "../components/BotanicalArtwork";

import TextReveal from "../components/TextReveal";

export default function RsvpSection() {
  return (
    <section id="rsvp" aria-labelledby="jb-rsvp-title" className="jb-rsvp relative isolate overflow-hidden px-5 py-20 text-center sm:px-8 md:py-28">
      <BotanicalArtwork className="absolute -bottom-36 -left-28 z-[-1] w-80 opacity-30 lg:-left-8 lg:w-[430px]" />
      <BotanicalArtwork className="absolute -bottom-36 -right-28 z-[-1] w-80 -scale-x-100 opacity-30 lg:-right-8 lg:w-[430px]" />
      <div className="mx-auto max-w-xl">
        <Mail className="mx-auto mb-5 h-7 w-7 text-[#738665]" strokeWidth={1} aria-hidden="true" />
        <TextReveal as="h2" id="jb-rsvp-title" className="jb-heading text-balance">We’d love<br /><em>to have you there.</em></TextReveal>
        <TextReveal className="mt-6 text-base font-medium">Kindly Confirm Your Attendance</TextReveal>
        {wedding.rsvp.deadline && <TextReveal className="mt-4 text-xs leading-6 text-[#65705e]">{wedding.rsvp.deadline}</TextReveal>}
        {wedding.rsvp.url ? <a href={wedding.rsvp.url} target="_blank" rel="noopener noreferrer" className="jb-button mt-7 inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-5 rounded-full px-7 py-4 text-sm tracking-wider">RSVP NOW <ArrowUpRight size={18} aria-hidden="true" /></a> : <>
          <button type="button" disabled aria-describedby="jb-rsvp-status" className="jb-button mt-7 inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-5 rounded-full px-7 py-4 text-sm tracking-wider">RSVP NOW <ArrowUpRight size={18} aria-hidden="true" /></button>
          <p id="jb-rsvp-status" className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#5b6554]">{wedding.rsvp.pendingMessage}</p>
        </>}
      </div>
    </section>
  );
}

