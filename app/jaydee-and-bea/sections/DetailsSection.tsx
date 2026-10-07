import Image from "next/image";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import VenueCard from "../components/VenueCard";
import { wedding } from "../data/wedding-data";
import leafyDivider from "../assets/designs/vines-1.png";

export default function DetailsSection() {
  return (
    <ScrollScene lockOnFocus id="details" aria-labelledby="jb-details-title" className="jb-details px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollLayer as="header" profile="heading" className="mx-auto mb-10 max-w-xl text-center sm:mb-14">
          <p className="text-xs uppercase leading-6 tracking-[0.12em] text-[#68795c]">{wedding.date.weekday} · {wedding.date.display}</p>
          <h2 id="jb-details-title" className="jb-details-title mt-3">The Wedding Venue</h2>
          <Image src={leafyDivider} alt="" aria-hidden="true" sizes="160px" draggable={false} className="pointer-events-none mx-auto mt-4 h-auto w-40 select-none opacity-85" />
        </ScrollLayer>
        <div className="mx-auto grid max-w-lg gap-8 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {wedding.venues.map((venue, index) => <div key={venue.id} className={index === 2 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-1rem)] lg:col-span-1 lg:w-full" : undefined}><VenueCard venue={venue} phase={index * 0.04} /></div>)}
        </div>
      </div>
    </ScrollScene>
  );
}
