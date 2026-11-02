import { ArrowRight, Heart } from "lucide-react";
import EmbossedBackdrop from "../components/EmbossedBackdrop";
import FloralAccent from "../components/FloralAccent";
import { wedding } from "../data/wedding";
import styles from "../styles/seat-finder.module.css";

export default function SeatFinderSection() {
  return <section id="seat-finder" aria-labelledby="ea-seat-finder-title" className={`${styles.section} relative isolate overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-12`}>
    <EmbossedBackdrop />
    <div className={`${styles.card} relative mx-auto max-w-4xl border border-[var(--ea-old-rose)] px-6 py-16 sm:px-16 sm:py-20`}>
      <FloralAccent variant="cosmos" className="absolute left-0 top-0 w-16 sm:w-28" sizes="(min-width: 640px) 112px, 64px" />
      <FloralAccent variant="cosmos" className="absolute bottom-0 right-0 w-16 rotate-180 sm:w-28" sizes="(min-width: 640px) 112px, 64px" />
      <div className="relative text-center">
        <Heart aria-hidden="true" size={26} strokeWidth={1} className="mx-auto mb-6 text-[var(--ea-text)]" />
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <span aria-hidden="true" className="h-px w-4 shrink-0 bg-[var(--ea-line)] sm:w-10" />
          <p className="text-[10px] uppercase tracking-[.18em] text-[var(--ea-text)] sm:text-xs sm:tracking-[.25em]">Reception seat finder</p>
          <span aria-hidden="true" className="h-px w-4 shrink-0 bg-[var(--ea-line)] sm:w-10" />
        </div>
        <h2 id="ea-seat-finder-title" className={`${styles.title} mt-6`}>
          <span className="block sm:inline">Your place at </span><em className="block sm:inline">our celebration.</em>
        </h2>
        <button type="button" disabled aria-describedby="ea-seat-finder-note" className="mt-8 inline-flex min-h-14 w-full cursor-default items-center justify-center gap-5 rounded-full bg-[var(--ea-wine)] px-6 py-4 text-sm text-[var(--ea-paper)] sm:w-auto sm:px-8">
          Find my seat<ArrowRight size={18} aria-hidden="true" />
        </button>
        <p id="ea-seat-finder-note" className="mx-auto mt-4 max-w-md text-xs leading-6 text-[var(--ea-text)]">Table assignments will be shared once finalized.</p>
        <div className="mx-auto mt-10 max-w-md border-t border-[var(--ea-line)] pt-6">
          <p className="text-[10px] uppercase tracking-[.2em] text-[var(--ea-text)]">The reception</p>
          <p className="mt-3 text-xl leading-relaxed sm:text-2xl">{wedding.reception.name}</p>
          <p className="mt-2 text-xs leading-6 text-[var(--ea-text)]">{wedding.reception.address}</p>
        </div>
      </div>
    </div>
  </section>;
}
