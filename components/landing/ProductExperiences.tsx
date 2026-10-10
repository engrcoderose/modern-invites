import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";
import websiteInvitations from "@/public/images/website-invitaions.png";
import readyToPrint from "@/public/images/ready-to-print.png";

export default function ProductExperiences() {
  return (
    <section id="services" className="scroll-mt-24">
      <div className="bg-forest px-4 py-16 text-ivory sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="home-heading max-w-lg">Your celebration,<br />all in one link.</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-marketing-muted-inverse">Share your story, photos, and event details through a custom link, with RSVP options to suit your package.</p>
            <Link href="/portfolio" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-ivory underline decoration-ivory/40 underline-offset-8 hover:decoration-ivory">View website invitations <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
          </div>
          <Image src={websiteInvitations} alt="Personalized invitation websites displayed on desktop and mobile screens" className="h-auto w-full" sizes="(min-width: 1344px) 720px, (min-width: 1024px) 55vw, calc(100vw - 32px)" />
        </div>
      </div>
      <div className="bg-champagne-light px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div className="mx-auto w-full max-w-sm"><Image src={readyToPrint} alt="Print-ready invitation designs" className="h-auto w-full" sizes="(min-width: 768px) 384px, (min-width: 640px) 36vw, calc(100vw - 32px)" /></div>
          <div>
            <h3 className="font-instrumentSerif text-4xl leading-tight text-forest sm:text-5xl">Prefer something to hold?</h3>
            <p className="mt-4 max-w-xl text-base leading-7 text-marketing-muted">Custom invitation designs, supplied as high-resolution files for your printer.</p>
            <Link href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-forest underline decoration-forest/40 underline-offset-8 hover:decoration-forest">Ask about print designs <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
