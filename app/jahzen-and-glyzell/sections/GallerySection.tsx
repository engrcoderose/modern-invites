import SamplePhoto from "../components/SamplePhoto";
import Reveal from "../components/Reveal";
import { gallery } from "../data/photos";
import styles from "../styles/invitation.module.css";
export default function GallerySection() {
  return <section id="gallery" tabIndex={-1} className={`${styles.gallery} scroll-mt-24 px-6 py-24 sm:px-10 lg:py-40`}>
    <div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><Reveal><h2 className={styles.heading}>Scenes from<br /><em>our forever.</em></h2></Reveal><p className={`${styles.sectionIntro} max-w-xs`}>Gallery layout preview. These sample photographs will be replaced with Jahzen & Glyzell’s own photos.</p></div>
      <div className="mt-14 grid auto-rows-[20rem] gap-3 md:auto-rows-[12rem] md:grid-cols-12 lg:mt-20">{gallery.map((photo, index) => <Reveal key={photo.alt} className={`relative min-h-0 ${photo.layout}`} delay={(index % 2) * 60}><SamplePhoto src={photo.src} alt={photo.alt} sizes={photo.sizes} /></Reveal>)}</div>
    </div>
  </section>;
}

