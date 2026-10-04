import { BrownFlower2 as BrownFlowers, ReceptionDirections } from "../design-media";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, Church, Clock3, MapPin, Wine } from "lucide-react";
import { wedding } from "../data";
import { ChurchImage } from "../photo-media";
import { BridgeWalk } from "../prenup-media";
import Reveal from "./motion/Reveal";

export default function Location() {
  const venues = [
    {
      id: "ceremony", title: "The ceremony", name: wedding.ceremony,
      address: "Malabon, Philippines", time: wedding.time,
      query: "San+Bartolome+Parish+Malabon", icon: Church, image: ChurchImage,
      imageAlt: "Watercolor illustration of San Bartolome Parish, Malabon",
    },
    {
      id: "reception", title: "The reception", name: wedding.reception,
      address: `${wedding.receptionFloor}, ${wedding.location}`,
      time: "Reception follows the ceremony",
      query: "St+John+XXIII+Hall+San+Bartolome+Parish+Malabon", icon: Wine,
      image: ReceptionDirections,
      imageAlt: "Reception directions from San Bartolome Parish to St. John XXIII Hall, beside Rizal Avenue Extension in Malabon.",
    },
  ];
  return (
    <section id="location" aria-labelledby="location-title" className="relative isolate overflow-hidden bg-[#362912] px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image src={BridgeWalk} alt="" fill sizes="(max-width: 767px) 2400px, (max-width: 1023px) 1800px, 100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#362912]/40" />
      </div>

      <Reveal className="mx-auto mb-10 max-w-3xl text-center text-[rgb(var(--aj-ivory))] sm:mb-14">
        <Image src={BrownFlowers} alt="" sizes="(min-width: 640px) 192px, 160px" className="mx-auto mb-4 h-auto w-40 sm:w-48" />
        <h2 id="location-title" className="font-imperial text-[clamp(3.25rem,8vw,6rem)] leading-tight [text-shadow:0_2px_10px_#00000060]">The Wedding Venue</h2>
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-lg bg-[#362912]/60 px-5 py-3 sm:px-7">
          <CalendarDays aria-hidden="true" size={18} className="hidden shrink-0 sm:block" />
          <span className="text-[.65rem] uppercase tracking-[.2em]">Saturday</span>
          <time dateTime={wedding.countdownDate.slice(0, 10)} className="font-instrumentSerif text-2xl">{wedding.dateDisplay}</time>
        </div>
      </Reveal>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
        {venues.map((venue, index) => {
          const Icon = venue.icon;
          return (
            <Reveal key={venue.id} delay={index * 0.14} y={36} className="h-full">
              <article aria-labelledby={`${venue.id}-title`} className="aj-hover-card relative flex h-full flex-col rounded-lg bg-[rgb(var(--aj-paper))] px-6 pb-8 pt-8 text-center shadow-[0_20px_60px_-30px_#36291280] sm:px-8 sm:pb-10 sm:pt-10">
                <div className="relative flex flex-1 flex-col">
                  <span aria-hidden="true" className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-[rgb(var(--aj-sand))]/55 text-[#754f28]">
                    <Icon size={21} strokeWidth={1.25} />
                  </span>
                  <h3 id={`${venue.id}-title`} className="mb-6 font-imperial text-4xl leading-tight text-[#754f28] sm:text-5xl">{venue.title}</h3>
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-[rgb(var(--aj-cream))]">
                    <Image src={venue.image} alt={venue.imageAlt} fill sizes="(min-width: 1024px) 420px, (min-width: 768px) 40vw, 85vw" className={venue.id === "ceremony" ? "object-cover" : "object-contain"} />
                  </div>
                  <h4 className="font-instrumentSerif text-3xl leading-tight lg:text-4xl">{venue.name}</h4>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[rgb(var(--aj-muted))] md:min-h-12">{venue.address}</p>
                  <p className="mt-4 flex min-h-11 items-center justify-center gap-2 py-3 text-sm text-[#754f28]">
                    <Clock3 aria-hidden="true" size={15} className="shrink-0" />
                    {venue.time}
                  </p>
                  <div className="mt-auto pt-6">
                    <a href={`https://www.google.com/maps/search/?api=1&query=${venue.query}`} target="_blank" rel="noreferrer" aria-label={`View ${venue.name} on map (opens in a new tab)`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#754f28] px-6 py-3 text-sm text-[rgb(var(--aj-ivory))] transition hover:bg-[#573b22] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#754f28]">
                      <MapPin aria-hidden="true" size={15} /> View on map <ArrowUpRight aria-hidden="true" size={15} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
