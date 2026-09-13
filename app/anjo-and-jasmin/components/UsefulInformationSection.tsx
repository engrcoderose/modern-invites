import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import FloralAccent from "./FloralAccent";
import GiftRegistrySection from "./GiftRegistrySection";
import EntourageDirections from "./EntourageDirections";
import { CameraOff } from "lucide-react";
import { unpluggedCeremony } from "../data";

export default function UsefulInformationSection() {
  return (
    <section id="useful-information" aria-labelledby="useful-information-title" className="relative overflow-hidden bg-[#fbf8f1] px-5 py-20 text-[#624451] sm:px-8 sm:py-28">
      <div className="relative mx-auto max-w-4xl">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div aria-hidden="true" className="relative mx-auto mb-6 aspect-[810/579] w-48 sm:w-64"><FloralAccent kind="meadow" className="inset-0 w-full" sizes="256px" /></div>
          <p className="text-[10px] uppercase tracking-[.3em] text-[#946879] sm:text-xs">For our guests</p>
          <h2 id="useful-information-title" className="mt-5 font-instrumentSerif text-4xl leading-tight sm:text-6xl">Other Useful <span className="font-meaCulpa text-[#946879]">Information</span></h2>
          <p className="mt-5 text-sm leading-7 text-[#756770]">A few thoughtful details for our celebration.</p>
        </Reveal>
        <Reveal className="mb-10">
          <section aria-labelledby="unplugged-ceremony-title" className="rounded-xl border border-[#d8b9c7]/60 bg-[#f8eff0] px-6 py-9 text-center sm:px-10 sm:py-12">
            <CameraOff aria-hidden="true" size={28} strokeWidth={1.2} className="mx-auto text-[#946879]" />
            <p className="mt-5 text-[10px] uppercase tracking-[.25em] text-[#946879]">A gentle reminder</p>
            <h3 id="unplugged-ceremony-title" className="mt-3 font-instrumentSerif text-3xl sm:text-4xl">{unpluggedCeremony.title}</h3>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#756770] sm:text-base">{unpluggedCeremony.description}</p>
          </section>
        </Reveal>
        <EntourageDirections />
      </div>
      <GiftRegistrySection />
    </section>
  );
}
