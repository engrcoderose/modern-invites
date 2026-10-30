import Image from "next/image";
import churchArtwork from "../assets/venues/transfiguration-church-watercolor.webp";
import receptionArtwork from "../assets/venues/chandelier-events-place-watercolor.webp";
import floralGarland from "../assets/venues/vintage-rose-garland.webp";
import DecorativeParallax from "../components/DecorativeParallax";
import EmbossedBackdrop from "../components/EmbossedBackdrop";
import SectionHeading from "../components/SectionHeading";
import VenueName from "../components/VenueName";
import { venueMapUrl, wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const venueImageSizes = "(min-width: 960px) 386px, (min-width: 768px) calc((100vw - 136px) / 2 - 14px), (min-width: 640px) 386px, calc(100vw - 62px)";
const garlandSizes = "(min-width: 960px) 440px, (min-width: 768px) calc((100vw - 136px) / 2 + 40px), (min-width: 640px) 440px, calc(100vw - 8px)";

export default function CelebrationSection() {
  const events = [
    { ...wedding.ceremony, label: "Ceremony", number: "01", note: `Please arrive by ${wedding.ceremony.arrival}`, artwork: churchArtwork, artworkAlt: "Watercolor illustration of Transfiguration of Christ Parish Church, with twin towers, a gold cross and its red staircase." },
    { ...wedding.reception, label: "Reception", number: "02", note: `Cocktails begin at ${wedding.reception.cocktails}`, artwork: receptionArtwork, artworkAlt: "Watercolor illustration of The Chandelier Events Place, with its illuminated roof sign and glass entrance beneath a sunset sky." },
  ];

  return (
    <section id="celebration" aria-labelledby="ea-celebration-title" className={`${styles.celebration} relative overflow-hidden px-6 py-20 sm:px-10 md:py-28`}>
      <EmbossedBackdrop />
      <div className="relative mx-auto max-w-6xl">
        <p data-reveal className={`${styles.venueLabel} mb-4 text-center text-xs uppercase tracking-[.22em]`}>When and where</p>
        <SectionHeading id="ea-celebration-title" description="Friday, December 4, 2026 · Antipolo City, Rizal">The Wedding Venue</SectionHeading>
        <div className="mx-auto grid max-w-5xl gap-x-14 gap-y-20 md:grid-cols-2 lg:gap-x-20">
          {events.map(({ name, address, label, number, time, note, artwork, artworkAlt }) => <article key={name} aria-labelledby={`ea-venue-${number}`} className="flex min-w-0 flex-col text-center" data-reveal-group>
            <figure data-reveal="image" className="relative mx-auto w-full max-w-[400px]">
              <div className={`${styles.venuePhotoFrame} p-1.5`}>
                <div className={`${styles.venuePhoto} relative aspect-[4/5] overflow-hidden`}>
                  <Image src={artwork} alt={artworkAlt} fill className="object-contain" placeholder="blur" sizes={venueImageSizes} />
                </div>
              </div>
              <DecorativeParallax distance={5} reverse={number === "02"} className="pointer-events-none absolute -inset-x-5 -bottom-9 select-none">
                <Image src={floralGarland} alt="" sizes={garlandSizes} className="h-auto w-full" />
              </DecorativeParallax>
            </figure>
            <p data-reveal className={`${styles.venueEventTitle} mt-16 text-4xl sm:text-5xl`}>{label}</p>
            <p data-reveal className={`${styles.venueLabel} mt-2 text-xs uppercase tracking-[.22em]`}>{time}<span className="sr-only">, Philippine time</span></p>
            <h3 id={`ea-venue-${number}`} data-reveal className={`${styles.venueName} mx-auto mt-5 max-w-md`}><VenueName name={name} /></h3>
            <address data-reveal className={`${styles.body} mx-auto mt-3 max-w-sm not-italic`}>{address}</address>
            <p data-reveal className={`${styles.venueNote} mt-4 text-sm`}>{note}</p>
            <div data-reveal className="mt-auto flex justify-center pt-6">
              <a href={venueMapUrl(name, address)} target="_blank" rel="noopener noreferrer" aria-label={`View map for ${name} (opens in a new tab)`}
                className="inline-flex min-h-11 items-center justify-center border border-[var(--ea-wine)] px-8 py-3 text-[10px] uppercase tracking-[.25em] text-[var(--ea-wine)] transition-colors hover:bg-[var(--ea-wine)] hover:text-[var(--ea-paper)]">Google Maps</a>
            </div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
