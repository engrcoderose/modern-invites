import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import type { PricingPackage } from "@/lib/pricing";
import { CONTACT_URL } from "@/lib/site";

type PackageCardProps = {
  packageDetails: PricingPackage;
};

export default function PackageCard({ packageDetails }: PackageCardProps) {
  const isFeatured = packageDetails.featured;
  const isLuxury = packageDetails.id === "luxury";

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9 ${
        isFeatured
          ? "bg-forest text-white shadow-[0_32px_80px_-32px_rgba(23,61,50,0.85)]"
          : isLuxury
            ? "border border-champagne/45 bg-[#fffdf8] text-ink shadow-[0_24px_60px_-38px_rgba(157,127,71,0.5)]"
            : "border border-forest/10 bg-white text-ink shadow-[0_24px_60px_-42px_rgba(23,61,50,0.45)]"
      }`}
    >
      {isFeatured ? (
        <div className="absolute right-0 top-0 rounded-bl-2xl bg-champagne px-5 py-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-forest">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Most loved
          </span>
        </div>
      ) : null}

      <p
        className={`text-[0.65rem] font-bold uppercase tracking-[0.26em] ${
          isFeatured ? "text-champagne-light" : "text-eucalyptus-dark"
        }`}
      >
        {packageDetails.name} package
      </p>
      <h3 className="mt-5 font-instrumentSerif text-4xl leading-none sm:text-5xl">
        {packageDetails.name}
      </h3>
      <p className={`mt-3 min-h-11 text-sm leading-6 ${isFeatured ? "text-white/60" : "text-ink-muted"}`}>
        {packageDetails.tagline}
      </p>

      <div className="mt-8 flex items-end gap-1.5">
        <span className={`mb-2 text-lg ${isFeatured ? "text-white/55" : "text-ink-muted"}`}>₱</span>
        <span className="font-instrumentSerif text-6xl leading-none tracking-[-0.03em]">
          {packageDetails.price}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span className={`line-through ${isFeatured ? "text-white/35" : "text-ink-muted/60"}`}>
          ₱{packageDetails.originalPrice}
        </span>
        <span className={`font-semibold ${isFeatured ? "text-champagne-light" : "text-eucalyptus-dark"}`}>
          one-time payment
        </span>
      </div>

      <p className={`mt-6 text-sm leading-6 ${isFeatured ? "text-white/65" : "text-ink-muted"}`}>
        {packageDetails.description}
      </p>
      <div className={`my-7 h-px ${isFeatured ? "bg-white/10" : "bg-forest/10"}`} />

      <p className={`mb-4 text-[0.62rem] font-bold uppercase tracking-[0.2em] ${isFeatured ? "text-white/45" : "text-ink-muted/70"}`}>
        What’s included
      </p>
      <ul className="flex-1 space-y-3.5">
        {packageDetails.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-3 text-sm leading-5 ${
              isFeatured ? "text-white/80" : "text-ink-muted"
            }`}
          >
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                isFeatured ? "bg-champagne/20 text-champagne-light" : "bg-eucalyptus/15 text-forest"
              }`}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-9 inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-bold transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          isFeatured
            ? "bg-white text-forest hover:bg-ivory focus-visible:ring-white focus-visible:ring-offset-forest"
            : "bg-forest text-white hover:bg-forest-light focus-visible:ring-forest"
        }`}
      >
        Choose {packageDetails.name}
      </Link>
    </article>
  );
}
