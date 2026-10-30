import FloralArtwork from "../components/FloralArtwork";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function Footer() {
  return <footer className={`${styles.footer} relative isolate overflow-hidden px-6 pb-8 pt-16 text-center md:pt-24`}>
    <FloralArtwork sizes="(min-width: 768px) 330px, 240px" className="absolute -bottom-28 -left-14 -z-10 w-[240px] opacity-55 md:w-[330px]" />
    <FloralArtwork sizes="(min-width: 768px) 330px, 240px" className="absolute -right-14 -top-28 -z-10 w-[240px] rotate-180 opacity-55 md:w-[330px]" />
    <p className={`${styles.serif} text-2xl`}>We can’t wait to celebrate with you.</p>
    <p className={`${styles.footerNames} my-5`}>{wedding.couple.display}</p>
    <p className="text-xs uppercase tracking-[0.15em]">{wedding.date.display} · Davao City</p>
    <a href="#invitation" className="mt-7 inline-flex min-h-11 items-center text-xs underline underline-offset-4">Back to the invitation</a>
    <p className="mt-12 text-xs">Made with love by <a className="inline-flex min-h-11 min-w-11 items-center px-1 underline underline-offset-4" href="/" target="_blank" rel="noopener noreferrer">Modern Invites</a></p>
  </footer>;
}
