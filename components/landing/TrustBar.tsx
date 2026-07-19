import { Clock3, HeartHandshake, Smartphone, WalletCards } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const trustPoints = [
  { icon: HeartHandshake, label: "Personalized by a designer" },
  { icon: Clock3, label: "Delivered in 3–7 business days" },
  { icon: WalletCards, label: "One-time payment" },
  { icon: Smartphone, label: "Made for every screen" },
];

export default function TrustBar() {
  return (
    <section aria-label="Service highlights" className="border-y border-forest/10 bg-white/75 px-4 py-5 sm:px-6">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4 md:divide-x md:divide-forest/10">
        {trustPoints.map(({ icon: Icon, label }, index) => (
          <li key={label}>
            <ScrollReveal delay={index * 0.06} distance={16}>
              <div className="flex items-center justify-center gap-2.5 px-2 text-center text-xs font-semibold text-forest sm:text-sm">
                <Icon className="h-4 w-4 shrink-0 text-eucalyptus-dark" strokeWidth={1.7} aria-hidden="true" />
                <span>{label}</span>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
