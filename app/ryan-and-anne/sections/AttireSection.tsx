import Image from "next/image";
import SectionHeading from "../components/SectionHeading";
import colorGuide from "../assets/design/Copy of Attire guide.png";
import AttireGuide from "../components/AttireGuide";
import { attireDetails } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function AttireSection() {
  return (
    <section data-reveal-group id="attire" aria-label="Wedding dress code" className="bg-[#eae3d7] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
          <div>
            <SectionHeading eyebrow="Dress for the occasion" title="A little elegance." secondLine="A little you." />
            <h3 data-reveal className={`${styles.serif} mt-8 text-2xl`}>{attireDetails.formality}</h3>
            <div className="mt-5 max-w-xl space-y-4 text-sm leading-8 text-[#615b50]">{attireDetails.paragraphs.map((paragraph) => <p data-reveal key={paragraph}>{paragraph}</p>)}</div>
          </div>
          <figure data-reveal="image" className="mx-auto w-full max-w-[330px] rotate-[2deg] border border-[#8a714e]/25 p-2 shadow-xl shadow-[#645335]/10">
            <Image src={colorGuide} alt="Ryan and Anne’s attire color guide: black and champagne gold for November 22, 2026." sizes="330px" className="h-auto w-full" />
          </figure>
        </div>
        <figure data-reveal="image" className="mt-16 border border-[#8a714e]/25 bg-[#f5f0e6] p-3 sm:p-6">
          <AttireGuide />
        </figure>
      </div>
    </section>
  );
}
