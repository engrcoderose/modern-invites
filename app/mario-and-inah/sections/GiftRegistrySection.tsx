import FloralArtwork from "../components/FloralArtwork";
import { giftNote } from "../data/guest-information";
import styles from "../styles/invitation.module.css";

export default function GiftRegistrySection() {
  return (
    <section id="gifts" aria-labelledby="mi-gifts-title" className={`${styles.sage} px-6 py-20 sm:px-10 md:py-28 lg:px-16`}>
      <div className="mx-auto max-w-2xl text-center">
        <FloralArtwork reveal name="venueLine" className="mx-auto mb-7 h-auto w-56 max-w-full sm:w-72" sizes="(min-width: 640px) 288px, 224px" />
        <h2 data-reveal="heading" id="mi-gifts-title" className={styles.heading}>Gift Registry</h2>
        <p data-reveal="text" className="mx-auto mt-7 max-w-xl text-sm leading-8 sm:text-base">{giftNote}</p>
      </div>
    </section>
  );
}
