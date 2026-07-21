import { Baby, CameraOff, Gift, Plus, Users } from "lucide-react";
import type { FAQ } from "../types";
import Reveal from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

interface GuestGuideSectionProps {
  notes: { title: string; description: string }[];
  faqs: FAQ[];
}

const icons = [CameraOff, Users, Baby, Gift];

export default function GuestGuideSection({ notes, faqs }: GuestGuideSectionProps) {
  return (
    <section className="bg-[#f6f0e7] px-5 py-24 text-[#32151b] sm:px-8 sm:py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <Reveal><SectionLabel>For our guests</SectionLabel></Reveal>
            <Reveal delay={0.08}><h2 className="mt-8 font-instrumentSerif text-[clamp(3.6rem,7vw,7rem)] leading-[0.88] tracking-[-0.05em]">A few loving<br />notes.</h2></Reveal>
          </div>
          <Reveal delay={0.12}><p className="max-w-xl font-libreBaskerville text-sm leading-8 text-[#72595d] lg:ml-auto">Everything you need to feel at home in our celebration. If something is not answered here, please reach out to our families.</p></Reveal>
        </div>

        <div className="mt-16 grid gap-px bg-[#7a2138]/15 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {notes.map((note, index) => {
            const Icon = icons[index] ?? Gift;
            return (
              <Reveal key={note.title} delay={index * 0.06} className="h-full bg-[#f6f0e7] p-7 sm:p-9">
                <Icon size={22} strokeWidth={1.25} className="text-[#7a2138]" />
                <h3 className="mt-7 font-instrumentSerif text-3xl leading-tight">{note.title}</h3>
                <p className="mt-4 text-xs leading-6 text-[#786267]">{note.description}</p>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-[.55fr_1fr]">
          <Reveal><div><p className="font-meaCulpa text-5xl text-[#7a2138]">Questions, answered</p><p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#8a6c70]">Before the day arrives</p></div></Reveal>
          <div className="border-t border-[#7a2138]/15">
            {faqs.map((faq) => (
              <Reveal key={faq.question}>
                <details className="group border-b border-[#7a2138]/15 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-instrumentSerif text-2xl marker:hidden">
                    {faq.question}<Plus size={17} strokeWidth={1.4} className="shrink-0 text-[#7a2138] transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="max-w-2xl pb-2 pt-4 text-sm leading-7 text-[#766065]">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
