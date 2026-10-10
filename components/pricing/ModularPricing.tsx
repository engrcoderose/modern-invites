import Link from "next/link";
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
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="modular-heading" className="font-instrumentSerif text-4xl leading-tight text-forest sm:text-5xl">Add-ons for Classic.</h2>
          <p className="mt-4 text-base leading-7 text-marketing-muted">Your essentials are included. Add the extras you need.</p>
        </div>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,28rem),1fr))] gap-6 lg:gap-8">
          {featureGroups.map((group) => (
            <ScrollReveal key={group.id} className="h-full">
              <article aria-labelledby={`modular-${group.id}`} className="h-full rounded-2xl border border-forest/15 bg-sage-50 p-5 sm:p-8">
                <h3 id={`modular-${group.id}`} className="border-b border-forest/15 pb-6 text-center font-instrumentSerif text-2xl leading-tight text-forest sm:text-3xl">{group.title}</h3>
                <dl className="mt-4">
                  {MODULAR_FEATURES.filter((feature) => feature.category === group.id).map((feature) => (
                    <div key={feature.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-dashed border-forest/15 py-4 last:border-b-0">
                      <dt className="min-w-0 flex-[1_1_8rem] text-sm leading-6 text-marketing-muted">{feature.name}</dt>
                      <dd className="ml-auto shrink-0 text-sm font-semibold leading-6 tabular-nums text-forest">₱{feature.price}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <BundleDeals />

        <div className="mt-8 text-center">
          <Link href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 max-w-full items-center justify-center gap-3 text-sm font-semibold text-forest underline decoration-forest/30 underline-offset-4 transition-colors hover:text-eucalyptus-dark">
            Discuss add-ons & bundles <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-marketing-muted">Starting rates. Final prices depend on content, complexity, and customization.</p>
        </div>
      </div>
    </section>
  );
}
