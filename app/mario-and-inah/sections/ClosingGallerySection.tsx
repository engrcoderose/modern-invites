import PhotoFrame from "../components/PhotoFrame";
import { closingGalleryPhotos } from "../data/photos";
import styles from "../styles/invitation.module.css";

const placements = [
  "col-span-2 lg:col-span-6 lg:col-start-4 lg:row-start-1 lg:row-span-2",
  "lg:col-span-3 lg:col-start-1 lg:row-start-1",
  "lg:col-span-3 lg:col-start-10 lg:row-start-1",
  "lg:col-span-3 lg:col-start-1 lg:row-start-2",
  "lg:col-span-3 lg:col-start-10 lg:row-start-2",
  "lg:col-span-6 lg:col-start-1 lg:row-start-3",
  "lg:col-span-6 lg:col-start-7 lg:row-start-3",
];

export default function ClosingGallerySection() {
  return (
    <section id="gallery-before-rsvp" aria-labelledby="mi-closing-gallery-title" className={`${styles.sage} px-4 py-16 sm:px-10 md:py-24 lg:px-16`}>
      <div className="mx-auto max-w-6xl">
        <h2 data-reveal="heading" id="mi-closing-gallery-title" className={`${styles.heading} mb-10 text-center`}>Little moments, forever</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-12">
          {closingGalleryPhotos.map((photo, index) => {
            const featured = index === 0;
            const wide = index >= 5;
            const desktopSize = featured || wide ? "(min-width: 1280px) 566px, (min-width: 1024px) calc((100vw - 148px) / 2)" : "(min-width: 1280px) 273px, (min-width: 1024px) calc((100vw - 188px) / 4)";
            const mobileSize = featured ? "(min-width: 640px) calc(100vw - 80px), calc(100vw - 32px)" : "(min-width: 640px) calc((100vw - 100px) / 2), calc((100vw - 44px) / 2)";
            return (
              <figure key={photo.id} data-reveal="photo" data-reveal-delay={Math.min(index * 0.06, 0.24)} className={`${placements[index]} min-w-0 overflow-hidden rounded-sm bg-[var(--mi-paper)] p-1.5 sm:p-2`}>
                <PhotoFrame photo={photo} sizes={`${desktopSize}, ${mobileSize}`} className={featured ? "aspect-[4/5] lg:h-full lg:aspect-auto" : wide ? "aspect-[3/2] lg:aspect-[2/1]" : "aspect-[4/3] lg:aspect-[4/5]"} />
                <figcaption className="sr-only">{photo.caption}</figcaption>
              </figure>
            );
          })}
        </div>
        {closingGalleryPhotos.some(photo => photo.sample) && <p data-reveal="text" className="mt-6 text-center text-xs leading-6">Sample photographs · Mario &amp; Inah’s photos to follow.</p>}
      </div>
    </section>
  );
}
