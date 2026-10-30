import PhotoGallery from "../components/PhotoGallery";
import styles from "../styles/gallery.module.css";

export default function GallerySection() {
  return <section id="gallery" aria-labelledby="ea-gallery-title" className={`${styles.gallery} overflow-hidden py-8 sm:py-12 md:py-16`}>
    <h2 id="ea-gallery-title" className="sr-only">Our moments together</h2>
    <PhotoGallery />
  </section>;
}
