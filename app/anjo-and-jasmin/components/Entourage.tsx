import { wedding } from "../data";
import Reveal from "./motion/Reveal";

const centeredRoles = new Set(["Principal sponsors", "Veil", "Ring bearer", "Flower girls"]);

export default function Entourage() {
  return (
    <section id="entourage" aria-labelledby="entourage-title" className="relative scroll-mt-20 bg-[rgb(var(--aj-cream))] px-3 py-16 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-9 text-center sm:mb-14">
          <h2 id="entourage-title" className="font-imperial text-[clamp(3.25rem,10vw,6rem)] leading-tight text-[rgb(var(--aj-accent-dark))]">Wedding Entourage</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6 sm:gap-y-8">
          {wedding.entourage.map(group => {
            const sponsors = group.role === "Principal sponsors";
            return (
              <Reveal key={group.role} className={`min-w-0 text-center ${centeredRoles.has(group.role) ? "col-span-2" : ""}`}>
                <h3 className="mb-2 font-instrumentSerif text-[clamp(.95rem,3.75vw,1.5rem)] font-bold uppercase leading-tight">{group.role}</h3>
                <ul className={`font-instrumentSerif text-[clamp(.8rem,3.2vw,1.25rem)] uppercase leading-[1.35] ${sponsors ? "grid grid-cols-2 gap-x-3 sm:gap-x-6" : ""}`}>
                  {group.names.map((name, index) => (
                    <li key={name} className={sponsors
                      ? index >= 10 ? "col-span-2" : index % 2 === 0 ? "text-right" : "text-left"
                      : undefined}>{name}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
