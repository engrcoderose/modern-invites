import { ArrowUp } from "lucide-react";
import Reveal from "../components/Reveal";
import { wedding } from "../data/wedding";
import { Monogram, Ornament } from "../components/Ornament";
import styles from "../styles/invitation.module.css";

export default function Footer() {
  return <footer className={`${styles.footer} px-6 pb-24 pt-20 text-center sm:px-10 sm:pb-28 sm:pt-24`}>
    <Reveal><Monogram /><p className={`${styles.footerMessage} mx-auto mt-9 max-w-2xl`}>The beginning of<br /><em>our forever.</em></p><p className={`${styles.footerNames} mt-6`}>Jahzen & Glyzell</p><p className={`${styles.smallText} mt-5`}>{wedding.date.display} · Tarlac, Philippines</p><Ornament className="mx-auto my-8" /><p className={`${styles.hashtag} break-words`}>{wedding.hashtag}</p></Reveal>
    <Reveal className={`${styles.footerBottom} mx-auto mt-16 flex max-w-6xl flex-wrap items-center justify-between gap-4 pt-6 text-left`}><a href="https://www.moderninvites.com" target="_blank" rel="noreferrer">Made with love by Modern Invites</a><a href="#invitation" className="inline-flex min-h-11 items-center gap-3">Back to top<ArrowUp size={14} aria-hidden="true" /></a></Reveal>
  </footer>;
}
