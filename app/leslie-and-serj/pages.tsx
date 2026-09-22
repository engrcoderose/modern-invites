"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import Image, { type StaticImageData } from "next/image";
import { useIsPresent } from "framer-motion";
import { ArrowUpRight, Check, Music2, Pause, Play } from "lucide-react";
import {
  entourage,
  attireDetails,
  faqs,
  wedding,
  type EntourageName,
  type Photo,
} from "./data";
import { Ornament } from "./artwork";
import churchLogo from "./assets/designs/church_logo.png";
import receptionLogo from "./assets/designs/reception_logo.png";
import weddingIllustration from "./assets/designs/Wedding Logo.png";
import attireReference from "./assets/designs/Wedding guest peg - rows.png";
import giftRegistryQr from "./assets/designs/Leslie and Serj - QR for Gift Registry.png";
import PhotoBreak from "./photo-break";
import RsvpFlow from "./rsvp-flow";

type InvitationPage = {
  id: string;
  label: string;
  tone?: "olive" | "sage" | "woodland";
  fullBleed?: boolean;
  content: ReactNode;
};
export function WoodlandBackdrop({
  priority = false,
  src = "/leslie-and-serj/images/woodland-lake.png",
}: {
  priority?: boolean;
  src?: string | StaticImageData;
}) {
  return (
    <div
      className="lj-woodland absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <Image src={src} alt="" fill priority={priority} sizes="100vw" />
    </div>
  );
}

function Names({
  names,
  paired = false,
}: {
  names: EntourageName[];
  paired?: boolean;
}) {
  return (
    <div
      className={`lj-names ${paired ? "grid grid-cols-2 gap-x-6 lj-mobile:gap-x-4" : "space-y-1"}`}
    >
      {names.map((person) => (
        <p key={person.name}>
          {person.name}
          {person.needsReview && (
            <sup aria-label="spelling awaiting confirmation">*</sup>
          )}
        </p>
      ))}
    </div>
  );
}

function PartyGroup({
  title,
  names,
  paired = false,
}: {
  title: string;
  names: EntourageName[];
  paired?: boolean;
}) {
  return (
    <div className="lj-party-group">
      <h3 className="lj-label">{title}</h3>
      <Names names={names} paired={paired} />
    </div>
  );
}

function PartyPage({
  title,
  children,
  review = false,
  leading,
  serifTitle = false,
}: {
  title?: string;
  children: ReactNode;
  review?: boolean;
  leading?: ReactNode;
  serifTitle?: boolean;
}) {
  return (
    <div
      className={`lj-party-page flex flex-col items-center gap-6 lj-mobile:gap-5 ${leading ? "[@media(max-height:740px)]:gap-3 [@media(max-height:740px)]:pb-8" : ""}`}
    >
      {leading}
      <Ornament className="lj-ornament !m-0 !h-5" />
      <h2 className="lj-gratitude-heading">With Love and Gratitude</h2>
      {title && (
        <h3
          className={
            serifTitle
              ? "lj-party-serif-title"
              : "text-[32px] lj-mobile:text-[26px]"
          }
        >
          {title}
        </h3>
      )}
      <div className="lj-party-content mx-auto w-full max-w-[560px]">
        {children}
      </div>
      {review && (
        <p className="lj-review-note">* Name spelling to be confirmed.</p>
      )}
    </div>
  );
}

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const target = new Date(wedding.ceremonyISO).getTime();
    const update = () => setRemaining(Math.max(0, target - Date.now()));
    update();
    if (Date.now() >= target) return;
    const interval = window.setInterval(() => {
      update();
      if (Date.now() >= target) window.clearInterval(interval);
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);
  const seconds = Math.floor((remaining ?? 0) / 1000);
  const units = [
    [Math.floor(seconds / 86400), "Days"],
    [Math.floor(seconds / 3600) % 24, "Hours"],
    [Math.floor(seconds / 60) % 60, "Minutes"],
    [seconds % 60, "Seconds"],
  ] as const;
  return (
    <div
      className="lj-countdown grid w-full max-w-[520px] grid-cols-4 gap-5 py-3 lj-mobile:gap-3"
      role="timer"
      aria-label={`Countdown to ${wedding.date} at 1 PM Philippine time`}
      aria-live="off"
    >
      {units.map(([value, label], index) => (
        <div key={label} className="relative min-w-0 text-center">
          {index > 0 && (
            <span
              aria-hidden="true"
              className="absolute -left-3 top-0 text-[30px] leading-none opacity-40 lj-mobile:-left-2 lj-mobile:text-[24px]"
            >
              :
            </span>
          )}
          <span className="block text-[46px] leading-none tabular-nums lj-mobile:text-[32px]">
            {remaining === null ? "—" : String(value).padStart(2, "0")}
          </span>
          <span className="mt-3 block text-[9px] uppercase tracking-[0.15em] lj-mobile:text-[7px]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function SaveTheDateFilm({
  ready,
  onPlay,
}: {
  ready: boolean;
  onPlay: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const present = useIsPresent();

  useEffect(() => {
    const film = video.current;
    if (!film) return;
    if (!ready || !present) {
      film.pause();
      return;
    }
    let cancelled = false;
    void film
      .play()
      .then(() => {
        if (cancelled) film.pause();
      })
      .catch(() => {
        // Native controls remain available if the browser blocks autoplay.
      });
    return () => {
      cancelled = true;
      film.pause();
    };
  }, [ready, present]);

  return (
    <figure className="lj-film-frame relative shrink-0 p-2">
      <video
        ref={video}
        onPlay={onPlay}
        src={wedding.saveTheDateVideo.src}
        poster={wedding.saveTheDateVideo.poster}
        aria-label="Leslie and Serj — save-the-date video"
        className="block h-full w-full bg-black object-contain"
        controls
        autoPlay={ready && present}
        playsInline
        preload="metadata"
      />
    </figure>
  );
}

function photoPages(
  photos: Photo[],
  title: string,
  prefix: string,
): InvitationPage[] {
  return photos.map((photo, index) => ({
    id: `${prefix}-${index + 1}`,
    label: `${title} · ${index + 1}`,
    content: (
      <div className="lj-photo-page h-full flex flex-col gap-5">
        <p className="lj-label">{title}</p>
        <figure>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            unoptimized
            sizes="(max-width: 700px) 85vw, 600px"
          />
        </figure>
      </div>
    ),
  }));
}

export function MusicControl({
  audio,
}: {
  audio: RefObject<HTMLAudioElement | null>;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const control = useRef<HTMLDivElement>(null);
  const detailsButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!detailsOpen) return;
    function dismiss(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !control.current?.contains(event.target)
      )
        setDetailsOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [detailsOpen]);
  if (!wedding.music?.src) return null;
  async function toggle() {
    if (!audio.current) return;
    if (audio.current.paused) {
      try {
        await audio.current.play();
        setPlaying(true);
        setFailed(false);
      } catch {
        setFailed(true);
      }
    } else {
      audio.current.pause();
      setPlaying(false);
    }
  }
  return (
    <div
      ref={control}
      className="lj-music absolute bottom-[95px] right-[18px] z-[35]"
      onKeyDown={(event) => {
        if (!detailsOpen) return;
        event.stopPropagation();
        if (event.key === "Escape") {
          setDetailsOpen(false);
          detailsButton.current?.focus();
        }
      }}
    >
      <audio
        ref={audio}
        src={wedding.music.src}
        loop
        preload="none"
        onPlay={() => {
          setPlaying(true);
          setFailed(false);
        }}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      {detailsOpen && (
        <section
          id="lj-music-details"
          aria-label="Wedding music"
          className="absolute bottom-[58px] right-0 w-[260px] max-w-[calc(100vw-36px)] rounded-xl border border-[var(--lj-line)] bg-[var(--lj-paper)] p-4 text-[var(--lj-ink)] shadow-lg"
        >
          <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--lj-muted)]">
            Our wedding soundtrack
          </p>
          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="min-w-0 text-left">
              <p className="text-base font-semibold">{wedding.music.title}</p>
              <p className="mt-1 text-xs text-[var(--lj-muted)]">
                {wedding.music.artist}
              </p>
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-label={
                playing
                  ? "Pause music"
                  : `Play ${wedding.music.title} by ${wedding.music.artist}`
              }
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--lj-line)] bg-transparent"
            >
              {playing ? (
                <Pause size={17} aria-hidden="true" />
              ) : (
                <Play size={17} aria-hidden="true" />
              )}
            </button>
          </div>
          <p
            role="status"
            className="mt-3 text-left text-[10px] text-[var(--lj-muted)]"
          >
            {failed
              ? "Music is unavailable. Please try again."
              : playing
                ? "Now playing"
                : "Paused"}
          </p>
        </section>
      )}
      <button
        ref={detailsButton}
        type="button"
        onClick={() => setDetailsOpen((open) => !open)}
        aria-label={detailsOpen ? "Hide song details" : "Show song details"}
        aria-expanded={detailsOpen}
        aria-controls="lj-music-details"
        className="flex size-11 items-center justify-center rounded-full border border-[var(--lj-line)] bg-[var(--lj-paper)] text-[var(--lj-ink)]"
      >
        <Music2 size={17} aria-hidden="true" />
      </button>
    </div>
  );
}

function Venue({ reception = false }: { reception?: boolean }) {
  const venue = reception ? wedding.reception : wedding.ceremony;
  return (
    <section
      className="flex min-w-0 flex-col items-center gap-3 lj-mobile:h-full lj-mobile:justify-center lj-mobile:gap-1"
      aria-label={reception ? "The reception" : "The ceremony"}
    >
      <div className="flex flex-col items-center gap-3 lj-mobile:gap-1">
        <p className="lj-label">
          {reception ? "Reception at" : "The ceremony"}
        </p>
        <div
          className="lj-venue-art relative h-[140px] w-[210px] max-w-full lj-mobile:order-first lj-mobile:h-[clamp(60px,calc(15svh-40px),110px)] lj-mobile:w-[165px]"
          aria-hidden="true"
        >
          <Image
            src={reception ? receptionLogo : churchLogo}
            alt=""
            fill
            sizes="(max-width: 700px) 165px, 210px"
            className="object-contain"
          />
        </div>
      </div>
      <h3 className="lj-venue-name">{venue.name}</h3>
      {!reception && (
        <p className="text-[15px] lj-mobile:text-[clamp(12px,1.8svh,15px)]">
          {wedding.ceremonyTime}
        </p>
      )}
      {venue.address && (
        <p className="max-w-[340px] text-[12px] leading-relaxed lj-mobile:text-[clamp(10.5px,1.5svh,12px)] lj-mobile:leading-normal">
          {venue.address}
        </p>
      )}
      {venue.mapUrl && (
        <a
          className="lj-text-button inline-flex min-h-11 items-center justify-center gap-2 px-1 py-2 lj-mobile:min-h-8 lj-mobile:py-1"
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View map for ${venue.name} (opens in a new tab)`}
        >
          View map <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
      {venue.mapEmbedUrl && (
        <iframe
          title={`${reception ? "Reception" : "Ceremony"} location`}
          loading="lazy"
          src={venue.mapEmbedUrl}
          className="lj-map w-full max-w-[500px] h-[180px]"
        />
      )}
    </section>
  );
}

type InvitationActions = {
  mediaReady: boolean;
  onVideoPlay: () => void;
  copyHashtag: () => Promise<void>;
  navigate: (id: string) => void;
  copied: boolean;
  copyError: boolean;
};

export function createInvitationPages({
  mediaReady,
  onVideoPlay,
  copyHashtag,
  navigate,
  copied,
  copyError,
}: InvitationActions): InvitationPage[] {
  const storyPhotos = wedding.storyPhotos.slice(0, 30);
  const galleryPhotos = wedding.galleryPhotos.slice(0, 30 - storyPhotos.length);
  const answeredFaqs = faqs.filter((faq) => faq.answer);
  return [
    {
      id: "home",
      label: "Invitation",
      content: (
        <div className="lj-opening-layout h-full">
          <div className="lj-opening-panel relative grid h-full min-h-[420px] grid-rows-[auto_minmax(0,1fr)_auto_auto] items-center justify-items-center gap-4 px-10 py-10 lj-mobile:gap-3 lj-mobile:px-7 lj-mobile:py-7">
            <p className="text-[12px] leading-relaxed lj-mobile:text-[10px]">
              Together with our families, we
              <br />
              invite you to celebrate our wedding
            </p>
            <div className="lj-opening-logo relative aspect-[2533/3769] h-full max-h-[300px] min-h-0 overflow-hidden">
              <Image
                src={weddingIllustration}
                alt="A wedding couple dancing in a teacup"
                priority
                sizes="800px"
                className="lj-opening-illustration absolute"
                draggable={false}
              />
            </div>
            <h1 className="lj-opening-names flex w-full flex-col items-center text-[#5a6946]">
              <span>{wedding.bride}</span>
              <span>{wedding.groom}</span>
            </h1>
            <p className="text-[16px] text-[#5a6946] lj-mobile:text-[14px]">
              {wedding.date}
            </p>
          </div>
        </div>
      ),
    },
    ...(wedding.story
      ? [
          {
            id: "our-story",
            label: "Our story",
            content: (
              <div className="lj-story">
                <p className="lj-label">The moments that led us here</p>
                <h2 className="lj-heading">Our story</h2>
                <p className="lj-body">{wedding.story}</p>
              </div>
            ),
          },
        ]
      : []),
    ...photoPages(storyPhotos, "A little of us", "our-photos"),
    {
      id: "the-day",
      label: "The Wedding Venue",
      tone: "woodland",
      content: (
        <div className="lj-venues px-8 py-9 lj-mobile:flex lj-mobile:min-h-full lj-mobile:flex-col lj-mobile:px-3 lj-mobile:py-3">
          <h2 className="sr-only">The Wedding Venue</h2>
          <p className="mb-8 text-[12px] tracking-[0.08em] lj-mobile:mb-4 lj-mobile:text-[10px]">
            {wedding.date}
          </p>
          <div className="grid grid-cols-2 gap-8 lj-mobile:flex-1 lj-mobile:grid-cols-1 lj-mobile:grid-rows-2 lj-mobile:gap-3">
            <Venue />
            <div className="border-l border-[#dfd9be66] pl-8 lj-mobile:border-l-0 lj-mobile:border-t lj-mobile:pl-0 lj-mobile:pt-3">
              <Venue reception />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "photo-break",
      label: "Us",
      tone: "woodland",
      fullBleed: true,
      content: <PhotoBreak />,
    },
    {
      id: "entourage",
      label: "Parents",
      tone: "olive",
      content: (
        <div className="lj-parents-page flex flex-col items-center gap-8 lj-mobile:gap-6">
          <Ornament className="lj-ornament !m-0" />
          <h2 className="lj-gratitude-heading">With Love and Gratitude</h2>
          <div className="grid w-full max-w-[560px] gap-10 lj-mobile:gap-8">
            <PartyGroup
              title="Parents of the Bride"
              names={entourage.brideParents}
              paired
            />
            <PartyGroup
              title="Parents of the Groom"
              names={entourage.groomParents}
              paired
            />
          </div>
        </div>
      ),
    },
    {
      id: "principal-sponsors",
      label: "Principal Sponsors",
      tone: "olive",
      content: (
        <PartyPage
          title="Principal Sponsors"
          serifTitle
          review={entourage.principal
            .flat()
            .some((person) => person.needsReview)}
        >
          <div className="lj-sponsor-pairs grid gap-3 lj-mobile:gap-2.5">
            {entourage.principal.map((pair) => (
              <div
                key={pair[0].name}
                className="grid grid-cols-2 gap-6 lj-mobile:gap-4"
              >
                <Names names={[pair[0]]} />
                <Names names={[pair[1]]} />
              </div>
            ))}
          </div>
        </PartyPage>
      ),
    },
    {
      id: "wedding-party",
      label: "Wedding Party",
      tone: "olive",
      content: (
        <PartyPage
          leading={
            <div className="lj-honor-attendants mb-2 grid w-full max-w-[560px] grid-cols-2 gap-6 lj-mobile:gap-4">
              <PartyGroup title="Maid of Honor" names={entourage.maidOfHonor} />
              <PartyGroup title="Best Man" names={entourage.bestMan} />
            </div>
          }
          review={[
            ...entourage.secondary.flatMap((group) => group.names),
            ...entourage.groomsmen,
            ...entourage.bridesmaids,
          ].some((person) => person.needsReview)}
        >
          <div className="lj-combined-party">
            <div className="grid gap-5 lj-mobile:gap-4 [@media(max-height:740px)]:gap-3">
              {entourage.secondary.map((group) => (
                <section
                  key={group.role}
                  aria-label={`${group.role} sponsors`}
                  className="grid gap-2 [@media(max-height:740px)]:gap-1"
                >
                  <h4 className="lj-party-role">{group.role}</h4>
                  <Names names={group.names} paired />
                </section>
              ))}
            </div>
            <div className="mt-7 grid grid-cols-2 gap-6 lj-mobile:mt-6 lj-mobile:gap-4 [@media(max-height:740px)]:mt-5">
              <PartyGroup title="Bridesmaids" names={entourage.bridesmaids} />
              <PartyGroup title="Groomsmen" names={entourage.groomsmen} />
            </div>
          </div>
        </PartyPage>
      ),
    },
    {
      id: "bearers",
      label: "Wedding Party",
      tone: "olive",
      content: (
        <PartyPage>
          <div className="lj-bearers grid grid-cols-3 gap-6 lj-mobile:gap-3">
            {entourage.bearers.map((group) => (
              <PartyGroup
                key={group.role}
                title={group.role}
                names={group.names}
              />
            ))}
          </div>
          <div className="mt-10 lj-mobile:mt-8">
            <PartyGroup title="Flowers" names={entourage.flowers} />
          </div>
        </PartyPage>
      ),
    },
    {
      id: "together",
      label: "Together",
      fullBleed: true,
      content: <PhotoBreak fullPage />,
    },
    ...photoPages(galleryPhotos, "Our moments", "our-moments"),
    ...(wedding.attire
      ? [
          {
            id: "attire",
            label: attireDetails.title,
            content: (
              <div className="lj-attire-page flex flex-col items-center gap-4 lj-mobile:min-h-full lj-mobile:justify-evenly lj-mobile:gap-3">
                <h2 className="lj-heading !m-0">{attireDetails.title}</h2>
                <figure className="lj-attire-reference relative my-2 shrink-0 p-2 lj-mobile:p-1.5">
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={attireReference}
                      alt="Eight women's outfits in pink, mauve, blue and pastels above five men's suits in navy, blue, gray and tan"
                      fill
                      sizes="(max-width: 700px) 85vw, 520px"
                      quality={95}
                      className="object-contain"
                    />
                  </div>
                </figure>
                <p className="lj-body">{wedding.attire}</p>
              </div>
            ),
          },
        ]
      : []),
    {
      id: "gifts",
      label: "A Note on Gifts",
      content: (
        <div className="lj-gifts-page flex flex-col items-center gap-4 [@media(max-height:740px)]:gap-2">
          <Ornament className="lj-ornament !m-0 [@media(max-height:740px)]:hidden" />
          <h2 className="lj-heading !m-0">A Note on Gifts</h2>
          <div className="lj-gift-copy space-y-2">
            <p className="lj-body">{wedding.gifts.message}</p>
            <p className="lj-body">{wedding.gifts.registryMessage}</p>
          </div>
          <figure className="w-fit">
            <a
              href={giftRegistryQr.src}
              target="_blank"
              rel="noreferrer"
              aria-label="Open a larger gift registry QR code (opens in a new tab)"
              className="lj-registry-qr relative block aspect-square w-[220px] overflow-hidden mix-blend-multiply focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5a6946] [@media(max-height:740px)]:w-[200px]"
            >
              <Image
                src={giftRegistryQr}
                alt="QR code for Leslie and Serj’s gift registry"
                fill
                sizes="220px"
                unoptimized
                className="object-contain p-1"
              />
            </a>
            <figcaption className="mt-2 text-[11px] leading-relaxed text-[#646650]">
              Scan to view our gift registry.
              <br />
              Tap the code to enlarge.
            </figcaption>
          </figure>
          {wedding.gifts.registryUrl && (
            <a
              className="lj-button inline-flex items-center justify-center gap-[14px] min-h-11 py-[15px] px-6 mt-[26px] lj-button-outline"
              href={wedding.gifts.registryUrl}
              target="_blank"
              rel="noreferrer"
            >
              View registry <ArrowUpRight size={15} />
            </a>
          )}
          <Ornament className="lj-ornament !m-0 [@media(max-height:740px)]:hidden" />
        </div>
      ),
    },
    ...(wedding.hashtag
      ? [
          {
            id: "share-the-joy",
            label: "Share the joy",
            content: (
              <div>
                <h2 className="lj-heading">Share the joy</h2>
                <p className="lj-body">
                  We’d love to see the day through your eyes. When sharing your
                  photos, use our wedding hashtag.
                </p>
                <button
                  className="lj-text-button inline-flex items-center justify-center gap-[14px] min-h-11 py-[10px] px-0 mt-6"
                  onClick={copyHashtag}
                >
                  {wedding.hashtag} {copied && <Check size={16} />}
                </button>
                <p role="status" className="lj-body">
                  {copied
                    ? "Hashtag copied."
                    : copyError
                      ? "Please select and copy the hashtag above."
                      : ""}
                </p>
              </div>
            ),
          },
        ]
      : []),
    {
      id: "questions",
      label: "FAQs",
      content: (
        <div className="lj-faq-page">
          <h2 className="lj-heading !my-3 lj-mobile:!text-[36px]">
            A Few Helpful Details
          </h2>
          <dl className="mt-4 text-left lj-mobile:mt-3">
            {answeredFaqs.map((faq) => (
              <div key={faq.question} className="py-3 lj-mobile:py-2">
                <dt className="mb-2 lj-mobile:mb-1">{faq.question}</dt>
                <dd className="lj-body">
                  {faq.answer}
                  {faq.link && (
                    <>
                      {" "}
                      <a
                        className="underline underline-offset-4"
                        href={faq.link.href}
                        onClick={(event) => {
                          event.preventDefault();
                          navigate(faq.link!.href.slice(1));
                        }}
                      >
                        {faq.link.label}
                      </a>
                      .
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ),
    },
    {
      id: "rsvp",
      label: "RSVP",
      tone: "woodland",
      content: (
        <div className="lj-rsvp-page relative">
          <div className="lj-rsvp-plaque relative mx-auto mb-7 w-[245px] max-w-[85%] px-7 py-5">
            <div
              className="pointer-events-none absolute -top-3 inset-x-0 flex justify-center"
              aria-hidden="true"
            >
              <Ornament className="h-6 w-[76px] rounded-full bg-[var(--lj-paper)] px-2 text-[#9d916a]" />
            </div>
            <h2 className="whitespace-nowrap text-center">Kindly Reply</h2>
          </div>
          <div className="lj-rsvp-card py-[30px] px-[35px] lj-mobile:px-[22px]">
            <p className="lj-body">
              Find your invitation to let us know if you can join us.
            </p>
            <RsvpFlow />
          </div>
        </div>
      ),
    },
    {
      id: "save-the-date",
      label: "Wedding Countdown",
      content: (
        <div className="lj-save-page flex flex-col items-center gap-8 lj-mobile:gap-6">
          <h2 className="sr-only">
            Wedding Countdown with Save the Date Video
          </h2>
          <SaveTheDateFilm ready={mediaReady} onPlay={onVideoPlay} />
          <Countdown />
        </div>
      ),
    },
  ];
}
