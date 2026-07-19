import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const packages = [
  {
    name: "Classic",
    price: "799",
    description: "The essentials for a polished, shareable celebration website.",
    features: ["Custom invitation link", "RSVP form", "Photo gallery", "Mobile-friendly design"],
  },
  {
    name: "Signature",
    price: "1,999",
    description: "Our most-loved experience with richer storytelling and interactions.",
    features: ["Everything in Classic", "Custom design theme", "Countdown and maps", "Music and premium effects"],
    featured: true,
  },
  {
    name: "Luxury",
    price: "3,199",
    description: "A fully bespoke experience for celebrations with more to share.",
    features: ["Everything in Signature", "Fully custom design", "Video and registry options", "Priority support"],
  },
];

export default function PricingPreview() {
  return (
    <section id="packages" className="scroll-mt-24 bg-ivory px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Clear, one-time pricing"
          title={<>A beautiful beginning at <span className="italic text-eucalyptus-dark">₱799.</span></>}
          description="Choose a package, then let us shape the details around your celebration. No monthly subscription required."
          align="center"
        />

        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
          {packages.map((item, index) => (
            <ScrollReveal key={item.name} delay={index * 0.1} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-[2rem] p-7 sm:p-9 ${
                  item.featured
                    ? "bg-forest text-white shadow-[0_30px_70px_-30px_rgba(23,61,50,0.75)]"
                    : "border border-forest/10 bg-white text-ink"
                }`}
              >
              {item.featured ? (
                <span className="absolute right-6 top-6 rounded-full bg-champagne px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-forest">
                  Most loved
                </span>
              ) : null}
              <p className={`text-[0.65rem] font-bold uppercase tracking-[0.25em] ${item.featured ? "text-champagne-light" : "text-eucalyptus-dark"}`}>
                {item.name}
              </p>
              <div className="mt-8 flex items-end gap-1">
                <span className={`mb-2 text-lg ${item.featured ? "text-white/55" : "text-ink-muted"}`}>₱</span>
                <span className="font-instrumentSerif text-6xl leading-none">{item.price}</span>
              </div>
              <p className={`mt-5 min-h-12 text-sm leading-6 ${item.featured ? "text-white/60" : "text-ink-muted"}`}>{item.description}</p>
              <div className={`my-7 h-px ${item.featured ? "bg-white/10" : "bg-forest/10"}`} />
              <ul className="flex-1 space-y-3.5">
                {item.features.map((feature) => (
                  <li key={feature} className={`flex items-center gap-3 text-sm ${item.featured ? "text-white/80" : "text-ink-muted"}`}>
                    <Check className={`h-4 w-4 ${item.featured ? "text-champagne-light" : "text-eucalyptus-dark"}`} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-9 inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-bold transition hover:-translate-y-0.5 ${
                  item.featured ? "bg-white text-forest hover:bg-ivory" : "bg-forest text-white hover:bg-forest-light"
                }`}
              >
                Choose {item.name}
              </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.12}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <p className="text-sm text-ink-muted">Need the full feature comparison?</p>
            <Link href="/pricing" className="group inline-flex items-center gap-2 text-sm font-bold text-forest">
              View all package details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
