import VintageAccent from "../components/VintageAccent";
import Monogram from "../components/Monogram";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function ClosingSection() {
  return <footer id="closing" aria-label="With love" className={`${styles.closing} relative overflow-hidden px-6 pb-8 pt-20 text-center md:pt-28`}>
    <div className="relative mx-auto max-w-lg">
      <VintageAccent variant="ivoryHibiscus" className="mx-auto mb-8 w-16" sizes="64px" />
      <p className={`${styles.closingMessage} text-3xl sm:text-4xl`}>With you, our day<br />will be even more beautiful.</p>
      <Monogram variant="blackLockup" light className="mx-auto mb-7 mt-10 w-52 sm:w-64" alt="Edcel & Apreal — December 4, 2026" sizes="(min-width: 640px) 256px, 208px" />
      <p className={`${styles.formal} mb-5 text-xs leading-6`}>{wedding.couple.groom} & {wedding.couple.bride}</p>
      <p className={`${styles.formal} text-xs tracking-[.12em]`}>ANTIPOLO CITY, RIZAL</p>
      <a href="#prenup-film" className={`${styles.lightLink} mt-10 inline-block min-h-11 px-4 py-3 text-xs`}>Back to the beginning</a>
      <p className={`${styles.footerCredit} mt-14 text-[10px] tracking-[.12em]`}>CRAFTED WITH LOVE BY <a className="underline underline-offset-4" href="https://www.moderninvites.com" target="_blank" rel="noopener noreferrer">MODERN INVITES</a></p>
    </div>
  </footer>;
}
