import { Baby, CameraOff, Gift, Users } from "lucide-react";
import Reveal from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

interface GuestGuideSectionProps {
  notes: { title: string; description: string; }[];
}

const icons = [CameraOff, Users, Baby, Gift];

export default function GuestGuideSection({ notes }: GuestGuideSectionProps) {
  return (
    <section className="bg-[#fbf8f1] px-5 py-24 text-[#33473d] sm:px-8 sm:py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <Reveal><SectionLabel>For our guests</SectionLabel></Reveal>
            <Reveal delay={0.08}><h2 className="mt-8 font-instrumentSerif text-[clamp(3.6rem,7vw,7rem)] leading-[0.88] tracking-[-0.05em]">A few loving<br />notes.</h2></Reveal>
          </div>
          <Reveal delay={0.12}><p className="max-w-xl font-libreBaskerville text-sm leading-8 text-[#616b60] lg:ml-auto">Everything you need to feel at home in our celebration. If something is not answered here, please reach out to our families.</p></Reveal>
        </div>

        <div className="mt-16 grid gap-px bg-[#637b65]/15 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {notes.map((note, index) => {
            const Icon = icons[index] ?? Gift;
            return (
              <Reveal key={note.title} delay={index * 0.06} className="h-full bg-[#fbf8f1] p-7 sm:p-9">
                <Icon size={22} strokeWidth={1.25} className="text-[#637b65]" />
                <h3 className="mt-7 font-instrumentSerif text-3xl leading-tight">{note.title}</h3>
                <p className="mt-4 text-xs leading-6 text-[#616b60]">{note.description}</p>
              </Reveal>
            );
          })}
        </div>


      </div>
    </section>
  );
}
