import TimelinePhotoSlideshow from "../components/TimelinePhotoSlideshow";

export default function TimelineGallerySection() {
  return <section id="timeline-gallery" aria-labelledby="ea-timeline-gallery-title">
    <h2 id="ea-timeline-gallery-title" className="sr-only">A lifetime of moments</h2>
    <TimelinePhotoSlideshow />
  </section>;
}
