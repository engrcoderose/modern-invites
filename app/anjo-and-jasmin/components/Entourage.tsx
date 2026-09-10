import { wedding } from "../data";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import SectionPetals from "../../jasmin-and-anjo/components/SectionPetals";
import EntourageDirections from "./EntourageDirections";

export default function Entourage() {
  return <section id="entourage" className="relative overflow-hidden bg-[#e5eadd] px-5 py-20 sm:px-8">
    <SectionPetals />
    <div className="relative mx-auto max-w-4xl">
      <Reveal className="mb-12 text-center"><p className="text-[10px] uppercase tracking-[.25em] text-[#946879]">The wedding party · Sample names</p><h2 className="mt-5 font-meaCulpa text-5xl sm:text-7xl">With love from<br />our dearest people.</h2><p className="mx-auto mt-6 max-w-xl text-sm leading-8">Together with their families, {wedding.groom} and {wedding.bride} request the honor of your presence.</p></Reveal>
      <EntourageDirections />
      <div className="grid gap-4 sm:grid-cols-2">{wedding.entourage.map((group, index) => <Reveal key={group.role} className={`rounded-xl border border-[#637b65]/10 bg-[#fffdf8] px-6 py-7 text-center shadow-sm ${index >= 6 ? "sm:col-span-2" : ""}`}><h3 className="mb-4 font-serif text-lg text-[#946879]">{group.role}</h3><ul className={`space-y-2 text-sm leading-7 ${group.names.length > 2 && index >= 6 ? "sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0" : ""}`}>{group.names.map(name => <li key={name}>{name}</li>)}</ul></Reveal>)}</div>
    </div>
  </section>;
}
