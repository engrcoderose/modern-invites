"use client";

import Link from "@/components/landing/MotionLink";
import { motion } from "framer-motion";
import useMarketingReducedMotion from "@/components/landing/useMarketingReducedMotion";
import ScrollReveal from "@/components/landing/ScrollReveal";
import { Check, Sparkles } from "lucide-react";
import type { PricingPackage } from "@/lib/pricing";

type PackageCardProps = {
  packageDetails: PricingPackage;
};

export default function PackageCard({ packageDetails }: PackageCardProps) {
  const reducedMotion = useMarketingReducedMotion();
  const isFeatured = packageDetails.featured;
  const isLuxury = packageDetails.id === "luxury";

  return (
    <motion.article
      style={{ transition: "none" }}
      initial={false}
      animate={reducedMotion ? { y: 0 } : undefined}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9 ${
        isFeatured
          ? "bg-forest text-white shadow-[0_32px_80px_-32px] shadow-forest/85"
          : isLuxury
            ? "border border-champagne/45 bg-marketing-paper text-ink shadow-[0_24px_60px_-38px] shadow-champagne-dark/50"
            : "border border-forest/10 bg-white text-ink shadow-[0_24px_60px_-42px] shadow-forest/45"
      }`}
    >
      <ScrollReveal className="flex min-h-8 flex-wrap items-center justify-between gap-3">
        <p
          className={`text-[0.65rem] font-bold uppercase tracking-[0.26em] ${
            isFeatured ? "text-champagne-light" : "text-eucalyptus-dark"
          }`}
        >
          {packageDetails.name} package
        </p>
        {isFeatured ? (
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-champagne px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-forest">
            <Sparkles className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="min-w-0">Most loved</span>
          </span>
        ) : null}
      </ScrollReveal>
      <ScrollReveal as="h3" delay={0.04} className="mt-5 break-words font-instrumentSerif text-4xl leading-none sm:text-5xl">
        {packageDetails.name}
      </ScrollReveal>
      <ScrollReveal as="p" delay={0.08}
        className={`mt-3 min-h-11 text-sm leading-6 ${isFeatured ? "text-white/60" : "text-ink-muted"}`}
      >
        {packageDetails.tagline}
      </ScrollReveal>

      <ScrollReveal className="mt-8 flex items-end gap-1.5">
        <span
          className={`mb-2 text-lg ${isFeatured ? "text-white/55" : "text-ink-muted"}`}
        >
          ₱
        </span>
        <span className="font-instrumentSerif text-6xl leading-none tracking-[-0.03em]">
          {packageDetails.price}
        </span>
      </ScrollReveal>
      <ScrollReveal className="mt-2 text-xs">
        <span
          className={`font-semibold ${isFeatured ? "text-champagne-light" : "text-eucalyptus-dark"}`}
        >
          one-time payment
        </span>
      </ScrollReveal>

      <ScrollReveal as="p"
        className={`mt-6 text-sm leading-6 ${isFeatured ? "text-white/65" : "text-ink-muted"}`}
      >
        {packageDetails.description}
      </ScrollReveal>
      <div
        className={`my-7 h-px ${isFeatured ? "bg-white/10" : "bg-forest/10"}`}
      />

      <ScrollReveal as="p"
        className={`mb-4 text-[0.62rem] font-bold uppercase tracking-[0.2em] ${isFeatured ? "text-marketing-muted-inverse" : "text-marketing-muted"}`}
      >
        What’s included
      </ScrollReveal>
      <ul className="flex-1 space-y-3.5">
        {packageDetails.features.map((feature) => (
          <ScrollReveal as="li"
            key={feature}
            className={`flex items-start gap-3 text-sm leading-5 ${
              isFeatured ? "text-white/80" : "text-ink-muted"
            }`}
          >
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                isFeatured
                  ? "bg-champagne/20 text-champagne-light"
                  : "bg-eucalyptus/15 text-forest"
              }`}
            >
              <Check
                className="h-2.5 w-2.5"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </span>
            <span className="min-w-0">
              {feature}
              {packageDetails.featureNotes?.[feature] && (
                <span className="mt-1 block text-xs leading-5">
                  {packageDetails.featureNotes[feature]}
                </span>
              )}
            </span>
          </ScrollReveal>
        ))}
      </ul>

      <Link
        href={`/inquire?package=${packageDetails.id}`}
        className={`mt-9 inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          isFeatured
            ? "bg-white text-forest hover:bg-ivory focus-visible:ring-white focus-visible:ring-offset-forest"
            : "bg-forest text-white hover:bg-forest-light focus-visible:ring-forest"
        }`}
      >
        Ask about {packageDetails.name}
      </Link>
    </motion.article>
  );
}
