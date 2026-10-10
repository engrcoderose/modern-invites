import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";

type Props = { item: PortfolioItem; priority?: boolean; sizes: string; variant?: "home" | "portfolio" };

export default function InvitationCard({ item, priority = false, sizes, variant = "portfolio" }: Props) {
  return (
    <article className="min-w-0">
      <Link href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} invitation (opens in a new tab)`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-forest/15 bg-white transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-4">
        <div className="relative h-48 overflow-hidden sm:h-52 lg:h-56" style={{ backgroundColor: item.accentLight }}>
          <Image src={item.bgImage} alt="" fill priority={priority} className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" sizes={sizes} />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center py-4">
            <div className="relative aspect-[3/4] h-full rotate-[-4deg] overflow-hidden rounded-lg border-4 border-white/90 shadow-xl transition-transform duration-500 motion-safe:group-hover:rotate-0" style={{ backgroundColor: item.accentLight }}>
              <Image src={item.previewImage} alt={item.previewAlt ?? `${item.title} invitation preview`} fill priority={priority} className={item.previewFit === "contain" ? "object-contain p-2" : "object-cover object-top"} sizes="160px" />
            </div>
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
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold" style={{ color: item.accent }}>View invitation <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" /></span>
        </div>
      </Link>
    </article>
  );
}
