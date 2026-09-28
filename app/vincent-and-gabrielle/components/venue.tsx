"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { wedding } from "../data";
import { media } from "../data/media";

export function Venue({ reception = false }: { reception?: boolean }) {
  const venue = reception ? wedding.reception : wedding.ceremony;
  return (
    <section
      className="flex min-w-0 flex-col items-center gap-3 [@media(max-width:700px)]:h-full [@media(max-width:700px)]:justify-center [@media(max-width:700px)]:gap-1"
      aria-label={reception ? "The reception" : "The ceremony"}
    >
      <div className="flex flex-col items-center gap-3 [@media(max-width:700px)]:gap-1">
        <div
          className="vg-venue-art relative h-[140px] w-[210px] max-w-full [@media(max-width:700px)]:h-[clamp(60px,calc(15svh-40px),110px)] [@media(max-width:700px)]:w-[165px]"
          aria-hidden="true"
        >
          <Image
            src={reception ? media.reception : media.ceremony}
            alt=""
            fill
            sizes="(max-width: 700px) 165px, 210px"
            className="object-contain"
          />
        </div>
        <p className="vg-label">
          {reception ? wedding.reception.introduction : "The Ceremony"}
        </p>
      </div>
      <h3 className="vg-venue-name">{venue.name}</h3>
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
      {reception && wedding.reception.parking && (
        <p className="max-w-[340px] text-[12px] leading-relaxed [@media(max-width:700px)]:text-[clamp(10.5px,1.5svh,12px)] [@media(max-width:700px)]:leading-normal">
          {wedding.reception.parking}
        </p>
      )}
      {venue.mapUrl && (
        <a
          className="vg-text-button inline-flex min-h-11 items-center justify-center gap-2 px-1 py-2 [@media(max-width:700px)]:min-h-8 [@media(max-width:700px)]:py-1"
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View map for ${venue.name} (opens in a new tab)`}
          data-vg-reveal
        >
          View map <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
      {venue.mapEmbedUrl && (
        <iframe
          title={`${reception ? "Reception" : "Ceremony"} location`}
          loading="lazy"
          src={venue.mapEmbedUrl}
          className="vg-map w-full max-w-[500px] h-[180px]"
        />
      )}
    </section>
  );
}

