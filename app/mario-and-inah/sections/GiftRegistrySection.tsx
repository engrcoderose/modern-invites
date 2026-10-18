import FloralArtwork from "../components/FloralArtwork";
import PhotoFrame from "../components/PhotoFrame";
import { giftNote } from "../data/guest-information";
import { photos } from "../data/photos";
import styles from "../styles/invitation.module.css";

export default function GiftRegistrySection() {
  return (
    <section id="gifts" aria-labelledby="mi-gifts-title" className={`${styles.sage} px-6 py-20 sm:px-10 md:py-28 lg:px-16`}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 data-reveal="heading" id="mi-gifts-title" className={styles.heading}>Gift Registry</h2>
        <FloralArtwork reveal name="venueLine" className="mx-auto mt-7 h-auto w-56 max-w-full sm:w-72" sizes="(min-width: 640px) 288px, 224px" />
        <p data-reveal="text" className="mx-auto mt-7 max-w-xl text-sm leading-8 sm:text-base">{giftNote}</p>
        <PhotoFrame photo={photos.gift} reveal className="mt-10 aspect-video rounded-sm" sizes="(min-width: 752px) 672px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)" />
      </div>
    </section>
  );
}
