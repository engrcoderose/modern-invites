import Image, { type StaticImageData } from "next/image";
import VintageAccent from "./VintageAccent";
import styles from "../styles/invitation.module.css";

const photoAccents = {
  brassClip: { className: "absolute -top-6 left-1/2 z-10 w-14 -translate-x-1/2", sizes: "56px" },
  burgundyButton: { className: "absolute -bottom-3 -right-2 z-10 w-10 rotate-12", sizes: "40px" },
  butterfly: { className: "absolute -right-3 -top-5 z-10 w-14 rotate-12", sizes: "56px" },
  pressedFlowers: { className: "absolute -bottom-5 -left-3 z-10 w-20 -rotate-12", sizes: "80px" },
  ivoryHibiscus: { className: "absolute -right-4 -top-4 z-10 w-16 rotate-12", sizes: "64px" },
};
export type StoryOrnament = keyof typeof photoAccents;

interface StoryPhotoProps {
  photo: { src: StaticImageData; alt: string; framing?: "landscape" };
  reverse?: boolean;
  ornament?: StoryOrnament;
}

export default function StoryPhoto({ photo, reverse = false, ornament }: StoryPhotoProps) {
  const landscape = photo.framing === "landscape";
  const sizes = "(min-width: 1040px) 422px, (min-width: 768px) calc((100vw - 196px) / 2), (min-width: 496px) 422px, calc(100vw - 74px)";

  return (
    <figure className="relative mx-auto w-full max-w-md" data-reveal>
      <div className={`${styles.storyPhotoFrame} ${reverse ? styles.storyPhotoRight : styles.storyPhotoLeft} p-3`}>
        <div className={landscape ? "relative aspect-[3/2]" : undefined}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill={landscape}
            sizes={sizes}
            placeholder="blur"
            className={landscape ? "object-cover object-center" : "block h-auto w-full"}
          />
        </div>
      </div>
      {ornament && <VintageAccent variant={ornament} {...photoAccents[ornament]} />}
    </figure>
  );
}
