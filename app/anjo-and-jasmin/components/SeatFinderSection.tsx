import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import Reveal from "./motion/Reveal";
import FloralAccent from "./FloralAccent";
import { wedding } from "../data";

export default function SeatFinderSection() {
  return (
    <section
      id="seat-finder"
      aria-labelledby="seat-finder-section-title"
      className="relative isolate overflow-hidden bg-[rgb(var(--aj-cream))] bg-[radial-gradient(ellipse_at_0%_100%,#e1e0d2,transparent_60%),radial-gradient(ellipse_at_100%_0%,#e6d4c8,transparent_60%)] px-5 py-20 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="relative mx-auto max-w-4xl border border-[#d4c2b5]/70 bg-[rgb(var(--aj-paper))]/65 px-6 py-16 shadow-[0_20px_60px_-40px_#51423740] sm:px-16 sm:py-20">
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
            className="mx-auto mb-6 text-[#ad8971]"
          />
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className="h-px w-6 shrink-0 bg-[rgb(var(--aj-line))] sm:w-10"
            />
            <p className="text-[10px] uppercase tracking-[.28em] text-[rgb(var(--aj-accent-dark))] sm:text-xs">
              Reception seat finder
            </p>
            <span
              aria-hidden="true"
              className="h-px w-6 shrink-0 bg-[rgb(var(--aj-line))] sm:w-10"
            />
          </div>
          <h2
            id="seat-finder-section-title"
            className="mt-6 font-instrumentSerif text-[clamp(2.7rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-.035em]"
          >
            Your place at 
            <span className="font-meaCulpa font-normal text-[rgb(var(--aj-accent-dark))] pl-2">
               our celebration.
            </span>
          </h2>
          <Link
            href="/seat-finder/anjo-and-jasmin"
            className="group mt-8 inline-flex min-h-14 w-full items-center justify-center gap-5 rounded-full bg-[rgb(var(--aj-accent))] px-8 py-4 text-sm font-medium text-[rgb(var(--aj-cream))] shadow-[0_10px_24px_-12px_#886456aa] transition-colors hover:bg-[rgb(var(--aj-accent-dark))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent))] sm:w-auto"
          >
            Find my seat
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </Link>
          <p className="mx-auto mt-4 max-w-md text-xs leading-6 text-[rgb(var(--aj-muted))]">
            Table assignments will be shared once finalized.
          </p>
          <div className="mx-auto mt-9 max-w-md border-t border-[#d3b6a1]/60 pt-6">
            <p className="text-[10px] uppercase tracking-[.2em] text-[rgb(var(--aj-accent-dark))]">
              The reception
            </p>
            <p className="mt-2 font-instrumentSerif text-2xl">
              {wedding.receptionFloor}, {wedding.reception}
            </p>
            <p className="mt-2 text-xs leading-6 text-[rgb(var(--aj-muted))]">
              {wedding.location}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
