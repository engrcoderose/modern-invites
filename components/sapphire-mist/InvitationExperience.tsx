"use client";

import Image, { type StaticImageData } from "next/image";
import {
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Compass,
  Gem,
  Heart,
  MapPin,
  Maximize2,
  Quote,
  Send,
  Shirt,
  Sparkles,
  X,
} from "lucide-react";
import AboutPortrait from "@/app/claudia-at-18/assets/outfits/happy-birthday.png";
import CakePortrait from "@/app/claudia-at-18/assets/outfits/with-cake-butterfly.png";
import EighteenPortrait from "@/app/claudia-at-18/assets/outfits/18-butterfly.png";
import HandsPortrait from "@/app/claudia-at-18/assets/outfits/handsup-blurred.png";
import HeroPortrait from "@/app/claudia-at-18/assets/outfits/lean-back-pose.png";
import ShadowPortrait from "@/app/claudia-at-18/assets/outfits/shadow-circle.png";
import TwoZeroPortrait from "@/app/claudia-at-18/assets/outfits/two-zero.png";
import { sapphireMistInvitation as invitation } from "@/lib/sapphire-mist";

const gallery: Array<{
  src: StaticImageData;
  alt: string;
  caption: string;
  className: string;
}> = [
  {
    src: AboutPortrait,
    alt: "Sample portrait of Claudia smiling",
    caption: "Blue hour",
    className: "gallery-tall",
  },
  {
    src: CakePortrait,
    alt: "Sample birthday portrait with a cake",
    caption: "Make a wish",
    className: "gallery-wide",
  },
  {
    src: EighteenPortrait,
    alt: "Sample eighteenth birthday portrait",
    caption: "Chapter XVIII",
    className: "gallery-square",
  },
  {
    src: ShadowPortrait,
    alt: "Sample studio portrait with a circular shadow",
    caption: "Moonlit",
    className: "gallery-square",
  },
  {
    src: HandsPortrait,
    alt: "Sample playful birthday portrait",
    caption: "In her element",
    className: "gallery-wide",
  },
  {
    src: TwoZeroPortrait,
    alt: "Sample editorial birthday portrait",
    caption: "Soft focus",
    className: "gallery-tall",
  },
];

const openingParticles = Array.from({ length: 28 }, (_, index) => ({
  left: `${2 + ((index * 37) % 95)}%`,
  top: `${3 + ((index * 53) % 91)}%`,
  size: `${1 + (index % 4) * 0.65}px`,
  delay: `${-(index % 9) * 0.72}s`,
  duration: `${4.8 + (index % 6) * 0.8}s`,
}));

function Countdown() {
  const target = useMemo(() => new Date(invitation.event.date).getTime(), []);
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, target - Date.now()),
  );
  useEffect(() => {
    const timer = window.setInterval(
      () => setRemaining(Math.max(0, target - Date.now())),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [target]);
  const values = [
    [Math.floor(remaining / 86_400_000), "Days"],
    [Math.floor((remaining / 3_600_000) % 24), "Hours"],
    [Math.floor((remaining / 60_000) % 60), "Minutes"],
    [Math.floor((remaining / 1000) % 60), "Seconds"],
  ] as const;
  return (
    <div
      className="grid grid-cols-4 gap-2 sm:gap-3"
      aria-label="Countdown to Claudia's debut"
    >
      {values.map(([value, label]) => (
        <div
          key={label}
          className="mist-glass min-w-0 px-2 py-3 text-center sm:px-4"
        >
          <span className="block font-serif text-xl text-white sm:text-2xl">
            {String(value).padStart(2, "0")}
          </span>
          <span className="mt-1 block text-[0.52rem] uppercase tracking-[0.2em] text-blue-100/60 sm:text-[0.6rem]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className="mb-12 sm:mb-16">
      <p
        className={`mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.42em] ${light ? "text-[#afc1ff]" : "text-[#4966ad]"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-4xl font-normal leading-none sm:text-6xl ${light ? "text-white" : "text-[#0a1b49]"}`}
      >
        {title}
      </h2>
    </div>
  );
}

function OpeningScreen({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  useEffect(() => {
    if (opened) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [opened]);

  return (
    <div
      className={`opening-screen ${opened ? "is-opened" : ""}`}
      aria-hidden={opened}
    >
      <div className="opening-curtain opening-curtain-left" aria-hidden="true" />
      <div className="opening-curtain opening-curtain-right" aria-hidden="true" />
      <div className="star-field opening-stars" aria-hidden="true" />
      <div className="opening-aurora" aria-hidden="true">
        <span className="opening-aurora-one" />
        <span className="opening-aurora-two" />
      </div>
      <div className="opening-particles" aria-hidden="true">
        {openingParticles.map((particle, index) => (
          <span
            key={index}
            className="opening-particle"
            style={
              {
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <span className="opening-moon" aria-hidden="true" />
      <span
        className="opening-shooting-star opening-shooting-star-one"
        aria-hidden="true"
      />
      <span
        className="opening-shooting-star opening-shooting-star-two"
        aria-hidden="true"
      />
      <div className="mist-layer opening-mist-one" aria-hidden="true" />
      <div className="mist-layer opening-mist-two" aria-hidden="true" />
      <span className="opening-crystal opening-crystal-left" aria-hidden="true" />
      <span className="opening-crystal opening-crystal-right" aria-hidden="true" />

      <div className="opening-corner opening-corner-top">
        <span>C</span>
        <span className="text-[#8faafa]">·</span>
        <span>XVIII</span>
      </div>
      <p className="opening-corner opening-corner-bottom">
        October 15, 2030 · Pasig City
      </p>

      <div className="opening-content">
        <p className="opening-reveal opening-reveal-one text-[0.58rem] font-semibold uppercase tracking-[0.5em] text-[#b9c9ff]">
          {invitation.copy.eyebrow}
        </p>

        <div
          className="opening-reveal opening-reveal-two opening-monogram"
          aria-hidden="true"
        >
          <span className="opening-orbit-ring opening-orbit-ring-one" />
          <span className="opening-orbit-ring opening-orbit-ring-two" />
          <span className="opening-monogram-letter">C</span>
        </div>

        <div className="opening-reveal opening-reveal-three text-center">
          <p className="text-[0.56rem] uppercase tracking-[0.42em] text-blue-100/55">
            You are invited to celebrate
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-none text-white sm:text-7xl">
            {invitation.debutante.firstName}
          </h1>
          <p className="mt-4 font-serif text-xl italic tracking-[0.08em] text-[#aebff5] sm:text-2xl">
            turns eighteen
          </p>
        </div>

        <div className="opening-reveal opening-reveal-four mt-7 flex items-center gap-4">
          <span className="h-px w-10 bg-white/15" />
          <p className="text-[0.56rem] uppercase tracking-[0.32em] text-white/65">
            {invitation.event.displayDate}
          </p>
          <span className="h-px w-10 bg-white/15" />
        </div>

        <button
          type="button"
          onClick={onOpen}
          autoFocus
          className="opening-reveal opening-reveal-five opening-button group mt-9 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.62rem] font-semibold uppercase tracking-[0.3em]"
        >
          Open invitation
          <Sparkles
            className="h-4 w-4 transition-transform group-hover:rotate-12"
            aria-hidden="true"
          />
        </button>

        <p className="opening-reveal opening-reveal-six mt-7 text-[0.48rem] uppercase tracking-[0.28em] text-blue-100/35">
          Touch to enter the sapphire mist
        </p>
      </div>
    </div>
  );
}

function HeroSection({ onEnter }: { onEnter: () => void }) {
  return (
    <section
      id="top"
      className="sapphire-hero relative isolate min-h-[100svh] overflow-hidden px-5 py-8 sm:px-8 lg:px-12"
    >
      <div className="mist-layer mist-layer-one" aria-hidden="true" />
      <div className="mist-layer mist-layer-two" aria-hidden="true" />
      <div className="star-field" aria-hidden="true" />
      <nav className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between">
        <a
          href="#top"
          className="font-serif text-lg tracking-[0.22em] text-white/90"
          aria-label="Claudia at eighteen"
        >
          C<span className="text-[#9fb9ff]">·</span>XVIII
        </a>
        <a
          href="#rsvp"
          className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-blue-100/65 transition hover:text-white"
        >
          RSVP
        </a>
      </nav>
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl items-center gap-10 pb-8 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:pt-0">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div className="hero-reveal hero-reveal-one mb-6 inline-flex items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.42em] text-[#b9c9ff]">
            <span className="h-px w-8 bg-[#8ea9ff]/70" />
            {invitation.copy.eyebrow}
          </div>
          <h1 className="hero-reveal hero-reveal-two font-serif text-[clamp(4.5rem,12vw,10rem)] font-normal leading-[0.73] tracking-[-0.055em] text-white drop-shadow-[0_0_28px_rgba(129,157,255,0.22)]">
            {invitation.debutante.firstName}
          </h1>
          <p className="hero-reveal hero-reveal-three mt-6 font-serif text-2xl italic tracking-[0.08em] text-[#bfc9f6] sm:text-3xl">
            turns eighteen
          </p>
          <div className="hero-reveal hero-reveal-four mt-8 flex items-center justify-center gap-4 lg:justify-start">
            <span className="h-px w-10 bg-white/20" />
            <p className="text-xs uppercase tracking-[0.32em] text-white/75">
              {invitation.event.displayDate}
            </p>
            <span className="h-px w-10 bg-white/20" />
          </div>
          <div className="hero-reveal hero-reveal-five mx-auto mt-9 max-w-xl lg:mx-0">
            <Countdown />
          </div>
          <button
            type="button"
            onClick={onEnter}
            className="hero-reveal hero-reveal-six sapphire-button group mt-8 inline-flex items-center gap-3 rounded-full px-7 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.28em]"
          >
            Open invitation{" "}
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
          </button>
        </div>
        <div className="hero-reveal hero-reveal-image order-1 mx-auto w-full max-w-[34rem] lg:order-2">
          <div className="portrait-orbit relative aspect-[4/5]">
            <div className="absolute inset-[5%] rounded-[48%_48%_8%_8%] border border-[#a9bbff]/25" />
            <div className="absolute inset-[9%] overflow-hidden rounded-[46%_46%_6%_6%] border border-white/20 bg-[#16275a]/40 shadow-[0_0_80px_rgba(74,111,230,0.28)]">
              <Image
                src={HeroPortrait}
                alt="Sample portrait of Claudia, the debutante"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 90vw"
                className="object-cover object-center grayscale-[35%] contrast-110 saturate-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061337] via-[#1d3474]/5 to-[#a3baff]/10 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061337]/75 via-transparent to-white/5" />
            </div>
            <div className="crystal crystal-one" />
            <div className="crystal crystal-two" />
            <div className="absolute bottom-[5%] right-[1%] flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md">
              <span className="font-serif text-3xl italic text-[#cad4ff]">
                18
              </span>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#welcome"
        className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-blue-100/60 transition hover:text-white"
        aria-label="Scroll to the invitation"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}

function WelcomeSection() {
  return (
    <section
      id="welcome"
      className="relative overflow-hidden bg-[#f2f5ff] px-6 py-28 text-[#0a1b49] sm:py-40"
    >
      <div className="welcome-orb -left-20 top-10" />
      <div className="welcome-orb -right-24 bottom-0" />
      <Reveal className="relative mx-auto max-w-4xl text-center">
        <Gem
          className="mx-auto mb-8 h-5 w-5 text-[#6a82cb]"
          strokeWidth={1.2}
        />
        <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-[#4966ad]">
          You are invited
        </p>
        <p className="font-serif text-3xl leading-tight sm:text-5xl lg:text-6xl">
          {invitation.copy.welcome}
        </p>
        <div className="mx-auto mt-10 h-16 w-px bg-gradient-to-b from-[#7690d8] to-transparent" />
      </Reveal>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#08163d] px-6 py-28 text-white sm:py-36"
    >
      <div className="star-field opacity-30" />
      <Reveal className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
        <div className="relative mx-auto w-full max-w-xl">
          <span className="absolute -left-4 -top-16 select-none font-serif text-[10rem] leading-none text-white/[0.035] sm:-left-16 sm:text-[16rem]">
            18
          </span>
          <div className="about-photo relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-[12rem_12rem_1.5rem_1.5rem] border border-white/15">
            <Image
              src={AboutPortrait}
              alt="Sample editorial portrait of Claudia"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover object-center grayscale-[20%] saturate-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07143a]/65 via-transparent to-[#829cf0]/10" />
          </div>
          <div className="absolute -bottom-6 left-0 max-w-[12rem] border border-white/15 bg-[#14275b]/70 p-5 backdrop-blur-xl">
            <p className="text-[0.55rem] uppercase tracking-[0.28em] text-[#afc1ff]">
              Meet the debutante
            </p>
            <p className="mt-2 font-serif text-2xl">
              {invitation.debutante.nickname}
            </p>
          </div>
        </div>
        <div>
          <Quote className="mb-7 h-8 w-8 text-[#7f9bed]" strokeWidth={1} />
          <p className="font-serif text-4xl leading-tight text-[#f2f5ff] sm:text-5xl">
            “{invitation.copy.quote}”
          </p>
          <div className="my-10 h-px w-20 bg-[#6987dc]/50" />
          <p className="font-serif text-2xl text-white">
            {invitation.debutante.fullName}
          </p>
          <p className="mt-2 text-[0.58rem] uppercase tracking-[0.38em] text-[#93a9e8]">
            A little constellation of her own
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {invitation.funFacts.map((fact) => (
              <div
                key={fact.label}
                className="border-l border-[#708ddd]/35 pl-4"
              >
                <p className="text-[0.52rem] uppercase tracking-[0.28em] text-[#90a6e7]">
                  {fact.label}
                </p>
                <p className="mt-2 text-sm text-white/85">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function DetailsSection() {
  const details = [
    { icon: CalendarDays, label: "Date", value: invitation.event.displayDate },
    { icon: Clock3, label: "Time", value: invitation.event.time },
    { icon: MapPin, label: "Venue", value: invitation.event.venue },
    { icon: Shirt, label: "Dress code", value: invitation.event.dressCode },
  ];
  return (
    <section id="details" className="mist-light-section px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Save the date"
          title="Where the magic begins"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ icon: Icon, label, value }, index) => (
            <article
              key={label}
              className="detail-card group relative min-h-64 overflow-hidden p-7"
            >
              <span className="absolute right-5 top-3 font-serif text-5xl text-[#183571]/[0.045]">
                0{index + 1}
              </span>
              <Icon
                className="h-5 w-5 text-[#526fb8] transition-transform duration-500 group-hover:-translate-y-1"
                strokeWidth={1.25}
              />
              <div className="mt-20">
                <p className="text-[0.56rem] font-semibold uppercase tracking-[0.32em] text-[#6f84b7]">
                  {label}
                </p>
                <p className="mt-3 font-serif text-2xl leading-tight text-[#0a1b49]">
                  {value}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-xs tracking-wide text-[#69799f]">
          Kindly arrive in time to settle in before the grand entrance.
        </p>
      </Reveal>
    </section>
  );
}

function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-[#071438] px-6 py-28 text-white sm:py-36"
    >
      <div className="timeline-glow" />
      <Reveal className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="The sapphire timeline"
          title="The night unfolds"
          light
        />
        <ol className="relative ml-3 border-l border-[#7693e3]/30 sm:ml-[8.5rem]">
          {invitation.timeline.map((event, index) => (
            <li
              key={event.time}
              className="group relative pb-12 pl-9 last:pb-0 sm:pl-14"
            >
              <span className="timeline-dot absolute -left-[7px] top-2 h-[13px] w-[13px] rounded-full border border-[#c2d0ff] bg-[#132b67] shadow-[0_0_16px_rgba(148,175,255,.7)]" />
              <time className="mb-2 block text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-[#9eb3ef] sm:absolute sm:-left-[8.5rem] sm:top-1 sm:w-24 sm:text-right">
                {event.time}
              </time>
              <div className="flex items-start gap-5">
                <span className="hidden font-serif text-4xl text-white/[0.055] sm:block">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-white sm:text-3xl">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-blue-100/55">
                    {event.detail}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

function TraditionsSection() {
  const [active, setActive] = useState(0);
  const tradition = invitation.traditions[active];
  return (
    <section id="traditions" className="bg-[#eef2ff] px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Eighteen little rituals"
              title="Traditions in blue"
            />
            <p className="max-w-md text-sm leading-7 text-[#5c6d96]">
              The beloved debut traditions, reimagined for a night that feels
              entirely hers. Select each chapter to meet the people sharing
              these special moments with Claudia.
            </p>
            <div className="mt-10 flex items-center gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#6b81b8]">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#8297c8]/35 font-serif text-base tracking-normal text-[#244587]">
                18
              </span>
              Names in every chapter
            </div>
          </div>

          <div>
            <div
              className="flex gap-2 overflow-x-auto pb-4"
              role="tablist"
              aria-label="Debut traditions"
            >
              {invitation.traditions.map((item, index) => (
                <button
                  id={`tradition-tab-${index}`}
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-controls="tradition-panel"
                  onClick={() => setActive(index)}
                  className={`tradition-tab shrink-0 rounded-full px-5 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.2em] ${active === index ? "is-active" : ""}`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <div
              key={tradition.title}
              id="tradition-panel"
              role="tabpanel"
              aria-labelledby={`tradition-tab-${active}`}
              className="tradition-panel tradition-panel-enter relative mt-7 overflow-hidden p-7 sm:p-10"
            >
              <span className="absolute -right-2 -top-16 font-serif text-[12rem] leading-none text-[#17346c]/[0.04]">
                18
              </span>
              <div className="relative">
                <div className="flex flex-col justify-between gap-6 border-b border-[#879bc7]/25 pb-7 sm:flex-row sm:items-end">
                  <div>
                    <div className="mb-5 flex items-center gap-3">
                      <Gem
                        className="h-5 w-5 text-[#607dcc]"
                        strokeWidth={1.1}
                      />
                      <p className="text-[0.54rem] font-semibold uppercase tracking-[0.35em] text-[#7187bf]">
                        Chapter {tradition.number}
                      </p>
                    </div>
                    <h3 className="font-serif text-4xl text-[#0a1b49] sm:text-5xl">
                      {tradition.title}
                    </h3>
                  </div>
                  <p className="max-w-sm text-sm leading-6 text-[#657498] sm:text-right">
                    {tradition.copy}
                  </p>
                </div>

                <ol
                  className="tradition-guest-grid mt-4"
                  aria-label={`${tradition.title} sample participants`}
                >
                  {tradition.members.map((member, index) => (
                    <li key={member.name} className="tradition-guest group">
                      <span className="tradition-guest-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-serif text-lg text-[#142c61] transition-colors group-hover:text-[#3159ae]">
                          {member.name}
                        </span>
                        <span className="mt-0.5 block text-[0.5rem] uppercase tracking-[0.22em] text-[#7f8dae]">
                          {member.relation}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 text-[0.5rem] uppercase tracking-[0.24em] text-[#8b98b7]">
                  Sample names · Replace with your final ceremonial list
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function GallerySection({ onSelect }: { onSelect: (index: number) => void }) {
  return (
    <section
      id="gallery"
      className="bg-[#050f2d] px-4 py-28 text-white sm:px-6 sm:py-36"
    >
      <Reveal className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Portraits & in-betweens"
            title="In her blue era"
            light
          />
          <p className="mb-16 max-w-xs text-sm leading-6 text-blue-100/50">
            A collection of sample portraits. Tap any image to see the full
            frame.
          </p>
        </div>
        <div className="editorial-gallery">
          {gallery.map((photo, index) => (
            <button
              type="button"
              key={photo.caption}
              className={`gallery-item group ${photo.className}`}
              onClick={() => onSelect(index)}
              aria-label={`Open ${photo.caption} photo`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover grayscale-[25%] saturate-[.7] transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-0"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#061438]/80 via-transparent to-[#829be6]/10 opacity-80 transition group-hover:opacity-55" />
              <span className="absolute bottom-5 left-5 text-left">
                <span className="block text-[0.52rem] uppercase tracking-[0.3em] text-[#b7c8f8]">
                  Portrait {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block font-serif text-2xl text-white">
                  {photo.caption}
                </span>
              </span>
              <Maximize2 className="absolute right-5 top-5 h-4 w-4 text-white/0 transition group-hover:text-white/80" />
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function RSVPSection() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <section
      id="rsvp"
      className="rsvp-section relative overflow-hidden px-6 py-28 text-white sm:py-36"
    >
      <div className="mist-layer mist-layer-one" />
      <Reveal className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.42em] text-[#afc1ff]">
            Kindly reply
          </p>
          <h2 className="font-serif text-5xl leading-none sm:text-7xl">
            Will you join us?
          </h2>
          <p className="mt-7 max-w-md text-sm leading-7 text-blue-100/55">
            Your presence will make this once-in-a-lifetime night even brighter.
            Please respond by September 15, 2030.
          </p>
          <div className="mt-10 flex items-center gap-4 text-sm text-blue-100/65">
            <Heart className="h-5 w-5 text-[#a9bdff]" strokeWidth={1.2} />
            <span>We have saved a place beneath the stars for you.</span>
          </div>
        </div>
        <div className="rsvp-card p-6 sm:p-10">
          {sent ? (
            <div
              className="flex min-h-[28rem] flex-col items-center justify-center text-center"
              role="status"
            >
              <div className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-[#a8bcff]/35 bg-[#7e9af0]/10">
                <Check className="h-7 w-7 text-[#b8c8ff]" />
              </div>
              <h3 className="font-serif text-4xl">
                Your reply is in the stars.
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100/55">
                Thank you for responding. Claudia can’t wait to celebrate this
                beautiful chapter with you.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 text-[0.58rem] uppercase tracking-[0.3em] text-[#bbcbff] underline decoration-white/20 underline-offset-8"
              >
                Edit response
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-7">
              <div>
                <label htmlFor="guest-name" className="form-label">
                  Guest name
                </label>
                <input
                  id="guest-name"
                  name="guestName"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  className="mist-input"
                />
              </div>
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="attendees" className="form-label">
                    Number of attendees
                  </label>
                  <select
                    id="attendees"
                    name="attendees"
                    className="mist-input"
                  >
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                  </select>
                </div>
                <fieldset>
                  <legend className="form-label">Will you attend?</legend>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="attendance-option">
                      <input
                        type="radio"
                        name="attendance"
                        value="yes"
                        required
                        className="sr-only"
                      />
                      <span>Joyfully, yes</span>
                    </label>
                    <label className="attendance-option">
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        required
                        className="sr-only"
                      />
                      <span>Sadly, no</span>
                    </label>
                  </div>
                </fieldset>
              </div>
              <div>
                <label htmlFor="message" className="form-label">
                  A message for Claudia
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Leave a little note or wish…"
                  className="mist-input resize-none"
                />
              </div>
              <button
                type="submit"
                className="sapphire-button group inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-4 text-[0.62rem] font-semibold uppercase tracking-[0.28em]"
              >
                Send my response{" "}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function LocationSection() {
  return (
    <section id="location" className="bg-[#eef2ff] px-6 py-28 sm:py-36">
      <Reveal className="mx-auto grid max-w-7xl overflow-hidden border border-[#b6c3e6]/55 bg-white/45 shadow-[0_30px_80px_rgba(35,62,123,.08)] lg:grid-cols-[.82fr_1.18fr]">
        <div className="p-8 sm:p-12">
          <Compass className="mb-10 h-6 w-6 text-[#5e78bd]" strokeWidth={1.2} />
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-[#6e84bd]">
            Find your way
          </p>
          <h2 className="mt-4 font-serif text-4xl text-[#0a1b49] sm:text-5xl">
            {invitation.event.venue}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#66769c]">
            {invitation.event.address}
          </p>
          <a
            href={invitation.event.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[#173875]"
          >
            Get directions <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div
          className="map-placeholder relative min-h-[26rem] overflow-hidden"
          aria-label="Map placeholder showing The Glass Garden in Pasig City"
        >
          <div className="absolute inset-0 map-grid" />
          <div className="map-road map-road-one" />
          <div className="map-road map-road-two" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative">
              <span className="absolute -inset-7 animate-ping rounded-full border border-[#a6bcff]/25" />
              <span className="grid h-16 w-16 place-items-center rounded-full border border-[#a8bdff]/35 bg-[#102963]/85 shadow-[0_0_35px_rgba(115,148,242,.5)] backdrop-blur">
                <MapPin className="h-6 w-6 text-[#c9d5ff]" />
              </span>
            </div>
          </div>
          <span className="absolute bottom-5 right-5 text-[0.5rem] uppercase tracking-[0.28em] text-blue-100/40">
            Map preview · Pasig City
          </span>
        </div>
      </Reveal>
    </section>
  );
}

function ClosingSection() {
  return (
    <footer className="closing-section relative flex min-h-[90svh] items-center overflow-hidden px-6 py-24 text-center text-white">
      <div className="star-field" />
      <div className="mist-layer mist-layer-two" />
      <Reveal className="relative mx-auto max-w-4xl">
        <Sparkles
          className="mx-auto mb-10 h-6 w-6 text-[#9bb3f7]"
          strokeWidth={1.1}
        />
        <p className="font-serif text-5xl leading-[1.04] sm:text-7xl lg:text-8xl">
          The night is young.
          <br />
          The stars are waiting.
          <br />
          <span className="closing-gradient italic">A new chapter begins.</span>
        </p>
        <div className="mx-auto my-12 h-px w-24 bg-gradient-to-r from-transparent via-[#93abed] to-transparent" />
        <p className="font-serif text-3xl">{invitation.debutante.firstName}</p>
        <p className="mt-3 text-[0.56rem] uppercase tracking-[0.42em] text-blue-100/55">
          {invitation.event.displayDate} · XVIII
        </p>
        <a
          href="#top"
          className="mt-16 inline-flex items-center gap-2 text-[0.52rem] uppercase tracking-[0.3em] text-blue-100/45 transition hover:text-white"
        >
          Return to the beginning <ArrowDown className="h-3 w-3 rotate-180" />
        </a>
      </Reveal>
    </footer>
  );
}

function Lightbox({
  index,
  onClose,
}: {
  index: number | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [index, onClose]);
  if (index === null) return null;
  const photo = gallery[index];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      className="fixed inset-0 z-[120] grid place-items-center bg-[#020716]/95 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white"
        aria-label="Close photo"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="relative h-[80vh] w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="95vw"
          className="object-contain"
        />
        <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.58rem] uppercase tracking-[0.35em] text-blue-100/60">
          {photo.caption}
        </p>
      </div>
    </div>
  );
}

export default function InvitationExperience() {
  const [opened, setOpened] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const enterInvitation = () =>
    document.querySelector("#welcome")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="sapphire-page min-h-screen overflow-hidden bg-[#061337] text-white">
      <OpeningScreen opened={opened} onOpen={() => setOpened(true)} />
      <HeroSection onEnter={enterInvitation} />
      <WelcomeSection />
      <AboutSection />
      <DetailsSection />
      <TimelineSection />
      <TraditionsSection />
      <GallerySection onSelect={setSelectedPhoto} />
      <RSVPSection />
      <LocationSection />
      <ClosingSection />
      <Lightbox index={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </main>
  );
}
