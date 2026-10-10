import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PRICING_PACKAGES } from "@/lib/pricing";
import woodland from "@/app/vincent-and-gabrielle/assets/prenup/bg-invite.jpg";

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-ivory pt-28 sm:pt-32">
      <Image src={woodland} alt="" fill priority sizes="100vw" className="pointer-events-none -z-20 scale-105 object-cover object-[center_42%] blur-[2px]" />
      <div className="home-hero-wash pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto flex min-h-[calc(100svh-13rem)] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h1 id="hero-heading" className="home-display max-w-5xl text-forest">Your celebration deserves <span className="block italic text-eucalyptus-dark">an invitation of its own.</span></h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-marketing-muted sm:text-lg sm:leading-8">We create a custom invitation website that reflects your style and your occasion and not just a template. Review it, approve it, and share it with the people you love.</p>
        <p className="mt-6 text-sm leading-6 text-marketing-muted"><span className="font-semibold tabular-nums text-forest">From ₱{PRICING_PACKAGES[0].price}</span> · One-time payment</p>
        <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link href="#packages" className="inline-flex min-h-12 max-w-full items-center justify-center gap-4 rounded-full bg-forest px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-forest-light focus-visible:outline-forest">View packages <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
          <Link href="/portfolio" className="inline-flex min-h-12 max-w-full items-center justify-center gap-4 rounded-full border border-forest/30 bg-ivory/90 px-7 py-4 text-sm font-semibold text-forest transition-colors hover:bg-white focus-visible:outline-forest">View portfolio <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
