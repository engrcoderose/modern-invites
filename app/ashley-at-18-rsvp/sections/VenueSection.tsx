import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import venueWatercolor from "../assets/venue-watercolor.webp";
import { celebration } from "../data/event";
import styles from "../styles/invitation.module.css";
import DecorativeArtwork from "../components/DecorativeArtwork";

export default function VenueSection() {
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${celebration.venue}, ${celebration.address}`)}`;

  return (
    <section id="venue" aria-labelledby="venue-title" className="relative isolate scroll-mt-[72px] overflow-hidden bg-[#e9ddf1] px-6 py-20 text-center text-[#553361] sm:py-24">
      <DecorativeArtwork name="purpleFlorals" sizes="(min-width: 1024px) 192px, (min-width: 640px) 144px, 80px" className="absolute -left-6 -top-8 -z-10 w-20 rotate-90 opacity-80 sm:w-36 sm:opacity-90 lg:w-48" />
      <DecorativeArtwork name="purpleFlorals" sizes="(min-width: 1024px) 192px, (min-width: 640px) 144px, 80px" className="absolute -right-6 -top-8 -z-10 w-20 -rotate-90 -scale-x-100 opacity-80 sm:w-36 sm:opacity-90 lg:w-48" />
      <div className="mx-auto max-w-3xl">
        <h2 id="venue-title" data-reveal="heading" className={`${styles.sectionTitle} text-6xl sm:text-7xl`}>The venue</h2>
        <Image
          src={venueWatercolor}
          data-reveal="artwork"
          data-reveal-delay="120"
          alt="Watercolor illustration of Casa Dominguez, with its glass-fronted event hall and surrounding gardens"
          sizes="(min-width: 720px) 672px, calc(100vw - 48px)"
          className="mx-auto mt-8 h-auto w-full max-w-2xl"
        />
        <h3 data-reveal="heading" data-reveal-delay="240" className="mx-auto mt-5 max-w-sm font-instrumentSerif text-3xl leading-tight sm:text-4xl">{celebration.venue}</h3>
        <address data-reveal="message" data-reveal-delay="360" className="mt-5 text-sm not-italic leading-7">{celebration.address}</address>
        <a data-reveal="button" data-reveal-delay="480" href={directions} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#80508f] px-6 py-3 text-xs uppercase tracking-[0.12em] transition-colors hover:bg-white/50">View the map <ArrowUpRight aria-hidden="true" className="size-4" /><span className="sr-only"> (opens in a new tab)</span></a>
        <div data-reveal="message" data-reveal-delay="600" className="mx-auto mt-10 max-w-xs border-t border-[#c5add1] pt-8">
          <p className="font-instrumentSerif text-4xl italic">{celebration.arrival}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em]">Guest arrival</p>
          <time dateTime={celebration.dateTime} className="mt-4 block text-sm">{celebration.day}, {celebration.date}</time>
        </div>
      </div>
    </section>
  );
}
