import Image from "next/image";
import wedding from "../data/wedding-details.json";
import flowers from "../assets/designs/hero-flower-left.png";

export default function GiftSection() {
  return (
    <section id="gifts" aria-labelledby="mj-gift-title" className="mj-gift relative isolate flex min-h-[520px] items-center justify-center overflow-hidden px-6 py-32 text-center sm:min-h-[580px] sm:px-10 sm:py-40 xl:min-h-[640px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image src={flowers} alt="" sizes="(min-width: 1280px) 300px, (min-width: 640px) 224px, 112px" className="absolute -left-3 -top-4 h-auto w-28 sm:-left-5 sm:-top-6 sm:w-56 xl:w-[300px]" />
        <Image src={flowers} alt="" sizes="(min-width: 1280px) 300px, (min-width: 640px) 224px, 112px" className="absolute -bottom-4 -right-3 h-auto w-28 rotate-180 sm:-bottom-6 sm:-right-5 sm:w-56 xl:w-[300px]" />
        {Array.from({ length: 8 }, (_, index) => <span key={index} className="mj-gift-petal" />)}
      </div>
      <div className="mj-gift-message relative z-10 mx-auto w-full max-w-3xl border-y py-10 sm:py-12">
        <h2 id="mj-gift-title" className="mj-heading">Your presence <em>is our present.</em></h2>
        <p className="mx-auto mt-6 max-w-xl leading-8">{wedding.giftNote}</p>
      </div>
    </section>
  );
}
