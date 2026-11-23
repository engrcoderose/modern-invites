import ScrollReveal from "./ScrollReveal";
import Image from "next/image";
import { Check } from "lucide-react";
import locket from "@/components/landing/assets/hero/locket.webp";

const features = [
  { title: "Smart RSVP", description: "Collect guest responses and party details." },
  { title: "Live countdown", description: "Count down to your celebration." },
  { title: "Venue & maps", description: "Help guests find the venue." },
  { title: "Background music", description: "Welcome guests with your chosen song." },
  { title: "Photo gallery", description: "Share your favorite photos." },
  { title: "Event details", description: "Keep schedules, attire, and notes together." },
  { title: "Seat finder", description: "Help guests find their assigned table and seat.", fullWidth: true },
];

export default function FeatureShowcase() {
  return (
    <section id="features" className="bg-marketing-paper px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <ScrollReveal direction="fade" className="text-center lg:text-left">
          <Image src={locket} alt="" sizes="96px" className="mx-auto mb-7 h-28 w-24 object-contain lg:mx-0" />
          <h2 className="section-title text-marketing-ink">Beautiful to open.<br /><em className="text-brand-700">Easy to use.</em></h2>
          <p className="mt-6 text-sm leading-7 text-marketing-muted">Features vary by package.</p>
        </ScrollReveal>
        <dl className="studio-feature-sheet grid gap-x-8 gap-y-8 rounded-[2rem] p-7 sm:grid-cols-2 sm:p-10">
          {features.map((feature, index) => (
            <ScrollReveal
              key={feature.title}
              delay={(index % 2) * 0.08}
              className={feature.fullWidth ? "border-t border-brand-200/70 pt-6 sm:col-span-2" : undefined}
            >
              <Check className="mb-3 h-5 w-5 text-brand-700" strokeWidth={1.25} aria-hidden="true" />
              <dt className="font-elegant text-xl text-marketing-ink sm:text-2xl">{feature.title}</dt>
              <dd className="mt-3 max-w-xs text-sm leading-7 text-marketing-muted">{feature.description}</dd>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
