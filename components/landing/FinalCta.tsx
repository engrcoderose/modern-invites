import Link from "next/link";
import { ArrowUpRight, Clock3, MessageCircleHeart } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";
import ScrollReveal from "./ScrollReveal";

export default function FinalCta() {
  return (
    <section className="bg-white px-[min(1rem,16px)] py-20 sm:px-[min(1.5rem,24px)] lg:px-[min(2rem,32px)] lg:py-28">
      <ScrollReveal direction="scale" className="mx-auto max-w-7xl">
        <div className="relative rounded-[2rem] bg-marketing-cta px-[min(1.5rem,24px)] py-16 text-center sm:px-[min(3rem,48px)] lg:py-24">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
            <div className="invitation-grid absolute inset-0 opacity-35" />
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border-[50px] border-white/25" />
            <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-forest/10 blur-2xl" />
          </div>
          <div className="relative mx-auto max-w-3xl [overflow-wrap:anywhere]">
            <MessageCircleHeart className="mx-auto h-8 w-8 text-forest" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-marketing-muted">Let’s make it yours</p>
            <h2 className="mt-4 text-balance font-instrumentSerif text-5xl leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
              Tell us about your <span className="italic text-eucalyptus-dark">celebration.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-marketing-muted">
              Share your date, occasion, and vision. We’ll help you choose the right package and guide you from there.
            </p>
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex min-h-14 max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-forest px-[min(2rem,32px)] py-4 text-sm font-bold text-white shadow-[0_18px_35px_-18px] shadow-forest/80 transition motion-safe:hover:-translate-y-0.5 hover:bg-forest-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
            >
              <span className="min-w-0 max-w-full">Start a conversation</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
            <p className="mt-5 inline-flex max-w-full items-center gap-2 text-xs font-medium text-marketing-muted">
              <Clock3 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="min-w-0">Typical delivery: 3–7 business days</span>
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
