import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRICING_PACKAGES } from "@/lib/pricing";

export default function PricingPreview() {
  return (
    <section id="packages" className="scroll-mt-24 bg-gold-100 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><h2 className="home-heading text-forest">Choose your package.</h2><p className="max-w-sm text-sm leading-7 text-marketing-muted">One-time payment. No subscription.</p></div>
        <div className="mt-10 border-t border-forest/25">
          {PRICING_PACKAGES.map((packageDetails) => (
            <article key={packageDetails.id} className="grid items-center gap-x-8 gap-y-5 border-b border-forest/20 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_.65fr_1.25fr_auto]">
              <h3 className="font-instrumentSerif text-4xl text-forest">{packageDetails.name}</h3>
              <div className="sm:justify-self-end lg:justify-self-start">
                <p className="text-2xl font-medium tabular-nums text-forest">₱{packageDetails.price}</p>
              </div>
              <p className="text-sm font-medium leading-6 text-forest">{packageDetails.highlight}</p>
              <Link href={`/inquire?package=${packageDetails.id}`} className="inline-flex min-h-12 max-w-full items-center justify-center gap-4 justify-self-start rounded-md border border-forest/30 px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-ivory focus-visible:outline-forest sm:justify-self-end">Choose {packageDetails.name}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
        <Link href="/pricing" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-forest underline decoration-forest/40 underline-offset-8 hover:decoration-forest">Compare all features <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
