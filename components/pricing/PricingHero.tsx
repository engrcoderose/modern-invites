import Link from "@/components/landing/MotionLink";
import ScrollReveal from "@/components/landing/ScrollReveal";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/landing/constants";

export default function PricingHero() {
  return (
    <section id="packages" className="bg-marketing-paper relative isolate scroll-mt-24 overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="section-title text-marketing-ink">
            <ScrollReveal as="span" className="block">A beautiful invitation,</ScrollReveal>{" "}
            <ScrollReveal as="span" delay={0.08} className="block italic text-brand-700">
              one simple price.
            </ScrollReveal>
          </h2>
          <ScrollReveal as="p" delay={0.12} className="mx-auto mt-7 max-w-xl text-base leading-7 text-marketing-muted sm:text-lg sm:leading-8">
            Choose the level of storytelling your celebration needs. Every
            package is a one-time payment, designed and prepared for you.
          </ScrollReveal>
          <ScrollReveal delay={0.18} className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="#pricing-packages" className={primaryButtonClass}>
              Compare packages
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/#inquire"
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
