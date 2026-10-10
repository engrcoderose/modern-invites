import { Clock3, HeartHandshake, Smartphone, WalletCards } from "lucide-react";

const benefits = [
  { label: "Personalized by a designer", icon: HeartHandshake },
  { label: "Delivered in 3–7 business days", icon: Clock3 },
  { label: "One-time payment", icon: WalletCards },
  { label: "Made for every screen", icon: Smartphone },
];

export default function PricingBenefits() {
  return (
    <div id="pricing-benefits" className="border-y border-forest/10 bg-white px-4 sm:px-6 lg:px-8">
      <ul aria-label="Package benefits" className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-forest/10 sm:grid-cols-2 sm:divide-y-0 xl:grid-cols-4">
        {benefits.map(({ label, icon: Icon }, index) => (
          <li key={label} className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-3 py-5 text-center text-sm font-semibold leading-6 text-forest sm:text-base">
            {index > 0 && <span aria-hidden="true" className="absolute left-0 top-1/2 hidden h-6 w-px -translate-y-1/2 bg-forest/10 xl:block" />}
            <Icon className="h-4 w-4 shrink-0 text-eucalyptus-dark" aria-hidden="true" />
            <span className="min-w-0 max-w-full">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
