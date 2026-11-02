import Image from "next/image";
import { photoBreakPhoto } from "../data/gallery";

type PhotoBreakSectionProps = {
  id?: string;
  photo?: typeof photoBreakPhoto;
};

export default function PhotoBreakSection({ id = "photo-break", photo = photoBreakPhoto }: PhotoBreakSectionProps) {
  return <figure id={id} className="relative m-0 h-svh w-full overflow-hidden">
    <Image src={photo.src} alt={photo.alt} fill
      sizes="(min-aspect-ratio: 3/2) 100vw, 150svh"
      className="object-cover" style={{ objectPosition: photo.position }} />
  </figure>;
}
