import Image from "next/image";
import { Heart } from "lucide-react";
import { demoAlbumDetails, demoAlbumArtwork } from "../infrastructure/demo-album";
import styles from "./photo-sharing.module.css";

export function AlbumIntroduction() {
  return (
    <header className={`${styles.albumEntrance} grid grid-cols-2 items-center gap-x-6 gap-y-7 pb-9 pt-8 sm:pb-12 md:grid-cols-[1fr_1.7fr_1fr] md:gap-8 md:py-14`}>
      <div className="col-span-2 text-center md:col-span-1 md:col-start-2 md:row-start-1">
        <div aria-hidden="true" className="mb-3 flex items-center justify-center gap-4 text-[var(--album-accent)]">
          <span className="h-px w-10 bg-[var(--album-line)]" />
          <Heart className="size-4" strokeWidth={1.25} />
          <span className="h-px w-10 bg-[var(--album-line)]" />
        </div>
        <h1 className={`${styles.albumTitle} font-imperial text-7xl leading-[1.15] text-[var(--album-accent)] sm:text-8xl`}>
          {demoAlbumDetails.names}
        </h1>
        <p className="mt-3 font-instrumentSerif text-2xl italic sm:text-3xl">{demoAlbumDetails.title}</p>
        <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-[var(--album-muted)]">
          The smiles, the happy tears, the dance-floor moments. Help us remember it all.
        </p>
      </div>

      {demoAlbumArtwork.map((artwork, index) => (
        <figure key={artwork.source} className={`${styles.photoPrint} ${index === 0 ? styles.printLeft : styles.printRight} mx-auto w-full max-w-44 bg-white p-2 pb-3 md:row-start-1 md:max-w-none md:p-3 md:pb-4 ${index === 0 ? "col-start-1" : "col-start-2 md:col-start-3"}`}>
          <div className="relative aspect-[6/5] overflow-hidden md:aspect-[4/5]">
            <Image
              src={artwork.source}
              alt={artwork.alt}
              fill
              sizes="(max-width: 767px) 160px, (max-width: 1071px) calc((100vw - 112px) / 3.7), 247px"
              priority={index === 0}
              className="object-cover"
            />
          </div>
          <figcaption className="pt-3 text-center font-instrumentSerif text-lg italic text-[var(--album-muted)]">{artwork.caption}</figcaption>
        </figure>
      ))}
    </header>
  );
}
