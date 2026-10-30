"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SamplePhoto from "../components/SamplePhoto";
import { photos, photoSizes } from "../data/photos";
import styles from "../styles/invitation.module.css";
import useHydratedReducedMotion from "../hooks/useHydratedReducedMotion";
export default function CinematicBreak() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const frame = useTransform(scrollYProgress, [0, .3, .75, 1], ["inset(10% 6% round 12px)", "inset(0% 0% round 0px)", "inset(0% 0% round 0px)", "inset(6% 4% round 12px)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  return <section ref={ref} className={`${styles.cinematic} relative h-[150svh]`} aria-label="A new chapter together">
    <div className="sticky top-0 h-svh overflow-hidden p-3 sm:p-5 lg:p-8"><motion.div className="relative h-full overflow-hidden" style={reduced ? { clipPath: "none" } : { clipPath: frame }}>
      <div className="absolute inset-0"><SamplePhoto src={photos.cinematic} alt="Sample couple photograph for the cinematic section" sizes={photoSizes.cinematic} shade zoom={reduced ? undefined : scale} /></div>
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center"><h2 className={styles.cinematicTitle}>What began with a message<br /><em>will become a marriage.</em></h2></div>
    </motion.div></div>
  </section>;
}


