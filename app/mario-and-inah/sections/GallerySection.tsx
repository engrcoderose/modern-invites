import Image from "next/image";
import PhotoFrame from "../components/PhotoFrame";
import { galleryPhotos, type InvitationPhoto } from "../data/photos";
import { rosePainting } from "../data/artwork";
import styles from "../styles/invitation.module.css";

type GallerySectionProps = {
  id?: string;
  photos?: readonly InvitationPhoto[];
};

export default function GallerySection({ id = "gallery", photos = galleryPhotos.slice(0, 3) }: GallerySectionProps) {
  const titleId = `mi-${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={`${styles.galleryBackdrop} relative isolate overflow-hidden px-6 py-14 sm:px-10 sm:py-20 lg:px-16`}>
      <Image data-reveal="photo" src={rosePainting} alt="" aria-hidden="true" fill sizes="100vw" className="pointer-events-none -z-20 object-cover" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-black/40" />
      <div className="mx-auto max-w-4xl">
        <h2 id={titleId} className="sr-only">Our photo gallery</h2>
        <div className="grid grid-cols-3 items-center gap-3 sm:gap-7">
          {photos.map((photo, index) => <figure data-reveal="photo" data-reveal-delay={index * 0.06} key={photo.id}><PhotoFrame photo={photo} sizes="(min-width: 976px) 280px, (min-width: 640px) calc((100vw - 136px) / 3), calc((100vw - 72px) / 3)" className={index % 3 === 1 ? "aspect-[3/5]" : "aspect-[3/4]"} /><figcaption className="sr-only">{photo.caption}</figcaption></figure>)}
        </div>
        {photos.some(photo => photo.sample) && <p data-reveal="text" className="mt-6 text-center text-xs leading-6">Sample photographs · Mario & Inah’s photos to follow.</p>}
      </div>
    </section>
  );
}
