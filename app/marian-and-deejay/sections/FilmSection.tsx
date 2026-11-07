import { getImageProps } from "next/image";
import PrenupFilm from "../components/PrenupFilm";
import landscapeBackground from "../assets/designs/landscape-bg-prenup-section.png";
import phoneBackground from "../assets/designs/phone-bg-prenup-section.png";
import { film } from "../data/film";
import wedding from "../data/wedding-details.json";

const { props: desktopArtwork } = getImageProps({ src: landscapeBackground, alt: "", fill: true, sizes: "(max-width: 1023px) max(100vw, 1100px), 100vw" });
const { props: phoneArtwork } = getImageProps({ src: phoneBackground, alt: "", fill: true, sizes: "max(100vw, 360px)" });

export default function FilmSection() {
  return (
    <section id="our-film" aria-labelledby="mj-film-title" className="mj-film relative isolate overflow-hidden px-5 pb-14 pt-10 text-center sm:px-10 sm:pb-20 sm:pt-12">
      <picture className="pointer-events-none absolute inset-0">
        <source media="(min-width: 640px)" srcSet={desktopArtwork.srcSet} sizes={desktopArtwork.sizes} />
        {/* Next optimization with picture selects only the artwork for this viewport. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...phoneArtwork} alt="" className="object-cover" />
      </picture>
      <div data-mj-stagger className="relative mx-auto max-w-7xl">
        <h2 data-mj-reveal id="mj-film-title" className="mj-film-script mj-film-title">{film.title}</h2>
        <p data-mj-reveal className="mx-auto mt-4 max-w-xl text-balance text-base leading-6 sm:mt-5 sm:text-lg sm:leading-7">{film.message}</p>
        <p data-mj-reveal className="mj-film-script mb-6 mt-4 text-2xl sm:mb-8 sm:text-3xl">{wedding.couple.display}</p>
        <div data-mj-reveal className="mx-auto w-full max-w-5xl sm:w-[78%]"><PrenupFilm src={film.src} poster={film.poster.src} label={film.label} /></div>
      </div>
    </section>
  );
}
