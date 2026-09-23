import { ArrowUpRight } from "lucide-react";
import Reveal from "./motion/Reveal";
import SectionPetals from "./SectionPetals";
import { giftRegistries } from "../data";

export default function GiftRegistrySection() {
  return (
    <section id="gifts" aria-labelledby="gift-title" className="relative scroll-mt-16 overflow-hidden bg-[rgb(var(--aj-cream))] px-5 py-16 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-24">
      <SectionPetals variant="pink" />
      <Reveal className="relative mx-auto max-w-5xl text-center">
        <p className="text-[10px] uppercase tracking-[.3em] text-[rgb(var(--aj-accent-dark))] sm:text-xs">Gift registry</p>
        <h2 id="gift-title" className="mt-6 font-instrumentSerif text-[clamp(3rem,7vw,7rem)] font-normal leading-[1.08] tracking-[-.025em]">
          Your presence is our<br /><span className="mt-4 block font-meaCulpa text-[rgb(var(--aj-accent-dark))] sm:mt-6">greatest gift.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-4xl text-sm leading-8 text-[rgb(var(--aj-muted))] sm:text-lg sm:leading-9 lg:text-xl">
          Having you beside us as we begin our married life means more than words can say. Your love, laughter, and warm wishes will make our celebration truly special.
        </p>
        {giftRegistries.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {giftRegistries.map(registry => (
              <li key={registry.url}>
                <a href={registry.url} target="_blank" rel="noopener noreferrer" className="group flex h-full items-center justify-between gap-4 rounded-xl border border-[rgb(var(--aj-line))]/40 bg-[rgb(var(--aj-paper))] p-6 text-left transition-colors hover:bg-[rgb(var(--aj-cream))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent))]">
                  <span><span className="block font-instrumentSerif text-2xl">{registry.name}</span>{registry.description && <span className="mt-2 block text-xs leading-6 text-[rgb(var(--aj-muted))]">{registry.description}</span>}<span className="mt-4 block text-xs text-[rgb(var(--aj-accent-dark))]">View registry <span className="sr-only">(opens in a new tab)</span></span></span>
                  <ArrowUpRight size={20} className="shrink-0 text-[rgb(var(--aj-accent-dark))]" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-8 text-[rgb(var(--aj-muted))] sm:text-base">
            Our gift preferences and any registry details will be shared here soon. Thank you for thinking of us with so much love.
          </p>
        )}
      </Reveal>
    </section>
  );
}
