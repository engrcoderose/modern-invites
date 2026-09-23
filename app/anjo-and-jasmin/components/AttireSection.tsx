import Image from "next/image";
import Reveal from "./motion/Reveal";
import { mensAttire, womensAttire, sponsorAttire } from "../data";
import sponsorIllustration from "../assets/images/designs/sponsor-attire-watercolor.png";
import guestIllustration from "../assets/images/designs/guest-attire-watercolor.png";

interface AttireSectionProps {
  colors: { name: string; color: string; }[];
}

export default function AttireSection({ colors }: AttireSectionProps) {
  return (
    <section id="dress-code" aria-labelledby="attire-title" className="relative scroll-mt-20 bg-[rgb(var(--aj-cream))] px-4 py-16 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[.25em] text-[rgb(var(--aj-accent-dark))]">The dress code</p>
          <h2 id="attire-title" className="mt-5 font-instrumentSerif text-4xl uppercase sm:text-5xl">Attire</h2>
        </Reveal>

        <Reveal className="mt-8 grid grid-cols-[1fr_90px_1fr] items-center gap-2 sm:mt-10 sm:grid-cols-[1fr_180px_1fr] sm:gap-6">
          {sponsorAttire.map(({ role, style, description }, index) => (
            <div key={role} className={index === 0 ? "col-start-1 row-start-1" : "col-start-3 row-start-1"}>
              <h3 className="font-instrumentSerif text-sm uppercase sm:text-2xl">{role}</h3>
              <p className="mt-1 font-imperial text-[27px] leading-tight text-[rgb(var(--aj-accent-dark))] sm:text-4xl">{style}</p>
              <p className="mx-auto mt-2 max-w-64 text-[11px] leading-relaxed sm:text-sm sm:leading-6">{description}</p>
            </div>
          ))}
          <Image src={sponsorIllustration}
            alt="Ivory embroidered Filipiniana gown and Barong Tagalog with black trousers and shoes."
            sizes="(max-width: 639px) 90px, 180px"
            className="col-start-2 row-start-1 h-auto w-full" />
        </Reveal>

        <Reveal delay={0.08} className="mt-10 sm:mt-14">
          <h3 className="font-instrumentSerif text-lg uppercase sm:text-2xl">Dress color for family and friends</h3>
          <ul aria-label="Guest attire color palette" className="mx-auto mt-3 flex max-w-3xl gap-0.5 sm:mt-4 sm:gap-1">
            {colors.map(({ name, color }) => (
              <li key={name} title={name} style={{ backgroundColor: color }} className="h-6 flex-1 sm:h-10">
                <span className="sr-only">{name}</span>
              </li>
            ))}
          </ul>
          <Image src={guestIllustration}
            alt="Watercolor outfit inspiration: five pastel long-sleeved shirts with trousers beside five flowing yellow, floral, sage, and blue dresses."
            sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 960px) calc(100vw - 64px), 896px"
            className="mx-auto mt-3 h-auto w-full sm:mt-5" />
        </Reveal>

        <div className="mt-5 grid grid-cols-2 gap-5 sm:mt-8 sm:gap-12">
          {[
            { role: "Gentlemen", style: "Long Sleeves and Pants", description: "Dress to impress in light or colorful tones. " + mensAttire.replace("Long sleeves and pants. ", "") },
            { role: "Ladies", style: "Long or Floral Dress", description: womensAttire.replace("Long or floral dress. ", "") },
          ].map(({ role, style, description }) => (
            <Reveal key={role}>
              <h3 className="font-instrumentSerif text-xl uppercase sm:text-3xl">{role}</h3>
              <p className="mt-1 font-imperial text-[28px] leading-tight text-[rgb(var(--aj-accent-dark))] sm:text-[40px]">{style}</p>
              <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed sm:text-base sm:leading-7">{description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
