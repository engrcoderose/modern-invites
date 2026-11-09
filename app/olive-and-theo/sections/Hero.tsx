import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import table from "../assets/garden-table.jpg";
import { event } from "../data/event";
import styles from "../styles/invitation.module.css";

export default function Hero() {
  const [first, second] = event.names.split(" & ");
  return <section id="home" className="mx-auto max-w-[1440px] px-6 pb-12 pt-12 md:px-12 md:pt-16 lg:px-20">
    <div className="text-center">
      <h1 className={styles.heroNames}>{first} <em>&</em> {second}</h1>
      <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center justify-between gap-4 text-sm sm:flex-row sm:gap-8">
        <p>We’re getting married. You’re our kind of people.</p>
        <a href="#rsvp" className="inline-flex min-h-11 shrink-0 items-center gap-3 border-b border-current py-2">Come celebrate with us<ArrowDownRight size={18} aria-hidden="true" /></a>
      </div>
    </div>
    <div className="relative mt-10 md:mt-12">
      <div className="relative h-[320px] overflow-hidden rounded-t-[42%_18%] sm:h-[410px] lg:h-[470px]">
        <Image src={table} alt="An intimate wedding table set with garden flowers, linen, and glassware" fill priority sizes="(min-width: 1440px) 1280px, (min-width: 1024px) calc(100vw - 160px), (min-width: 768px) calc(100vw - 96px), (min-width: 640px) max(calc(100vw - 48px), 615px), max(calc(100vw - 48px), 480px)" className="object-cover object-[50%_56%]" />
      </div>
      <div className={`${styles.dateSeal} absolute -right-2 -top-5 flex h-24 w-24 rotate-6 flex-col items-center justify-center rounded-full sm:right-7 sm:top-6 sm:h-32 sm:w-32`} aria-label={event.date}>
        <span className="text-[10px] uppercase tracking-[0.15em]">March</span><span className={`${styles.display} text-4xl leading-none sm:text-5xl`}>20</span><span className="mt-1 text-[10px] tracking-[0.18em]">2027</span>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ot-line)] py-5 text-xs sm:text-sm"><p>{event.date}</p><p>{event.venue} · Tagaytay</p></div>
  </section>;
}
