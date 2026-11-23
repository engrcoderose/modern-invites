import { formatEstimatePrice, type PackageEstimate } from "@/lib/package-estimate";

export default function EstimateBreakdown({ estimate }: { estimate: PackageEstimate }) {
  return (
    <div className="text-sm leading-6 text-marketing-muted">
      <dl className="space-y-3">
        <div className="flex items-baseline justify-between gap-4">
          <dt>{estimate.packageDetails.name} package</dt><dd className="shrink-0 tabular-nums">{formatEstimatePrice(estimate.basePrice)}</dd>
        </div>
        {estimate.addOns.map(item => (
          <div key={item.name} className="flex items-baseline justify-between gap-4">
            <dt className="min-w-0">{item.name}</dt><dd className="shrink-0 tabular-nums">₱{item.price}</dd>
          </div>
        ))}
        {estimate.savings > 0 && <>
          <div className="flex items-baseline justify-between gap-4 border-t border-brand-700/15 pt-3"><dt>Separate total</dt><dd className="shrink-0 tabular-nums">{formatEstimatePrice(estimate.separatePrice)}</dd></div>
          <div className="flex items-baseline justify-between gap-4 font-semibold text-brand-800"><dt>Bundle savings</dt><dd className="shrink-0 tabular-nums">−{formatEstimatePrice(estimate.savings)}</dd></div>
        </>}
      </dl>
    </div>
  );
}
