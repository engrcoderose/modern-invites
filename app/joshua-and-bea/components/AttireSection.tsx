import Image from "next/image";
import Reveal from "./motion/Reveal";
import InspirationOne from "../assets/images/designs/dress-code-ispo-1.png";
import InspirationTwo from "../assets/images/designs/dress-code-ispo-2.png";

interface AttireSectionProps {
  title: string;
  description: string;
  colors: { name: string; color: string; }[];
}

const inspirations = [
  {
    image: InspirationOne,
    title: "Soft silhouettes",
    note: "Flowing dresses, tailored trousers, and softly structured shirts.",
    alt: "Illustrated outfit inspiration with flowing champagne and peach dresses, cream shirts, and sage separates",
  },
  {
    image: InspirationTwo,
    title: "Garden-inspired details",
    note: "Delicate florals, light fabrics, and a little touch of romance.",
    alt: "Illustrated couples wearing sage and floral dresses with cream, beige, and olive outfits",
  },
];

export default function AttireSection({ title, description, colors }: AttireSectionProps) {
  return (
    <section id="dress-code" aria-labelledby="attire-title" className="relative scroll-mt-20 overflow-hidden bg-[#faf5ef] bg-[radial-gradient(ellipse_at_0%_100%,#dfe7d199,transparent_65%)] px-5 py-20 text-[#624451] sm:px-8 sm:py-28 lg:px-12">
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl lg:max-w-4xl text-center">
          <p className="text-[10px] lg:text-sm uppercase tracking-[.3em] text-[#946879]">The dress code</p>
          <h2 id="attire-title" className="mx-auto mt-6 max-w-2xl lg:max-w-4xl font-instrumentSerif text-[clamp(3.2rem,6vw,5.5rem)] xl:text-8xl leading-[1.02] tracking-[-.035em]">{title}</h2>
          <p className="mt-5 font-meaCulpa text-4xl lg:text-5xl text-[#946879]">Cocktail &amp; semi-formal</p>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 lg:text-xl lg:leading-9 text-[#756770]">{description}</p>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-10 max-w-3xl lg:max-w-4xl rounded-[2rem] border border-[#e8d9dc] bg-white/60 px-5 py-7 sm:px-9">
          <p className="text-center text-[9px] lg:text-sm uppercase tracking-[.25em] text-[#946879]">Colors to celebrate in</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-5 sm:gap-x-6">
            {colors.map(({ name, color }) => (
              <li key={name} className="w-14 text-center sm:w-16 lg:w-20">
                <span aria-hidden="true" style={{ backgroundColor: color }} className="mx-auto block h-16 w-12 rounded-t-full rounded-b-xl border border-[#624451]/10 shadow-[inset_0_0_0_4px_#ffffff35] sm:h-20 sm:w-14" />
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
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          {inspirations.map((inspiration, index) => (
            <Reveal key={inspiration.title} delay={index * 0.1} className={`overflow-hidden rounded-[1.75rem] border border-[#e5dadd] px-5 pb-8 pt-8 sm:px-8 ${index === 0 ? "bg-gradient-to-b from-[#f5e6e9] to-[#fffaf5]" : "bg-gradient-to-b from-[#e9eddf] to-[#fffaf5]"}`}>
              <figure>
                <div className="flex min-h-40 items-center sm:min-h-48">
                  <Image src={inspiration.image} alt={inspiration.alt} sizes="(max-width: 768px) 90vw, 500px" className="h-auto w-full object-contain" />
                </div>
                <figcaption className="mt-7 border-t border-[#624451]/10 pt-6 text-center">
                  <h3 className="font-instrumentSerif text-3xl lg:text-4xl">{inspiration.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs lg:max-w-sm text-xs leading-6 lg:text-lg lg:leading-8 text-[#756770]">{inspiration.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-7 max-w-lg lg:max-w-2xl text-center text-xs leading-6 lg:text-lg lg:leading-8 text-[#756770]">Let these looks inspire you, and choose a shade from our pastel palette that feels like you.</p>
      </div>
    </section>
  );
}
