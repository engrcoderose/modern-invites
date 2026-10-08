import Image from "../components/OptimizedPhoto";
import { hashtagBreakBackground, hashtagBreakBackgroundSizes, hashtagBreakPhotos } from "../data/hashtag-photo-break";
import styles from "../styles/wedding.module.css";

export default function HashtagPhotoBreakSection() {
  return (
    <section id="hashtag-photos" aria-label="Ryan and Anne, moments together" className="relative isolate flex min-h-[300px] items-center overflow-hidden bg-[#35352e] px-5 py-20 sm:min-h-[500px] sm:px-10 sm:py-28 lg:min-h-[680px] lg:px-16 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <Image src={hashtagBreakBackground.src} alt="" fill sizes={hashtagBreakBackgroundSizes} className={`${styles.triptychBackdrop} object-cover`} style={{ objectPosition: "51% 55%" }} />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/40" />
      <div data-reveal-group className="mx-auto grid w-full max-w-[1100px] grid-cols-3 items-center gap-3 sm:gap-12 lg:gap-24">
        {hashtagBreakPhotos.map((photo) => (
          <div data-reveal="image" key={photo.id} className="relative aspect-[3/4] overflow-hidden">
            <Image src={photo.src} alt={photo.alt} fill sizes={photo.sizes} className="object-cover" style={{ objectPosition: photo.position }} />
          </div>
        ))}
      </div>
    </section>
  );
}
