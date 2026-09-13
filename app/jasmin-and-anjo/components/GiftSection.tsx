import { Gift, Heart } from "lucide-react";
import Reveal from "./motion/Reveal";
import SectionPetals from "./SectionPetals";

export default function GiftSection() {
  return (
    <section
      id="gifts"
      aria-labelledby="gift-title"
      className="relative overflow-hidden bg-[#fbf8f1] px-6 py-20 text-[#624451] sm:px-10 sm:py-28"
    >
      <SectionPetals variant="pink" />
      <Reveal className="relative mx-auto max-w-3xl lg:max-w-4xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#cba4b6]/40 bg-[#f8edf0]">
          <Gift size={26} strokeWidth={1.2} aria-hidden="true" />
        </div>
        <p className="mt-7 text-[10px] lg:text-sm uppercase tracking-[.3em] text-[#946879]">
          A little note on giving
        </p>
        <h2
          id="gift-title"
          className="mt-5 font-instrumentSerif text-5xl leading-tight sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Your presence is our
          <br />
          <span className="font-meaCulpa text-[#946879]">greatest gift.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl lg:max-w-3xl text-sm leading-8 lg:text-xl lg:leading-9 text-[#756770]">
          Having you beside us as we begin our married life means more than
          words can say. Your love, laughter, and warm wishes will make our
          celebration truly special.
        </p>
        <div className="mx-auto mt-9 max-w-lg lg:max-w-2xl rounded-2xl border border-[#cba4b6]/30 bg-white/50 px-7 py-6 lg:px-10 lg:py-9">
          <h3 className="font-instrumentSerif text-2xl lg:text-4xl">
            For those who wish to give
          </h3>
          <p className="mt-3 text-xs leading-7 lg:text-lg lg:leading-8 text-[#756770]">
            Our gift preferences and any registry details will be shared here
            soon. Thank you for thinking of us with so much love.
          </p>
        </div>
        <Heart
          aria-hidden="true"
          size={16}
          strokeWidth={1.2}
          className="mx-auto mt-8 text-[#b98c9d]"
        />
      </Reveal>
    </section>
  );
}
