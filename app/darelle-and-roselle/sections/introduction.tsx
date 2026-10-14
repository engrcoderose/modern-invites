import ScenicBackground from "../components/scenic-background";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FormalMonogram } from "../components/artwork";
import Monogram from "../components/monogram";
import Section from "../components/section";
import SectionHeading from "../components/section-heading";
import { media } from "../data/media";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export function Cover() {
  return (
    <section className={`${styles.cover} relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-12 text-center`} aria-label="Roselle and Darell wedding invitation cover">
      <ScenicBackground src={media.cover} priority className="opacity-[0.55]" initialSizes="max(100vw, 155.4svh)" />
      <div className={`${styles.coverShade} pointer-events-none absolute inset-0`} />
      <div className="relative z-[1] flex flex-col items-center gap-4">
        <Monogram tone="paper" priority className="w-[min(63vw,250px)]" sizes="(max-width: 400px) 98.5vw, 390px" />
        <p className={`${styles.coverNames} text-[clamp(32px,6vw,46px)]`}>{wedding.shortTitle}</p>
        <p className="text-xs leading-relaxed">{wedding.date}</p>
        <a href="#invitation" className={`${styles.coverLink} mt-5 inline-flex min-h-11 items-center gap-3 px-5 py-3`}>Open invitation <ArrowDown size={15} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

export function FormalInvitation() {
  return (
    <Section id="invitation" className={`${styles.formalInvitation} flex min-h-[calc(100svh-70px)] items-center`}>
      <div className="flex flex-col items-center gap-5">
        <FormalMonogram />
        <h1 className={`${styles.formalNames} flex flex-col items-center gap-1`}>
          <span>{wedding.bride}</span><span className="text-[0.65em]">and</span><span>{wedding.groom}</span>
        </h1>
        <p className="text-[13px] leading-relaxed">invite you to celebrate our love</p>
        <p className={`${styles.script} text-[34px] sm:text-[40px]`}>{wedding.date}</p>
      </div>
    </Section>
  );
}

export function Venues() {
  return (
    <Section id="the-day" tone="woodland" background={media.venueBackground}>
      <SectionHeading title="The Wedding Venues" className="mb-10" />
      <div className={`${styles.venueFrame} grid gap-14 px-6 py-12 sm:px-10 md:grid-cols-2 md:gap-12`}>
        {wedding.venues.map((venue) => (
          <div key={venue.role} className="flex min-w-0 flex-col items-center gap-4">
            <p className={styles.role}>{venue.role}</p>
            <h3 className={`${styles.script} text-[clamp(34px,5vw,46px)]`}>
              {venue.name.split(/\b(IV)\b/).map((part, index) =>
                part === "IV" ? <span key={index} className={`${styles.romanNumeral} ml-[0.15em]`}>{part}</span> : part
              )}
            </h3>
            <p className="text-sm">{venue.time}</p>
            <p className="max-w-[340px] text-xs leading-[1.9]">{venue.address}</p>
            <a className={`${styles.textLink} mt-2 inline-flex min-h-11 items-center gap-2 px-2 py-3`} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapQuery)}`} target="_blank" rel="noopener noreferrer" aria-label={`View map for ${venue.name} (opens in a new tab)`}>View map <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        ))}
      </div>
    </Section>
  );
}
