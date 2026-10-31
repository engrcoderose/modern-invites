import Image from "next/image";
import gentlemen from "../assets/attire-gentlemen.webp";
import ladies from "../assets/attire-ladies.webp";
import { PageHeading } from "../components/Stationery";
import { wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function AttirePage() {
  return <div className="w-full max-w-[960px] text-center"><PageHeading>Dressed for a lovely day</PageHeading><p className={`${styles.attireCode} mb-4`} data-reveal>{wedding.attire.code}</p><p className={`${styles.avoidNote} mx-auto mb-6 max-w-[600px]`} data-reveal>{wedding.attire.avoid}</p>
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10">{[{ label: "Ladies", image: ladies, copy: wedding.attire.ladies }, { label: "Gentlemen", image: gentlemen, copy: wedding.attire.gentlemen }].map((group) => <figure key={group.label} data-reveal><Image src={group.image} alt={`Illustrated ${group.label.toLowerCase()}’s outfit inspiration in soft blue, blush, lilac, peach and mauve tones`} sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1100px) 42vw, 410px" className={`${styles.attireImage} mx-auto h-auto w-full max-w-[410px]`} /><figcaption className="mt-4"><h3 className={styles.label}>{group.label}</h3><p className={`${styles.small} mx-auto mt-2 max-w-[340px]`}>{group.copy}</p></figcaption></figure>)}</div><p className={`${styles.small} mx-auto mt-6 max-w-[590px]`}>{wedding.attire.otherGuidance}</p>
  </div>;
}
