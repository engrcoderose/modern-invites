import Reveal from "../components/Reveal";
import SamplePhoto from "../components/SamplePhoto";
import { memoriesGallery } from "../data/memories-gallery";
import styles from "../styles/invitation.module.css";

export default function MemoriesGallerySection() {
  return <section id="memories" tabIndex={-1} aria-labelledby="jg-memories-title" className={`${styles.gallery} scroll-mt-24 px-6 py-24 sm:px-10 lg:px-16 lg:py-32`}>
    <div className="mx-auto max-w-6xl">
      <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <h2 id="jg-memories-title" className={`${styles.heading} italic`}>The lasting memories.</h2>
        <p className={`${styles.smallText} shrink-0 text-[var(--jg-gold)]`}>Our prenup collection</p>
      </Reveal>
      <Reveal className="mt-12 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 md:grid-cols-3">
        {memoriesGallery.map((photo, index) => <a data-reveal-item key={photo.id} href={photo.src.src} target="_blank" rel="noreferrer"
          aria-label={`View photo ${index + 1}: ${photo.alt} (opens in a new tab)`}
          className={`relative block overflow-hidden ${index === 0 ? "row-span-2" : "aspect-[4/3]"} ${index === memoriesGallery.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
          <SamplePhoto src={photo.src} alt={photo.alt} sizes={photo.sizes} position={photo.position} />
        </a>)}
      </Reveal>
    </div>
  </section>;
}
