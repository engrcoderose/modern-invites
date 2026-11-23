import { Clock3, HeartHandshake, Smartphone, WalletCards } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

const benefits = [
  { label: "Personalized by a designer", icon: HeartHandshake },
  { label: "Delivered in 3–7 business days", icon: Clock3 },
  { label: "One-time payment", icon: WalletCards },
  { label: "Made for every screen", icon: Smartphone },
];

export default function PricingBenefits() {
  return (
    <div id="pricing-benefits" className="border-y border-brand-700/10 bg-brand-100 px-4 sm:px-6 lg:px-8">
      <ul aria-label="Package benefits" className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-brand-700/10 sm:grid-cols-2 sm:divide-y-0 xl:grid-cols-4">
        {benefits.map(({ label, icon: Icon }, index) => (
          <ScrollReveal as="li" key={label} delay={index * 0.05} className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-3 py-5 text-center text-sm font-semibold leading-6 text-brand-700 sm:text-base">
            {index > 0 && <span aria-hidden="true" className="absolute left-0 top-1/2 hidden h-6 w-px -translate-y-1/2 bg-brand-700/10 xl:block" />}
            <Icon className="h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
            <span className="min-w-0 max-w-full">{label}</span>
          </ScrollReveal>
        ))}
      </ul>
    </div>
  );
}
