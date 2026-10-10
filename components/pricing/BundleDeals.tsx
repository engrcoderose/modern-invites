import { Gift } from "lucide-react";
import { PRICING_BUNDLES } from "@/lib/pricing-bundles";

const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 });

export default function BundleDeals() {
  return (
    <section id="bundle-deals" aria-labelledby="bundle-heading" className="mt-8 rounded-2xl border border-forest/15 bg-gold-50 p-5 sm:p-8">
      <header className="flex flex-col items-center gap-2 border-b border-forest/15 pb-6 text-center">
        <h3 id="bundle-heading" className="flex flex-wrap items-center justify-center gap-3 font-instrumentSerif text-2xl leading-tight text-forest sm:text-3xl">
          <Gift className="h-5 w-5 shrink-0 text-champagne-dark" aria-hidden="true" />
          <span className="min-w-0">Bundle deals</span>
        </h3>
        <p className="text-sm leading-6 text-marketing-muted">Save more when you bundle</p>
      </header>

      <dl className="mt-4">
        {PRICING_BUNDLES.map((bundle) => (
          <div key={bundle.id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-dashed border-forest/15 py-6 last:border-b-0">
            <dt className="min-w-0 flex-[1_1_20rem] text-sm leading-7 text-forest">{bundle.packageName} + {bundle.addOns.map((item) => item.name).join(" + ")}</dt>
            <dd className="ml-auto min-w-0 max-w-full text-right">
              <p className="text-lg font-semibold leading-7 tabular-nums text-forest">{peso.format(bundle.price)}</p>
              <p className="mt-1 text-xs leading-6 text-marketing-muted">Separate total <s className="tabular-nums">{peso.format(bundle.separatePrice)}</s></p>
              <p className="text-xs font-semibold leading-6 text-forest">Save {peso.format(bundle.savings)}</p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
