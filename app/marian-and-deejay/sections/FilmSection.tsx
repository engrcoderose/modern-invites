import Image from "next/image";
import PrenupFilm from "../components/PrenupFilm";
import background from "../assets/images/prenup_video_bg.png";
import { film } from "../data/film";
import wedding from "../data/wedding-details.json";

export default function FilmSection() {
  return (
    <section id="our-film" aria-labelledby="mj-film-title" className="mj-film relative isolate overflow-hidden px-6 py-12 text-center sm:px-10 sm:py-16">
      <Image src={background} alt="" fill sizes="(max-width: 639px) calc(160vw + 240px), 100vw" className="pointer-events-none object-cover" />
      <div className="relative mx-auto max-w-5xl">
        <h2 data-mj-reveal id="mj-film-title" className="mj-film-script mj-film-title">{film.title}</h2>
        <p data-mj-reveal className="mx-auto mt-6 max-w-xl text-balance text-base leading-6 sm:mt-7 sm:text-lg sm:leading-7">{film.message}</p>
        <p data-mj-reveal className="mj-film-script mb-8 mt-5 text-2xl sm:mb-10 sm:text-3xl">{wedding.couple.display}</p>
        <div data-mj-reveal className="mx-auto max-w-4xl"><PrenupFilm src={film.src} poster={film.poster.src} label={film.label} /></div>
      </div>
    </section>
  );
}
