import Reveal from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

interface EntourageSectionProps {
  brideFullName: string;
  groomFullName: string;
  groups: { role: string; names: string[] }[];
}

export default function EntourageSection({ brideFullName, groomFullName, groups }: EntourageSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#f5efe6] px-5 py-24 text-[#32151b] sm:px-8 sm:py-32 lg:px-12 lg:py-44">
      <div className="pointer-events-none absolute inset-x-0 top-14 text-center font-instrumentSerif text-[10rem] leading-none text-[#7a2138]/[0.025] sm:text-[18rem]">I &amp; D</div>
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <Reveal><SectionLabel>The wedding party</SectionLabel></Reveal>
          <Reveal delay={0.08}><h2 className="mt-8 font-instrumentSerif text-[clamp(3.6rem,7vw,7rem)] leading-[0.9] tracking-[-0.05em]">With love from<br />our dearest people.</h2></Reveal>
          <Reveal delay={0.14}><p className="mt-7 max-w-xl font-libreBaskerville text-sm leading-8 text-[#71585c]">Together with their families, {brideFullName} and {groomFullName} request the honor of your presence.</p></Reveal>
        </div>

        <div className="mt-16 grid gap-x-14 gap-y-12 border-y border-[#7a2138]/15 py-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:py-20">
          {groups.map((group, index) => (
            <Reveal key={group.role} delay={(index % 3) * 0.06} className="text-center">
              <h3 className="text-[0.58rem] font-medium uppercase tracking-[0.3em] text-[#9a6c68]">{group.role}</h3>
              <div className="mt-4 space-y-1">
                {group.names.map((name) => <p key={name} className="font-instrumentSerif text-2xl text-[#3b1820]">{name}</p>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
