import { ArrowRight } from "lucide-react";
import InvitationReveal from "../components/InvitationReveal";
import SectionFlorals from "../components/SectionFlorals";
import styles from "../styles/invitation.module.css";

export default function SeatFinderSection() {
  return <section id="seat-finder" aria-labelledby="jr-seat-finder-title" className={`${styles.lavenderSection} scroll-mt-20 px-6 py-20 md:px-12 md:py-24`}>
    <div className="relative isolate mx-auto max-w-4xl overflow-hidden border border-[var(--jr-rule)] bg-[var(--jr-paper)] px-6 py-24 text-center sm:px-14 sm:py-28">
      <SectionFlorals mirrored />
      <InvitationReveal as="h2" id="jr-seat-finder-title" className={`${styles.heading} mx-auto max-w-2xl`}>
        <span className="block sm:inline">Your place at </span><span className="block sm:inline">our celebration</span>
      </InvitationReveal>
      <InvitationReveal as="p" delay={0.06} className="mx-auto mt-6 max-w-[36ch] text-base leading-7">Find your table and settle in for an evening of love and celebration.</InvitationReveal>
      <InvitationReveal delay={0.12} className="mt-8"><button type="button" disabled className="inline-flex min-h-14 w-full cursor-default items-center justify-center gap-3 border border-[var(--jr-plum)] bg-[var(--jr-plum)] px-6 py-4 text-sm text-[var(--jr-paper)] sm:w-auto sm:px-8">
        Find My Seat <ArrowRight size={18} aria-hidden="true" className="shrink-0" />
      </button></InvitationReveal>
    </div>
  </section>;
}
