"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import HeroSlideshow from "../components/HeroSlideshow";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";
import useHydratedReducedMotion from "../hooks/useHydratedReducedMotion";
import { entranceMotion } from "../lib/entrance-motion";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useHydratedReducedMotion();
  const entered = useInView(ref, { once: true, amount: .2 });
  const entrance = entered && !reduced ? { opacity: [0, 1], y: [entranceMotion.distance, 0] } : { opacity: 1, y: 0 };
  const transition = { duration: reduced ? 0 : entranceMotion.duration / 1000, ease: entranceMotion.motionEasing };
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -65]);
  return <section id="invitation" ref={ref} className={`${styles.hero} relative h-[160svh]`}>
    <div className="sticky top-0 h-svh overflow-hidden">
      <HeroSlideshow zoom={reduced ? undefined : scale} />
      <motion.div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-32 pt-24 text-center sm:pb-12" style={reduced ? { y: 0 } : { y }}>
        <motion.p className={styles.heroInvitation} initial={false} animate={entrance} transition={transition}>Together with our families,<br />we joyfully invite you to our wedding.</motion.p>
        <h1 id="jg-title" tabIndex={-1} className={`${styles.heroNames} my-8 focus:outline-none`}>
          <motion.span initial={false} animate={entrance} transition={{ ...transition, delay: reduced ? 0 : .12 }}>Jahzen</motion.span>
          <motion.span className={styles.heroAmpersand} initial={false} animate={entrance} transition={{ ...transition, delay: reduced ? 0 : .24 }}>and</motion.span>
          <motion.span initial={false} animate={entrance} transition={{ ...transition, delay: reduced ? 0 : .36 }}>Glyzell</motion.span>
        </h1>
        <motion.p className={`${styles.heroDate} mt-5`} initial={false} animate={entrance} transition={{ ...transition, delay: reduced ? 0 : .48 }}>{wedding.date.display}<span aria-hidden="true" className="mx-4">·</span>Tarlac, Philippines</motion.p>
      </motion.div>
      <a href="#invitation-message" className={`${styles.heroScroll} absolute bottom-24 left-1/2 z-20 flex min-h-11 -translate-x-1/2 flex-col items-center gap-3 sm:bottom-8`}><motion.span initial={false} animate={entrance} transition={{ ...transition, delay: reduced ? 0 : .6 }}>Discover our story</motion.span><motion.span initial={false} animate={entrance} transition={{ ...transition, delay: reduced ? 0 : .72 }}><ArrowDown size={17} aria-hidden="true" /></motion.span></a>
    </div>
  </section>;
}


