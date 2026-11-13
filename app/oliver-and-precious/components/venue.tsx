"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { wedding } from "../data";
import { media } from "../data/media";

export function Venue({ reception = false }: { reception?: boolean }) {
  const venue = reception ? wedding.reception : wedding.ceremony;
  return (
    <section
      className="flex min-w-0 flex-col items-center gap-3 [@media(max-width:700px)]:justify-center [@media(max-width:700px)]:gap-1"
      aria-label={reception ? "The reception" : "The ceremony"}
    >
      <div className="flex shrink-0 flex-col items-center gap-3 [@media(max-width:700px)]:gap-1">
        <div
          className="op-venue-art h-[140px] w-[210px] max-w-full shrink-0 [@media(max-width:700px)]:h-[120px] [@media(max-width:700px)]:w-[180px]"
        >
          <Image
            src={reception ? media.receptionVenue : media.ceremonyVenue}
            alt={reception
              ? "Line illustration of Cove Garden's Talisay Pavillion reception venue"
              : "Line illustration of the Cove Garden ceremony pavilion"}
            sizes="(max-width: 700px) 180px, 210px"
            className="block h-full w-full object-contain"
          />
        </div>
        <p className="op-label">
          {reception ? wedding.reception.introduction : "The Ceremony"}
        </p>
      </div>
      <h3 className="op-venue-name">{venue.name}</h3>
      {!reception && (
        <p className="text-[15px] [@media(max-width:700px)]:text-[clamp(12px,1.8svh,15px)]">
          {wedding.ceremonyTime}
        </p>
      )}
      {reception && wedding.reception.time && <p className="text-[15px] [@media(max-width:700px)]:text-[12px]">{wedding.reception.time}</p>}
      {venue.address && (
        <p className="max-w-[340px] text-[12px] leading-relaxed [@media(max-width:700px)]:text-[clamp(10.5px,1.5svh,12px)] [@media(max-width:700px)]:leading-normal">
          {venue.address}
        </p>
      )}
      {venue.mapUrl && (
        <a
          className="op-text-button inline-flex min-h-11 items-center justify-center gap-2 px-1 py-2 [@media(max-width:700px)]:min-h-8 [@media(max-width:700px)]:py-1"
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View map for ${venue.name} (opens in a new tab)`}
          data-op-reveal
        >
          View map <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
      {venue.mapEmbedUrl && (
        <iframe
          title={`${reception ? "Reception" : "Ceremony"} location`}
          loading="lazy"
          src={venue.mapEmbedUrl}
          className="op-map w-full max-w-[500px] h-[180px]"
        />
      )}
    </section>
  );
}

