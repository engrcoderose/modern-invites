import Image from "next/image";
import wedding from "../data/wedding-details.json";
import pattern from "../assets/designs/entourage-pattern.webp";
import upperLeft from "../assets/designs/hero-flower-left.png";
import upperRight from "../assets/designs/hero-flower-right.png";
import bouquet from "../assets/designs/entourage-yellow-bouquet-v1.webp";

type NameGroupProps = { title: string; names: readonly string[] };

function NameRows({ rows, singleLine = false }: { rows: readonly (readonly string[])[]; singleLine?: boolean }) {
  return (
    <ul className={`mx-auto space-y-3 text-left lg:max-w-2xl${singleLine ? " mj-principal-sponsors" : ""}`}>
      {rows.map((row) => (
        <li data-mj-reveal key={row.join("|")} className="grid grid-cols-2 items-start gap-x-5 sm:gap-x-12">
          {row.map((name, index) => <span key={`${index}-${name}`} className="mj-entourage-name min-w-0">{name}</span>)}
        </li>
      ))}
    </ul>
  );
}

function PairedNameGroups({ left, right }: { left: NameGroupProps; right: NameGroupProps }) {
  const rows = Array.from({ length: Math.max(left.names.length, right.names.length) }, (_, index) => [left.names[index] ?? "", right.names[index] ?? ""]);
  return (
    <div className="mx-auto lg:max-w-2xl">
      <div className="mb-4 grid grid-cols-2 items-start gap-x-5 text-left sm:gap-x-12">
        <h3 data-mj-reveal className="mj-script mj-entourage-role min-w-0">{left.title}</h3>
        <h3 data-mj-reveal className="mj-script mj-entourage-role min-w-0">{right.title}</h3>
      </div>
      <NameRows rows={rows} />
    </div>
  );
}

function NameGroup({ title, names }: NameGroupProps) {
  return (
    <div className="min-w-0">
      <h3 data-mj-reveal className="mj-script mj-entourage-role mb-4">{title}</h3>
      <ul className="mx-auto w-fit max-w-full space-y-3 text-left">
        {names.map((name) => <li data-mj-reveal key={name} className="mj-entourage-name">{name}</li>)}
      </ul>
    </div>
  );
}

export default function EntourageSection() {
  const party = wedding.entourage;
  return (
    <section id="entourage" aria-labelledby="mj-entourage-title" className="mj-entourage relative overflow-hidden px-4 pb-36 pt-12 text-center sm:px-8 sm:pb-56 sm:pt-16" style={{ backgroundImage: `url(${pattern.src})` }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image src={upperLeft} alt="" sizes="(min-width: 1174px) 270px, (min-width: 392px) 23vw, 90px" className="mj-entourage-upper absolute -left-3 -top-3 h-auto sm:-left-6 sm:-top-6" />
        <Image src={upperRight} alt="" sizes="(min-width: 1174px) 270px, (min-width: 392px) 23vw, 90px" className="mj-entourage-upper absolute -right-3 -top-3 h-auto sm:-right-6 sm:-top-6" />
        <Image src={upperRight} alt="" sizes="(min-width: 1200px) 300px, (min-width: 440px) 25vw, 110px" className="mj-entourage-lower absolute -bottom-3 -left-3 h-auto rotate-180 sm:-bottom-6 sm:-left-6" />
        <Image src={upperLeft} alt="" sizes="(min-width: 1200px) 300px, (min-width: 440px) 25vw, 110px" className="mj-entourage-lower absolute -bottom-3 -right-3 h-auto rotate-180 sm:-bottom-6 sm:-right-6" />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <Image data-mj-reveal src={bouquet} alt="" sizes="(min-width: 640px) 112px, 96px" className="mx-auto mb-3 h-auto w-24 sm:w-28" />
        <h2 data-mj-reveal id="mj-entourage-title" className="mj-script text-5xl sm:text-6xl">The Entourage</h2>
        <p data-mj-reveal className="mx-auto mb-8 mt-4 max-w-md text-sm leading-7">The people who have shaped our lives, standing beside us as we begin our forever.</p>
        <p data-mj-reveal className="mb-10 text-balance text-xl uppercase leading-relaxed">{wedding.couple.groom}<br /><span className="italic">&</span><br />{wedding.couple.bride}</p>
        <PairedNameGroups left={{ title: "Parents of the Groom", names: wedding.parents[1].members }} right={{ title: "Parents of the Bride", names: wedding.parents[0].members }} />
        <h3 data-mj-reveal className="mj-script mb-8 mt-12 text-4xl sm:mt-14 sm:text-5xl">Principal Sponsors</h3>
        <NameRows rows={party.principalSponsors} singleLine />
        <div className="mt-12 space-y-12 sm:mt-14 sm:space-y-14">
          <PairedNameGroups left={{ title: "Best Man", names: [party.bestMan] }} right={{ title: "Maid of Honor", names: [party.maidOfHonor] }} />
          <PairedNameGroups left={{ title: "Groomsmen", names: party.groomsmen }} right={{ title: "Bridesmaids", names: party.bridesmaids }} />
        </div>
        <div className="mx-auto mt-12 grid max-w-xl gap-12 text-center sm:mt-14 sm:gap-14">
          <NameGroup title="Ring Bearers" names={party.ringBearers} />
          <NameGroup title="Flower Girls" names={party.flowerGirls} />
        </div>
      </div>
    </section>
  );
}
