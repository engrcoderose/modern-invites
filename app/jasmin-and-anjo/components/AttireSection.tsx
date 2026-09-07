import Image from "next/image";
import type { StaticImageData } from "next/image";
import Reveal from "./motion/Reveal";
import Botanicals from "./Botanicals";
import SectionLabel from "./SectionLabel";

interface AttireSectionProps {
  title: string;
  description: string;
  colors: string[];
  image: StaticImageData;
}

export default function AttireSection({ title, description, colors, image }: AttireSectionProps) {
  return (
    <section id="dress-code" className="relative overflow-hidden scroll-mt-20 bg-[#f4e8e8] px-5 py-24 text-[#33473d] sm:scroll-mt-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <Botanicals className="floral-attire-sprig" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="order-2 lg:order-1">
          <Reveal><SectionLabel>Dress code</SectionLabel></Reveal>
          <Reveal delay={0.08}><h2 className="mt-8 font-instrumentSerif text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.05em]">{title}</h2></Reveal>
          <Reveal delay={0.16}><p className="mt-7 max-w-lg font-libreBaskerville text-sm leading-8 text-[#616b60]">{description}</p></Reveal>
          <Reveal delay={0.22} className="mt-10">
            <p className="mb-4 text-[0.6rem] uppercase tracking-[0.28em] text-[#637b65]">Our palette</p>
            <div className="flex flex-wrap items-center gap-3">
              {colors.map((color, index) => <span key={color} style={{ backgroundColor: color }} className={`block rounded-full border border-[#33473d]/10 ${index === 0 ? "h-12 w-12" : "h-9 w-9"}`} aria-label={`Wedding color ${index + 1}`} />)}
            </div>
          </Reveal>
        </div>
        <Reveal className="relative order-1 lg:order-2">
          <div className="relative ml-auto aspect-[4/5] w-[92%] overflow-hidden sm:w-[85%]">
            <Image src={image} alt="Placeholder wedding portrait; couple’s photo to follow" fill sizes="(max-width: 1024px) 90vw, 42vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#263d35]/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 left-0 border border-[#637b65]/15 bg-[#fbf8f1] px-6 py-5 shadow-xl sm:left-8 sm:px-9">
            <span className="font-meaCulpa text-4xl text-[#637b65]">Dress beautifully</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
