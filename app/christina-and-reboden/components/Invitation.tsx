"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { artwork } from "../data/media";
import { wedding } from "../data/wedding";
import { chapters, createSlides } from "../data/slides";
import Opening from "./Opening";
import MusicControl from "./MusicControl";
import PageLeaf, { type PageTransition } from "./PageLeaf";
import PageTurnPetals from "./PageTurnPetals";
import styles from "../styles/invitation.module.css";

const interactive = "a,button,input,select,textarea,[contenteditable=true],[data-invitation-scroll],[data-invitation-carousel]";

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const [activeId, setActiveId] = useState("save-the-date");
  const [visited, setVisited] = useState(new Set(["save-the-date"]));
  const [menuOpen, setMenuOpen] = useState(false);
  const [transition, setTransition] = useState<PageTransition | null>(null);
  const turning = useRef(false);
  const active = useRef("save-the-date");
  const pageIds = useRef<string[]>([]);
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [musicError, setMusicError] = useState("");
  const stage = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const navigate = useCallback((id: string) => {
    const nextIndex = pageIds.current.indexOf(id);
    if (nextIndex < 0 || turning.current) return;
    if (active.current === id) { setMenuOpen(false); return; }
    const direction = nextIndex > pageIds.current.indexOf(active.current) ? 1 : -1;
    turning.current = !reducedMotion;
    setTransition(reducedMotion ? null : { from: active.current, to: id, direction });
    active.current = id;
    setActiveId(id);
    setVisited(current => new Set(current).add(id));
    setMenuOpen(false);
  }, [reducedMotion]);
  const slides = createSlides(opened && !menuOpen && !transition ? activeId : undefined);
  pageIds.current = slides.map(slide => slide.id);
  const index = Math.max(0, slides.findIndex(slide => slide.id === activeId));
  const current = slides[index];
  const turn = useCallback((direction: number) => {
    const next = slides[index + direction];
    if (next) navigate(next.id);
  }, [index, navigate, slides]);

  useEffect(() => {
    if (opened && !menuOpen && !transition) {
      const target = stage.current?.querySelector<HTMLElement>('section:not([hidden]):not([aria-hidden="true"]) [data-invitation-scroll]') ?? stage.current;
      target?.focus({ preventScroll: true });
    }
  }, [activeId, opened, menuOpen, transition]);

  const finishTurn = useCallback((id: string) => {
    if (active.current !== id) return;
    turning.current = false;
    setTransition(null);
  }, []);

  const finishOpening = useCallback(() => setOpened(true), []);
  const startMusic = useCallback(() => {
    // Start within the guest's click so mobile browsers allow audio playback.
    void audio.current?.play().catch(() => {
      setMusicError("Tap Play music to start the soundtrack.");
    });
  }, []);

  async function toggleMusic() {
    if (!audio.current) return;
    if (!audio.current.paused) { audio.current.pause(); return; }
    try { await audio.current.play(); }
    catch { setPlaying(false); setMusicError("Music could not play. Please try again."); }
  }

  return <div className={`${styles.shell} fixed inset-0 isolate flex h-dvh flex-col overflow-hidden`}>
    {!opened && <Opening onOpen={startMusic} onOpened={finishOpening} />}
    <div className="flex min-h-0 flex-1 flex-col" style={{ visibility: opened ? "visible" : "hidden" }} inert={!opened} aria-hidden={!opened}
      onKeyDown={event => {
        if (menuOpen && event.key === "Escape") { event.preventDefault(); setMenuOpen(false); menuButton.current?.focus(); return; }
        if ((event.target as HTMLElement).closest(interactive) || menuOpen || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight") { event.preventDefault(); turn(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); turn(-1); }
        if (event.key === "Home") { event.preventDefault(); navigate(slides[0].id); }
        if (event.key === "End") { event.preventDefault(); navigate(slides[slides.length - 1].id); }
      }}>
      <header className={`${styles.header} relative z-30 flex shrink-0 items-center justify-between gap-4 px-5 sm:px-10`}>
        <button type="button" onClick={() => navigate("save-the-date")} className={`${styles.headerNames} min-h-11`}>{wedding.couple}</button>
        <div className="flex items-center gap-3 sm:gap-6">
          <span className="hidden font-sans text-[10px] uppercase tracking-[.2em] sm:inline">January 23, 2027</span>
          <button ref={menuButton} type="button" disabled={Boolean(transition)} aria-expanded={menuOpen} aria-controls="cr-chapters" onClick={() => setMenuOpen(value => !value)} className="flex min-h-11 items-center gap-2 font-sans text-xs"><span className="hidden sm:inline">Contents</span>{menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}<span className="sr-only sm:hidden">Contents</span></button>
        </div>
      </header>
      {menuOpen && <nav id="cr-chapters" aria-label="Invitation contents" className={`${styles.contents} absolute inset-x-0 z-20 flex flex-col justify-center px-7 py-5 sm:px-12`}
        onKeyDown={event => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } }}>
        <h2 className={`${styles.heading} mb-4 text-center`}>The Invitation</h2>
        <div className="mx-auto grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-1">{chapters.map(([id, label]) => <button key={id} type="button" onClick={() => navigate(id)} className={`${styles.chapterLink} flex min-h-12 items-center justify-between gap-2 border-b py-2 text-left text-xs sm:text-sm`}><span>{label}</span><ArrowRight size={13} aria-hidden="true" /></button>)}</div>
      </nav>}
      <main ref={stage} tabIndex={-1} aria-label={`${current.label}, slide ${index + 1} of ${slides.length}`} aria-busy={Boolean(transition)} inert={menuOpen} className={`${styles.cream} relative min-h-0 flex-1 overflow-hidden outline-none`}
        onTouchStart={event => { if (!(event.target as HTMLElement).closest(interactive)) swipe.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchEnd={event => { const start = swipe.current; swipe.current = null; if (!start) return; const dx = event.changedTouches[0].clientX - start.x; const dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) turn(dx < 0 ? 1 : -1); }}>
        {slides.map((slide, slideIndex) => {
          if (!visited.has(slide.id)) return null;
          const venuePage = slide.id === "ceremony" || slide.id === "reception";
          const photoPage = ["our-love", "hand-in-hand", "our-moments", "together"].includes(slide.id);
          return <PageLeaf key={slide.id} id={slide.id} label={slide.label} active={index === slideIndex} transition={transition} onTurnComplete={finishTurn} className={styles[slide.tone]} revealReady={opened && index === slideIndex && !menuOpen && !transition}>
            {!photoPage && <Image src={venuePage ? artwork.venueDamask : artwork.damask} alt="" fill sizes="100vw" className={`${venuePage ? styles.venueDamask : styles.damask} pointer-events-none object-cover`} />}
            {slide.content}
          </PageLeaf>;
        })}
        {transition?.direction === 1 && reducedMotion === false && <PageTurnPetals key={`${transition.from}-${transition.to}`} />}
      </main>
      <footer className={`${styles.footer} relative z-30 flex shrink-0 items-center justify-between gap-3 px-4 sm:px-10`}>
        <button type="button" disabled={index === 0 || menuOpen || Boolean(transition)} onClick={() => turn(-1)} className={`${styles.navButton} inline-flex min-h-12 items-center gap-2 px-1 font-sans text-[10px] uppercase tracking-[.12em] sm:gap-3 sm:text-xs`}><ArrowLeft size={16} aria-hidden="true" />Previous</button>
        <div className="flex min-w-0 flex-col items-center gap-1 text-center"><p aria-live="polite" aria-atomic="true" className="font-sans text-xs tabular-nums tracking-[.18em]">{String(index + 1).padStart(2, "0")} <span className="mx-1 opacity-50">/</span> {String(slides.length).padStart(2, "0")}</p><p className="max-w-[10rem] truncate font-sans text-[9px] uppercase tracking-[.1em]">{current.label}</p></div>
        <button type="button" disabled={index === slides.length - 1 || menuOpen || Boolean(transition)} onClick={() => turn(1)} className={`${styles.navButton} inline-flex min-h-12 items-center gap-2 px-1 font-sans text-[10px] uppercase tracking-[.12em] sm:gap-3 sm:text-xs`}>Next<ArrowRight size={16} aria-hidden="true" /></button>
      </footer>
      <div className={`${styles.progress} absolute inset-x-0 bottom-0 z-40 h-0.5 origin-left`} style={{ transform: `scaleX(${(index + 1) / slides.length})` }} />
      {wedding.music.src && <audio ref={audio} src={wedding.music.src} loop preload="none" onPlay={() => { setPlaying(true); setMusicError(""); }} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setMusicError("Music is unavailable."); }} />}
      {wedding.music.src && <MusicControl playing={playing} error={musicError} onToggle={toggleMusic} />}
    </div>
    <noscript><div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-[#f5eddf] px-8 text-center"><h1 className={styles.couple}>{wedding.couple}</h1><p>{wedding.date} · Ceremony at {wedding.ceremony.time}</p><p>{wedding.ceremony.name}</p><p>Reception: {wedding.reception.name}</p><p>Please enable JavaScript to open the full presentation.</p></div></noscript>
  </div>;
}
