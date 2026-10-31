"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Menu, Pause, Play, X } from "lucide-react";
import { chapters, wedding, type ChapterId } from "../data/wedding";
import { ClosingPage, FormalInvitation, QuestionsPage, StoryPage, TimelinePage, VenuesPage } from "../sections/InvitationPages";
import { GodparentsPage, LittleOnesPage, ParentsPage, WeddingPartyPage } from "../sections/EntouragePages";
import AttirePage from "../sections/AttirePage";
import GiftsPage from "../sections/GiftsPage";
import RsvpSection from "./RsvpSection";
import OpeningCover from "./OpeningCover";
import BookLeaf from "./BookLeaf";
import { Monogram } from "./Stationery";
import styles from "../styles/wedding.module.css";
import PhotoSlideshow from "./PhotoSlideshow";
import { usPhotos, togetherPhotos } from "../data/photos";

const headerLinks: ChapterId[] = ["our-story", "venues", "us", "attire", "rsvp"];
const ignoredGesture = "a,button,input,textarea,select,summary,label";

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [turning, setTurning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const locked = useRef(false);
  const pageRoot = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const music = useRef<HTMLAudioElement>(null);
  const gesture = useRef<{ x: number; y: number; pointer: number } | null>(null);
  const reduced = useReducedMotion();
  const current = chapters[active];
  const photoPage = current.id === "us" || current.id === "together";

  const finishOpening = useCallback(() => setOpened(true), []);
  const focusPage = useCallback((element: HTMLElement) => element.focus({ preventScroll: true }), []);

  useEffect(() => {
    if (opened) pageRoot.current?.querySelector<HTMLElement>("section:not([inert])")?.focus({ preventScroll: true });
  }, [opened]);

  const turnTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(index, chapters.length - 1));
    if (locked.current || next === active) { setMenuOpen(false); return; }
    locked.current = !reduced;
    setTurning(!reduced);
    setDirection(next > active ? 1 : -1);
    setActive(next);
    setMenuOpen(false);
    history.replaceState(null, "", `#${chapters[next].id}`);
  }, [active, reduced]);

  function goTo(id: ChapterId) { turnTo(chapters.findIndex((chapter) => chapter.id === id)); }

  useEffect(() => {
    function readHash() {
      const index = chapters.findIndex((chapter) => `#${chapter.id}` === window.location.hash);
      if (index >= 0 && !locked.current) setActive(index);
    }
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  async function playMusic() {
    if (!music.current) return;
    try { await music.current.play(); setMusicError(false); }
    catch { setMusicError(true); }
  }

  const pages: Record<ChapterId, React.ReactNode> = {
    invitation: <FormalInvitation />, "our-story": <StoryPage />, venues: <VenuesPage />, "the-day": <TimelinePage />,
    parents: <ParentsPage />, godparents: <GodparentsPage />, "wedding-party": <WeddingPartyPage />, "little-ones": <LittleOnesPage />,
    attire: <AttirePage />, gifts: <GiftsPage />, questions: <QuestionsPage />, rsvp: <RsvpSection />,
    "with-love": <ClosingPage onReply={() => goTo("rsvp")} />,
    us: <PhotoSlideshow title="Us" photos={usPhotos} enabled={opened && !turning} />,
    together: <PhotoSlideshow title="Together" photos={togetherPhotos} fullPage enabled={opened && !turning} />,
  };

  return <div className={`${styles.invitation} fixed inset-0 h-dvh overflow-hidden`}>
    {!opened && <OpeningCover onStart={playMusic} onComplete={finishOpening} />}
    <div ref={pageRoot} className={`${styles.book} grid h-full grid-rows-[64px_minmax(0,1fr)_calc(80px+env(safe-area-inset-bottom))] md:grid-rows-[76px_minmax(0,1fr)_calc(80px+env(safe-area-inset-bottom))]`} style={{ visibility: opened ? "visible" : "hidden" }} inert={!opened} aria-hidden={!opened || undefined}
      onKeyDown={(event) => {
        if ((event.target as HTMLElement).closest("input,textarea,select,[contenteditable=true]")) return;
        if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); return; }
        const target = event.key === "ArrowRight" ? active + 1 : event.key === "ArrowLeft" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? chapters.length - 1 : null;
        if (target !== null) { event.preventDefault(); turnTo(target); }
      }}>
      <header className={`${styles.header} relative z-30 flex items-center justify-between gap-5 px-6 md:px-12`}>
        <a href="#invitation" className="inline-flex min-h-11 items-center gap-4" onClick={(event) => { event.preventDefault(); goTo("invitation"); }}><Monogram /><span className={`${styles.brandCaption} hidden whitespace-nowrap pl-4 sm:inline`}>Aljay & Erlyn</span><span className="sr-only"> · Back to invitation</span></a>
        <nav aria-label="Wedding chapters" className="hidden items-center gap-5 md:flex lg:gap-9">{headerLinks.map((id) => <a className={id === "rsvp" ? `${styles.navReply} whitespace-nowrap px-5 py-3` : "whitespace-nowrap py-3"} href={`#${id}`} key={id} aria-current={current.id === id ? "page" : undefined} onClick={(event) => { event.preventDefault(); goTo(id); }}>{id === "rsvp" ? "RSVP" : chapters.find((chapter) => chapter.id === id)?.label}</a>)}</nav>
        <button type="button" ref={menuButton} className="flex size-11 items-center justify-center md:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="ae-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        {menuOpen && <nav id="ae-navigation" aria-label="All wedding chapters" className={`${styles.mobileMenu} absolute left-0 right-0 top-full grid max-h-[65dvh] grid-cols-2 gap-x-4 overflow-y-auto px-6 py-4 md:hidden`}>{chapters.map((chapter) => <a href={`#${chapter.id}`} key={chapter.id} aria-current={current.id === chapter.id ? "page" : undefined} className="flex min-h-12 items-center py-2" onClick={(event) => { event.preventDefault(); goTo(chapter.id); }}>{chapter.label}</a>)}</nav>}
      </header>
      <main className={`${styles.stage} relative min-h-0 overflow-hidden`} aria-label="Wedding invitation" aria-busy={turning}
        onPointerDown={(event) => { if (event.isPrimary && event.button === 0 && !(event.target as HTMLElement).closest(ignoredGesture)) gesture.current = { x: event.clientX, y: event.clientY, pointer: event.pointerId }; }}
        onPointerUp={(event) => { const start = gesture.current; gesture.current = null; if (!start || start.pointer !== event.pointerId) return; const x = event.clientX - start.x; const y = event.clientY - start.y; if (Math.abs(x) > 55 && Math.abs(x) > Math.abs(y) * 1.4) turnTo(active + (x < 0 ? 1 : -1)); }}
        onPointerCancel={() => { gesture.current = null; }}>
        <AnimatePresence initial={false} custom={direction} onExitComplete={() => { locked.current = false; setTurning(false); }}>
          <BookLeaf key={current.id} id={current.id} label={`${current.label}, page ${active + 1} of ${chapters.length}`} ready={opened} dark={current.id === "our-story"} fullBleed={photoPage} onSettled={focusPage}>{pages[current.id]}</BookLeaf>
        </AnimatePresence>
      </main>
      <footer className={`${styles.footer} relative z-20 flex items-center justify-between gap-2 px-4 sm:px-8 md:px-12`}>
        <button type="button" disabled={active === 0 || turning} className={`${styles.pageButton} flex min-h-11 min-w-11 items-center justify-center gap-2 px-2 py-2`} onClick={() => turnTo(active - 1)} aria-label="Previous page"><ArrowLeft size={19} strokeWidth={1.2} /><span className="hidden sm:inline">Previous</span></button>
        <div className="flex min-w-0 flex-col items-center gap-1"><label className="sr-only" htmlFor="ae-page-select">Choose invitation page</label><select id="ae-page-select" value={active} disabled={turning} onChange={(event) => turnTo(Number(event.target.value))} className={`${styles.pageSelect} min-h-11 max-w-[200px] bg-transparent px-1 text-center`}>{chapters.map((chapter, index) => <option value={index} key={chapter.id}>{chapter.label}</option>)}</select><p className={styles.pageCount} aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</p></div>
        <button type="button" disabled={active === chapters.length - 1 || turning} className={`${styles.pageButton} flex min-h-11 min-w-11 items-center justify-center gap-2 px-2 py-2`} onClick={() => turnTo(active + 1)} aria-label="Next page"><span className="hidden sm:inline">Next</span><ArrowRight size={19} strokeWidth={1.2} /></button>
      </footer>
    </div>
    {opened && wedding.music.src && <button type="button" className={`${styles.musicControl} fixed bottom-[92px] right-4 z-40 flex size-11 items-center justify-center rounded-full`} aria-label={playing ? "Pause background music" : "Play background music"} aria-pressed={playing} onClick={() => playing ? music.current?.pause() : playMusic()}>{playing ? <Pause size={16} /> : <Play size={16} />}</button>}
    {musicError && <p role="status" className={`${styles.musicError} fixed bottom-[145px] right-5 z-40 max-w-[220px] p-3 text-xs`}>Music couldn’t play. Tap play to try again.</p>}
    {wedding.music.src && <audio ref={music} src={wedding.music.src} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setMusicError(true)} />}
    <noscript><div className={`${styles.noScript} fixed inset-0 z-[60] overflow-auto p-8 text-center`}><h1>Aljay & Erlyn</h1><p className="my-5">{wedding.date}</p><p className="my-5">Please enable JavaScript to open this interactive invitation.</p><p>Guest arrival 2:30 PM. Ceremony 3:00 PM at Holy Family Parish Church, 233 C.M. Recto St, Marikina.</p><p className="my-5">Reception: Teodore Events Place, 61 Katipunan St, Marikina.</p><p>RSVP by {wedding.rsvpDeadline}: <a href={`mailto:${wedding.email}`}>{wedding.email}</a></p></div></noscript>
  </div>;
}
