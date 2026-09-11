import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { entouragePreparation, type EntouragePreparation } from "../data";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";

export default function EntourageDirections() {
  const preparations: EntouragePreparation[] = entouragePreparation.length
    ? entouragePreparation
    : [{ group: "For our entourage" }];

  return (
    <Reveal className="mb-10">
      <section
        id="entourage-directions"
        aria-labelledby="entourage-directions-title"
        className="overflow-hidden rounded-xl border border-[#c7d1ba] bg-[#fffdf8] shadow-[0_12px_40px_-25px_#62445140]"
      >
        <header className="border-b border-[#c7d1ba] bg-[#edf0e5] px-6 py-8 text-center sm:px-9">
          <p className="text-[10px] uppercase tracking-[.25em] text-[#946879]">
            Before the celebration
          </p>
          <h3
            id="entourage-directions-title"
            className="mt-3 font-instrumentSerif text-3xl text-[#624451] sm:text-4xl"
          >
            Entourage preparation &amp; directions
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#756770]">
            A little guide for our wedding party: where to get ready, when to
            arrive, and special reminders for the day.
          </p>
        </header>
        <div className="divide-y divide-[#ead7df]">
          {preparations.map((preparation, index) => {
            const mapHref =
              preparation.mapUrl ||
              (preparation.address
                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([preparation.venue, preparation.address].filter(Boolean).join(", "))}`
                : undefined);

            return (
              <article
                key={`${preparation.group}-${index}`}
                className="px-6 py-7 sm:p-9"
              >
                <h4 className="font-instrumentSerif text-2xl text-[#624451] sm:text-3xl">
                  {preparation.group}
                </h4>
                <dl className="mt-6 grid gap-6 sm:grid-cols-[1.3fr_1fr]">
                  <div>
                    <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[.12em] text-[#946879]">
                      <MapPin size={16} aria-hidden="true" />
                      Preparation venue
                    </dt>
                    <dd className="mt-3 text-sm leading-7 text-[#756770]">
                      {preparation.venue && (
                        <span className="block font-medium text-[#624451]">
                          {preparation.venue}
                        </span>
                      )}
                      <span className="block">
                        {preparation.address ||
                          "Venue and address to be confirmed."}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[.12em] text-[#946879]">
                      <Clock3 size={16} aria-hidden="true" />
                      Arrival time
                    </dt>
                    <dd className="mt-3 text-sm leading-7 text-[#756770]">
                      {preparation.arrivalTime ||
                        "Preparation schedule to follow."}
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 rounded-xl bg-[#edf0e5]/70 px-5 py-4">
                  <h5 className="text-sm font-medium text-[#624451]">
                    Special instructions
                  </h5>
                  {preparation.instructions?.length ? (
                    <ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-7 text-[#756770]">
                      {preparation.instructions.map(
                        (instruction, instructionIndex) => (
                          <li key={instructionIndex}>{instruction}</li>
                        ),
                      )}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm leading-7 text-[#756770]">
                      Preparation reminders will be shared here once confirmed.
                    </p>
                  )}
                </div>
                {mapHref && (
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#946879] px-6 py-3 text-sm text-white transition-colors hover:bg-[#7e5666] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879]"
                  >
                    Directions to preparation venue
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </Reveal>
  );
}
