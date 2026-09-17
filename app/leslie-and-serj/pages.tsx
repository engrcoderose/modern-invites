"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Music2,
  Pause,
} from "lucide-react";
import {
  entourage,
  attireDetails,
  faqs,
  wedding,
  type EntourageName,
  type Photo,
} from "./data";
import { GardenArch, Monogram, OvalCrest, Ornament } from "./artwork";
import weddingIllustration from "./assets/designs/Wedding Logo.png";
import lacedWeddingLogo from "./assets/designs/laced-wedding-log0.png";
import attireReference from "./assets/designs/Wedding guest peg.png";
import invitationPortrait from "./assets/prenups/1.jpg";
import videoPoster from "./assets/prenups/video.jpg";
import PhotoBreak from "./photo-break";

type InvitationPage = {
  id: string;
  label: string;
  tone?: "olive" | "sage" | "woodland";
  fullBleed?: boolean;
  content: ReactNode;
};
export function WoodlandBackdrop({ priority = false }: { priority?: boolean }) {
  return (
    <div
      className="lj-woodland absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <Image
        src="/leslie-and-serj/images/woodland-lake.png"
        alt=""
        fill
        priority={priority}
        sizes="100vw"
      />
    </div>
  );
}

function Names({ names }: { names: EntourageName[] }) {
  return (
    <div className="lj-names">
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
}: {
  title: string;
  names: EntourageName[];
}) {
  return (
    <div className="lj-party-group">
      <h3 className="lj-label">{title}</h3>
      <Names names={names} />
    </div>
  );
}

function PartyPage({
  title,
  children,
  review = false,
  compact = false,
}: {
  title: string;
  children: ReactNode;
  review?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="lj-party-page">
      <Ornament className={`lj-ornament ${compact ? "!mb-2 !h-5" : ""}`} />
      <p className="lj-label">With love and gratitude · Our entourage</p>
      <h2 className={`lj-heading lj-script-heading ${compact ? "!my-3 lj-mobile:!my-2 lj-mobile:!text-[32px]" : ""}`}>{title}</h2>
      <div className="lj-party-content max-w-[850px] my-0 mx-auto">
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
      aria-label="Countdown to January 28, 2027 at 1 PM Philippine time"
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

function SaveTheDateFilm() {
  return (
    <figure className="lj-film-frame relative shrink-0 p-2">
      <video
        src={wedding.saveTheDateVideo.src}
        poster={videoPoster.src}
        aria-label="Leslie and Serj — save-the-date video"
        className="block h-full w-full bg-black object-contain"
        controls
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

export function MusicControl() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
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
    <div className="lj-music absolute bottom-[95px] right-[18px] z-[35]">
      <audio
        ref={audio}
        src={wedding.music.src}
        loop
        preload="none"
        onError={() => setFailed(true)}
      />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : `Play ${wedding.music.title}`}
        aria-pressed={playing}
      >
        {playing ? <Pause size={17} /> : <Music2 size={17} />}
      </button>
      {failed && <span role="status">Music is unavailable.</span>}
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
        <p className="lj-label">{reception ? "The reception" : "The ceremony"}</p>
        <div className="lj-venue-art h-[110px] w-[180px] max-w-full lj-mobile:order-first lj-mobile:h-[clamp(44px,calc(14svh-50px),84px)] lj-mobile:w-32" aria-hidden="true">
          {reception ? (
            <GardenArch />
          ) : (
            <svg viewBox="0 0 160 170" fill="none" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="1.1">
                <path d="M29 148V76L80 30l51 46v72M23 150h114M22 77 80 23l58 54M80 23V8M73 15h14M35 84h90M44 148V91h21v57M96 148V91h21v57M70 148v-35a10 10 0 0 1 20 0v35M80 104v44M51 108h7M104 108h7M45 119h19M97 119h19" />
                <circle cx="80" cy="68" r="11" />
                <path d="M80 57v22M69 68h22M18 154h124M12 160h136" />
              </g>
            </svg>
          )}
        </div>
      </div>
      <h3 className="lj-venue-name">{venue.name}</h3>
      <p className="text-[15px] lj-mobile:text-[clamp(12px,1.8svh,15px)]">
        {reception
          ? wedding.reception.time || "Time to follow"
          : wedding.ceremonyTime}
      </p>
      <p className="text-[12px] leading-relaxed lj-mobile:text-[clamp(10.5px,1.5svh,12px)] lj-mobile:leading-normal">
        {reception
          ? "To love, laughter, and being together."
          : "Where our married life begins."}
      </p>
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
  goTo: (id: string) => void;
  openRsvp: () => void;
  copyHashtag: () => Promise<void>;
  copied: boolean;
  copyError: boolean;
};

export function createInvitationPages({
  goTo,
  openRsvp,
  copyHashtag,
  copied,
  copyError,
}: InvitationActions): InvitationPage[] {
  const storyPhotos = wedding.storyPhotos.slice(0, 30);
  const galleryPhotos = wedding.galleryPhotos.slice(0, 30 - storyPhotos.length);
  const answeredFaqs = faqs.filter((faq) => faq.answer);
  const faqsPerPage = 3;
  return [
    {
      id: "home",
      label: "Our invitation",
      content: (
        <div className="lj-opening-layout grid h-full grid-cols-2 lj-mobile:grid-cols-1 lj-mobile:grid-rows-[16%_84%]">
          <div className="relative flex min-h-0 items-center justify-center overflow-hidden text-[#f2ede0]">
            <OvalCrest />
          </div>
          <div className="lj-opening-panel relative grid h-full grid-rows-[auto_minmax(180px,1fr)_auto_auto] items-center justify-items-center gap-2 px-8 py-5 lj-mobile:gap-1 lj-mobile:px-5 lj-mobile:py-3">
            <p className="text-[12px] leading-relaxed lj-mobile:text-[10px]">
              Together with our families, we
              <br />
              invite you to celebrate our wedding
            </p>
            <div className="lj-opening-logo relative h-full min-h-0 w-full max-w-[460px]">
              <Image
                src={lacedWeddingLogo}
                alt="A wedding couple dancing in a teacup, framed with delicate lace"
                fill
                priority
                sizes="(max-width: 700px) 90vw, 460px"
                className="object-contain"
                draggable={false}
              />
            </div>
            <div className="flex flex-col items-center gap-3 lj-mobile:gap-2">
              <h1 className="lj-opening-names flex items-baseline justify-center gap-4 whitespace-nowrap text-[#5a6946] lj-mobile:gap-3">
                Leslie <span className="text-[0.4em]">&amp;</span> Serj
              </h1>
              <p className="text-[11px] uppercase leading-[1.8] tracking-[0.06em] lj-mobile:text-[9px]">
                {wedding.bride}
                <br />
                {wedding.groom}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[12px] lj-mobile:text-[10px]">
                {wedding.ceremony.name} · Batangas
              </p>
              <p className="text-[19px] italic text-[#5a6946] lj-mobile:text-[16px]">
                Thursday, {wedding.date}
              </p>
              <p className="text-[10px] tracking-wide lj-mobile:text-[9px]">
                One o’clock in the afternoon
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "invitation",
      label: "With full hearts",
      content: (
        <div className="lj-photo-letter">
          <div className="lj-photo-letter-message">
            <p className="lj-label">Together with our families</p>
            <p className="lj-body">
              As we begin our married life together, we would be so happy to
              have you with us—to witness our vows and share in the celebration.
            </p>
          </div>
          <div className="lj-photo-letter-portrait min-h-0 flex items-center justify-center">
            <figure>
              <Image
                src={invitationPortrait}
                alt="A couple holding hands in a green meadow"
                fill
                sizes="(max-width: 700px) 240px, 320px"
                draggable={false}
              />
              <Monogram className="lj-photo-letter-monogram" />
            </figure>
          </div>
          <div className="lj-photo-letter-signoff">
            <h2 className="lj-heading">With full hearts, we invite you.</h2>
            <p className="lj-photo-letter-names">
              {wedding.bride}
              <span> & </span>
              {wedding.groom}
            </p>
            <p className="lj-photo-letter-details">
              {wedding.date}
              <br />
              {wedding.ceremonyTime} · {wedding.ceremony.name}
              <br />
              Reception at {wedding.reception.name}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "save-the-date",
      label: "Save the date",
      content: (
        <div className="lj-save-page flex flex-col items-center gap-5 lj-mobile:gap-4">
          <div>
            <p className="lj-label">Leslie &amp; Serj · Save the date</p>
            <h2 className="lj-film-heading mt-3">
              {wedding.saveTheDateVideo.text}
            </h2>
          </div>
          <SaveTheDateFilm />
          <Countdown />
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
      label: "Ceremony & reception",
      tone: "woodland",
      content: (
        <div className="lj-venues px-8 py-9 lj-mobile:flex lj-mobile:min-h-full lj-mobile:flex-col lj-mobile:px-3 lj-mobile:py-3">
          <h2 className="sr-only">Ceremony and reception</h2>
          <p className="lj-label mb-8 lj-mobile:mb-3">{wedding.date}</p>
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
      id: "timeline",
      label: "Our day, together",
      content: (
        <div className="lj-timeline-page">
          <h2 className="lj-heading whitespace-nowrap">Our Timeline</h2>
          <div className="lj-timeline-oval mx-auto flex h-[clamp(350px,calc(100svh-280px),520px)] w-[305px] max-w-full flex-col items-center justify-evenly px-[30px] py-7 lj-mobile:w-[260px] lj-mobile:px-[22px]">
            <div className="lj-wedding-illustration relative w-[150px] h-[95px] my-0 mx-auto overflow-hidden">
              <Image
                src={weddingIllustration}
                alt="A delicate illustration of a wedding couple"
                fill
                sizes="260px"
              />
            </div>
            <ol className="lj-timeline">
              <li>
                <time>{wedding.ceremonyTime}</time>
                <div>
                  <h3>We say “I do”</h3>
                  <p className="lj-body">{wedding.ceremony.name}</p>
                </div>
              </li>
              <li>
                <span>{wedding.reception.time || "Time to follow"}</span>
                <div>
                  <h3>We celebrate</h3>
                  <p className="lj-body">{wedding.reception.name}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: "photo-break",
      label: "A little of us",
      tone: "woodland",
      fullBleed: true,
      content: <PhotoBreak />,
    },
    {
      id: "entourage",
      label: "Family & honor attendants",
      tone: "olive",
      content: (
        <PartyPage title="Beside us">
          <div className="lj-party-pair grid grid-cols-2 gap-10 lj-mobile:grid-cols-1 lj-mobile:gap-[27px]">
            <PartyGroup
              title="Parents of the Groom"
              names={entourage.groomParents}
            />
            <PartyGroup
              title="Parents of the Bride"
              names={entourage.brideParents}
            />
          </div>
          <div className="mt-7 grid grid-cols-2 gap-10 border-t border-[#e0e3c240] pt-6 lj-mobile:mt-5 lj-mobile:gap-4 lj-mobile:pt-4">
            <PartyGroup title="Best Man" names={entourage.bestMan} />
            <PartyGroup title="Maid of Honor" names={entourage.maidOfHonor} />
          </div>
        </PartyPage>
      ),
    },
    {
      id: "principal-sponsors",
      label: "Principal sponsors",
      tone: "olive",
      content: (
        <PartyPage
          title="Principal sponsors"
          review={entourage.principal.flat().some((person) => person.needsReview)}
        >
          <div className="lj-sponsor-pairs grid gap-[22px] lj-mobile:gap-2.5">
            {entourage.principal.map((pair) => (
              <div key={pair[0].name}>
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
      label: "Secondary sponsors & wedding party",
      tone: "olive",
      content: (
        <PartyPage
          title="Our wedding party"
          compact
          review={[
            ...entourage.secondary.flatMap((group) => group.names),
            ...entourage.groomsmen,
            ...entourage.bridesmaids,
          ].some((person) => person.needsReview)}
        >
          <div className="lj-combined-party">
            <h3 className="mb-2 text-[22px] lj-mobile:mb-1">Secondary sponsors</h3>
            <div className="grid gap-3 lj-mobile:gap-1">
              {entourage.secondary.map((group) => (
                <section key={group.role} aria-label={`${group.role} sponsors`}>
                  <h4 className="lj-script-accent !text-[24px] lj-mobile:!text-[clamp(20px,2.8svh,24px)]">
                    {group.role}
                  </h4>
                  <div className="grid grid-cols-2 items-start gap-8 lj-mobile:grid-cols-1 lj-mobile:gap-0">
                    {group.names.map((person) => (
                      <Names key={person.name} names={[person]} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-8 border-t border-[#e0e3c240] pt-4 lj-mobile:mt-2 lj-mobile:grid-cols-1 lj-mobile:gap-2 lj-mobile:pt-2 [&_.lj-names]:space-y-1 lj-mobile:[&_.lj-names]:space-y-0 lj-mobile:[&_h3]:!mb-1">
              <PartyGroup title="Groomsmen" names={entourage.groomsmen} />
              <PartyGroup title="Bridesmaids" names={entourage.bridesmaids} />
            </div>
          </div>
        </PartyPage>
      ),
    },
    {
      id: "bearers",
      label: "Bearers & flowers",
      tone: "olive",
      content: (
        <PartyPage title="Bearers & flowers" compact>
          <div className="grid grid-cols-3 gap-6 lj-mobile:grid-cols-1 lj-mobile:gap-2.5">
            {entourage.bearers.map((group) => (
              <PartyGroup
                key={group.role}
                title={group.role}
                names={group.names}
              />
            ))}
          </div>
          <div className="mt-6 border-t border-[#e0e3c240] pt-5 lj-mobile:mt-3 lj-mobile:pt-3">
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
            label: "What to wear",
            content: (
              <div className="lj-attire-page flex flex-col items-center gap-4 lj-mobile:min-h-full lj-mobile:justify-evenly lj-mobile:gap-3">
                <h2 className="lj-heading !m-0">{attireDetails.title}</h2>
                <figure className="lj-attire-reference relative my-2 shrink-0 p-2 lj-mobile:p-1.5">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={attireReference}
                      alt="Guest outfit inspiration in pink, mauve, blue, navy, gray and tan"
                      fill
                      sizes="(max-width: 700px) 85vw, 420px"
                      className="object-contain mix-blend-multiply"
                    />
                  </div>
                </figure>
                <p className="lj-body">{wedding.attire}</p>
                <div className="w-full max-w-[360px] border-t border-[#ac9b7666] pt-3">
                  <p className="text-[13px]">Colors to wear</p>
                  <ul className="mt-3 grid grid-cols-3 gap-5" aria-label="Recommended attire colors">
                    {attireDetails.colors.map((color) => (
                      <li key={color.name} className="flex flex-col items-center gap-2">
                        <span className="h-10 w-10 rounded-full ring-1 ring-[#ac9b7640]" style={{ backgroundColor: color.hex }} aria-hidden="true" />
                        <span className="text-[12px]">{color.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ),
          },
        ]
      : []),
    {
      id: "gifts",
      label: "A note on gifts",
      content: (
        <div className="lj-gifts-page">
          <Ornament className="lj-ornament" />
          <span className="lj-script-accent">With gratitude</span>
          <h2 className="lj-heading">A note on gifts</h2>
          <p className="lj-body">{wedding.gifts.message}</p>
          <p className="lj-body lj-registry-note mt-[22px]">
            {wedding.gifts.registryMessage}
          </p>
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
          <Ornament className="lj-ornament" />
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
    ...Array.from(
      { length: Math.ceil(answeredFaqs.length / faqsPerPage) },
      (_, index): InvitationPage => ({
        id: index === 0 ? "questions" : `questions-${index + 1}`,
        label: `Guest questions · ${index + 1}`,
        content: (
          <div className="lj-faq-page">
            <p className="lj-label">A few helpful details</p>
            <h2 className="lj-heading !my-3 lj-mobile:!text-[36px]">
              Before <em>the day.</em>
            </h2>
            <dl className="mt-4 text-left lj-mobile:mt-3">
              {answeredFaqs.slice(index * faqsPerPage, (index + 1) * faqsPerPage).map((faq) => (
                <div key={faq.question} className="py-3 lj-mobile:py-2">
                  <dt className="mb-2 lj-mobile:mb-1">{faq.question}</dt>
                  <dd className="lj-body">{faq.answer}</dd>
                </div>
              ))}
            </dl>
            <p className="lj-faq-note">
              We’ll share more details as our plans come together.
            </p>
          </div>
        ),
      }),
    ),
    {
      id: "rsvp",
      label: "Will you join us?",
      tone: "woodland",
      content: (
        <div className="lj-rsvp-page relative">
          <div className="lj-rsvp-plaque">
            <Ornament className="lj-ornament" />
            <span>RSVP</span>
          </div>
          <div className="lj-rsvp-card py-[45px] px-[35px] lj-mobile:py-[30px] lj-mobile:px-[22px]">
            <p className="lj-label">
              A place in our day, a place in our hearts
            </p>
            <h2 className="lj-heading">Will you join us?</h2>
            <p className="lj-body">
              We would love to celebrate with you.
              <br />
              Details on how to RSVP will be shared soon.
            </p>
            <button
              className="lj-button inline-flex items-center justify-center gap-[14px] min-h-11 py-[15px] px-6 mt-[26px] lj-button-solid"
              onClick={openRsvp}
            >
              RSVP information <ArrowUpRight size={15} />
            </button>
            <p className="lj-faq-note">
              We look forward to having you with us.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "with-love",
      label: "With love",
      content: (
        <div className="lj-closing">
          <Monogram />
          <p className="lj-label">With love, and so much to look forward to</p>
          <h2 className="lj-heading lj-script-heading">
            {wedding.title}
          </h2>
          <p className="lj-body">
            Thank you for being part of our lives.
            <br />
            We look forward to celebrating with you.
          </p>
          <Ornament className="lj-ornament" />
          <p className="lj-label">{wedding.date}</p>
          <button
            className="lj-text-button inline-flex items-center justify-center gap-[14px] min-h-11 py-[10px] px-0 mt-6"
            onClick={() => goTo("home")}
          >
            Back to the beginning <ArrowRight size={15} />
          </button>
        </div>
      ),
    },
  ];
}
