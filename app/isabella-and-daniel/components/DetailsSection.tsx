import Image from "next/image";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import type { TimelineEvent, VenueDetails } from "../types";
import Reveal from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

interface DetailsSectionProps {
  dateDisplay: string;
  venue: VenueDetails;
  reception: VenueDetails;
  program: TimelineEvent[];
}

export default function DetailsSection({ dateDisplay, venue, reception, program }: DetailsSectionProps) {
  const locations = [venue, reception];

  return (
    <section id="details" className="bg-[#f6f0e7] px-5 py-24 text-[#32151b] sm:px-8 sm:py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-9 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal><SectionLabel>When &amp; where</SectionLabel></Reveal>
            <Reveal delay={0.08}><h2 className="mt-8 font-instrumentSerif text-[clamp(3.5rem,7vw,7rem)] leading-[0.88] tracking-[-0.05em]">The details<br />of our day.</h2></Reveal>
          </div>
          <Reveal delay={0.14} className="lg:text-right">
            <p className="font-instrumentSerif text-3xl text-[#7a2138] sm:text-4xl">Sunday · {dateDisplay}</p>
            <p className="mt-3 text-[0.62rem] uppercase tracking-[0.3em] text-[#765b5f]">Antipolo City, Rizal</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden bg-[#7a2138]/15 lg:mt-24 lg:grid-cols-2">
          {locations.map((location, index) => (
            <Reveal key={location.name} delay={index * 0.1} className="group bg-[#f6f0e7]">
              <div className="relative aspect-[5/3] overflow-hidden">
                <Image src={location.image} alt={location.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#280710]/65 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 text-[0.58rem] uppercase tracking-[0.32em] text-[#f6eadc]/80 sm:bottom-7 sm:left-7">{location.eyebrow}</span>
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <h3 className="font-instrumentSerif text-4xl tracking-[-0.035em] sm:text-5xl">{location.name}</h3>
                <div className="mt-7 space-y-3 text-sm text-[#71575b]">
                  <p className="flex items-center gap-3"><Clock3 size={15} strokeWidth={1.4} className="text-[#7a2138]" />{location.time}</p>
                  <p className="flex items-center gap-3"><MapPin size={15} strokeWidth={1.4} className="shrink-0 text-[#7a2138]" />{location.address}</p>
                </div>
                <a href={location.mapUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-[#7a2138]/35 pb-2 text-[0.62rem] uppercase tracking-[0.25em] text-[#7a2138] transition-all hover:gap-4 hover:border-[#7a2138]">
                  View on map <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24 border-y border-[#7a2138]/15 py-12 sm:mt-32 sm:py-16">
          <div className="mb-10 flex items-center justify-between"><SectionLabel>The order of events</SectionLabel><span className="hidden text-[0.6rem] uppercase tracking-[0.25em] text-[#765b5f] sm:block">Please arrive by 2:30 PM</span></div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {program.map((event, index) => (
              <div key={event.time} className="relative border-l border-[#7a2138]/20 pl-5 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-6">
                <span className="absolute -left-[3px] top-1 h-1.5 w-1.5 rotate-45 bg-[#7a2138] lg:-top-[3px] lg:left-0" />
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-[#9c6f68]">{event.time}</p>
                <h3 className="mt-3 font-instrumentSerif text-2xl">{event.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#80686b]">{event.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
