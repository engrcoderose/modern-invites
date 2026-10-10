import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import InvitationCard from "@/components/portfolio/InvitationCard";
import { portfolioItems } from "@/lib/portfolio";

const recentInvitations = portfolioItems.slice(0, 6);

export default function FeaturedInvitations() {
  return (
    <section id="featured-work" aria-labelledby="work-heading" className="scroll-mt-24 bg-sage-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="home-work mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 id="work-heading" className="font-instrumentSerif text-3xl text-forest">Recent invitations</h2>
          <Link href="/portfolio" className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-forest">View portfolio <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
        </div>
        <div className="home-work-grid grid gap-6">
          {recentInvitations.map((item) => (
            <InvitationCard key={item.id} item={item} variant="home" sizes="(min-width: 1344px) 411px, (min-width: 1152px) 33vw, (min-width: 768px) 50vw, calc(100vw - 32px)" />
          ))}
        </div>
      </div>
    </section>
  );
}
