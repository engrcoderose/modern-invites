import { portfolioItems } from "@/lib/portfolio";
import { PRICING_PACKAGES } from "@/lib/pricing";
import ScrollReveal from "./ScrollReveal";
import styles from "./hero.module.css";

const startingPrice = Math.min(...PRICING_PACKAGES.map(item => Number(item.price.replaceAll(",", ""))));
const highlights = [
  { value: String(portfolioItems.length), label: "Invitation samples" },
  { value: `₱${startingPrice.toLocaleString("en-PH")}`, label: "Website packages from" },
  { value: "3–7", label: "Business days, typically" },
  { value: "One-time", label: "Payment · no monthly fees" },
];

export default function HeroHighlights() {
  return (
    <ScrollReveal direction="fade" delay={0.16} className={`${styles.highlights} relative z-10 mt-10 w-full max-w-4xl px-2 pt-5 sm:mt-12 sm:px-6`}>
      <dl aria-label="Modern Invites at a glance" className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-8">
        {highlights.map(item => (
          <div key={item.label} className="flex min-w-0 flex-col border-t border-brand-800/20 pt-4">
            <dt className="mt-2 text-[10px] font-medium uppercase leading-5 tracking-[.1em] text-brand-900 sm:text-[11px]">{item.label}</dt>
            <dd className={`${styles.highlightValue} order-first text-brand-900`}>{item.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-[11px] leading-5 text-marketing-muted">Turnaround begins once your event details and content are complete.</p>
    </ScrollReveal>
  );
}
