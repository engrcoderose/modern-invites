import ScrollReveal from "@/components/landing/ScrollReveal";
import BundleDeals from "@/components/pricing/BundleDeals";
import DigitalInvitationsPricing from "@/components/pricing/DigitalInvitationsPricing";
import { MODULAR_FEATURES } from "@/lib/pricing";

const featureGroups = [
  { id: "design", title: "Design & story" },
  { id: "guests", title: "Guests & details" },
] as const;

export default function ModularPricing() {
  return (
    <section id="modular-pricing" aria-labelledby="modular-heading" className="bg-brand-100 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal direction="fade" className="mx-auto max-w-2xl text-center">
          <h2 id="modular-heading" className="font-elegant text-4xl leading-tight text-brand-700 sm:text-5xl">Add-ons for Classic.</h2>
          <p className="mt-4 text-base leading-7 text-marketing-muted">Your essentials are included. Add the extras you need.</p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,28rem),1fr))] gap-6 lg:gap-8">
          {featureGroups.map((group, index) => (
            <div key={group.id} className="h-full">
              <article aria-labelledby={`modular-${group.id}`} className="h-full rounded-2xl border border-brand-700/15 bg-brand-50 p-5 sm:p-8">
                <ScrollReveal as="h3" id={`modular-${group.id}`} delay={index * 0.08} className="border-b border-brand-700/15 pb-6 text-center font-elegant text-2xl leading-tight text-brand-700 sm:text-3xl">{group.title}</ScrollReveal>
                <dl className="mt-4">
                  {MODULAR_FEATURES.filter((feature) => feature.category === group.id).map((feature) => (
                    <ScrollReveal key={feature.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-dashed border-brand-700/15 py-4 last:border-b-0">
                      <dt className="min-w-0 flex-[1_1_8rem] text-sm leading-6 text-marketing-muted">
                        {feature.name}
                        {feature.note && <span className="mt-1 block text-xs leading-5">{feature.note}</span>}
                      </dt>
                      <dd className="ml-auto shrink-0 text-sm font-semibold leading-6 tabular-nums text-brand-700">₱{feature.price}</dd>
                    </ScrollReveal>
                  ))}
                </dl>
              </article>
            </div>
          ))}
        </div>

        <DigitalInvitationsPricing />
        <BundleDeals />
      </div>
    </section>
  );
}
