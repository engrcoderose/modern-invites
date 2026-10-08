import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import SectionHeading from "../components/SectionHeading";
import { venueArtwork } from "../data/venue-artwork";
import { wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function DetailsSection() {
  const events = [
    { label: "The ceremony", number: "01", ...wedding.ceremony, time: wedding.ceremonyTime, artwork: venueArtwork.ceremony },
    { label: "The reception", number: "02", ...wedding.reception, artwork: venueArtwork.reception },
  ];
  return (
    <section id="details" aria-label="Wedding venues" className={`${styles.paper} px-6 py-24 sm:px-10 md:py-32 lg:px-16`}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="When and Where" title="The Wedding Venue" />
        <div className="mt-14 grid border-t border-[#8a714e]/35 md:grid-cols-2">
          {events.map((event) => {
            const mapUrl = event.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.name}, ${event.address}`)}`;
            return (
              <article data-reveal-group key={event.label} className="border-b border-[#8a714e]/35 py-10 md:pr-12 md:odd:border-r md:even:pl-12 md:even:pr-0">
                <div data-reveal className="flex items-center justify-between gap-4"><p className={styles.eyebrow}>{event.label}</p><span className={`${styles.serif} text-3xl italic text-[#a89068]`}>{event.number}</span></div>
                <div data-reveal="image" className="relative mt-6 aspect-[4/3] w-full overflow-hidden">
                  <Image src={event.artwork.src} alt={event.artwork.alt} fill className="object-cover"
                    sizes="(min-width:1280px) 528px, (min-width:1024px) calc((100vw - 128px) / 2 - 48px), (min-width:768px) calc((100vw - 80px) / 2 - 48px), (min-width:640px) calc(100vw - 80px), calc(100vw - 48px)" />
                </div>
                <h3 data-reveal className={`${styles.venueTitle} mx-auto mt-8 max-w-md text-center`}>{event.name}</h3>
                {event.time && <p data-reveal className={`${styles.eyebrow} mt-6 text-center`}>{event.time} · {wedding.date}</p>}
                <div data-reveal className="mx-auto mt-5 max-w-md text-center text-sm leading-7 text-[#615b50]">
                  <p><MapPin size={17} className="mr-2 inline-block align-text-bottom text-[#8a714e]" aria-hidden="true" />{event.address}</p>
                </div>
                <div data-reveal className="mt-6 flex justify-center">
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`View map for ${event.name} (opens in a new tab)`} className={`${styles.textLink} inline-flex min-h-11 items-center gap-3 py-3`}>View map <ArrowUpRight size={16} aria-hidden="true" /></a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
