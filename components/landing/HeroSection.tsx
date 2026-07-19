import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import websiteInvitations from "@/public/images/website-invitaions.png";
import { primaryButtonClass, secondaryButtonClass } from "./constants";

const serviceDetails = ["Custom-designed", "Mobile-ready", "Easy to share"];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="invitation-grid absolute inset-0 -z-20 opacity-45" />
      <div className="absolute -left-40 top-16 -z-10 h-[30rem] w-[30rem] rounded-full bg-eucalyptus/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-champagne/15 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div className="max-w-2xl animate-soft-rise">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white/70 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-forest shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-champagne-dark" aria-hidden="true" />
            Bespoke digital invitations
          </div>

          <h1 className="text-balance font-instrumentSerif text-[3.5rem] leading-[0.92] tracking-[-0.045em] text-ink sm:text-7xl lg:text-[5.7rem]">
            Your celebration deserves
            <span className="block italic text-eucalyptus-dark">more than a template.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
            We design and build your personalized invitation website—ready for
            you to review, approve, and share with everyone you love.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="#featured-work" className={primaryButtonClass}>
              View live invitations
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="#packages" className={secondaryButtonClass}>
              Packages from ₱799
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-ink-muted">
            {serviceDetails.map((detail) => (
              <li key={detail} className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-eucalyptus/15 text-forest">
                  <Check className="h-2.5 w-2.5" aria-hidden="true" />
                </span>
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto min-h-[28rem] w-full max-w-[42rem] animate-soft-rise-delayed sm:min-h-[36rem] lg:min-h-[40rem]">
          <div className="absolute inset-x-[8%] bottom-0 top-[3%] rounded-t-[14rem] bg-forest shadow-[0_35px_80px_-35px_rgba(23,61,50,0.65)] sm:inset-x-[11%]" />
          <div className="absolute inset-x-[14%] bottom-[7%] top-[10%] rounded-t-[12rem] border border-white/20" />
          <div className="absolute left-[8%] top-[8%] z-20 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-xl backdrop-blur sm:left-[3%] sm:top-[12%]">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-eucalyptus-dark">
              Designed for you
            </p>
            <p className="mt-1 font-instrumentSerif text-xl text-ink">Every detail, considered.</p>
          </div>
          <div className="absolute bottom-[8%] right-[3%] z-20 rounded-2xl border border-white/15 bg-[#102e26]/95 px-4 py-3 text-white shadow-xl backdrop-blur sm:right-0">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-champagne-light">
              Guest-ready
            </p>
            <p className="mt-1 text-xs text-white/75">RSVP · Maps · Music · Gallery</p>
          </div>
          <Image
            src={websiteInvitations}
            alt="Modern Invites website invitations displayed across laptop, tablet, and phone"
            priority
            className="absolute bottom-[5%] left-1/2 z-10 w-[112%] max-w-none -translate-x-1/2 drop-shadow-[0_30px_26px_rgba(5,21,17,0.28)] sm:w-[108%]"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <span className="absolute right-[8%] top-[8%] font-meaCulpa text-5xl text-champagne-light sm:text-7xl">
            made with care
          </span>
        </div>
      </div>
    </section>
  );
}
