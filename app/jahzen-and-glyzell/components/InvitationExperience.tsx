"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { getImageProps } from "next/image";
import { ArrowRight } from "lucide-react";
import { wedding } from "../data/wedding";
import SamplePhoto from "./SamplePhoto";
import { photos, photoSizes, heroSlides, heroImageQuality } from "../data/photos";
import styles from "../styles/invitation.module.css";
import useHydratedReducedMotion from "../hooks/useHydratedReducedMotion";
import BackgroundMusic, { type BackgroundMusicHandle } from "./BackgroundMusic";

type Phase = "closed" | "preparing" | "opening" | "opened";

export default function InvitationExperience({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [ready, setReady] = useState(false);
  const reducedMotion = useHydratedReducedMotion();
  const action = useRef<HTMLButtonElement>(null);
  const opening = useRef(false);
  const music = useRef<BackgroundMusicHandle>(null);
  const opened = phase === "opened";

  useEffect(() => { setReady(true); }, []);

  useLayoutEffect(() => {
    if (opened) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previous; };
  }, [opened]);

  useEffect(() => {
    if (opened) {
      const target = window.location.hash && document.getElementById(window.location.hash.slice(1));
      const heading = document.getElementById("jg-title");
      if (target) target.scrollIntoView({ behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
      (target || heading)?.focus({ preventScroll: true });
    } else if (ready) action.current?.focus({ preventScroll: true });
  }, [opened, ready]);

  async function open() {
    if (!ready || opening.current) return;
    opening.current = true;
    setPhase("preparing");
    void music.current?.play();
    // Decode only the next visible image, using the same responsive optimizer
    // selection as the hero. A loading failure must never trap a guest.
    const { props } = getImageProps({ src: heroSlides[0].src, alt: "", fill: true, sizes: photoSizes.hero, quality: heroImageQuality });
    const nextPhoto = new window.Image();
    nextPhoto.sizes = props.sizes ?? "100vw";
    nextPhoto.srcset = props.srcSet ?? "";
    nextPhoto.src = props.src;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    await Promise.race([nextPhoto.decode().catch(() => undefined), new Promise<void>(resolve => { fallback = setTimeout(resolve, 1800); })]);
    clearTimeout(fallback);
    if (reducedMotion) setPhase("opened");
    else setPhase("opening");
  }

  return <div className={`${styles.invitation} min-h-svh`}>
    {!opened && <motion.div className={`${styles.cover} jg-cover fixed inset-0 z-50 flex min-h-svh items-center justify-center overflow-y-auto px-6 py-10 text-center`}
      initial={false} animate={{ opacity: phase === "opening" ? 0 : 1 }}
      transition={{ duration: .25, delay: phase === "opening" ? .65 : 0 }}
      onAnimationComplete={() => { if (phase === "opening") setPhase("opened"); }}>
      <div className="absolute inset-0"><SamplePhoto src={photos.cover} alt="Sample engagement photograph for the opening layout" sizes={photoSizes.cover} priority shade /></div>
      <motion.div className="relative z-10 my-auto w-full max-w-xl" animate={{ opacity: phase === "opening" ? .25 : 1, y: phase === "opening" ? -14 : 0 }} transition={{ duration: .9, ease: [.4, 0, .6, 1] }}>
        <p className={`${styles.coverIntro} mb-8`}>Together with our families</p>
        <h1 className={styles.coverNames}>Jahzen <span>and</span> Glyzell</h1>
        <p className={`${styles.coverDate} mt-9`}>{wedding.date.display} · Tarlac, Philippines</p>
        <button ref={action} type="button" onClick={() => { void open(); }} disabled={!ready || phase !== "closed"} className={`${styles.goldButton} mx-auto mt-10 inline-flex min-h-12 items-center justify-center gap-5 px-7 py-3 disabled:cursor-wait`}>
          {phase !== "closed" ? "Opening…" : "Open invitation"}<ArrowRight size={16} aria-hidden="true" />
        </button>
        <p className={`${styles.coverFootnote} mt-6`}>A love worth the distance. A forever worth celebrating.</p>
      </motion.div>
    </motion.div>}
    <div className={`jg-content ${opened ? styles.contentOpened : ""}`} hidden={!opened}>
      {children}
    </div>
    <BackgroundMusic ref={music} visible={opened} />
    <noscript><style>{`.jg-cover{display:none}.jg-content[hidden]{display:block}`}</style><p className="p-5 text-center">Please enable JavaScript to use the RSVP preview.</p></noscript>
  </div>;
}


