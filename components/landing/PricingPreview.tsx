import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRICING_PACKAGES } from "@/lib/pricing";
import PackageCard from "@/components/pricing/PackageCard";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

export default function PricingPreview() {
  return (
    <section id="packages" className="scroll-mt-24 bg-ivory px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Clear, one-time pricing"
          title={<>A beautiful beginning at <span className="italic text-eucalyptus-dark">₱799.</span></>}
          description="Every package detail is listed below, so you can choose confidently. No subscription and no hidden monthly fees."
          align="center"
        />

        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
          {PRICING_PACKAGES.map((packageDetails, index) => (
            <ScrollReveal key={packageDetails.id} delay={index * 0.1} className="h-full">
              <PackageCard packageDetails={packageDetails} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.12}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <p className="text-sm text-ink-muted">Want help comparing the options?</p>
            <Link href="/pricing" className="group inline-flex items-center gap-2 text-sm font-bold text-forest">
              Open the complete pricing guide
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
