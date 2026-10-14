import Link from "@/components/landing/MotionLink";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";
import BundleDeals from "@/components/pricing/BundleDeals";
import { MODULAR_FEATURES } from "@/lib/pricing";
import { CONTACT_URL } from "@/lib/site";

const featureGroups = [
  { id: "design", title: "Design & story" },
  { id: "guests", title: "Guests & details" },
] as const;

export default function ModularPricing() {
  return (
    <section id="modular-pricing" aria-labelledby="modular-heading" className="bg-ivory px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal direction="fade" className="mx-auto max-w-2xl text-center">
          <h2 id="modular-heading" className="font-instrumentSerif text-4xl leading-tight text-forest sm:text-5xl">Add-ons for Classic.</h2>
          <p className="mt-4 text-base leading-7 text-marketing-muted">Your essentials are included. Add the extras you need.</p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,28rem),1fr))] gap-6 lg:gap-8">
          {featureGroups.map((group, index) => (
            <div key={group.id} className="h-full">
              <article aria-labelledby={`modular-${group.id}`} className="h-full rounded-2xl border border-forest/15 bg-sage-50 p-5 sm:p-8">
                <ScrollReveal as="h3" id={`modular-${group.id}`} delay={index * 0.08} className="border-b border-forest/15 pb-6 text-center font-instrumentSerif text-2xl leading-tight text-forest sm:text-3xl">{group.title}</ScrollReveal>
                <dl className="mt-4">
                  {MODULAR_FEATURES.filter((feature) => feature.category === group.id).map((feature) => (
                    <ScrollReveal key={feature.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-dashed border-forest/15 py-4 last:border-b-0">
                      <dt className="min-w-0 flex-[1_1_8rem] text-sm leading-6 text-marketing-muted">
                        {feature.name}
                        {feature.note && <span className="mt-1 block text-xs leading-5">{feature.note}</span>}
                      </dt>
                      <dd className="ml-auto shrink-0 text-sm font-semibold leading-6 tabular-nums text-forest">₱{feature.price}</dd>
                    </ScrollReveal>
                  ))}
                </dl>
              </article>
            </div>
          ))}
        </div>

        <BundleDeals />

        <ScrollReveal className="mt-8 text-center">
          <Link href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 max-w-full items-center justify-center gap-3 text-sm font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:text-eucalyptus-dark">
            Discuss add-ons & bundles <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-marketing-muted">Starting rates. Final prices depend on content, complexity, and customization.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
