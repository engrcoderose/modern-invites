import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import wedding from "../data/wedding-details.json";
import ceremony from "../assets/designs/ceremony_image.png";
import reception from "../assets/designs/reception_image.png";
import flowers from "../assets/designs/venue-flowers-trimmed.webp";
import pattern from "../assets/designs/venues_bg_pattern.png";

const venues = [
  { ...wedding.ceremony, title: "The Ceremony", image: ceremony, alt: "Watercolor of Iglesia ni Cristo in an ornate gold oval frame", time: wedding.date.ceremonyTime },
  { ...wedding.reception, title: "The Reception", image: reception, alt: "Watercolor of the grand staircase at Lafaayette Luxury Suites in an ornate gold oval frame", time: wedding.timeline.find((item) => item.label === "Wedding Reception Program")?.time },
];

export default function CelebrationSection() {
  return (
    <section id="celebration" aria-labelledby="mj-venues-title" className="mj-venues relative px-6 py-16 sm:px-10 sm:py-20" style={{ backgroundImage: `url(${pattern.src})` }}>
      <div className="mx-auto max-w-6xl text-center">
        <h2 data-mj-reveal id="mj-venues-title" className="mj-heading mb-8 sm:mb-10">The Venues</h2>
        <div className="grid gap-14 md:grid-cols-2 md:gap-10">
          {venues.map((venue) => (
            <article data-mj-stagger key={venue.title} className="min-w-0">
              <div data-mj-reveal className="relative mx-auto mb-10 w-full max-w-[375px]">
                <Image src={venue.image} alt={venue.alt} sizes="(min-width: 423px) 375px, calc(100vw - 48px)" className="h-auto w-full" />
                <Image src={flowers} alt="" sizes="(min-width: 423px) 375px, calc(100vw - 48px)" className="pointer-events-none absolute -bottom-6 left-0 h-auto w-full" />
              </div>
              <p data-mj-reveal className="mb-1 text-xl sm:text-2xl">{venue.title}</p>
              <h3 data-mj-reveal className="mj-venue-name mx-auto mb-2 max-w-lg">{venue.venue}</h3>
              <p data-mj-reveal className="mx-auto max-w-sm text-sm italic leading-6 sm:text-base">{venue.address}</p>
              <p data-mj-reveal className="mt-3 text-sm">{venue.time}</p>
              <a data-mj-reveal href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.venue}, ${venue.address}`)}`} target="_blank" rel="noopener noreferrer" aria-label={`View directions to ${venue.venue}`} className="mj-text-link mt-3 inline-flex items-center gap-2 py-2 text-sm">View directions <ArrowUpRight size={15} aria-hidden="true" /></a>
            </article>
          ))}
        </div>
        <p data-mj-reveal className="mj-arrival mx-auto mt-12 max-w-2xl px-5 py-5 text-sm leading-7">{wedding.ceremony.arrivalNote}</p>
      </div>
    </section>
  );
}
