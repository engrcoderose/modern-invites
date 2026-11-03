import Image from "next/image";
import type { CSSProperties, SyntheticEvent } from "react";
import type { SlideshowPhoto } from "../data/photos";
import styles from "../styles/slideshow.module.css";

export default function SlideshowImage({ photo, width, height, onLoad, onError }: {
  photo: SlideshowPhoto;
  width: number;
  height: number;
  onLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
  onError: () => void;
}) {
  if (!photo.crop) {
    const imageWidth = Math.ceil(Math.max(width, height * photo.src.width / photo.src.height));
    const positionStyles = {
      "--ae-photo-position": photo.position,
      "--ae-photo-mobile-position": photo.mobilePosition ?? photo.position,
    } as CSSProperties;
    return <Image src={photo.src} alt={photo.alt} fill quality={85} sizes={`${imageWidth}px`}
      className={`${styles.photo} object-cover`} style={positionStyles} draggable={false}
      onLoad={onLoad} onError={onError} />;
  }

  const crop = photo.crop;
  const aspect = photo.src.width * crop.width / (photo.src.height * crop.height);
  const cropWidth = Math.min(width, height * aspect);
  const cropHeight = cropWidth / aspect;
  const sourceWidth = cropWidth / crop.width;
  const sourceHeight = cropHeight / crop.height;

  return <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
    style={{ width: cropWidth, height: cropHeight }}>
    <div className="absolute" style={{ width: sourceWidth, height: sourceHeight, left: -sourceWidth * crop.left, top: -sourceHeight * crop.top }}>
      <Image src={photo.src} alt={photo.alt} fill quality={85} sizes={`${Math.ceil(sourceWidth)}px`}
        className="object-cover" draggable={false} onLoad={onLoad} onError={onError} />
    </div>
  </div>;
}
