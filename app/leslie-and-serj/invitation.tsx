"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion } from "framer-motion";
import BookPage from "./book-page";
import OpeningScreen from "./opening-screen";
import { wedding } from "./data";
import { Monogram } from "./artwork";
import { createInvitationPages, MusicControl, WoodlandBackdrop } from "./pages";
import slideshowBackground from "./assets/prenups/Photo background website.png";

const chapters = [
  ["The Wedding Venue", "the-day"],
  ["Entourage", "entourage"],
  ["FAQs", "questions"],
  ["RSVP", "rsvp"],
];
const interactive =
  "a,button,input,select,textarea,summary,iframe,video,audio,[role=button],[contenteditable=true]";

export default function Invitation() {
  const [openingScreen, setOpeningScreen] = useState(true);
  const finishOpening = useCallback(() => setOpeningScreen(false), []);
  const book = useRef<HTMLDivElement>(null);
  const music = useRef<HTMLAudioElement>(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const turning = useRef(false);
  const [isTurning, setIsTurning] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const focusPage = useRef(true);
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const suppressClick = useRef(false);
  const initialLocationRead = useRef(false);
  const reduceMotion = useReducedMotion();
  const controlsOpacity = useMotionValue(0);

  useEffect(() => {
    // Persist the final opacity instead of cancelling a native fill back to 0.
    const animation = animate(controlsOpacity, openingScreen ? 0 : 1, {
      duration: reduceMotion ? 0.15 : 0.65,
    });
    return () => animation.stop();
  }, [controlsOpacity, openingScreen, reduceMotion]);

  useEffect(() => {
    if (!openingScreen) {
      book.current
        ?.querySelector<HTMLElement>(".lj-book-leaf:not([inert])")
        ?.focus({ preventScroll: true });
    }
  }, [openingScreen]);

  async function copyHashtag() {
    if (!wedding.hashtag) return;
    try {
      await navigator.clipboard.writeText(wedding.hashtag);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }

  const pages = createInvitationPages({
    mediaReady: !openingScreen,
    onVideoPlay: () => music.current?.pause(),
    copyHashtag,
    navigate: goTo,
    copied,
    copyError,
  });

  // IDs keep deep links working when optional client pages are added.
  const pageIds = pages.map((page) => page.id).join("|");
  const lastIndex = pages.length - 1;
  const current = pages[active] || pages[0];
  const immersivePhoto = current.id === "together";
  const darkPagination =
    immersivePhoto || current.tone === "woodland" || current.tone === "olive";
  const turnTo = useCallback(
    (index: number, focus = true) => {
      const next = Math.max(0, Math.min(index, lastIndex));
      if (next === active || turning.current) return;
      turning.current = !reduceMotion;
      setIsTurning(!reduceMotion);
      focusPage.current = focus;
      setDirection(next > active ? 1 : -1);
      setActive(next);
      setMenuOpen(false);
      history.replaceState(null, "", `#${pageIds.split("|")[next]}`);
    },
    [active, lastIndex, pageIds, reduceMotion],
  );

  function goTo(id: string) {
    const index = pages.findIndex((page) => page.id === id);
    setMenuOpen(false);
    if (index >= 0) turnTo(index);
  }

  useEffect(() => {
    if (!initialLocationRead.current) {
      initialLocationRead.current = true;
      const navigation = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (navigation?.type === "reload" && location.hash) {
        // Reloads start at the cover; direct links and in-session navigation
        // can still open the requested chapter.
        history.replaceState(history.state, "", location.pathname + location.search);
      }
    }
    const readHash = () => {
      const hash = location.hash.slice(1);
      const aliases: Record<string, string> = {
        invitation: "home",
        reception: "the-day",
        timeline: "the-day",
        "with-love": "save-the-date",
        "honor-attendants": "wedding-party",
        "principal-sponsors-1": "principal-sponsors",
        "principal-sponsors-2": "principal-sponsors",
        "secondary-sponsors": "wedding-party",
        flowers: "bearers",
        "questions-2": "questions",
        "questions-3": "questions",
        "questions-4": "questions",
        "questions-5": "questions",
      };
      const resolvedHash = aliases[hash] || hash;
      const index = pageIds.split("|").indexOf(resolvedHash);
      if (hash !== resolvedHash)
        history.replaceState(null, "", `#${resolvedHash}`);
      if (index >= 0) {
        focusPage.current = true;
        setActive(index);
        setMenuOpen(false);
      }
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, [pageIds]);

  return (
    <div className="fixed inset-0 bg-[#f2ede0]">
      <div
        ref={book}
        style={{ visibility: openingScreen ? "hidden" : "visible" }}
        inert={openingScreen}
        aria-hidden={openingScreen || undefined}
        className={`lj-wedding lj-book fixed inset-0 h-dvh grid overflow-hidden ${darkPagination ? "lj-dark-pagination" : ""}`}
        onKeyDown={(event) => {
          if (
            (event.target as HTMLElement).closest(
              "input,select,textarea,iframe,video,audio,[contenteditable=true]",
            )
          )
            return;
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuButton.current?.focus();
            return;
          }
          const target =
            event.key === "ArrowRight"
              ? active + 1
              : event.key === "ArrowLeft"
                ? active - 1
                : event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? lastIndex
                    : null;
          if (target !== null) {
            event.preventDefault();
            turnTo(target);
          }
        }}
      >
        <a
          className="lj-skip absolute top-[-100px] left-[15px] p-[15px] z-[100]"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            goTo("home");
            book.current
              ?.querySelector<HTMLElement>(".lj-book-leaf:not([inert])")
              ?.focus({ preventScroll: true });
          }}
        >
          Skip to invitation
        </a>
        <motion.header
          style={{ opacity: controlsOpacity }}
          className="lj-nav py-0 px-[5%] flex items-center justify-between relative z-[30] lj-mobile:py-0 lj-mobile:px-[6%]"
        >
          <a
            href="#home"
            className="lj-brand flex items-center gap-[25px] lj-mobile:gap-[17px]"
            aria-label={`${wedding.title}, back to beginning`}
            onClick={(event) => {
              event.preventDefault();
              goTo("home");
            }}
          >
            <Monogram />
            <span className="lj-brand-date pl-[25px] lj-mobile:pl-[17px]">
              {wedding.date}
            </span>
          </a>
          <nav
            className="lj-desktop-nav flex gap-8 items-center lj-mobile:hidden"
            aria-label="Wedding navigation"
          >
            {chapters.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(id);
                }}
              >
                {label}
                {id === "rsvp" && <ArrowUpRight size={13} />}
              </a>
            ))}
          </nav>
          <button
            ref={menuButton}
            className="lj-menu-toggle hidden lj-mobile:flex lj-mobile:p-[10px] lj-mobile:mr-[-10px]"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="lj-mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          {menuOpen && (
            <nav
              id="lj-mobile-nav"
              className="lj-mobile-nav hidden lj-mobile:flex lj-mobile:flex-col lj-mobile:absolute lj-mobile:top-[60px] lj-mobile:left-0 lj-mobile:right-0"
              aria-label="Mobile wedding navigation"
            >
              {[...chapters, ["Wedding Countdown", "save-the-date"]].map(
                ([label, id]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(id);
                    }}
                  >
                    {label}
                    <ArrowUpRight size={15} />
                  </a>
                ),
              )}
            </nav>
          )}
        </motion.header>

        <main
          className="lj-book-stage relative min-h-0 overflow-hidden overscroll-contain select-none"
          aria-label="Wedding invitation pages"
          aria-roledescription="carousel"
          aria-busy={isTurning}
          onPointerDown={(event) => {
            suppressClick.current = false;
            if (
              !event.isPrimary ||
              event.button !== 0 ||
              (event.target as HTMLElement).closest(interactive)
            )
              return;
            gesture.current = {
              x: event.clientX,
              y: event.clientY,
              id: event.pointerId,
            };
          }}
          onPointerMove={(event) => {
            const start = gesture.current;
            if (!start || start.id !== event.pointerId) return;
            const x = event.clientX - start.x;
            const y = event.clientY - start.y;
            if (Math.abs(x) > 12 && Math.abs(x) > Math.abs(y) * 1.25) {
              event.currentTarget.setPointerCapture(event.pointerId);
              event.preventDefault();
              suppressClick.current = true;
            }
          }}
          onPointerUp={(event) => {
            const start = gesture.current;
            gesture.current = null;
            if (!start || start.id !== event.pointerId) return;
            const x = event.clientX - start.x;
            const y = event.clientY - start.y;
            if (Math.abs(x) >= 45 && Math.abs(x) > Math.abs(y) * 1.25)
              turnTo(active + (x < 0 ? 1 : -1), false);
          }}
          onPointerCancel={() => {
            gesture.current = null;
            suppressClick.current = false;
          }}
          onClickCapture={(event) => {
            if (suppressClick.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClick.current = false;
            }
          }}
        >
          <AnimatePresence
            initial={false}
            custom={direction}
            onExitComplete={() => {
              turning.current = false;
              setIsTurning(false);
            }}
          >
            <BookPage
              key={current.id}
              id={current.id}
              direction={direction}
              revealReady={!openingScreen}
              className={`lj-book-page lj-tone-${current.tone || "ivory"} ${current.id === "home" ? "lj-is-cover" : ""}`}
              label={`${active + 1} of ${pages.length}: ${current.label}`}
              onSettled={(page) => {
                if (focusPage.current && !openingScreen) {
                  page.focus({ preventScroll: true });
                  focusPage.current = false;
                }
              }}
            >
              {current.tone === "woodland" && (
                <WoodlandBackdrop
                  src={
                    current.id === "photo-break" || current.id === "the-day"
                      ? slideshowBackground
                      : undefined
                  }
                />
              )}
              <div
                className={`lj-page-content ${immersivePhoto ? "h-full" : "h-[calc(100%-var(--lj-controls-height))]"} py-10 px-[10%] text-center flex flex-col overflow-y-auto overscroll-contain lj-mobile:py-8 lj-mobile:px-[9%] relative z-[1] ${current.fullBleed ? "!p-0" : ""} ${current.id === "the-day" ? "lj-mobile:!px-[7%] lj-mobile:!py-5" : ""}`}
              >
                {current.content}
              </div>
            </BookPage>
          </AnimatePresence>
        </main>

        <motion.footer
          style={{ opacity: controlsOpacity }}
          className="lj-book-controls absolute inset-x-0 bottom-0 h-[var(--lj-controls-height)] z-[10] grid items-center gap-3 lj-mobile:pl-[4%] lj-mobile:pr-[4%] lj-mobile:gap-[5px]"
        >
          <button
            className="lj-page-arrow flex items-center justify-center gap-[13px] py-[13px] px-[6px] min-h-11 lj-mobile:p-3"
            aria-label="Previous page"
            disabled={active === 0 || isTurning}
            onClick={() => turnTo(active - 1)}
          >
            <ArrowLeft size={18} />
            <span>Previous</span>
          </button>
          <div className="lj-page-position text-center min-w-0">
            <div className="lj-page-title px-1.5 leading-snug">
              {current.label}
            </div>
            <p>
              <span
                className="lj-page-count"
                aria-live="polite"
                aria-atomic="true"
              >
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(pages.length).padStart(2, "0")}
              </span>
            </p>
          </div>
          <button
            className="lj-page-arrow flex items-center justify-center gap-[13px] py-[13px] px-[6px] min-h-11 lj-mobile:p-3"
            aria-label="Next page"
            disabled={active === lastIndex || isTurning}
            onClick={() => turnTo(active + 1)}
          >
            <span>Next</span>
            <ArrowRight size={18} />
          </button>
        </motion.footer>
        <MusicControl audio={music} />
      </div>
      {openingScreen && (
        <OpeningScreen
          onOpen={() => {
            // A rejected play request leaves the manual music control available.
            void music.current?.play().catch(() => {});
          }}
          onOpened={finishOpening}
        />
      )}
    </div>
  );
}
