"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import SamplePhoto from "../components/SamplePhoto";
import { wedding } from "../data/wedding";
import { photos, photoSizes } from "../data/photos";
import styles from "../styles/invitation.module.css";
import useHydratedReducedMotion from "../hooks/useHydratedReducedMotion";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -65]);
  return <section id="invitation" ref={ref} className={`${styles.hero} relative h-[160svh]`}>
    <div className="sticky top-0 h-svh overflow-hidden">
      <div className="absolute inset-0"><SamplePhoto src={photos.hero} alt="Sample couple photograph for the hero layout, to be replaced" sizes={photoSizes.hero} shade zoom={reduced ? undefined : scale} /></div>
      <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-12 pt-24 text-center" style={reduced ? { y: 0 } : { y }}>
        <p className={styles.heroInvitation}>Together with our families,<br />we joyfully invite you to our wedding.</p>
        <h1 id="jg-title" tabIndex={-1} className={`${styles.heroNames} my-8 focus:outline-none`}><span>Jahzen</span><span className={styles.heroAmpersand}>and</span><span>Glyzell</span></h1>
        <p className={`${styles.heroDate} mt-5`}>{wedding.date.display}<span aria-hidden="true" className="mx-4">·</span>Tarlac, Philippines</p>
      </motion.div>
      <a href="#invitation-message" className={`${styles.heroScroll} absolute bottom-8 left-1/2 flex min-h-11 -translate-x-1/2 flex-col items-center gap-3`}><span>Discover our story</span><ArrowDown size={17} aria-hidden="true" /></a>
    </div>
  </section>;
}


