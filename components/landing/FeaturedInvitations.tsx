import Link from "@/components/landing/MotionLink";
import { ArrowUpRight } from "lucide-react";
import InvitationCard from "@/components/portfolio/InvitationCard";
import { homePhoneSizes } from "@/components/portfolio/image-sizes";
import { portfolioItems } from "@/lib/portfolio";
import ScrollReveal from "./ScrollReveal";
import StudioHeading from "@/components/marketing/StudioHeading";

const recentInvitations = portfolioItems.slice(0, 6);

export default function FeaturedInvitations() {
  return (
    <section id="featured-work" aria-labelledby="work-heading" className="bg-marketing-paper scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="home-work mx-auto max-w-6xl">
        <StudioHeading id="work-heading" ornament>Recent <em className="text-brand-700">invitations.</em></StudioHeading>
        <div className="home-work-grid mt-12 grid gap-x-7 gap-y-8 sm:mt-16">
          {recentInvitations.map((item, index) => (
            <ScrollReveal key={item.id} delay={(index % 3) * 0.06} className="h-full min-w-0">
              <InvitationCard item={item} sizes={homePhoneSizes} />
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center lg:mt-20"><Link href="/portfolio" className="studio-button inline-flex min-h-12 items-center gap-8 rounded-full px-7 py-3 text-sm font-semibold text-brand-800">View portfolio <ArrowUpRight className="link-arrow h-4 w-4" aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
