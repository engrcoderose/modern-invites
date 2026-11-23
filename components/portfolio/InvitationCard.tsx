"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";
import { motion } from "framer-motion";
import useMarketingReducedMotion from "@/components/landing/useMarketingReducedMotion";
import type { CSSProperties } from "react";
import styles from "./invitation-card.module.css";
import PhonePreview from "./PhonePreview";

const AnimatedLink = motion.create(Link);

type Props = { item: PortfolioItem; priority?: boolean; sizes: string };

export default function InvitationCard({ item, priority = false, sizes }: Props) {
  const reducedMotion = useMarketingReducedMotion();
  return (
    <article className="h-full min-w-0">
      <AnimatedLink initial="rest" animate="rest" whileHover={reducedMotion ? undefined : "hover"} whileFocus={reducedMotion ? undefined : "hover"} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} invitation (opens in a new tab)`} className={`${styles.collectionCard} group flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-4`}>
        <div className={`${styles.media} relative aspect-square overflow-hidden rounded-[1.4rem]`} style={{ "--sample-ground": item.accentLight } as CSSProperties}>
          <span className="absolute left-3 top-3 z-20 rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-brand-900">{item.category}</span>
          <span aria-hidden="true" className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 text-brand-900"><ArrowUpRight className="h-4 w-4" strokeWidth={1.5} /></span>
          <PhonePreview image={item.screens.opening} title={item.title} label={item.screens.hasOpening ? "Opening" : "First screen"} sizes={sizes} priority={priority} reducedMotion={reducedMotion} position="left" />
          <PhonePreview image={item.screens.hero} title={item.title} label="Hero" sizes={sizes} priority={priority} reducedMotion={reducedMotion} position="right" />
        </div>
        <div className="flex flex-1 flex-col break-words pb-2 pt-4">
          <h3 className="font-elegant text-xl leading-snug text-marketing-ink sm:text-[1.4rem]">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-marketing-muted">{item.description}</p>
          {!item.screens.hasOpening && <p className="mt-2 text-xs leading-5 text-marketing-muted">This design opens directly to its hero.</p>}
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-marketing-muted">
            {item.tags.map(tag => <span key={tag}>{tag}</span>)}
          </div>
          <span className="mt-3 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand-800">View invitation <ArrowUpRight className="link-arrow h-3.5 w-3.5 shrink-0" aria-hidden="true" /></span>
        </div>
      </AnimatedLink>
    </article>
  );
}
