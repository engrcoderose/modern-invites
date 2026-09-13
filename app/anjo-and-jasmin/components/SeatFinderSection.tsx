import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import FloralAccent from "./FloralAccent";
import { wedding } from "../data";

export default function SeatFinderSection() {
  return (
    <section
      id="seat-finder"
      aria-labelledby="seat-finder-section-title"
      className="relative isolate overflow-hidden bg-[#fbf8f1] bg-[radial-gradient(ellipse_at_0%_100%,#e5eadd,transparent_60%),radial-gradient(ellipse_at_100%_0%,#f5e3e9,transparent_60%)] px-5 py-20 text-[#624451] sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="relative mx-auto max-w-4xl border border-[#d4c2b5]/70 bg-[#fffdf8]/65 px-6 py-16 shadow-[0_20px_60px_-40px_#62445140] sm:px-16 sm:py-20">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 border border-[#d4c2b5]/35 sm:inset-3"
        />
        <FloralAccent
          kind="corner"
          className="left-0 top-0 w-24 sm:w-40"
          sizes="(max-width: 640px) 96px, 160px"
        />
        <FloralAccent
          kind="corner"
          className="bottom-0 right-0 w-24 rotate-180 sm:w-40"
          sizes="(max-width: 640px) 96px, 160px"
        />
        <Reveal delay={0.1} className="relative text-center">
          <Heart
            aria-hidden="true"
            size={26}
            strokeWidth={1}
            className="mx-auto mb-6 text-[#b58c9e]"
          />
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className="h-px w-6 shrink-0 bg-[#cba4b6] sm:w-10"
            />
            <p className="text-[10px] uppercase tracking-[.28em] text-[#946879] sm:text-xs">
              Reception seat finder
            </p>
            <span
              aria-hidden="true"
              className="h-px w-6 shrink-0 bg-[#cba4b6] sm:w-10"
            />
          </div>
          <h2
            id="seat-finder-section-title"
            className="mt-6 font-instrumentSerif text-[clamp(2.7rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-.035em]"
          >
            Your place at 
            <span className="font-meaCulpa font-normal text-[#946879] pl-2">
               our celebration.
            </span>
          </h2>
          <p className="mx-auto mt-7 max-w-md text-sm leading-8 text-[#756770] sm:text-base">
            An evening of love, laughter, and familiar faces awaits. Visit our
            seat finder for reception seating details.
          </p>
          <Link
            href="/seat-finder/anjo-and-jasmin"
            className="group mt-8 inline-flex min-h-14 w-full items-center justify-center gap-5 rounded-full bg-[#946879] px-8 py-4 text-sm font-medium text-[#fffdf8] shadow-[0_10px_24px_-12px_#946879aa] transition-colors hover:bg-[#7e5666] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879] sm:w-auto"
          >
            Find my seat
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </Link>
          <p className="mx-auto mt-4 max-w-md text-xs leading-6 text-[#876675]">
            Table assignments will be shared once finalized.
          </p>
          <div className="mx-auto mt-9 max-w-md border-t border-[#d8b9c7]/60 pt-6">
            <p className="text-[10px] uppercase tracking-[.2em] text-[#946879]">
              The reception
            </p>
            <p className="mt-2 font-instrumentSerif text-2xl">
              {wedding.receptionFloor}, {wedding.reception}
            </p>
            <p className="mt-2 text-xs leading-6 text-[#756770]">
              {wedding.location}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
