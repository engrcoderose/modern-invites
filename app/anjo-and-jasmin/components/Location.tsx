import Image from "next/image";
import { MapPin } from "lucide-react";
import { wedding } from "../data";
import { ChurchImage } from "../../jasmin-and-anjo/media";
import { Together } from "../../jasmin-and-anjo/prenup-media";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";

export default function Location() {
  const venues = [
    { eyebrow: "The ceremony", name: wedding.ceremony, address: "Malabon, Philippines", time: wedding.time, query: "San+Bartolome+Parish+Malabon" },
    { eyebrow: "The reception", name: wedding.reception, address: `${wedding.receptionFloor}, ${wedding.location}`, time: "Reception follows the ceremony", query: "St+John+XXIII+Hall+San+Bartolome+Parish+Malabon" },
  ];
  return <section id="location" className="relative isolate overflow-hidden px-5 pb-20 pt-32 sm:px-8">
    <Image src={Together} alt="Anjo and Jasmin sitting together, holding hands in the garden" fill sizes="100vw" className="-z-20 object-cover object-top" />
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#263d35]/55 via-[#fbf8f1]/40 to-[#fbf8f1]" />
    <Reveal className="mb-12 text-center text-white"><p className="text-xs uppercase tracking-[.25em]">When &amp; where</p><h2 className="mt-5 font-imperial text-6xl sm:text-8xl">The details of our day.</h2><p className="mt-5 text-base">Saturday · {wedding.dateDisplay}</p><p className="mt-3 text-xs uppercase tracking-[.2em]">Malabon, Philippines</p></Reveal>
    <Reveal className="mx-auto max-w-4xl rounded-2xl bg-[#fffdf8] p-6 shadow-2xl sm:p-10 lg:p-14"><div className="grid gap-12 md:grid-cols-2">{venues.map((venue, index) => <article key={venue.name} className="text-center"><h3 className="mb-6 font-serif text-3xl">{venue.eyebrow}</h3><div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-md bg-[#e5eadd]">{index === 0 ? <Image src={ChurchImage} alt="Watercolor illustration of San Bartolome Parish, Malabon" fill sizes="(max-width: 768px) 85vw, 360px" className="object-cover" /> : <iframe src={`https://www.google.com/maps?q=${venue.query}&output=embed`} title={`Google Maps location of ${venue.name}, ${venue.address}`} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />}</div><h4 className="font-serif text-xl">{venue.name}</h4><p className="mt-4 text-sm leading-7">{venue.address}</p><p className="mt-2 text-xs leading-6 text-[#946879]">{venue.time}</p><a href={`https://www.google.com/maps/search/?api=1&query=${venue.query}`} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#946879] px-6 py-3 text-xs text-white transition hover:bg-[#7e5666]">View on map <MapPin size={14} /></a></article>)}</div></Reveal>
  </section>;
}
