import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PhotoFrame } from "../components/Stationery";
import { artwork, photos, venueArtworkSizes } from "../data/media";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function VenueSlide({ kind }: { kind: "ceremony" | "reception" }) {
  const venue = wedding[kind];
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name}, ${venue.address}`)}`;

  return <div className={`${styles.venuePage} relative mx-auto flex h-full w-full max-w-[680px] flex-col items-center justify-center gap-3 px-4 py-4 [@media(max-height:600px)]:gap-[5px]`}>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Image src={artwork.venuePedestal} alt="" sizes={venueArtworkSizes.pedestal} className={`${styles.venuePedestal} absolute -left-3 bottom-0 h-auto [@media(max-height:600px)]:left-0`} />
      <Image src={artwork.venuePedestal} alt="" sizes={venueArtworkSizes.pedestal} className={`${styles.venuePedestal} absolute -right-3 bottom-0 h-auto -scale-x-100 [@media(max-height:600px)]:right-0`} />
    </div>
    <header className="relative z-10 flex shrink-0 flex-col items-center">
      <div className={`${styles.venueCrown} relative`}><Image src={artwork.venueCrown} alt="" fill sizes={venueArtworkSizes.crown} className="pointer-events-none object-cover" /></div>
      <h2 className={`${styles.venueTitle} relative -mt-4 text-center`}>{kind === "ceremony" ? "The Ceremony" : "The Reception"}</h2>
    </header>
    <div className={`${styles.venuePhotoFrame} relative z-10 mb-3 shrink-0`}>
      <PhotoFrame photo={photos[kind]} className={`${styles.venuePhoto} ${kind === "ceremony" ? styles.venueCeremonyPhoto : ""} w-full`} />
      <div className={`${styles.venueImageTrim} pointer-events-none absolute -bottom-3 -left-[8%] w-[116%]`} aria-hidden="true"><Image src={artwork.venueTrim} alt="" fill sizes={venueArtworkSizes.trim} className="object-cover" /></div>
    </div>
    <div className="relative z-10 w-[82%] max-w-[380px] shrink-0 text-center">
      <h3 className={styles.venueName}>{venue.name}</h3>
      <p className={styles.venueNote}>{venue.note}</p>
    </div>
    <p className={`${styles.venueTime} relative z-10 w-[68%] shrink-0 text-center uppercase`}>{venue.time}</p>
    <p className={`${styles.venueAddress} relative z-10 w-[56%] max-w-sm shrink-0 text-center uppercase [@media(max-height:600px)]:w-[68%]`}>{venue.address}</p>
    <a href={maps} target="_blank" rel="noreferrer" className={`${styles.venueMap} relative z-10 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 px-5 py-2 text-center text-[10px] uppercase tracking-[.08em]`}>View map <ArrowUpRight size={12} aria-hidden="true" /></a>
  </div>;
}
