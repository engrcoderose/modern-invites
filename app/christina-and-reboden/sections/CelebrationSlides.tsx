import Image from "next/image";
import { artwork, photos } from "../data/media";
import { wedding } from "../data/wedding";
import { Ornament, PhotoFrame, Stationery } from "../components/Stationery";
import WeddingCountdown from "../components/WeddingCountdown";
import styles from "../styles/invitation.module.css";

export function SaveTheDate({ active }: { active: boolean }) {
  return <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-4">
    <div className={`${styles.dateFrame} relative text-center`}>
      <Image src={artwork.frame} alt="" fill sizes="(max-height: 600px) min(calc(100vw - 32px), calc((100dvh - 198px) * 2 / 3)), min(490px, calc(100vw - 32px), calc((100dvh - 240px) * 2 / 3))" className="pointer-events-none object-contain" />
      <h2 className={`${styles.heading} ${styles.dateHeading} absolute inset-x-0`}>Save the Date</h2>
      <div className={`${styles.dateDisplay} absolute inset-x-0 flex flex-col items-center gap-1`}><span>{wedding.weekday}</span><strong>23</strong><span>January · 2027</span></div>
      <Image src={artwork.dateCollage} alt="Three Polaroid photographs of Christina and Reboden holding hands and smiling together by the sea" className={`${styles.dateCollage} absolute object-contain`} sizes="(max-height: 600px) min(calc((100vw - 32px) * .77), calc((100dvh - 198px) * .51)), min(373px, calc((100vw - 32px) * .77), calc((100dvh - 240px) * .51))" />
    </div>
    <WeddingCountdown enabled={active} />
  </div>;
}

export function WeddingInvitation() {
  return <Stationery title="With joyful hearts">
    <p className="max-w-md text-sm leading-7">Together with our families,<br />we request the honor of your presence<br />as we receive the Sacrament of Holy Matrimony.</p>
    <div className={styles.formalNames}><p>{wedding.bride}</p><span>&</span><p>{wedding.groom}</p></div>
    <p className="text-sm leading-7">{wedding.weekday}, {wedding.date}<br />Three o’clock in the afternoon<br />Malolos, Bulacan</p>
  </Stationery>;
}

export function ClosingSlide() {
  return <Stationery title="Our forever awaits">
    <PhotoFrame photo={photos.gallery} className="h-[clamp(8rem,27dvh,15rem)] w-full max-w-sm" />
    <p className="max-w-sm text-sm leading-7">We can’t wait to celebrate this beautiful chapter with you.</p>
    <p className={styles.smallScript}>Christina & Reboden</p>
    <p className="font-sans text-xs">{wedding.hashtag}</p>
    <Ornament />
  </Stationery>;
}
