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
          <h2 id="useful-information-title" className="font-instrumentSerif text-4xl leading-tight sm:text-6xl">Other <span className="font-meaCulpa text-[rgb(var(--aj-accent-dark))]">Details</span></h2>
        </Reveal>
        <Reveal className="mb-10">
          <section aria-labelledby="unplugged-ceremony-title" className="rounded-xl border border-[rgb(var(--aj-line))]/50 bg-[rgb(var(--aj-sand))] px-6 py-9 text-center sm:px-10 sm:py-12">
            <CameraOff aria-hidden="true" size={28} strokeWidth={1.2} className="mx-auto text-[rgb(var(--aj-accent-dark))]" />
            <h3 id="unplugged-ceremony-title" className="mt-5 font-instrumentSerif text-3xl sm:text-4xl">{unpluggedCeremony.title}</h3>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[rgb(var(--aj-muted))] sm:text-base">{unpluggedCeremony.description}</p>
          </section>
        </Reveal>
        <EntourageDirections />
      </div>
    </section>
  );
}
