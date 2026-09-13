import type { Metadata } from "next";
import { Armchair } from "lucide-react";

export const metadata: Metadata = {
  title: "Find Your Seat | Anjo & Jasmin",
  description: "Reception seating for Anjo and Jasmin's wedding.",
  alternates: {
    canonical: "https://seatfinder.anjoandjasminwedding.moderninvites.com",
  },
  robots: { index: false, follow: false },
};

export default function AnjoAndJasminSeatFinderPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#faf8f3] px-5 py-16 text-[#34453a]">
      <section aria-labelledby="seat-finder-title" className="w-full max-w-lg rounded-t-[10rem] rounded-b-3xl border border-[#d6deaf] bg-white/80 px-6 pb-10 pt-16 text-center shadow-sm sm:px-10">
        <p className="text-xs uppercase tracking-[0.25em]">November 21, 2026</p>
        <h1 id="seat-finder-title" className="mt-5 font-elegant text-5xl sm:text-6xl">
          Anjo &amp; Jasmin
        </h1>
        <div className="mx-auto mt-8 flex size-14 items-center justify-center rounded-full bg-[#edf0e3]">
          <Armchair aria-hidden="true" className="size-6" />
        </div>
        <h2 className="mt-5 font-elegant text-3xl">Find your seat</h2>
        <p className="mt-4 text-sm leading-7">
          Seating details will be available here once arrangements are finalized.
          Please check back closer to our wedding day.
        </p>
        <p className="mt-6 border-t border-[#d6deaf] pt-6 text-sm leading-6">
          Reception at 2/F, St. John XXIII Hall<br />
          San Bartolome Parish, Malabon
        </p>
        <a
          href="https://www.moderninvites.com/anjo-and-jasmin"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-[#34453a]/30 px-6 py-2 text-sm transition-colors hover:bg-[#edf0e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34453a]"
        >
          View our invitation
        </a>
      </section>
    </main>
  );
}
