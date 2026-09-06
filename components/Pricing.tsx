import { PRICING_PACKAGES } from "@/lib/pricing";
import ScrollReveal from "@/components/landing/ScrollReveal";
import SectionHeading from "@/components/landing/SectionHeading";
import PackageCard from "@/components/pricing/PackageCard";
import ModularPricing from "@/components/pricing/ModularPricing";
import PricingGuide from "@/components/pricing/PricingGuide";
import PricingHero from "@/components/pricing/PricingHero";

export default function Pricing() {
  return (
    <>
      <PricingHero />

      <section
        id="pricing-packages"
        className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Website invitation packages"
            title={
              <>
                Everything listed.{" "}
                <span className="italic text-eucalyptus-dark">
                  Nothing vague.
                </span>
              </>
            }
            description="Compare every included feature, revision allowance, and experience before choosing your package."
            align="center"
          />

          <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
            {PRICING_PACKAGES.map((packageDetails, index) => (
              <ScrollReveal
                key={packageDetails.id}
                delay={index * 0.1}
                className="h-full"
              >
                <PackageCard packageDetails={packageDetails} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.12}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-ink-muted">
              Package turnaround and revision timing may vary with project
              complexity and current workload. We’ll confirm the schedule before
              work begins.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ModularPricing />

      <PricingGuide />
    </>
  );
}
