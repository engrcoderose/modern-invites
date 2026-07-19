import Link from "next/link";
import { ArrowUpRight, Clock3, MessageCircleHeart } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";
import ScrollReveal from "./ScrollReveal";

export default function FinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <ScrollReveal direction="scale" className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#dce7df] px-6 py-16 text-center sm:px-12 lg:py-24">
        <div className="invitation-grid absolute inset-0 opacity-35" />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border-[50px] border-white/25" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-forest/10 blur-2xl" />
        <div className="relative mx-auto max-w-3xl">
          <MessageCircleHeart className="mx-auto h-8 w-8 text-forest" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-eucalyptus-dark">Let’s make it yours</p>
          <h2 className="mt-4 text-balance font-instrumentSerif text-5xl leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
            Tell us about your <span className="italic text-eucalyptus-dark">celebration.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-ink-muted">
            Share your date, occasion, and vision. We’ll help you choose the right package and guide you from there.
          </p>
          <Link
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-forest px-8 py-4 text-sm font-bold text-white shadow-[0_18px_35px_-18px_rgba(23,61,50,0.8)] transition hover:-translate-y-0.5 hover:bg-forest-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-forest/65">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            Typical delivery: 3–7 business days
          </p>
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
