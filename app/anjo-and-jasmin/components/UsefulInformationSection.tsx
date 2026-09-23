import Reveal from "./motion/Reveal";
import FloralAccent from "./FloralAccent";
import EntourageDirections from "./EntourageDirections";
import { CameraOff } from "lucide-react";
import { unpluggedCeremony } from "../data";

export default function UsefulInformationSection() {
  return (
    <section id="useful-information" aria-labelledby="useful-information-title" className="relative overflow-hidden bg-[rgb(var(--aj-cream))] px-5 py-20 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-28">
      <div className="relative mx-auto max-w-4xl">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div aria-hidden="true" className="relative mx-auto mb-6 aspect-[810/579] w-48 sm:w-64"><FloralAccent kind="meadow" className="inset-0 w-full" sizes="256px" /></div>
          <p className="text-[10px] uppercase tracking-[.3em] text-[rgb(var(--aj-accent-dark))] sm:text-xs">For our guests</p>
          <h2 id="useful-information-title" className="mt-5 font-instrumentSerif text-4xl leading-tight sm:text-6xl">Other Useful <span className="font-meaCulpa text-[rgb(var(--aj-accent-dark))]">Information</span></h2>
          <p className="mt-5 text-sm leading-7 text-[rgb(var(--aj-muted))]">A few thoughtful details for our celebration.</p>
        </Reveal>
        <Reveal className="mb-10">
          <section aria-labelledby="unplugged-ceremony-title" className="rounded-xl border border-[#d3b6a1]/60 bg-[rgb(var(--aj-sand))] px-6 py-9 text-center sm:px-10 sm:py-12">
            <CameraOff aria-hidden="true" size={28} strokeWidth={1.2} className="mx-auto text-[rgb(var(--aj-accent-dark))]" />
            <p className="mt-5 text-[10px] uppercase tracking-[.25em] text-[rgb(var(--aj-accent-dark))]">A gentle reminder</p>
            <h3 id="unplugged-ceremony-title" className="mt-3 font-instrumentSerif text-3xl sm:text-4xl">{unpluggedCeremony.title}</h3>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[rgb(var(--aj-muted))] sm:text-base">{unpluggedCeremony.description}</p>
          </section>
        </Reveal>
        <EntourageDirections />
      </div>
    </section>
  );
}
