import { Sparkles } from "lucide-react";
import { LAUNCH_DISCOUNT, PRICING_PACKAGES } from "@/lib/pricing";
import ScrollReveal from "@/components/landing/ScrollReveal";
import SectionHeading from "@/components/landing/SectionHeading";
import PackageCard from "@/components/pricing/PackageCard";
import PricingGuide from "@/components/pricing/PricingGuide";
import PricingHero from "@/components/pricing/PricingHero";

export default function Pricing() {
  return (
    <>
      <PricingHero />

      <section id="pricing-packages" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Website invitation packages"
            title={<>Everything listed. <span className="italic text-eucalyptus-dark">Nothing vague.</span></>}
            description="Compare every included feature, revision allowance, and experience before choosing your package."
            align="center"
          />

          <ScrollReveal delay={0.08}>
            <div className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-[#eef4ef] px-4 py-2 text-xs font-bold text-forest">
              <Sparkles className="h-3.5 w-3.5 text-champagne-dark" aria-hidden="true" />
              Launch special: {LAUNCH_DISCOUNT} on every package
            </div>
          </ScrollReveal>

          <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
            {PRICING_PACKAGES.map((packageDetails, index) => (
              <ScrollReveal key={packageDetails.id} delay={index * 0.1} className="h-full">
                <PackageCard packageDetails={packageDetails} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.12}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-ink-muted">
              Package turnaround and revision timing may vary with project complexity and current workload. We’ll confirm the schedule before work begins.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <PricingGuide />
    </>
  );
}
