"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";
import { motion } from "framer-motion";
import useMarketingReducedMotion from "@/components/landing/useMarketingReducedMotion";

const AnimatedLink = motion.create(Link);
const AnimatedImage = motion.create(Image);

type Props = { item: PortfolioItem; priority?: boolean; sizes: string; variant?: "home" | "portfolio" };

export default function InvitationCard({ item, priority = false, sizes, variant = "portfolio" }: Props) {
  const reducedMotion = useMarketingReducedMotion();
  return (
    <article className="h-full min-w-0">
      <AnimatedLink initial="rest" animate="rest" whileHover={reducedMotion ? undefined : "hover"} whileFocus={reducedMotion ? undefined : "hover"} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} invitation (opens in a new tab)`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-forest/15 bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-4">
        <div className="relative h-48 overflow-hidden sm:h-52 lg:h-56" style={{ backgroundColor: item.accentLight }}>
          <AnimatedImage src={item.bgImage} alt="" fill priority={priority} className="object-cover" sizes={sizes} variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }} transition={{ duration: reducedMotion ? 0 : 0.4 }} />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center py-4">
            <motion.div className="relative aspect-[3/4] h-full overflow-hidden rounded-lg border-4 border-white/90 shadow-xl" style={{ backgroundColor: item.accentLight }} variants={{ rest: { rotate: -4 }, hover: { rotate: 0 } }} transition={{ duration: reducedMotion ? 0 : 0.4 }}>
              <Image src={item.previewImage} alt={item.previewAlt ?? `${item.title} invitation preview`} fill priority={priority} className={item.previewFit === "contain" ? "object-contain p-2" : "object-cover object-top"} sizes="160px" />
            </motion.div>
          </div>
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {item.tags.map(tag => <span key={tag} className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-gray-700">{tag}</span>)}
          </div>
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-800"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
        </div>
        <div className="flex flex-1 flex-col break-words p-5">
          <h3 className={`text-2xl leading-tight ${variant === "home" ? "font-instrumentSerif text-forest sm:text-3xl" : "font-elegant font-bold text-gray-900"}`}>{item.title}</h3>
          <p className="mt-1 text-xs font-medium" style={{ color: item.accent }}>{item.category}</p>
          <p className="mt-3 text-sm leading-6 text-marketing-muted">{item.description}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold" style={{ color: item.accent }}>View invitation <motion.span aria-hidden="true" variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 } }} transition={{ duration: reducedMotion ? 0 : 0.18 }}><ArrowUpRight className="h-4 w-4 shrink-0" /></motion.span></span>
        </div>
      </AnimatedLink>
    </article>
  );
}
