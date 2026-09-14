import Link from "next/link";
import { Armchair, ArrowUpRight, Check, Search } from "lucide-react";

export default function SeatFinderSection() {
  return (
    <section
      id="seat-finder"
      aria-labelledby="seat-finder-title"
      className="scroll-mt-24 bg-sage-50/60 px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <article className="grid overflow-hidden rounded-2xl border border-sage-100 bg-white sm:grid-cols-[0.9fr_1.1fr]">
          <div className="flex items-center justify-center bg-[#e8eee7] p-5 sm:p-6">
            <figure className="w-full max-w-xs rounded-xl border border-white/80 bg-[#fffdf8] p-5 shadow-sm">
              <figcaption className="mb-4 flex items-center justify-between gap-3">
                <p className="font-elegant text-2xl text-sage-900">Eric &amp; Li</p>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-sage-600">Seat finder</span>
              </figcaption>
              <div className="flex items-center gap-2 rounded-lg border border-sage-200 bg-white px-3 py-2.5 text-xs text-gray-700">
                <Search className="h-3.5 w-3.5 text-sage-600" aria-hidden="true" />
                <span>Sofia Reyes</span>
                <Check className="ml-auto h-3.5 w-3.5 text-sage-600" aria-hidden="true" />
              </div>
              <div className="my-3 grid grid-cols-2 divide-x divide-sage-200 rounded-lg bg-sage-50 py-3 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-sage-600">Table</p>
                  <p className="mt-1 font-elegant text-2xl text-sage-900">03 <span className="font-sans text-[10px] text-gray-600">Orchid</span></p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-sage-600">Seat</p>
                  <p className="mt-1 font-elegant text-2xl text-sage-900">01</p>
                </div>
              </div>
              <div
                role="img"
                aria-label="Sample reception map with table 3 highlighted, middle left beside the dance floor."
                className="relative grid grid-cols-2 gap-x-20 gap-y-2 rounded-lg border border-dashed border-sage-200 p-3"
              >
                {[1, 2, 3, 4, 5, 6].map((number) => (
                  <span
                    key={number}
                    aria-hidden="true"
                    className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${number === 3 ? "bg-sage-700 text-white ring-2 ring-sage-100" : "border border-sage-200 bg-white text-sage-700"}`}
                  >
                    {String(number).padStart(2, "0")}
                  </span>
                ))}
                <span aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[8px] uppercase tracking-wider text-gray-500">
                  Dance<br />floor
                </span>
              </div>
            </figure>
          </div>

          <div className="flex flex-col justify-center p-6 lg:px-8">
            <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-600">
              <Armchair className="h-3.5 w-3.5" aria-hidden="true" />
              Beyond the invitation
            </p>
            <h2 id="seat-finder-title" className="font-elegant text-3xl font-bold text-gray-900">
              A place for every guest.
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Try Eric &amp; Li’s seat finder: search a name, see the assigned
              seat, and find the table on the reception map.
            </p>
            <p className="mt-3 text-xs leading-5 text-gray-500">
              Search for Sofia Reyes, Emma Chen, or Olivia Bennett.
              This sample uses fictional guests.
            </p>
            <Link
              href="/seat-finder/eric-and-li"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Try Eric & Li’s seat finder (opens in a new tab)"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full bg-sage-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sage-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-4"
            >
              Try seat finder
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
