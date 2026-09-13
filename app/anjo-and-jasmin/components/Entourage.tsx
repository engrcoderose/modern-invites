import { wedding } from "../data";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import FloralAccent from "./FloralAccent";

export default function Entourage() {
  return (
    <section id="entourage" className="relative overflow-hidden bg-[#e1e7d8] px-5 py-20 text-[#624451] sm:px-8 sm:py-28">
      <FloralAccent kind="vine" className="-left-12 top-10 w-36 opacity-70 sm:w-52" />
      <FloralAccent kind="vine" className="-right-12 bottom-10 w-36 rotate-180 opacity-70 sm:w-52" />
      <div className="relative mx-auto max-w-5xl border border-[#bdc8b0] bg-[#fffdf7] p-3 shadow-[0_20px_60px_-40px_#465a4855] sm:p-4">
        <div className="border border-[#d8dece] px-5 py-12 sm:px-12 sm:py-16">
          <Reveal className="relative mb-10 text-center">
            <div aria-hidden="true" className="relative mx-auto mb-5 h-24 w-24"><FloralAccent kind="daisies" className="inset-0 w-full" sizes="96px" /></div>
            <p className="text-[10px] uppercase tracking-[.25em] text-[#946879]">The wedding party · Sample names</p>
            <h2 className="mt-5 font-meaCulpa text-5xl leading-tight sm:text-7xl">With love from<br />our dearest people.</h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#756770]">Together with their families, {wedding.groom} and {wedding.bride} request the honor of your presence.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2">
            {wedding.entourage.map((group, index) => (
              <Reveal key={group.role} className={`border-t border-[#d5dcca] px-3 py-8 text-center ${index >= 6 ? "sm:col-span-2" : index % 2 === 0 ? "sm:border-r" : ""}`}>
                <h3 className="mb-4 text-[11px] uppercase tracking-[.18em] text-[#946879]">{group.role}</h3>
                <ul className={`space-y-2 font-instrumentSerif text-xl leading-8 sm:text-2xl ${group.names.length > 2 && index >= 6 ? "sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0" : ""}`}>{group.names.map(name => <li key={name}>{name}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
