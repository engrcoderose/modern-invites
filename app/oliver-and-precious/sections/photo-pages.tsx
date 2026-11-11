import Image from "next/image";
import type { Photo } from "../data";
import type { InvitationPage } from "./types";

export function photoPages(
  photos: Photo[],
  title: string,
  prefix: string,
): InvitationPage[] {
  return photos.map((photo, index) => ({
    id: `${prefix}-${index + 1}`,
    label: `${title} · ${index + 1}`,
    content: (
      <div className="op-photo-page h-full flex flex-col gap-5">
        <p className="op-label">{title}</p>
        <figure>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            unoptimized
            sizes="(max-width: 700px) 85vw, 600px"
          />
        </figure>
      </div>
    ),
  }));
}

