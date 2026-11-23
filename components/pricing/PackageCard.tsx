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

  return (
    <motion.article
      style={{ transition: "none" }}
      initial={false}
      animate={reducedMotion ? { y: 0 } : undefined}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      className={`studio-price relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 text-marketing-ink sm:p-8 ${isFeatured ? "studio-price-featured" : ""}`}
    >
      <ScrollReveal className="flex min-h-8 flex-wrap items-center justify-between gap-3">
        <p
          className="text-[0.65rem] font-bold uppercase tracking-[0.26em] text-brand-900"
        >
          {packageDetails.name} package
        </p>
        {isFeatured ? (
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-950">
            <Sparkles className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="min-w-0">Most loved</span>
          </span>
        ) : null}
      </ScrollReveal>
      <ScrollReveal as="h3" delay={0.04} className="mt-5 break-words font-elegant text-4xl leading-none sm:text-5xl">
        {packageDetails.name}
      </ScrollReveal>
      <ScrollReveal as="p" delay={0.08}
        className="mt-3 min-h-11 text-sm leading-6 text-marketing-muted"
      >
        {packageDetails.tagline}
      </ScrollReveal>

      <ScrollReveal className="mt-8 flex items-end gap-1.5">
        <span
          className="mb-2 text-lg text-marketing-muted"
        >
          ₱
        </span>
        <span className="font-elegant text-6xl leading-none tracking-[-0.03em]">
          {packageDetails.price}
        </span>
      </ScrollReveal>
      <ScrollReveal className="mt-2 text-xs">
        <span
          className="font-semibold text-brand-900"
        >
          one-time payment
        </span>
      </ScrollReveal>

      <ScrollReveal as="p"
        className="mt-6 text-sm leading-6 text-marketing-muted"
      >
        {packageDetails.description}
      </ScrollReveal>
      <div
        className="my-7 h-px bg-brand-700/15"
      />

      <ScrollReveal as="p"
        className="mb-4 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-marketing-muted"
      >
        What’s included
      </ScrollReveal>
      <ul className="flex-1 space-y-3.5">
        {packageDetails.features.map((feature) => (
          <ScrollReveal as="li"
            key={feature}
            className="flex items-start gap-3 text-sm leading-5 text-marketing-muted"
          >
            <span
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/70 text-brand-700"
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
        href={`/?package=${packageDetails.id}#inquire`}
        className={`mt-9 inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          isFeatured
            ? "bg-brand-800 text-white hover:bg-brand-900 focus-visible:ring-brand-800"
            : "bg-brand-700 text-white hover:bg-brand-800 focus-visible:ring-brand-700"
        }`}
      >
        Ask about {packageDetails.name}
      </Link>
    </motion.article>
  );
}
