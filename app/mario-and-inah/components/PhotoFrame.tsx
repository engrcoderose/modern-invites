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
  reveal?: boolean;
  onLoad?: ImageProps["onLoad"];
  onError?: ImageProps["onError"];
};

export default function PhotoFrame({ photo, className = "", sizes, priority = false, fullBleed = false, reveal = false, onLoad, onError }: PhotoFrameProps) {
  return (
    <div data-reveal={reveal ? "photo" : undefined} className={`${styles.photoFrame} ${fullBleed ? "absolute inset-0" : "relative"} overflow-hidden ${className}`}>
      {photo.src ? (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} quality={85} onLoad={onLoad} onError={onError} className="object-cover" style={{ objectPosition: photo.position ?? "50% 50%" }} />
      ) : (
        <div role="img" aria-label={`${photo.caption}: photo to follow`} className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center">
          <Camera size={25} strokeWidth={1.1} aria-hidden="true" />
          <p className="text-xs leading-5">Photo to follow</p>
        </div>
      )}
    </div>
  );
}
