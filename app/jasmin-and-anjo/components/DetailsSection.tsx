import Image from "next/image";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import type { TimelineEvent, VenueDetails } from "../types";
import Reveal from "./motion/Reveal";
import SectionLabel from "./SectionLabel";
import WeddingTimeline from "./WeddingTimeline";

interface DetailsSectionProps {
  dateDisplay: string;
  venue: VenueDetails;
  reception: VenueDetails;
  program: TimelineEvent[];
}

function VenueMedia({ venue, index }: { venue: VenueDetails; index: number }) {
  // Return before accessing image-only fields on a map venue.
  if (venue.mediaType === "map") {
    return (
      <iframe
        src={venue.mapEmbedUrl}
        title={`Google Maps location of ${venue.name}, ${venue.address}`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }

  return (
    <>
      <Image
        src={venue.image}
        alt={venue.imageAlt ?? "Placeholder photograph; venue photo to follow"}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
      />
      <div
        className={`pointer-events-none absolute inset-0 ${index === 0 ? "bg-gradient-to-t from-[#fce9ef]/35 via-transparent to-[#fff8ef]/10" : "bg-gradient-to-t from-[#e7eff9]/45 via-[#eeeaf6]/15 to-[#fff8ef]/15"}`}
      />
      <span
        className={`absolute bottom-5 left-5 rounded-full border px-4 py-2.5 text-[0.58rem] uppercase tracking-[0.25em] text-[#624451] backdrop-blur-sm sm:bottom-7 sm:left-7 ${index === 0 ? "border-[#ead7e1] bg-[#fff0f5]/95" : "border-[#d5dfed] bg-[#edf3fd]/95"}`}
      >
        {venue.eyebrow}
      </span>
    </>
  );
}

export default function DetailsSection({
  dateDisplay,
  venue,
  reception,
  program,
}: DetailsSectionProps) {
  const locations = [venue, reception];

  return (
    <section
      id="details"
      className="relative isolate overflow-hidden bg-[#fff1f5] bg-gradient-to-br from-[#fff1f5] via-[#fbf0eb] to-[#faf4d9] px-5 py-24 text-[#624451] sm:px-8 sm:py-32 lg:px-12 lg:py-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/jasmin-and-anjo/floral-pattern.svg')] bg-[length:300px_350px] bg-repeat opacity-60 sm:bg-[length:360px_420px]"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-9 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <SectionLabel className="text-[#946879]">
                When &amp; where
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-instrumentSerif text-[clamp(3.5rem,7vw,7rem)] leading-[0.88] tracking-[-0.05em]">
                The details
                <br />
                of our day.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14} className="lg:text-right">
            <p className="font-instrumentSerif text-3xl text-[#946879] sm:text-4xl">
              Saturday · {dateDisplay}
            </p>
            <p className="mt-3 text-[0.62rem] uppercase tracking-[0.3em] text-[#756770]">
              Malabon, Philippines
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2">
          {locations.map((location, index) => (
            <Reveal
              key={location.name}
              delay={index * 0.1}
              className={`group overflow-hidden rounded-3xl border shadow-[0_12px_40px_#62445108] ${index === 0 ? "border-[#e8ccd7] bg-gradient-to-br from-[#fce9ef] to-[#f9f0e6]" : "border-[#cfdde7] bg-gradient-to-br from-[#e7eff9] to-[#eeeaf6]"}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <VenueMedia venue={location} index={index} />
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                {location.mediaType === "map" && (
                  <p className="mb-4 text-[0.58rem] uppercase tracking-[0.25em] text-[#946879]">
                    {location.eyebrow}
                  </p>
                )}
                <h3 className="font-instrumentSerif text-4xl tracking-[-0.035em] sm:text-5xl">
                  {location.name}
                </h3>
                <div className="mt-7 space-y-3 text-sm text-[#756770]">
                  <p className="flex items-center gap-3">
                    <Clock3
                      size={15}
                      strokeWidth={1.4}
                      className="text-[#946879]"
                    />
                    {location.time}
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPin
                      size={15}
                      strokeWidth={1.4}
                      className="shrink-0 text-[#946879]"
                    />
                    {location.address}
                  </p>
                </div>
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 border-b border-[#cba4b6] pb-2 text-[0.62rem] uppercase tracking-[0.25em] text-[#946879] transition-all hover:gap-4 hover:border-[#946879]"
                >
                  View on map <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <WeddingTimeline program={program} />
      </div>
    </section>
  );
}
