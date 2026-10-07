import Image from "next/image";
import { wedding } from "../data/wedding-data";
import { floralDivider, roseUrn, formalAttire } from "../data/design-media";

import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import TextReveal from "../components/TextReveal";

export default function AttireSection() {
  return (
    <ScrollScene id="attire" aria-labelledby="jb-attire-title" className="jb-attire relative isolate min-h-[680px] overflow-hidden px-6 pb-44 pt-10 text-center sm:min-h-[760px] sm:px-12 sm:pb-48 sm:pt-14 lg:min-h-[960px] lg:pb-56 lg:pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0">
        <Image src={roseUrn} alt="" sizes="(min-width: 1280px) 320px, (min-width: 1024px) 288px, (min-width: 640px) 208px, 160px" draggable={false} className="absolute -left-10 bottom-0 h-auto w-40 select-none sm:-left-6 sm:w-52 lg:left-0 lg:w-72 xl:w-80" />
        <Image src={roseUrn} alt="" sizes="(min-width: 1280px) 320px, (min-width: 1024px) 288px, (min-width: 640px) 208px, 160px" draggable={false} className="absolute -right-10 bottom-0 h-auto w-40 -scale-x-100 select-none sm:-right-6 sm:w-52 lg:right-0 lg:w-72 xl:w-80" />
      </div>
      <div className="relative z-10 mx-auto max-w-2xl lg:max-w-4xl">
        <ScrollLayer as="h2" profile="heading" id="jb-attire-title" className="jb-attire-script text-4xl text-[#293327] sm:text-5xl lg:text-6xl">The Dress Code</ScrollLayer>
        <Image src={floralDivider} alt="" aria-hidden="true" sizes="(min-width: 1024px) 160px, 112px" draggable={false} className="pointer-events-none mx-auto mt-2 h-auto w-28 select-none lg:w-40" />
        <TextReveal as="h3" className="jb-attire-script mt-6 text-4xl capitalize text-[#31445a] sm:text-5xl lg:text-6xl">{wedding.dressCode.title.toLowerCase()}</TextReveal>
        <ScrollScene as="figure" className="mx-auto mt-7 max-w-[440px] lg:mt-8 lg:max-w-[640px] xl:max-w-[720px]">
          <ScrollLayer profile="portrait"><Image src={formalAttire} alt="Formal attire inspiration: guests wearing long gowns, floral dresses, barong-style shirts, and tailored trousers in soft neutrals." sizes="(min-width: 1280px) 720px, (min-width: 1024px) 640px, (min-width: 640px) 440px, calc(100vw - 48px)" className="h-auto w-full" /></ScrollLayer>
        </ScrollScene>
        <TextReveal className="mt-7 text-sm leading-7 text-[#35412f] sm:text-base lg:mt-8 lg:text-2xl lg:leading-9">{wedding.dressCode.description}</TextReveal>
        <TextReveal className="mx-auto mt-3 max-w-xs text-xs leading-6 text-[#65705e] sm:max-w-md sm:text-sm lg:text-xl lg:leading-8">{wedding.dressCode.restriction}</TextReveal>
        <TextReveal className="mt-8 text-[10px] uppercase tracking-[0.14em] text-[#65705e] lg:mt-10 lg:text-base">Shades of Nude</TextReveal>
        <ul className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6 lg:mt-6 lg:gap-8" aria-label="Dress palette in shades of nude">
          {wedding.dressCode.palette.map((color) => (
            <li key={color.hex}>
              <span aria-hidden="true" className="mx-auto block h-8 w-8 rounded-full border border-[#526445]/20 lg:h-14 lg:w-14" style={{ backgroundColor: color.hex }} />
              <span className="mt-2 block text-[10px] text-[#65705e] lg:mt-3 lg:text-lg">{color.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollScene>
  );
}

