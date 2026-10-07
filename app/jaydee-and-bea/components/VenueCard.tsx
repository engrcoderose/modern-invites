import Image from "next/image";
import ScrollLayer from "./ScrollLayer";
import TextReveal from "./TextReveal";
import { ArrowUpRight } from "lucide-react";
import type { Venue } from "../types/wedding";
import { venueArtwork } from "../data/venue-artwork";

export default function VenueCard({ venue, phase = 0 }: { venue: Venue; phase?: number }) {
  const artwork = venueArtwork[venue.id];
  const mapUrl = venue.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name}, ${venue.address}`)}`;
  return (
    <ScrollLayer as="article" profile="card" phase={phase} className="jb-venue-card relative flex h-full flex-col rounded-[1.5rem] border border-[#8c9877]/25 p-4 pb-8 text-center sm:p-5 sm:pb-10">
      {artwork && (
        <figure className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image src={artwork.src} alt={artwork.alt} fill sizes="(min-width: 1024px) 340px, (min-width: 768px) 44vw, (min-width: 640px) 480px, 90vw" className="object-cover" />
        </figure>
      )}
      <div className="flex flex-1 flex-col px-1 pt-6 sm:px-2">
        <TextReveal className="text-[11px] uppercase tracking-[0.16em] text-[#68795c]">{venue.label}</TextReveal>
        <TextReveal as="h3" className="jb-serif mx-auto mt-3 max-w-sm text-[1.35rem] leading-snug text-[#293327] sm:text-2xl">{venue.name}</TextReveal>
        <div className="my-6">
          <div className="flex items-center justify-center gap-4">
            <span aria-hidden="true" className="jb-venue-rule h-px w-8" />
            <TextReveal className="jb-serif text-2xl text-[#35412f]">{venue.time}</TextReveal>
            <span aria-hidden="true" className="jb-venue-rule h-px w-8 -scale-x-100" />
          </div>
          {venue.note && <TextReveal className="mt-4 text-sm leading-relaxed text-[#35412f]">{venue.note}</TextReveal>}
        </div>
        <TextReveal className="mx-auto max-w-xs text-sm leading-7 text-[#65705e]">{venue.address}</TextReveal>
        <div className="mt-auto pt-7">
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`View Map for ${venue.name} (opens in a new tab)`} className="jb-button inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-5 py-3 text-sm">View Map <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </ScrollLayer>
  );
}
