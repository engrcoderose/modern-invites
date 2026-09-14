import { Leaf, MailCheck } from "lucide-react";
import Reveal from "./motion/Reveal";
import SectionPetals from "./SectionPetals";
import DemoRsvpFlow from "./DemoRsvpFlow";

export default function RSVPSection({ deadline }: { deadline: string }) {
  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="relative overflow-hidden border-t border-[#ead7df] bg-[#f5e9ed] px-5 py-20 text-[#624451] sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <SectionPetals />
      <div className="relative mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <Reveal className="mx-auto max-w-xl text-center lg:sticky lg:top-28 lg:mx-0 lg:text-left">
          <div className="flex items-center justify-center gap-3 text-[#946879] lg:justify-start"><MailCheck size={16} strokeWidth={1.2} aria-hidden="true" /><p className="text-[0.62rem] font-medium uppercase tracking-[.3em]">Kindly respond</p></div>
          <h2 id="rsvp-title" className="mt-7 font-instrumentSerif text-[clamp(4rem,8vw,7.5rem)] leading-[.8] tracking-[-.035em]">Will you<span className="mt-3 block font-meaCulpa text-[.72em] font-normal leading-none text-[#946879]">join us?</span></h2>
          <p className="mt-8 text-sm leading-8 text-[#756770] sm:text-base">Your presence would make our celebration complete. {deadline}</p>
          <p className="mt-4 text-sm leading-7 text-[#876675]">Enter your complete invited name to locate your household.</p>
          <div className="mt-8 flex items-center justify-center gap-3 text-[#cba4b6] lg:justify-start"><span className="h-px w-12 bg-current" /><Leaf size={16} strokeWidth={1} aria-hidden="true" /><span className="h-px w-12 bg-current" /></div>
        </Reveal>
        <Reveal delay={0.1}><DemoRsvpFlow /></Reveal>
      </div>
    </section>
  );
}
