import Link from "@/components/landing/MotionLink";
import ScrollReveal from "@/components/landing/ScrollReveal";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";
import {
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/landing/constants";

export default function PricingHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pb-32">
      <div className="invitation-grid absolute inset-0 -z-20 opacity-45" />
      <div className="absolute -left-44 top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-eucalyptus/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-champagne/15 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance font-instrumentSerif text-[3.5rem] leading-[0.93] tracking-[-0.04em] text-ink sm:text-7xl lg:text-[5.4rem]">
            <ScrollReveal as="span" className="block">A beautiful invitation,</ScrollReveal>{" "}
            <ScrollReveal as="span" delay={0.08} className="block italic text-eucalyptus-dark">
              one simple price.
            </ScrollReveal>
          </h1>
          <ScrollReveal as="p" delay={0.12} className="mx-auto mt-7 max-w-xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
            Choose the level of storytelling your celebration needs. Every
            package is a one-time payment, designed and prepared for you.
          </ScrollReveal>
          <ScrollReveal delay={0.18} className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="#pricing-packages" className={primaryButtonClass}>
              Compare packages
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryButtonClass}
            >
              Ask a question
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
