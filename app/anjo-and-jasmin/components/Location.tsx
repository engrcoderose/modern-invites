import Image from "next/image";
import FloralAccent from "./FloralAccent";
import { MapPin } from "lucide-react";
import { wedding } from "../data";
import { ChurchImage } from "../photo-media";
import { Walking } from "../prenup-media";
import Reveal from "./motion/Reveal";
import ReceptionDirections from "../assets/images/reception-directions.png";

export default function Location() {
  const venues = [
    { eyebrow: "The ceremony", name: wedding.ceremony, address: "Malabon, Philippines", time: wedding.time, query: "San+Bartolome+Parish+Malabon" },
    { eyebrow: "The reception", name: wedding.reception, address: `${wedding.receptionFloor}, ${wedding.location}`, time: "Reception follows the ceremony", query: "St+John+XXIII+Hall+San+Bartolome+Parish+Malabon" },
  ];
  return <section id="location" className="relative isolate overflow-hidden px-5 pb-20 pt-32 sm:px-8">
    <Image src={Walking} alt="" aria-hidden="true" fill sizes="100vw" className="-z-20 object-cover object-center" />
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgb(var(--aj-ink))]/85 via-[rgb(var(--aj-ink))]/80 to-[rgb(var(--aj-cream))]" />
    <Reveal className="mb-12 text-center text-[rgb(var(--aj-cream))] [text-shadow:0_2px_8px_#00000040]"><p className="text-xs uppercase tracking-[.25em]">When &amp; where</p><h2 className="mt-5 font-imperial text-6xl sm:text-8xl">The details of our day.</h2><p className="mt-5 text-base">Saturday · {wedding.dateDisplay}</p><p className="mt-3 text-xs uppercase tracking-[.2em]">Malabon, Philippines</p></Reveal>
    <Reveal className="relative mx-auto max-w-4xl rounded-t-[3rem] rounded-b-lg border-4 border-double border-[#d0bdaa] bg-[rgb(var(--aj-paper))] p-6 shadow-2xl sm:p-10 lg:p-14"><FloralAccent kind="pink" className="-right-10 -top-9 w-28 rotate-12 sm:w-36" /><div className="relative grid gap-12 md:grid-cols-2">{venues.map((venue, index) => <article key={venue.name} className="text-center"><h3 className="mb-6 font-serif text-3xl">{venue.eyebrow}</h3><div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-md bg-[rgb(var(--aj-sage))]">{index === 0 ? <Image src={ChurchImage} alt="Watercolor illustration of San Bartolome Parish, Malabon" fill sizes="(max-width: 768px) 85vw, 360px" className="object-cover" /> : <Image src={ReceptionDirections} alt="Reception directions from San Bartolome Parish to St. John XXIII Hall, beside Rizal Avenue Extension in Malabon." fill sizes="(max-width: 768px) 85vw, 360px" className="bg-[rgb(var(--aj-paper))] object-contain" />}</div><h4 className="font-serif text-xl">{venue.name}</h4><p className="mt-4 text-sm leading-7">{venue.address}</p><p className="mt-2 text-xs leading-6 text-[rgb(var(--aj-accent-dark))]">{venue.time}</p><a href={`https://www.google.com/maps/search/?api=1&query=${venue.query}`} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[rgb(var(--aj-accent))] px-6 py-3 text-xs text-[rgb(var(--aj-cream))] transition hover:bg-[rgb(var(--aj-accent-dark))]">View on map <MapPin size={14} /></a></article>)}</div></Reveal>
  </section>;
}
