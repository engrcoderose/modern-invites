import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";
import ScrollReveal from "@/components/landing/ScrollReveal";
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
        <ScrollReveal direction="left">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance font-instrumentSerif text-[3.5rem] leading-[0.93] tracking-[-0.04em] text-ink sm:text-7xl lg:text-[5.4rem]">
              A beautiful invitation,
              <span className="block italic text-eucalyptus-dark">
                one simple price.
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Choose the level of storytelling your celebration needs. Every
              package is a one-time payment, designed and prepared for you.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
