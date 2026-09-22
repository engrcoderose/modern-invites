import Link from "next/link";
import { ArrowRight, Armchair } from "lucide-react";

export default function SeatFinderSection() {
  return (
    <section
      id="seat-finder"
      aria-labelledby="seat-finder-title"
      className="scroll-mt-20 bg-[#eae4cc]/40 px-4 py-20 md:px-8 md:py-24"
    >
      <div className="relative mx-auto max-w-4xl rounded-2xl border border-[#c79d5f]/50 bg-[#fffaf2] px-6 py-14 text-center text-[#4e2a0d] shadow-sm sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-xl border border-[#c79d5f]/25"
        />
        <Armchair
          aria-hidden="true"
          strokeWidth={1.25}
          className="mx-auto mb-5 h-9 w-9 text-[#96703d]"
        />
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#96703d]">
          A place for you
        </p>
        <h2
          id="seat-finder-title"
          className="mt-5 font-meaCulpa text-5xl md:text-7xl"
        >
          Find Your Seat
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#4e2a0d]/80 sm:text-base">
          Let&apos;s make room for love, laughter, and a wonderful evening
          together. Search your name to find your table and seat on the
          reception map.
        </p>
        <Link
          href="/seat-finder/eric-and-li"
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#4e2a0d] px-8 py-4 text-sm font-medium text-[#fffaf2] transition-colors hover:bg-[#6b4020] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4e2a0d] sm:w-auto"
        >
          Find my seat
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
        <p className="mx-auto mt-5 max-w-md text-xs leading-6 text-[#4e2a0d]/70">
          Explore the sample seating plan with the example guest names provided.
        </p>
      </div>
    </section>
  );
}
