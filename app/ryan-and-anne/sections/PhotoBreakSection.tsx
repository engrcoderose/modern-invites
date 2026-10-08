import Image from "../components/OptimizedPhoto";
import type { PrenupPhoto } from "../types/media";

interface Props {
  id: string;
  photo: PrenupPhoto;
  label: string;
}

export default function PhotoBreakSection({ id, photo, label }: Props) {
  return (
    <section id={id} aria-label={label} className="relative isolate min-h-[620px] overflow-hidden sm:min-h-[720px]">
      <Image data-reveal="fade" src={photo.src} alt={photo.alt} fill sizes="(min-width:640px) max(100vw, 1080px), max(100vw, 930px)" className="-z-20 object-cover" style={{ objectPosition: photo.position ?? "50% 50%" }} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/10" />
    </section>
  );
}
