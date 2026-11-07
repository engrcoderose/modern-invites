import { galleryCaption } from "../data/gallery-caption";

export default function GalleryCaption({ className = "" }: { className?: string }) {
  return (
    <p data-mj-reveal className={`text-sm leading-7 sm:text-base ${className}`}>
      {galleryCaption.introduction}<em className="font-semibold">{galleryCaption.place}</em>{galleryCaption.ending}
    </p>
  );
}
