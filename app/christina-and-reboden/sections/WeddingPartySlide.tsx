import { Ornament, SlideHeading } from "../components/Stationery";
import styles from "../styles/invitation.module.css";

export default function WeddingPartySlide({ title, names }: { title: string; names: string[] }) {
  return <div data-invitation-scroll tabIndex={0} role="region" aria-label={title} className={`${styles.sponsorScroller} ${styles.entourageScroller} absolute inset-0 overflow-y-auto overscroll-contain outline-none`}>
    <div className="relative mx-auto flex min-h-full w-full max-w-xl flex-col items-center justify-center gap-5 px-5 py-6 text-center sm:gap-7 sm:px-12">
      <div className="flex shrink-0 flex-col items-center gap-3"><Ornament /><SlideHeading>{title}</SlideHeading></div>
      <ul className="w-full max-w-sm shrink-0 space-y-1.5 text-center text-xs italic leading-5 sm:text-sm">{names.map(name => <li data-cr-reveal key={name}>{name}</li>)}</ul>
    </div>
  </div>;
}
