import Link from "@/components/landing/MotionLink";
import { Armchair, ArrowUpRight, Check, Search } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

export default function SeatFinderSection() {
  return (
    <section
      id="seat-finder"
      aria-labelledby="seat-finder-title"
      className="scroll-mt-24 bg-marketing-paper px-5 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <article className="grid gap-8 overflow-hidden rounded-2xl bg-white p-5 sm:grid-cols-[0.9fr_1.1fr] sm:gap-12 sm:p-8 lg:p-12">
          <div className="flex items-center justify-center rounded-xl bg-brand-100 p-5 sm:p-6">
            <ScrollReveal direction="scale" className="w-full max-w-xs">
              <figure className="rounded-xl border border-white/80 studio-wash p-5 shadow-sm">
                <figcaption className="mb-4 flex items-center justify-between gap-3">
                  <p className="font-elegant text-2xl text-brand-950">Eric &amp; Li</p>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-700">Seat finder</span>
                </figcaption>
                <div className="flex items-center gap-2 rounded-lg border border-brand-200 studio-wash px-3 py-2.5 text-xs text-marketing-muted">
                  <Search className="h-3.5 w-3.5 text-brand-700" aria-hidden="true" />
                  <span>Sofia Reyes</span>
                  <Check className="ml-auto h-3.5 w-3.5 text-brand-700" aria-hidden="true" />
                </div>
                <div className="my-3 grid grid-cols-2 divide-x divide-brand-200 rounded-lg bg-brand-50 py-3 text-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-700">Table</p>
                    <p className="mt-1 font-elegant text-2xl text-brand-950">03 <span className="font-sans text-[10px] text-marketing-muted">Orchid</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-700">Seat</p>
                    <p className="mt-1 font-elegant text-2xl text-brand-950">01</p>
                  </div>
                </div>
                <div
                  role="img"
                  aria-label="Sample reception map with table 3 highlighted, middle left beside the dance floor."
                  className="relative grid grid-cols-2 gap-x-20 gap-y-2 rounded-lg border border-dashed border-brand-200 p-3"
                >
                  {[1, 2, 3, 4, 5, 6].map((number) => (
                    <span
                      key={number}
                      aria-hidden="true"
                      className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${number === 3 ? "bg-brand-700 text-white ring-2 ring-brand-100" : "border border-brand-200 bg-white text-brand-700"}`}
                    >
                      {String(number).padStart(2, "0")}
                    </span>
                  ))}
                  <span aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[8px] uppercase tracking-wider text-marketing-muted">
                    Dance<br />floor
                  </span>
                </div>
              </figure>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="fade" delay={0.1} className="flex flex-col justify-center p-6 lg:px-8">
            <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700">
              <Armchair className="h-3.5 w-3.5" aria-hidden="true" />
              Beyond the invitation
            </p>
            <h2 id="seat-finder-title" className="section-title text-marketing-ink">
              A place for every guest.
            </h2>
            <p className="mt-3 text-sm leading-6 text-marketing-muted">
              Try Eric &amp; Li’s seat finder: search a name, see the assigned
              seat, and find the table on the reception map.
            </p>
            <p className="mt-3 text-xs leading-5 text-marketing-muted">
              Search for Sofia Reyes, Emma Chen, or Olivia Bennett.
              This sample uses fictional guests.
            </p>
            <Link
              href="/seat-finder/eric-and-li"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Try Eric & Li’s seat finder (opens in a new tab)"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-4"
            >
              Try seat finder
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </article>
      </div>
    </section>
  );
}
