"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { MODULAR_FEATURES, PRICING_PACKAGES, type PackageId } from "@/lib/pricing";
import { calculatePackageEstimate, createEstimateInquiryHref, formatEstimatePrice, isAddOnIncluded } from "@/lib/package-estimate";
import StudioHeading from "@/components/marketing/StudioHeading";
import { primaryButtonClass } from "@/components/landing/constants";
import FinderOption from "./FinderOption";
import EstimateBreakdown from "./EstimateBreakdown";

const groups = [
  { category: "guests", question: "What should your guests be able to do?", number: 2 },
  { category: "design", question: "Which details would make it yours?", number: 3 },
] as const;

export default function PackageFinder() {
  const [packageId, setPackageId] = useState<PackageId>("classic");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const options = useRef<HTMLDivElement>(null);
  const summary = useRef<HTMLElement>(null);
  const optionsVisible = useInView(options);
  const summaryVisible = useInView(summary);
  const estimate = calculatePackageEstimate(packageId, selectedNames);

  function toggleAddOn(name: string) {
    setSelectedNames(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  }

  return (
    <section id="package-finder" aria-labelledby="finder-heading" className="section-lilac scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <StudioHeading id="finder-heading" description="Choose your package and the extras you love. See your estimate update as you go.">Find the package that fits <em className="text-brand-700">your story.</em></StudioHeading>
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
          <div ref={options} className="studio-service-panel order-2 space-y-6 rounded-[2rem] p-5 pb-24 sm:p-6 sm:pb-24 lg:order-1 lg:pb-6">
            <fieldset>
              <legend className="mb-4 flex items-start gap-2.5 font-elegant text-lg leading-snug text-marketing-ink sm:text-xl"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 font-sans text-[11px] font-semibold text-white">1</span>Which package feels like you?</legend>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {PRICING_PACKAGES.map(item => <FinderOption key={item.id} type="radio" name="finder-package" value={item.id} title={item.name} detail={`₱${item.price} · ${item.bestFor}`} checked={packageId === item.id} onChange={() => setPackageId(item.id)} />)}
              </div>
            </fieldset>
            {groups.map(group => (
              <fieldset key={group.category}>
                <legend className="mb-4 flex items-start gap-2.5 font-elegant text-lg leading-snug text-marketing-ink sm:text-xl"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 font-sans text-[11px] font-semibold text-white">{group.number}</span>{group.question}</legend>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {MODULAR_FEATURES.filter(item => item.category === group.category).map(item => {
                    const included = isAddOnIncluded(packageId, item.name);
                    return <FinderOption key={item.name} type="checkbox" name="finder-addon" value={item.name} title={item.name} detail={included ? `Included in ${estimate.packageDetails.name}` : `₱${item.price}${item.note ? ` ${item.note}` : ""}`} checked={included || selectedNames.includes(item.name)} included={included} onChange={() => toggleAddOn(item.name)} />;
                  })}
                </div>
              </fieldset>
            ))}
            <button type="button" onClick={() => { setPackageId("classic"); setSelectedNames([]); }} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand-800 underline underline-offset-4"><RotateCcw className="h-4 w-4" aria-hidden="true" />Reset choices</button>
          </div>
          <aside ref={summary} id="package-estimate" aria-labelledby="estimate-heading" className="studio-price order-1 scroll-mt-28 rounded-[2rem] p-6 sm:p-8 lg:sticky lg:top-28 lg:order-2">
            <h3 id="estimate-heading" className="text-xs font-semibold uppercase tracking-[.16em] text-brand-800">Your estimate</h3>
            <p role="status" aria-live="polite" aria-atomic="true" className="mt-5 break-words font-elegant text-5xl leading-tight tabular-nums text-brand-800 sm:text-6xl"><span className="sr-only">Estimated total: </span>{formatEstimatePrice(estimate.total)}</p>
            <p className="mt-3 font-elegant text-xl italic text-brand-800">{estimate.packageDetails.name}{estimate.addOns.length ? ` + ${estimate.addOns.length} add-on${estimate.addOns.length === 1 ? "" : "s"}` : " package"}</p>
            <div className="my-6 border-t border-brand-700/15 pt-6"><EstimateBreakdown estimate={estimate} /></div>
            <Link href={createEstimateInquiryHref(estimate)} className={`${primaryButtonClass} w-full`}>Ask about this setup<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
            <p className="mt-5 text-xs leading-6 text-marketing-muted">{estimate.bundle ? "Your best matching listed bundle is applied; discounts are not stacked. " : ""}Estimate based on listed rates. We’ll confirm the final scope and price before booking.</p>
          </aside>
        </div>
      </div>
      {optionsVisible && !summaryVisible && <div className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between gap-4 rounded-2xl border border-white bg-brand-100 p-4 shadow-[0_12px_32px_-12px_#2c19484d] lg:hidden"><p aria-hidden="true" className="font-elegant text-2xl tabular-nums text-brand-900">{formatEstimatePrice(estimate.total)}</p><a href="#package-estimate" className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-800 underline underline-offset-4">View estimate ↑</a></div>}
    </section>
  );
}
