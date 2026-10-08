import ElegantDivider from "../components/ElegantDivider";
import SectionHeading from "../components/SectionHeading";
import { entourage } from "../data/entourage";
import styles from "../styles/wedding.module.css";

type EntourageGroup = { role: string; names: string[] };

function pairGroups(groups: EntourageGroup[]) {
  const populated = groups.filter((group) => group.names.length > 0);
  return populated.reduce<EntourageGroup[][]>((rows, group, index) => {
    if (index % 2 === 0) rows.push([group]);
    else rows[rows.length - 1].push(group);
    return rows;
  }, []);
}

const rows = [
  [
    { role: "Parents of the groom", names: entourage.groomParents },
    { role: "Parents of the bride", names: entourage.brideParents },
  ],
  [{ role: "Principal sponsors", names: entourage.principalSponsors }],
  [
    { role: "Best man", names: entourage.bestMan.names },
    { role: "Maid of honor", names: entourage.maidOfHonor },
  ],
  ...pairGroups(entourage.secondarySponsors),
  [
    { role: "Groomsmen", names: entourage.groomsmen },
    { role: "Bridesmaids", names: entourage.bridesmaids },
  ],
  [{ role: "Flowers", names: entourage.flowers }],
  ...pairGroups(entourage.bearers),
].map((row) => row.filter((group) => group.names.length > 0)).filter((row) => row.length > 0);

export default function EntourageSection() {
  return (
    <section id="entourage" aria-label="Wedding entourage" className={`${styles.paper} px-6 py-24 sm:px-10 md:py-32 lg:px-16`}>
      <div className="mx-auto max-w-3xl">
        <SectionHeading centered eyebrow="With love, by our side" title="The entourage" />
        <div className="mt-10 space-y-9 sm:mt-12 sm:space-y-11">
          <ElegantDivider />
          {rows.map((row, index) => (
            <div data-reveal key={row.map((group) => group.role).join("-")} className="space-y-9 sm:space-y-11">
              <div className={`mx-auto grid max-w-2xl gap-x-6 gap-y-8 text-center sm:gap-x-12 ${row.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                {row.map((group) => (
                  <div key={group.role} className="min-w-0">
                    <h3 className="mb-4 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.12em] sm:text-xs">{group.role}</h3>
                    <ul className={`${styles.serif} text-sm leading-relaxed sm:text-base ${group.role === "Principal sponsors" ? "grid grid-cols-2 gap-x-6 gap-y-2" : "space-y-2"}`}>
                      {group.names.map((name) => <li key={name}>{name}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              {index < rows.length - 1 && <ElegantDivider />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
