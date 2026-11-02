import Image from "next/image";
import InvitationReveal from "../components/InvitationReveal";
import { galleryPhotos } from "../data/gallery";
import styles from "../styles/invitation.module.css";

export default function GallerySection() {
  return <section id="gallery" aria-labelledby="jr-gallery-title" className="scroll-mt-20 px-6 py-20 md:px-12 md:py-28">
    <div className="mx-auto max-w-6xl">
      <InvitationReveal as="h2" id="jr-gallery-title" className={`${styles.heading} text-center`}>Our Gallery</InvitationReveal>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6">
        {galleryPhotos.map((photo, index) => <InvitationReveal key={photo.src} delay={(index % 3) * 0.06}
          className={`${styles.venuePhotoFrame} relative p-2 sm:p-3`}>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={photo.src} alt={photo.alt} fill
              sizes="(min-width: 1248px) 342px, (min-width: 768px) calc((100vw - 224px) / 3), (min-width: 640px) calc((100vw - 120px) / 2), calc((100vw - 96px) / 2)"
              style={{ objectPosition: photo.position }} className="object-cover" />
          </div>
        </InvitationReveal>)}
      </div>
    </div>
  </section>;
}
