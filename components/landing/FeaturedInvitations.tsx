import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight, Music2, Navigation2, Timer, UsersRound } from "lucide-react";
import ericCouple from "@/app/eric-and-li/assets/images/gallery-one-couple.jpg";
import ericBackground from "@/app/eric-and-li/assets/hero-background.png";
import stephaniePortrait from "@/app/stephanie-at-18/assets/HeroPhoto.png";
import stephanieBackground from "@/app/stephanie-at-18/assets/bg/hero-background.jpg";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

type Invitation = {
  title: string;
  category: string;
  description: string;
  href: string;
  portrait: StaticImageData;
  background: StaticImageData;
  tone: "forest" | "berry";
  features: string[];
};

const invitations: Invitation[] = [
  {
    title: "Eric & Li",
    category: "Wedding invitation",
    description: "A romantic, story-led website with guest RSVP, event details, music, and an intimate gallery.",
    href: "/eric-and-li",
    portrait: ericCouple,
    background: ericBackground,
    tone: "forest",
    features: ["Countdown", "Smart RSVP", "Maps", "Music"],
  },
  {
    title: "Stephanie at 18",
    category: "Debut invitation",
    description: "A bright, expressive debut experience with program details, dress guides, and a personalized RSVP flow.",
    href: "/stephanie-at-18",
    portrait: stephaniePortrait,
    background: stephanieBackground,
    tone: "berry",
    features: ["Program", "Smart RSVP", "Dress code", "Gallery"],
  },
];

const featureIcons = [Timer, UsersRound, Navigation2, Music2];

export default function FeaturedInvitations() {
  return (
    <section id="featured-work" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Selected celebrations"
            title={<>Invitations you can <span className="italic text-eucalyptus-dark">feel.</span></>}
            description="Explore real invitations, crafted around the people, details, and atmosphere of each celebration."
          />
          <ScrollReveal direction="right" delay={0.12} className="self-start lg:self-end">
            <Link href="/portfolio" className="group inline-flex items-center gap-2 text-sm font-bold text-forest">
              Explore the full portfolio
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          {invitations.map((invitation, index) => {
            const isForest = invitation.tone === "forest";

            return (
              <ScrollReveal key={invitation.title} delay={index * 0.12} direction={index === 0 ? "left" : "right"} className="h-full">
                <article
                  className={`group relative min-h-[38rem] overflow-hidden rounded-[2rem] ${isForest ? "bg-forest" : "bg-[#6e2334]"}`}
                >
                <Image
                  src={invitation.background}
                  alt=""
                  fill
                  className="object-cover opacity-25 transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10" />
                <div className="absolute inset-x-0 top-0 flex h-[68%] items-center justify-center p-8">
                  <div className={`relative h-full w-[58%] max-w-[17rem] rotate-[-2deg] overflow-hidden rounded-t-[9rem] rounded-b-[1.25rem] border-[6px] shadow-2xl transition duration-500 group-hover:rotate-0 group-hover:scale-[1.02] ${isForest ? "border-[#d6bd8b]" : "border-[#f2d77c]"}`}>
                    <Image
                      src={invitation.portrait}
                      alt={`${invitation.title} invitation preview`}
                      fill
                      className="object-cover object-top"
                      sizes="280px"
                    />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white sm:p-8">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/65">{invitation.category}</p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <h3 className="font-instrumentSerif text-4xl sm:text-5xl">{invitation.title}</h3>
                    <Link
                      href={invitation.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${invitation.title} live invitation`}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-ink transition hover:rotate-6 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </div>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-white/70">{invitation.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {invitation.features.map((feature, featureIndex) => {
                      const Icon = featureIcons[featureIndex];
                      return (
                        <li key={feature} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[0.68rem] font-semibold text-white/80 backdrop-blur-sm">
                          <Icon className="h-3 w-3" aria-hidden="true" />
                          {feature}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <span className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                  0{index + 1}
                </span>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
