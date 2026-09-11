import { ArrowUpRight, Gift } from "lucide-react";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import SectionPetals from "../../jasmin-and-anjo/components/SectionPetals";
import { giftRegistries } from "../data";

export default function GiftRegistrySection() {
  return (
    <section id="gifts" aria-labelledby="gift-title" className="relative overflow-hidden bg-[#fbf8f1] px-5 py-12 text-[#624451] sm:px-8 sm:py-16">
      <SectionPetals variant="pink" />
      <Reveal className="relative mx-auto max-w-5xl text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#d8b9c7]/60 bg-[#f8edf0] sm:h-20 sm:w-20">
          <Gift size={28} strokeWidth={1.2} aria-hidden="true" />
        </div>
        <p className="mt-8 text-[10px] uppercase tracking-[.3em] text-[#946879] sm:text-sm">A little note on giving</p>
        <h3 id="gift-title" className="mt-6 font-instrumentSerif text-[clamp(3rem,7vw,7rem)] font-normal leading-[1.08] tracking-[-.025em]">
          Your presence is our<br /><span className="mt-4 block font-meaCulpa text-[#946879] sm:mt-6">greatest gift.</span>
        </h3>
        <p className="mx-auto mt-8 max-w-4xl text-sm leading-8 text-[#756770] sm:text-lg sm:leading-9 lg:text-xl">
          Having you beside us as we begin our married life means more than words can say. Your love, laughter, and warm wishes will make our celebration truly special.
        </p>
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[#cba4b6]/30 bg-[#fffdfb]/90 px-5 py-7 sm:mt-12 sm:px-10 sm:py-9">
          <h4 className="font-instrumentSerif text-3xl text-[#624451] sm:text-4xl">For those who wish to give</h4>
          {giftRegistries.length > 0 ? (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {giftRegistries.map(registry => (
                <li key={registry.url}>
                  <a href={registry.url} target="_blank" rel="noopener noreferrer" className="group flex h-full items-center justify-between gap-4 rounded-xl border border-[#cba4b6]/40 bg-[#f8edf0]/60 p-6 text-left transition-colors hover:bg-[#f3e3e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879]">
                    <span><span className="block font-instrumentSerif text-2xl">{registry.name}</span>{registry.description && <span className="mt-2 block text-xs leading-6 text-[#756770]">{registry.description}</span>}<span className="mt-4 block text-xs text-[#946879]">View registry <span className="sr-only">(opens in a new tab)</span></span></span>
                    <ArrowUpRight size={20} className="shrink-0 text-[#946879]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#756770] sm:text-lg">
              Our gift preferences and any registry details will be shared here soon. Thank you for thinking of us with so much love.
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
