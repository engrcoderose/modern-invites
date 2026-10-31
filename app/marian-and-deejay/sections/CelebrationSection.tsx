import { ArrowUpRight, CalendarDays } from "lucide-react";
import wedding from "../data/wedding-details.json";

export default function CelebrationSection() {
  const venues = [
    { ...wedding.ceremony, title: "The ceremony", time: wedding.date.ceremonyTime },
    { ...wedding.reception, title: "The reception", time: wedding.timeline.find((item) => item.label === "Wedding Reception Program")?.time },
  ];
  return (
    <section id="celebration" className="mj-section px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <h2 className="mj-heading">A day, a promise,<br /><em>a lifetime together.</em></h2>
          <p className="mt-6 leading-7">With grateful hearts, we would love for you to join us as we begin this beautiful chapter of our lives.</p>
          <a href="/marian-and-deejay/calendar" download="marian-and-deejay.ics" className="mj-text-link mt-6 inline-flex items-center gap-2 py-2 text-sm"><CalendarDays size={16} aria-hidden="true" /> Save the date</a>
        </div>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          {venues.map((venue) => <article key={venue.title} className="mj-venue border-t pt-8">
            <div className="mb-7 flex items-baseline justify-between gap-4"><h3 className="mj-display text-3xl italic">{venue.title}</h3><span className="text-sm">{venue.time}</span></div>
            <h4 className="mj-display mb-4 max-w-sm text-3xl leading-tight">{venue.venue}</h4>
            <p className="max-w-sm text-sm leading-7">{venue.address}</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.venue}, ${venue.address}`)}`} target="_blank" rel="noopener noreferrer" className="mj-text-link mt-5 inline-flex items-center gap-3 py-2 text-sm">View directions <ArrowUpRight size={15} aria-hidden="true" /></a>
          </article>)}
        </div>
        <p className="mj-arrival mx-auto mt-12 max-w-2xl px-6 py-6 text-center text-sm leading-7">{wedding.ceremony.arrivalNote}</p>
        <div className="mt-24 grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <div><h3 className="mj-heading">The sweetest<br /><em>hours.</em></h3><p className="mt-6 max-w-xs text-sm leading-7">From our first promise to the last dance, here’s how our day will unfold.</p></div>
          <ol className="mj-timeline">
            {wedding.timeline.map((item) => <li key={item.time} className="grid grid-cols-[90px_1fr] gap-4 border-b py-5 sm:grid-cols-[110px_1fr]"><time className="text-sm">{item.time}</time><span className="mj-display text-xl sm:text-2xl">{item.label}</span></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
