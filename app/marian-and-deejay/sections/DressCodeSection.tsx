import Image from "next/image";
import AttirePalette from "../components/AttirePalette";
import AttireDrawing from "../components/AttireDrawing";
import { maleGuestArt, femaleGuestArt, sponsorArt } from "../data/attire-artwork";
import wedding from "../data/wedding-details.json";
import roses from "../assets/designs/flower-design-3.png";
import monogram from "../assets/designs/client-monogram-transparent-v1.png";

export default function DressCodeSection() {
  const colorList = new Intl.ListFormat("en", { style: "long", type: "disjunction" });
  return (
    <section id="details" aria-labelledby="mj-attire-title" className="mj-attire relative isolate overflow-hidden px-6 pb-14 pt-20 text-center sm:px-10 sm:pb-20 sm:pt-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
        <Image src={roses} alt="" sizes="(min-width: 640px) 224px, 112px" className="absolute -left-7 -top-8 h-auto w-28 rotate-12 sm:-left-10 sm:-top-12 sm:w-56" />
        <Image src={roses} alt="" sizes="(min-width: 640px) 224px, 112px" className="absolute -right-7 -top-8 h-auto w-28 -rotate-12 -scale-x-100 sm:-right-10 sm:-top-12 sm:w-56" />
      </div>
      <Image src={monogram} alt="" sizes="112px" className="pointer-events-none absolute right-[9%] top-28 hidden h-auto w-28 md:block" />
      <div className="relative mx-auto max-w-6xl">
        <h2 data-mj-reveal id="mj-attire-title" className="mj-heading">Dress Code</h2>
        <p data-mj-reveal className="mt-1 text-xl sm:text-2xl">Formal Attire</p>
        <div className="mt-5 grid grid-cols-2 items-end gap-x-5 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] md:gap-x-4">
          <div className="col-span-2 md:col-span-1 md:col-start-2 md:row-start-1">
            <AttirePalette />
            <h3 data-mj-reveal className="mj-attire-label mb-2 mt-6">Guests</h3>
            <div className="mx-auto max-w-md space-y-2 text-sm uppercase leading-6 lg:text-base lg:leading-7">
              <p>Gentlemen: Please wear {colorList.format(wedding.attire.maleGuests)}.</p>
              <p>Ladies: Please wear {colorList.format(wedding.attire.femaleGuests)}.</p>
            </div>
          </div>
          <figure aria-label="Formal attire inspiration for gentlemen" className="flex w-full items-end justify-center md:col-start-1 md:row-start-1">
            <AttireDrawing artwork={maleGuestArt} sizes="(min-width: 768px) 240px, 160px" className="relative w-[73%] max-w-[180px]" />
          </figure>
          <figure aria-label="Formal attire inspiration for ladies" className="flex w-full items-end justify-center md:col-start-3 md:row-start-1">
            <AttireDrawing artwork={femaleGuestArt} sizes="(min-width: 768px) 280px, 200px" className="relative w-full max-w-[240px]" />
          </figure>
        </div>
        <div className="mx-auto mt-7 max-w-3xl">
          <h3 data-mj-reveal className="mj-attire-label mb-3">Principal Sponsors</h3>
          <dl className="space-y-1 text-sm uppercase leading-6 lg:text-base lg:leading-7">
            <div data-mj-reveal><dt className="inline">Ninong: </dt><dd className="inline">{wedding.attire.principalSponsors.ninong}</dd></div>
            <div data-mj-reveal><dt className="inline">Ninang: </dt><dd className="inline">{wedding.attire.principalSponsors.ninang}</dd></div>
          </dl>
          <AttireDrawing artwork={sponsorArt} sizes="(min-width: 640px) 540px, calc(116vw - 56px)" className="relative mx-auto mt-3 w-full max-w-[460px]" />
        </div>
        <p data-mj-reveal className="mj-attire-note mx-auto mt-8 max-w-3xl border-t pt-6 text-sm leading-7">{wedding.attire.notes.split("\n\n")[2]}</p>
      </div>
    </section>
  );
}
