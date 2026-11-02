import FloralArtwork from "../components/FloralArtwork";
import InvitationReveal from "../components/InvitationReveal";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function Footer() {
  return <footer className="relative isolate overflow-hidden bg-[#5b1961] px-6 pb-8 pt-16 text-center text-[var(--jr-paper)] [--jr-plum:var(--jr-paper)] md:pt-24">
    <FloralArtwork sizes="(min-width: 768px) 330px, 240px" className="absolute -bottom-28 -left-14 -z-10 w-[240px] opacity-55 md:w-[330px]" />
    <FloralArtwork sizes="(min-width: 768px) 330px, 240px" className="absolute -right-14 -top-28 -z-10 w-[240px] rotate-180 opacity-55 md:w-[330px]" />
    <InvitationReveal as="p" className={`${styles.serif} text-2xl`}>We can’t wait to celebrate with you.</InvitationReveal>
    <InvitationReveal as="p" delay={0.06} className={`${styles.footerNames} my-5`}>{wedding.couple.display}</InvitationReveal>
    <InvitationReveal as="p" delay={0.12} className="text-xs uppercase tracking-[0.15em]">{wedding.date.display} · Davao City</InvitationReveal>
    <InvitationReveal delay={0.16} className="mt-7"><a href="#invitation" className="inline-flex min-h-11 items-center text-xs underline underline-offset-4">Back to the invitation</a></InvitationReveal>
    <InvitationReveal as="p" className="mt-12 text-xs">Made with love by <a className="inline-flex min-h-11 min-w-11 items-center px-1 underline underline-offset-4" href="/" target="_blank" rel="noopener noreferrer">Modern Invites</a></InvitationReveal>
  </footer>;
}
