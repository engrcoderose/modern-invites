import GalleryCarousel from "../components/GalleryCarousel";
import Image from "next/image";
import gardenBackdrop from "../assets/photos/gallery-garden.webp";
import Reveal from "../components/Reveal";
import styles from "../styles/invitation.module.css";
export default function GallerySection() {
  return <section id="gallery" tabIndex={-1} aria-label="Wedding photographs" className={`${styles.gallery} relative isolate scroll-mt-24 overflow-hidden px-6 py-16 sm:px-10 sm:py-24 lg:py-28`}>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -inset-8">
        <Image src={gardenBackdrop} alt="" fill unoptimized className={`${styles.galleryBackdrop} object-cover`} />
      </div>
      <div className={`${styles.galleryShade} absolute inset-0`} />
    </div>
    <Reveal className="relative"><GalleryCarousel /></Reveal>
  </section>;
}

