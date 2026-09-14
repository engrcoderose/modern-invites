import Link from "next/link";
import { Armchair, ArrowUpRight, Check, MapPin, Search } from "lucide-react";

export default function SeatFinderSection() {
  return (
    <section
      id="seat-finder"
      aria-labelledby="seat-finder-title"
      className="scroll-mt-28 bg-sage-50/60 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-sage-600">
            A warm welcome, down to the last detail
          </p>
          <h2
            id="seat-finder-title"
            className="mb-5 font-elegant text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            Seat Finder
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Help guests find their place in the celebration. A personalized seat
            finder brings name search, table details, and a reception map
            together in one simple experience.
          </p>
        </div>

        <article className="grid overflow-hidden rounded-3xl border border-sage-100 bg-white shadow-xl lg:grid-cols-2">
          <div className="flex items-center justify-center bg-[#e8eee7] p-6 py-12 sm:p-12">
            <figure className="w-full max-w-sm rounded-2xl border border-white/80 bg-[#fffdf8] p-6 shadow-lg sm:p-8">
              <figcaption className="mb-6 text-center">
                <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sage-600">
                  Sample experience
                </p>
                <p className="font-elegant text-4xl text-sage-900">
                  Eric &amp; Li
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  A place just for you.
                </p>
              </figcaption>
              <div className="flex items-center gap-3 rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm text-gray-700">
                <Search
                  className="h-4 w-4 shrink-0 text-sage-600"
                  aria-hidden="true"
                />
                <span>Sofia Reyes</span>
                <Check
                  className="ml-auto h-4 w-4 shrink-0 text-sage-600"
                  aria-hidden="true"
                />
              </div>
              <div className="my-5 grid grid-cols-2 divide-x divide-sage-200 rounded-xl bg-sage-50 py-5 text-center">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-sage-600">
                    Table
                  </p>
                  <p className="my-1 font-elegant text-4xl text-sage-900">03</p>
                  <p className="text-xs text-gray-600">Orchid</p>
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-sage-600">
                    Seat
                  </p>
                  <p className="my-1 font-elegant text-4xl text-sage-900">01</p>
                  <p className="text-xs text-gray-600">Reserved for you</p>
                </div>
              </div>
              <div
                role="img"
                aria-label="Sample reception map with table 3 highlighted, middle left beside the dance floor."
                className="relative grid grid-cols-2 gap-x-20 gap-y-4 rounded-xl border border-dashed border-sage-200 px-5 py-6"
              >
                {[1, 2, 3, 4, 5, 6].map((number) => (
                  <span
                    key={number}
                    aria-hidden="true"
                    className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold ${
                      number === 3
                        ? "bg-sage-700 text-white ring-4 ring-sage-100"
                        : "border border-sage-200 bg-white text-sage-700"
                    }`}
                  >
                    {String(number).padStart(2, "0")}
                  </span>
                ))}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[0.55rem] uppercase tracking-wider text-gray-500"
                >
                  Dance
                  <br />
                  floor
                </span>
              </div>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-600">
                <MapPin
                  className="h-3.5 w-3.5 shrink-0 text-sage-600"
                  aria-hidden="true"
                />
                Middle left, beside the dance floor
              </p>
            </figure>
          </div>

          <div className="flex flex-col justify-center px-8 py-12 sm:px-12">
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sage-600">
              <Armchair className="h-4 w-4" aria-hidden="true" />
              Wedding seat finder
            </p>
            <h3 className="mb-5 font-elegant text-4xl font-bold text-gray-900 sm:text-5xl">
              Eric &amp; Li
            </h3>
            <p className="mb-7 text-base leading-relaxed text-gray-700">
              A sage and ivory reception companion for Eric and Li’s wedding.
              Guests search for their name, see their assigned table and seat,
              and find their table highlighted on the reception map.
            </p>
            <ul className="mb-8 flex flex-wrap gap-2">
              {[
                "Guest name search",
                "Table & seat details",
                "Reception map",
              ].map((feature) => (
                <li
                  key={feature}
                  className="rounded-full border border-sage-200 bg-sage-50 px-3 py-1 text-xs font-medium text-sage-800"
                >
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mb-8 text-sm leading-relaxed text-gray-500">
              Try the sample with Sofia Reyes, Emma Chen, or Olivia Bennett. All
              guests and seating assignments in this demo are fictional.
            </p>
            <Link
              href="/seat-finder/eric-and-li"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Try Eric & Li’s seat finder (opens in a new tab)"
              className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-sage-700 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-sage-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-4"
            >
              Try Seat Finder
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
