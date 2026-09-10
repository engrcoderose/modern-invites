import Image from "next/image";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import { attireDressCode, mensAttire } from "../data";

interface AttireSectionProps {
  title: string;
  description: string;
  colors: { name: string; color: string; }[];
}

export default function AttireSection({ title, description, colors }: AttireSectionProps) {
  return (
    <section id="dress-code" aria-labelledby="attire-title" className="relative scroll-mt-20 overflow-hidden bg-[#faf5ef] bg-[radial-gradient(ellipse_at_0%_100%,#dfe7d199,transparent_65%)] px-5 py-20 text-[#624451] sm:px-8 sm:py-28 lg:px-12">
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl lg:max-w-4xl text-center">
          <p className="text-[10px] lg:text-sm uppercase tracking-[.3em] text-[#946879]">The dress code</p>
          <h2 id="attire-title" className="mx-auto mt-6 max-w-2xl lg:max-w-4xl font-instrumentSerif text-[clamp(3.2rem,6vw,5.5rem)] xl:text-8xl leading-[1.02] tracking-[-.035em]">{title}</h2>
          <p className="mt-5 font-meaCulpa text-4xl lg:text-5xl text-[#946879]">{attireDressCode}</p>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 lg:text-xl lg:leading-9 text-[#756770]">{description} Men’s attire: {mensAttire}</p>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-10 max-w-3xl lg:max-w-4xl rounded-[2rem] border border-[#e8d9dc] bg-white/60 px-5 py-7 sm:px-9">
          <p className="text-center text-[9px] lg:text-sm uppercase tracking-[.25em] text-[#946879]">Dress color code palette</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-5 sm:gap-x-6">
            {colors.map(({ name, color }) => (
              <li key={name} className="w-14 text-center sm:w-16 lg:w-20">
                <span aria-hidden="true" style={{ backgroundColor: color }} className="mx-auto block h-12 w-12 rounded-full border border-[#624451]/10 shadow-[inset_0_0_0_4px_#ffffff35] sm:h-14 sm:w-14" />
                <span className="mt-3 block text-[9px] leading-4 lg:text-sm lg:leading-5 text-[#756770]">{name}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 flex items-center justify-center gap-5">
          <span className="h-px w-12 bg-[#d7bdc7]" />
          <p className="text-[10px] lg:text-sm uppercase tracking-[.25em] text-[#946879]">A little outfit inspiration</p>
          <span className="h-px w-12 bg-[#d7bdc7]" />
        </div>
        <Reveal className="mt-7 overflow-hidden rounded-[1.75rem] border border-[#e5dadd] bg-white">
          <Image
            src="/images/anjo-and-jasmin/new_dresscode_sample.jpg"
            width={1478}
            height={704}
            alt="Pastel cocktail and semi-formal guest attire: dresses and long-sleeved shirts paired with pants in champagne, peach, blush, blue, lilac, yellow, and sage."
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 64px), (max-width: 1248px) calc(100vw - 96px), 1152px"
            className="h-auto w-full object-contain"
          />
        </Reveal>
        <p className="mx-auto mt-7 max-w-lg lg:max-w-2xl text-center text-xs leading-6 lg:text-lg lg:leading-8 text-[#756770]">Let these looks inspire you, and choose a shade from our pastel palette that feels like you.</p>
      </div>
    </section>
  );
}

