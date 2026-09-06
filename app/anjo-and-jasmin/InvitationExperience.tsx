"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Menu,
  Music2,
  Pause,
  Play,
  X,
} from "lucide-react";
import WelcomePhoto from "../isabella-and-daniel/assets/pexels-camera-treasure-928922-14106227.jpg";
import HeroPhoto from "../isabella-and-daniel/assets/happy-couple.jpg";
import BannerPhoto from "../isabella-and-daniel/assets/walking-couple.jpg";
import PortraitPhoto from "../isabella-and-daniel/assets/pexels-camera-treasure-928922-16841002.jpg";
import WildflowerFrame from "./assets/wildflower-frame.png";
import FoldText from "./components/FoldText";

const openedEvent = "anjo-jasmin-invitation-opened";
const weddingDate = new Date("2026-11-21T15:00:00+08:00");
const palette = ["#E8D9BA", "#F7B594", "#F5BFD0", "#A9CBEA", "#E8A8EC", "#FFF7C7", "#CCD8A1"];

const navLinks = [
  { label: "Invitation", href: "#invitation" },
  { label: "Details", href: "#details" },
  { label: "Attire", href: "#attire" },
  { label: "RSVP", href: "#rsvp" },
];

function FlowerOverlay({ className = "" }: { className?: string }) {
  return (
    <Image
      src={WildflowerFrame}
      alt=""
      aria-hidden="true"
      fill
      priority
      sizes="100vw"
      className={`pointer-events-none select-none object-cover ${className}`}
    />
  );
}

function OpeningScreen() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const openInvitation = () => {
    window.dispatchEvent(new Event(openedEvent));
    setClosing(true);
    window.setTimeout(() => setVisible(false), 650);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Anjo and Jasmin's wedding invitation"
      className={`wildflower-opening fixed inset-0 z-[100] overflow-hidden ${closing ? "wildflower-opening--closing" : ""}`}
    >
      <div className="opening-photo absolute -inset-[6%]">
        <Image src={WelcomePhoto} alt="A couple sharing a joyful moment" fill priority sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 bg-[#172019]/35" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,22,18,.34),rgba(18,22,18,.08)_42%,rgba(14,18,14,.55))]" />
      <FlowerOverlay className="opening-flower-overlay opacity-55 mix-blend-screen" />

      <div className="relative flex h-full min-h-svh flex-col items-center justify-between px-5 py-8 text-center sm:px-8 sm:py-12">
        <p className="opening-copy text-[0.62rem] font-medium uppercase tracking-[0.42em] text-white/85">The wedding of</p>

        <div className="opening-card w-full max-w-[35rem] px-7 py-10 sm:px-12 sm:py-12">
          <div className="opening-signature font-petitFormalScript text-[clamp(3.5rem,10vw,6.7rem)] leading-[0.78] tracking-[-0.06em] text-white">
            <span className="signature-stroke signature-stroke--anjo">Anjo</span>
            <span className="signature-ampersand font-meaCulpa text-[0.58em] text-[#ffd1dc]">&amp;</span>
            <span className="signature-stroke signature-stroke--jasmin">Jasmin</span>
          </div>
          <div className="opening-signature-details">
            <div className="mx-auto my-7 h-px w-20 bg-white/55" />
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/90">21 · 11 · 2026</p>
            <p className="mt-3 text-sm text-white/85">Malabon, Philippines</p>
          </div>
        </div>

        <button type="button" onClick={openInvitation} autoFocus className="opening-button group">
          Open invitation
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const start = () => {
      const audio = audioRef.current;
      if (!audio || audioError) return;
      audio.volume = 0.45;
      void audio.play().catch(() => undefined);
    };
    window.addEventListener(openedEvent, start);
    return () => window.removeEventListener(openedEvent, start);
  }, [audioError]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;
    if (audio.paused) void audio.play().catch(() => undefined);
    else audio.pause();
  };

  return (
    <>
      <audio ref={audioRef} loop preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setAudioError(true)}>
        <source src="/music/PALAGI%20(Wedding%20Version).mp3" type="audio/mpeg" />
      </audio>
      <button type="button" onClick={toggle} disabled={audioError} className="music-button" aria-label={playing ? "Pause background music" : "Play background music"}>
        {audioError ? <Music2 size={17} /> : playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="translate-x-px" />}
        <span className="hidden sm:inline">{playing ? "Pause our song" : "Play our song"}</span>
      </button>
    </>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`wildflower-nav fixed inset-x-0 top-0 z-50 ${scrolled ? "wildflower-nav--scrolled" : ""}`}>
      <div className="mx-auto flex max-w-[92rem] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#top" className="font-petitFormalScript text-2xl text-[#171a17]" aria-label="Back to top">A · J</a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}
        </nav>
        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-[#171a17]/20 bg-white/60 p-2.5 text-[#171a17] md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mx-3 border border-[#171a17]/10 bg-[#fffdf8]/95 p-5 shadow-xl backdrop-blur-xl md:hidden">
            {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-[#171a17]/10 py-4 font-instrumentSerif text-2xl last:border-0">{link.label}</a>)}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [invitationOpened, setInvitationOpened] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.45 });
  const imageScale = useTransform(progress, [0, 1], [1.04, 1.18]);
  const imageY = useTransform(progress, [0, 1], ["0%", "6%"]);
  const cardY = useTransform(progress, [0, 1], ["0%", "-18%"]);
  const cardOpacity = useTransform(progress, [0, 0.72, 1], [1, 1, 0]);

  useEffect(() => {
    const beginHeroSignature = () => setInvitationOpened(true);
    window.addEventListener(openedEvent, beginHeroSignature);
    return () => window.removeEventListener(openedEvent, beginHeroSignature);
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative h-[155vh] bg-[#d7ded4]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={reduceMotion ? undefined : { scale: imageScale, y: imageY }} className="absolute -inset-y-[5%] inset-x-0">
          <Image src={HeroPhoto} alt="A couple laughing together" fill priority sizes="100vw" className="object-cover object-center" />
        </motion.div>
        <div className="absolute inset-0 bg-white/16" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,246,239,.55),transparent_35%,rgba(27,31,27,.38))]" />
        <motion.div style={reduceMotion ? undefined : { y: cardY, opacity: cardOpacity }} className="absolute inset-0 flex items-center justify-center px-4 pt-10 text-center sm:px-8">
          <div className="hero-paper relative w-full max-w-[43rem] overflow-hidden px-7 py-12 sm:px-14 sm:py-16">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.38em] text-[#454e47]">Together with their families</p>
            <h1 className="mt-7">
              {invitationOpened || reduceMotion ? (
                <FoldText
                  text={"Anjo\n&\nJasmin"}
                  splitBy="char"
                  hinge="top"
                  trigger="mount"
                  duration={0.7}
                  stagger={0.055}
                  ease="power3.out"
                  perspective={700}
                  creaseShading={0.45}
                  fontSize="clamp(4.6rem, 13vw, 9rem)"
                  fontWeight={400}
                  color="#111411"
                  className="hero-fold-text font-petitFormalScript"
                  style={{ lineHeight: 0.75, letterSpacing: "-0.07em" }}
                />
              ) : (
                <span aria-hidden="true" className="hero-fold-placeholder font-petitFormalScript text-[clamp(4.6rem,13vw,9rem)] leading-[0.75]">Anjo<br />&amp;<br />Jasmin</span>
              )}
            </h1>
            <div className={`hero-signature-details mx-auto mt-8 max-w-md items-center justify-center gap-3 text-[0.63rem] uppercase tracking-[0.23em] text-[#4a534b] sm:gap-6${invitationOpened ? " hero-signature-details--visible" : ""}`}>
              <span>Saturday</span><span className="h-1 w-1 rotate-45 bg-[#dc5159]" /><span>21 November 2026</span>
            </div>
          </div>
        </motion.div>
        <a href="#invitation" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.58rem] uppercase tracking-[0.28em] text-white">
          Scroll to discover <ArrowDown size={16} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}

function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const values = useMemo(() => {
    const distance = Math.max(0, weddingDate.getTime() - now);
    return [
      [Math.floor(distance / 86_400_000), "Days"],
      [Math.floor((distance / 3_600_000) % 24), "Hours"],
      [Math.floor((distance / 60_000) % 60), "Minutes"],
      [Math.floor((distance / 1000) % 60), "Seconds"],
    ] as const;
  }, [now]);

  return (
    <section className="paper-section px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <p className="section-kicker">Until we say “I do”</p>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-[#1d231e]/10 bg-[#1d231e]/10 sm:grid-cols-4">
          {values.map(([value, label]) => (
            <div key={label} className="bg-[#fffdf8]/90 px-4 py-8 sm:py-10">
              <p className="font-instrumentSerif text-5xl tabular-nums text-[#171a17] sm:text-6xl">{String(value).padStart(2, "0")}</p>
              <p className="mt-2 text-[0.6rem] uppercase tracking-[0.26em] text-[#59635b]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InvitationSection() {
  return (
    <section id="invitation" className="paper-section relative overflow-hidden px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8 }} className="relative mx-auto max-w-[46rem] border border-[#1d231e]/10 bg-[#fffefa]/80 px-7 py-16 text-center shadow-[0_22px_80px_rgba(50,61,50,.08)] sm:px-16 sm:py-24">
          <p className="section-kicker">You are invited to celebrate</p>
          <h2 className="mt-8 font-petitFormalScript text-[clamp(4rem,10vw,7.5rem)] leading-[0.8] tracking-[-0.06em]">Anjo <span className="block py-3 font-meaCulpa text-[0.52em] text-[#da5159]">&amp;</span> Jasmin</h2>
          <p className="mx-auto mt-9 max-w-xl font-libreBaskerville text-base leading-8 text-[#515a52]">Together with their families, we invite you to witness our vows and share in the joy of the day we begin our forever.</p>
          <div className="mx-auto my-9 h-px w-20 bg-[#1d231e]/20" />
          <p className="font-instrumentSerif text-2xl leading-relaxed text-[#222822]">Saturday, the twenty-first of November<br />two thousand twenty-six<br /><span className="text-[#d94e58]">at three o’clock in the afternoon</span></p>
        </motion.div>
      </div>
    </section>
  );
}

function MovingPhotoBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 26 });
  const imageScale = useTransform(progress, [0, 0.5, 1], [1.18, 1.04, 1.14]);
  const imageY = useTransform(progress, [0, 1], ["-7%", "7%"]);
  const copyY = useTransform(progress, [0, 1], [55, -55]);

  return (
    <section ref={sectionRef} aria-label="A moving portrait of the couple" className="relative h-[165vh] bg-[#1d251f]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={reduceMotion ? undefined : { scale: imageScale, y: imageY }} className="absolute -inset-y-[9%] inset-x-0">
          <Image src={BannerPhoto} alt="A couple walking hand in hand" fill sizes="100vw" className="object-cover object-center" />
        </motion.div>
        <div className="absolute inset-0 bg-[#172019]/35" />
        <FlowerOverlay className="banner-flower-overlay opacity-45 mix-blend-screen" />
        <motion.div style={reduceMotion ? undefined : { y: copyY }} className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.4em] text-white/75">A love in full bloom</p>
            <p className="mt-7 font-petitFormalScript text-[clamp(4rem,10vw,8.7rem)] leading-[0.82] drop-shadow-lg">Every day,<br /><span className="font-meaCulpa text-[0.58em] text-[#ffd6d9]">I choose you.</span></p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DetailsSection() {
  const locations = [
    { label: "The ceremony", name: "San Bartolome Parish", time: "3:00 in the afternoon", address: "Malabon City", map: "https://maps.google.com/?q=San+Bartolome+Parish+Malabon" },
    { label: "The reception", name: "St. John XXIII Hall", time: "Reception follows", address: "2/F, San Bartolome Parish", map: "https://maps.google.com/?q=St.+John+XXIII+Hall+San+Bartolome+Parish+Malabon" },
  ];

  return (
    <section id="details" className="paper-section px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="section-kicker">When &amp; where</p>
          <h2 className="mt-7 font-petitFormalScript text-[clamp(4rem,9vw,7.5rem)] leading-none">The details of our day</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {locations.map((location, index) => (
            <motion.article key={location.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.1, duration: 0.7 }} className="venue-card">
              <p className="section-kicker">{location.label}</p>
              <h3 className="mt-6 font-instrumentSerif text-4xl sm:text-5xl">{location.name}</h3>
              <div className="mt-8 space-y-4 text-[#566057]">
                <p className="flex items-center gap-3"><Clock3 size={17} className="text-[#dc5159]" />{location.time}</p>
                <p className="flex items-center gap-3"><MapPin size={17} className="text-[#dc5159]" />{location.address}</p>
              </div>
              <a href={location.map} target="_blank" rel="noreferrer" className="map-link">View on map <ArrowUpRight size={15} /></a>
            </motion.article>
          ))}
        </div>
        <div className="mt-8 border border-[#1d231e]/10 bg-white/55 px-6 py-8 sm:flex sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-center gap-4"><CalendarDays className="text-[#dc5159]" /><div><p className="font-instrumentSerif text-2xl">Saturday · November 21, 2026</p><p className="mt-1 text-sm text-[#667067]">Please arrive at least 30 minutes before the ceremony.</p></div></div>
          <p className="mt-5 text-[0.62rem] uppercase tracking-[0.27em] text-[#59635b] sm:mt-0">Malabon City</p>
        </div>
      </div>
    </section>
  );
}

function AttireSection() {
  return (
    <section id="attire" className="relative overflow-hidden bg-[#fffaf5] px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden">
          <Image src={PortraitPhoto} alt="A close portrait of a couple with flowers" fill sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(20,27,21,.45))]" />
        </motion.div>
        <div>
          <p className="section-kicker">Attire</p>
          <h2 className="mt-7 font-petitFormalScript text-[clamp(4.2rem,8vw,7rem)] leading-none">Dress color code palette</h2>
          <p className="mt-7 max-w-xl font-libreBaskerville text-base leading-8 text-[#566057]">We kindly request that our guests wear cocktail or semi-formal attire in these colors on our special day.</p>
          <div className="mt-10 grid grid-cols-7 overflow-hidden border border-[#1d231e]/10" aria-label="Wedding attire color palette">
            {palette.map((color, index) => <span key={color} style={{ backgroundColor: color }} className="aspect-square" title={`Palette color ${index + 1}`} />)}
          </div>
          <p className="mt-5 text-[0.62rem] uppercase tracking-[0.25em] text-[#657067]">Soft neutrals · fresh pastels · garden color</p>
        </div>
      </div>
    </section>
  );
}

function GuestNotes() {
  const notes = [
    ["An unplugged ceremony", "Please keep phones and cameras away as we exchange our vows. Our photographers will capture the moment for everyone."],
    ["An intimate celebration", "We have reserved seats for the guests named on this invitation. Thank you for helping us keep the day meaningful."],
    ["With love, not things", "Your presence is the most beautiful gift. If you wish to give more, a contribution toward our new chapter would be warmly appreciated."],
  ];
  return (
    <section className="paper-section px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker text-center">A few gentle notes</p>
        <div className="mt-12 grid gap-px overflow-hidden border border-[#1d231e]/10 bg-[#1d231e]/10 md:grid-cols-3">
          {notes.map(([title, copy], index) => <article key={title} className="bg-[#fffdf8] p-8 sm:p-10"><span className="font-meaCulpa text-4xl text-[#dc5159]">0{index + 1}</span><h3 className="mt-8 font-instrumentSerif text-3xl">{title}</h3><p className="mt-5 text-sm leading-7 text-[#5c665d]">{copy}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function RSVPSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 850);
  };

  return (
    <section id="rsvp" className="relative overflow-hidden bg-[#243127] px-5 py-24 text-white sm:px-8 sm:py-36">
      <FlowerOverlay className="opacity-35 mix-blend-screen" />
      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.35em] text-[#ffd2d6]">Kindly respond</p>
          <h2 className="mt-7 font-petitFormalScript text-[clamp(4.5rem,9vw,8rem)] leading-[0.82]">Will you<br /><span className="font-meaCulpa text-[0.6em] text-[#ffd2d6]">join us?</span></h2>
          <p className="mt-8 max-w-md font-libreBaskerville text-sm leading-8 text-white/70">Please reply on or before October 21, 2026. We cannot wait to celebrate with you.</p>
        </div>
        <div className="border border-white/15 bg-[#152019]/65 p-6 backdrop-blur-sm sm:p-10">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div key="sent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-[#ffd2d6]/55"><Check size={25} /></span>
                <h3 className="mt-7 font-instrumentSerif text-4xl">We received your reply.</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">Thank you for celebrating this beautiful day with us.</p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-[0.62rem] uppercase tracking-[0.25em] text-[#ffd2d6] underline underline-offset-8">Send another response</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0 }} className="space-y-7">
                <label className="field-label">Full name<input name="name" required autoComplete="name" placeholder="Your name" /></label>
                <fieldset><legend className="field-label">Joyfully attending?</legend><div className="mt-3 grid grid-cols-2 gap-3">{["Yes, with joy", "Regretfully, no"].map((choice) => <label key={choice} className="choice"><input className="sr-only" required type="radio" name="attending" value={choice} />{choice}</label>)}</div></fieldset>
                <label className="field-label">A note for the couple<textarea name="message" rows={3} placeholder="Share your wishes…" /></label>
                <button disabled={status === "sending"} type="submit" className="rsvp-button">{status === "sending" ? "Sending your reply…" : "Send my response"}<ArrowRight size={16} /></button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default function InvitationExperience() {
  return (
    <main className="wildflower-invitation overflow-x-clip bg-[#fffdf8] text-[#171a17]">
      <OpeningScreen />
      <BackgroundMusic />
      <Navigation />
      <HeroSection />
      <InvitationSection />
      <Countdown />
      <MovingPhotoBanner />
      <DetailsSection />
      <AttireSection />
      <GuestNotes />
      <RSVPSection />
      <footer className="paper-section px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="section-kicker">See you there</p>
        <p className="mt-7 font-petitFormalScript text-[clamp(4.4rem,10vw,8rem)] leading-none">Anjo <span className="font-meaCulpa text-[0.55em] text-[#dc5159]">&amp;</span> Jasmin</p>
        <p className="mt-8 text-[0.65rem] uppercase tracking-[0.28em] text-[#59635b]">21 November 2026 · Malabon</p>
        <a href="#top" className="mt-12 inline-block text-[0.62rem] uppercase tracking-[0.24em] underline decoration-[#dc5159]/50 underline-offset-8">Return to the beginning ↑</a>
      </footer>
    </main>
  );
}
