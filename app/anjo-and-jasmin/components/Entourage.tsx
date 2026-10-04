import { FlowerPattern, BrownFlower2 as BrownFlowers } from "../design-media";
import Image from "next/image";
import { wedding } from "../data";
import Reveal from "./motion/Reveal";

const centeredRoles = new Set([
  "Principal sponsors",
  "Veil",
  "Ring bearer",
  "Flower girls",
]);

const leftColumnRoles = new Set([
  "Parents of the groom",
  "Maid of honor",
  "Bridesmaids",
  "Candle",
  "Bible bearer",
]);

export default function Entourage() {
  return (
    <section
      id="entourage"
      aria-labelledby="entourage-title"
      className="aj-entourage relative isolate min-h-svh scroll-mt-20 overflow-hidden px-5 py-20 text-[rgb(var(--aj-ivory))] sm:px-8 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="aj-entourage-pattern pointer-events-none absolute inset-0"
        style={{ backgroundImage: `url(${FlowerPattern.src})` }}
      />
      <div className="relative mx-auto max-w-4xl">
        <Reveal className="mb-12 text-center sm:mb-16">
          <Image
            src={BrownFlowers}
            alt=""
            sizes="(min-width: 640px) 240px, 192px"
            className="mx-auto mb-5 h-auto w-48 sm:w-60"
          />
          <h2
            id="entourage-title"
            className="font-imperial text-[clamp(3.25rem,10vw,6rem)] leading-tight"
          >
            Wedding Entourage
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-6 flex items-center justify-center gap-4"
          >
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[rgb(var(--aj-ivory))]/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[rgb(var(--aj-ivory))]/70" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[rgb(var(--aj-ivory))]/40" />
          </div>
        </Reveal>
        <div className="grid grid-cols-2 items-start gap-x-5 gap-y-10 sm:gap-x-16 sm:gap-y-14">
          {wedding.entourage.map((group, index) => {
            const sponsors = group.role === "Principal sponsors";
            return (
              <Reveal
                key={group.role}
                x={
                  centeredRoles.has(group.role)
                    ? 0
                    : leftColumnRoles.has(group.role)
                      ? -18
                      : 18
                }
                y={20}
                delay={(index % 2) * 0.12}
                className={`min-w-0 ${centeredRoles.has(group.role) ? "col-span-2 text-center" : leftColumnRoles.has(group.role) ? "text-right" : "text-left"} ${sponsors ? "aj-entourage-sponsors relative py-8 sm:py-10" : ""}`}
              >
                <h3 className="mb-4 text-balance font-sans text-[10px] uppercase leading-5 tracking-[.14em] sm:text-xs sm:tracking-[.18em]">
                  {group.role}
                </h3>
                <ul
                  className={`font-instrumentSerif leading-[1.6] ${sponsors ? "mx-auto grid max-w-2xl grid-cols-2 gap-x-4 gap-y-1.5 text-base sm:gap-x-10 sm:text-xl" : "space-y-1 text-lg sm:text-2xl"}`}
                >
                  {group.names.map((name, index) => (
                    <li
                      key={name}
                      className={
                        sponsors
                          ? index >= 10
                            ? "col-span-2"
                            : index % 2 === 0
                              ? "text-right"
                              : "text-left"
                          : undefined
                      }
                    >
                      {name}
                    </li>
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
