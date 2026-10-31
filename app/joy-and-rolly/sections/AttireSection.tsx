import Image from "next/image";
import InvitationReveal from "../components/InvitationReveal";
import attireGuide from "../assets/attire-guide.png";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function AttireSection() {
  return <section id="attire" className={`${styles.blueSection} scroll-mt-16 px-6 py-20 md:py-24`}>
    <div className="mx-auto max-w-4xl text-center">
      <InvitationReveal as="h2" className={styles.heading}>Dressed for the occasion</InvitationReveal>
      <InvitationReveal as="p" delay={0.04} className={`${styles.serif} mt-6 text-3xl`}>Formal attire</InvitationReveal>
      <InvitationReveal as="p" delay={0.08} className="mt-3 text-base sm:text-sm leading-7">Long dresses, barong, and long-sleeved shirts.</InvitationReveal>
      <InvitationReveal as="p" delay={0.12} className={`${styles.muted} mx-auto mt-5 max-w-md text-base sm:text-sm leading-7`}>Celebrate with us in these colors, chosen for our wedding day.</InvitationReveal>
      <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-9">{wedding.attire.map(item => <InvitationReveal key={item.group} className="min-w-0">
        <div className="flex min-h-[36px] flex-wrap items-center justify-center gap-1.5 sm:min-h-16 sm:gap-3">{item.colors.map(color => <span key={color.label} aria-hidden="true" className={`${styles.swatch} block size-[36px] shrink-0 rounded-full sm:size-[64px]`} style={{ backgroundColor: color.hex }} />)}</div>
        <h3 className={`${styles.serif} mt-3 text-xl leading-snug sm:mt-5 sm:text-2xl`}>{item.group}</h3>
        <p className="mt-2 break-words text-sm">{item.colors.map(color => color.label).join(" & ")}</p>
      </InvitationReveal>)}</div>
      <a href={attireGuide.src} target="_blank" rel="noopener noreferrer" aria-label="View the formal attire illustration at full size"
        className="mx-auto mt-10 block w-full max-w-3xl">
        <Image src={attireGuide} alt="Formal outfit examples: a lilac long gown, a dusty blue long-sleeved shirt with beige trousers, an ivory Barong Tagalog with tan trousers, and a tan one-shoulder gown."
          sizes="(min-width: 816px) 768px, calc(100vw - 48px)" className="h-auto w-full" />
      </a>
      <InvitationReveal as="p" className={`${styles.muted} mt-3 text-base sm:text-sm`}>Tap the illustration to view it larger.</InvitationReveal>
    </div>
  </section>;
}
