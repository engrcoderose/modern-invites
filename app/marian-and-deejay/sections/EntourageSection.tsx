import wedding from "../data/wedding-details.json";

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
    <section id="entourage" className="mj-entourage px-4 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="mj-script text-6xl sm:text-7xl">The Entourage</h2>
        <p className="mx-auto mb-16 mt-6 max-w-md text-sm leading-7">The people who have shaped our lives, standing beside us as we begin our forever.</p>
        <p className="mj-display mb-12 text-xl leading-relaxed">{wedding.couple.bride}<br /><span className="italic">&</span><br />{wedding.couple.groom}</p>
        <div className="grid grid-cols-2 gap-5 sm:gap-12 [&>:nth-child(odd)]:text-right [&>:nth-child(even)]:text-left">
          <NameGroup title="Parents of the Groom" names={wedding.parents[1].members} />
          <NameGroup title="Parents of the Bride" names={wedding.parents[0].members} />
        </div>
        <div className="mj-entourage-divider mx-auto my-14 w-20 border-t" />
        <h3 className="mj-script mb-8 text-4xl sm:text-5xl">Principal Sponsors</h3>
        <ul className="space-y-3">{party.principalSponsors.map((pair) => (
          <li key={pair[0]} className="grid grid-cols-2 items-start gap-5 sm:gap-12">
            {pair.map((name, index) => <span key={name} className={`mj-entourage-name min-w-0 ${index === 0 ? "text-right" : "text-left"}`}>{name}</span>)}
          </li>
        ))}</ul>
        <div className="mj-entourage-divider mx-auto my-14 w-20 border-t" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-12 sm:gap-y-14 [&>:nth-child(odd)]:text-right [&>:nth-child(even)]:text-left">
          <NameGroup title="Best Man" names={[party.bestMan]} /><NameGroup title="Maid of Honor" names={[party.maidOfHonor]} />
          <NameGroup title="Groomsmen" names={party.groomsmen} /><NameGroup title="Bridesmaids" names={party.bridesmaids} />
          <NameGroup title="Ring Bearers" names={party.ringBearers} /><NameGroup title="Flower Girls" names={party.flowerGirls} />
        </div>
      </div>
    </section>
  );
}
