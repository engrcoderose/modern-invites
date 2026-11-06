import Image from "next/image";
import wedding from "../data/wedding-details.json";
import pattern from "../assets/designs/entourage-pattern.webp";
import upperLeft from "../assets/designs/ent_upper-left.png";
import upperRight from "../assets/designs/ent_upper-right.png";
import lowerLeft from "../assets/designs/ent_bttm-left.png";
import lowerRight from "../assets/designs/ent_bttm-right.png";
import bouquet from "../assets/designs/ent_cntr-flwr.png";

function NameGroup({ title, names }: { title: string; names: string[] }) {
  return (
    <div className="min-w-0">
      <h3 className="mj-script mj-entourage-role mb-4">{title}</h3>
      <ul className="space-y-2">
        {names.map((name) => <li key={name} className="mj-entourage-name">{name}</li>)}
      </ul>
    </div>
  );
}

export default function EntourageSection() {
  const party = wedding.entourage;
  return (
    <section id="entourage" aria-labelledby="mj-entourage-title" className="mj-entourage relative overflow-hidden px-4 pb-36 pt-12 text-center sm:px-8 sm:pb-56 sm:pt-16" style={{ backgroundImage: `url(${pattern.src})` }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image src={upperLeft} alt="" sizes="(min-width: 1174px) 270px, (min-width: 392px) 23vw, 90px" className="mj-entourage-upper absolute left-0 top-0 h-auto" />
        <Image src={upperRight} alt="" sizes="(min-width: 1174px) 270px, (min-width: 392px) 23vw, 90px" className="mj-entourage-upper absolute right-0 top-0 h-auto" />
        <Image src={lowerLeft} alt="" sizes="(min-width: 1200px) 300px, (min-width: 440px) 25vw, 110px" className="mj-entourage-lower absolute bottom-0 left-0 h-auto" />
        <Image src={lowerRight} alt="" sizes="(min-width: 1200px) 300px, (min-width: 440px) 25vw, 110px" className="mj-entourage-lower absolute bottom-0 right-0 h-auto" />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <Image src={bouquet} alt="" sizes="(min-width: 640px) 112px, 96px" className="mx-auto mb-3 h-auto w-24 sm:w-28" />
        <h2 id="mj-entourage-title" className="mj-script text-5xl sm:text-6xl">The Entourage</h2>
        <p className="mx-auto mb-8 mt-4 max-w-md text-sm leading-7">The people who have shaped our lives, standing beside us as we begin our forever.</p>
        <p className="mb-10 text-xl leading-relaxed">{wedding.couple.bride}<br /><span className="italic">&</span><br />{wedding.couple.groom}</p>
        <div className="grid grid-cols-2 gap-5 sm:gap-12 [&>:nth-child(odd)]:text-right [&>:nth-child(even)]:text-left">
          <NameGroup title="Parents of the Groom" names={wedding.parents[1].members} />
          <NameGroup title="Parents of the Bride" names={wedding.parents[0].members} />
        </div>
        <h3 className="mj-script mb-8 mt-12 text-4xl sm:mt-14 sm:text-5xl">Principal Sponsors</h3>
        <ul className="space-y-3">{party.principalSponsors.map((pair) => (
          <li key={pair[0]} className="grid grid-cols-2 items-start gap-5 sm:gap-12">
            {pair.map((name, index) => <span key={name} className={`mj-entourage-name min-w-0 ${index === 0 ? "text-right" : "text-left"}`}>{name}</span>)}
          </li>
        ))}</ul>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:mt-14 sm:gap-x-12 sm:gap-y-14 [&>:nth-child(odd)]:text-right [&>:nth-child(even)]:text-left">
          <NameGroup title="Best Man" names={[party.bestMan]} /><NameGroup title="Maid of Honor" names={[party.maidOfHonor]} />
          <NameGroup title="Groomsmen" names={party.groomsmen} /><NameGroup title="Bridesmaids" names={party.bridesmaids} />
          <NameGroup title="Ring Bearers" names={party.ringBearers} /><NameGroup title="Flower Girls" names={party.flowerGirls} />
        </div>
      </div>
    </section>
  );
}
