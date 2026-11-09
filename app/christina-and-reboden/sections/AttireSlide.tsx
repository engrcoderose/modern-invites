import Image from "next/image";
import { artwork } from "../data/media";
import { Ornament, SlideHeading } from "../components/Stationery";
import styles from "../styles/invitation.module.css";

function PrincipalSponsorsAttire() {
  return <section aria-label="Principal sponsors’ attire" className="flex w-full max-w-lg shrink-0 flex-col gap-3">
    <h3 data-cr-reveal className={styles.groupTitle}>For Our Principal Sponsors</h3>
    <dl data-cr-reveal className="grid grid-cols-2 gap-5 text-xs leading-5">
      <div><dt className={styles.groupTitle}>Ninong</dt><dd className="mt-1">Barong Tagalog and black pants</dd></div>
      <div><dt className={styles.groupTitle}>Ninang</dt><dd className="mt-1">Gray floor-length gown</dd></div>
    </dl>
  </section>;
}

export default function AttireSlide() {
  return <div data-invitation-scroll tabIndex={0} role="region" aria-label="Dress code" className={`${styles.sponsorScroller} absolute inset-0 overflow-y-auto overscroll-contain outline-none`}>
    <div className="relative mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center gap-4 px-5 py-4 text-center sm:px-12">
      <div className="flex shrink-0 flex-col items-center gap-3"><Ornament /><SlideHeading>The Dress Code</SlideHeading></div>
      <PrincipalSponsorsAttire />
      <section aria-label="Guest attire" className="flex w-full max-w-lg shrink-0 flex-col items-center gap-3">
        <h3 data-cr-reveal className={styles.groupTitle}>For Our Guests</h3>
        <div data-cr-reveal className="grid w-full grid-cols-2 gap-6 text-center">
      <div className="flex flex-col items-center gap-2"><h3 className={styles.groupTitle}>Gentlemen</h3><Image src={artwork.gentleman} alt="Illustration of a gentleman wearing a cream barong and black pants" className={`${styles.attireFigure} w-auto object-contain`} sizes="(max-height: 720px) 5.03dvh, clamp(30px, 5.92dvh, 54px)" /><p className="text-xs leading-5">Barong Tagalog / suit & tie / long sleeve<br />Black slacks or pants</p></div>
      <div className="flex flex-col items-center gap-2"><h3 className={styles.groupTitle}>Ladies</h3><Image src={artwork.lady} alt="Illustration of a lady wearing a blush pink formal gown" className={`${styles.attireFigure} w-auto object-contain`} sizes="(max-height: 720px) 12dvh, clamp(71px, 14.11dvh, 127px)" /><p className="text-xs leading-5">Long gown /<br />formal cocktail dress</p></div>
        </div>
        <div data-cr-reveal className="flex flex-wrap justify-center gap-5">{[["Dusty blue", styles.blueSwatch], ["Blush pink", styles.pinkSwatch], ["Champagne cream", styles.creamSwatch]].map(([label, color]) => <div key={label} className="flex flex-col items-center gap-2"><span className={`${color} h-8 w-8 rounded-full border`} /><span className="text-[10px]">{label}</span></div>)}</div>
        <p data-cr-reveal className="max-w-md text-xs leading-5">Strictly formal & cocktail, according to our motif.<br /><strong className="font-medium">No white, red, orange, green, or yellow.</strong></p>
      </section>
      <p data-cr-reveal className="shrink-0 text-xs italic">With love, dressed for a day to remember.</p>
    </div>
  </div>;
}
