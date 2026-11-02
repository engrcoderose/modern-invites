import Image from "next/image";
import gentlemen from "../assets/attire-gentlemen.webp";
import ladies from "../assets/attire-ladies.webp";
import ribbon from "../assets/design/ribbon-deco.png";
import { PageHeading } from "../components/Stationery";
import { wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

const attireImageSizes = "(max-width: 639px) calc((100vw - 68px) / 2), min(calc((100vw - 136px) / 2), clamp(132px, calc((100svh - 560px) * 1.095), 263px))";

export default function AttirePage() {
  return <div className={`${styles.attirePage} w-full max-w-[760px] text-center`}>
    <Image src={ribbon} alt="" sizes="clamp(35px, 5.74svh, 52px)" className="mx-auto mb-2 h-[clamp(48px,8svh,72px)] w-auto" data-reveal />
    <PageHeading compact>The Dress Code</PageHeading><p className={`${styles.attireCode} mb-4`} data-reveal>{wedding.attire.code}</p><p className={`${styles.avoidNote} mx-auto mb-6 max-w-[600px]`} data-reveal>{wedding.attire.avoid}</p>
    <div className="grid grid-cols-2 gap-5 sm:gap-10">{[{ label: "Ladies", image: ladies, copy: wedding.attire.ladies }, { label: "Gentlemen", image: gentlemen, copy: wedding.attire.gentlemen }].map((group) => <figure key={group.label} data-reveal><Image src={group.image} alt={`Illustrated ${group.label.toLowerCase()}’s outfit inspiration in soft blue, blush, lilac, peach and mauve tones`} sizes={attireImageSizes} className={`${styles.attireImage} mx-auto h-auto max-h-[clamp(120px,calc(100svh-560px),240px)] w-auto max-w-full`} /><figcaption className="mt-4"><h3 className={styles.label}>{group.label}</h3><p className={`${styles.small} mx-auto mt-2 max-w-[340px]`}>{group.copy}</p></figcaption></figure>)}</div><p className={`${styles.small} mx-auto mt-6 max-w-[590px]`}>{wedding.attire.otherGuidance}</p>
  </div>;
}
