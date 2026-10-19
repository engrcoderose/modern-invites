import Image, { type ImageProps } from "next/image";
import { Camera } from "lucide-react";
import type { InvitationPhoto } from "../data/photos";
import styles from "../styles/invitation.module.css";

type PhotoFrameProps = {
  photo: InvitationPhoto;
  className?: string;
  sizes: string;
  priority?: boolean;
  fullBleed?: boolean;
  reveal?: boolean | "rise";
  onLoad?: ImageProps["onLoad"];
  onError?: ImageProps["onError"];
};

export default function PhotoFrame({ photo, className = "", sizes, priority = false, fullBleed = false, reveal = false, onLoad, onError }: PhotoFrameProps) {
  return (
    <div data-reveal={reveal === "rise" ? "photo-rise" : reveal ? "photo" : undefined} className={`${styles.photoFrame} ${fullBleed ? "absolute inset-0" : "relative"} overflow-hidden ${className}`}>
      {photo.src ? (
        <>
          {photo.preserveFaces && <Image src={photo.src} alt="" aria-hidden="true" fill sizes={sizes} quality={85} className="scale-105 object-cover blur-xl" style={{ objectPosition: photo.position ?? "50% 50%" }} />}
          {/* Limit the portrait's zoom in wide, short frames so both heads fit.
              The soft backdrop reuses the same optimized URL and responsive size. */}
          <div className={`absolute inset-0 ${photo.preserveFaces ? "mx-auto max-w-[calc(210dvh-240px)]" : ""}`}>
            <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} quality={85} onLoad={onLoad} onError={onError} className="object-cover" style={{ objectPosition: photo.position ?? "50% 50%" }} />
          </div>
        </>
      ) : (
        <div role="img" aria-label={`${photo.caption}: photo to follow`} className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center">
          <Camera size={25} strokeWidth={1.1} aria-hidden="true" />
          <p className="text-xs leading-5">Photo to follow</p>
        </div>
      )}
    </div>
  );
}
