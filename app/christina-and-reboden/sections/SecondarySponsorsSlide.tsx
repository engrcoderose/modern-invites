import { Ornament, SlideHeading } from "../components/Stationery";
import { honorAttendants, secondarySponsors } from "../data/entourage";
import { NameColumns, NameGroup } from "./EntourageSlide";
import styles from "../styles/invitation.module.css";

export default function SecondarySponsorsSlide() {
  return <div data-invitation-scroll tabIndex={0} role="region" aria-label="Secondary sponsors" className={`${styles.sponsorScroller} ${styles.entourageScroller} absolute inset-0 overflow-y-auto overscroll-contain outline-none`}>
    <div className={`${styles.secondaryParty} relative mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center gap-6 px-5 py-6 text-center sm:px-12`}>
      <div className="flex shrink-0 flex-col items-center gap-3"><Ornament /><SlideHeading>Secondary Sponsors</SlideHeading></div>
      <div className="flex w-full shrink-0 flex-col gap-6">
        <NameColumns groups={honorAttendants} />
        {secondarySponsors.map(group => <NameGroup key={group.title} {...group} paired />)}
      </div>
    </div>
  </div>;
}
