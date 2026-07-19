import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Clock3, Sparkles } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";
import { LAUNCH_DISCOUNT } from "@/lib/pricing";
import ScrollReveal from "@/components/landing/ScrollReveal";
import { primaryButtonClass, secondaryButtonClass } from "@/components/landing/constants";

const includedHighlights = [
  "Personalized by a designer",
  "Mobile-ready and shareable",
  "One-time payment",
];

export default function PricingHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pb-32">
      <div className="invitation-grid absolute inset-0 -z-20 opacity-45" />
      <div className="absolute -left-44 top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-eucalyptus/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-champagne/15 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <ScrollReveal direction="left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white/75 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-forest shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-champagne-dark" aria-hidden="true" />
              Launch offer · {LAUNCH_DISCOUNT}
            </div>
            <h1 className="mt-7 text-balance font-instrumentSerif text-[3.5rem] leading-[0.93] tracking-[-0.04em] text-ink sm:text-7xl lg:text-[5.4rem]">
              A beautiful invitation,
              <span className="block italic text-eucalyptus-dark">one simple price.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Choose the level of storytelling your celebration needs. Every package is a one-time payment, designed and prepared for you.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#pricing-packages" className={primaryButtonClass}>
                Compare packages
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className={secondaryButtonClass}>
                Ask a question
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-forest/65">
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
              Most invitations are delivered within 3–7 business days
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.1}>
          <div className="relative mx-auto max-w-xl rounded-[2.25rem] border border-white/80 bg-white/80 p-4 shadow-[0_36px_90px_-45px_rgba(23,61,50,0.65)] backdrop-blur sm:p-6">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-forest px-6 py-8 text-white sm:px-9 sm:py-10">
              <div className="invitation-grid absolute inset-0 opacity-10" />
              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-champagne-light">Website invitation</p>
                    <h2 className="mt-3 font-instrumentSerif text-3xl sm:text-4xl">Made around your celebration</h2>
                  </div>
                  <span className="rounded-full bg-champagne px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.15em] text-forest">
                    {LAUNCH_DISCOUNT}
                  </span>
                </div>

                <div className="mt-10 flex items-end justify-between border-b border-white/10 pb-8">
                  <div>
                    <p className="text-xs text-white/45">Packages start at</p>
                    <p className="mt-1 font-instrumentSerif text-6xl leading-none sm:text-7xl">
                      <span className="mr-1 text-2xl text-champagne-light">₱</span>799
                    </p>
                  </div>
                  <p className="pb-1 text-right text-xs leading-5 text-white/45">No monthly<br />subscription</p>
                </div>

                <ul className="mt-7 space-y-4">
                  {includedHighlights.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/75">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-champagne-light">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
