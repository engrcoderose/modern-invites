"use client";

import Image from "next/image";
import Countdown from "../components/Countdown";
import { wedding } from "../data/wedding-data";
import { countdownPetals as petals } from "../data/design-media";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";

export default function InvitationSection() {
  return (
    <ScrollScene id="invitation" aria-labelledby="jb-invitation-title" className="jb-countdown relative isolate flex min-h-[480px] items-center overflow-hidden border-y border-[#637b65]/10 px-5 py-16 text-center text-[#33473d] sm:min-h-[560px] sm:px-8 sm:py-24 lg:min-h-[600px] lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none">
        <ScrollLayer profile="petals" className="absolute -left-16 -top-16 w-60 sm:-left-20 sm:w-[420px] lg:w-[520px]">
          <Image src={petals} alt="" sizes="(min-width:1024px) 520px, (min-width:640px) 420px, 240px" draggable={false} className="h-auto w-full rotate-[-18deg] opacity-80" />
        </ScrollLayer>
        <ScrollLayer profile="floral-right" className="absolute -bottom-16 -right-16 w-60 sm:-right-20 sm:w-[420px] lg:w-[520px]">
          <Image src={petals} alt="" sizes="(min-width:1024px) 520px, (min-width:640px) 420px, 240px" draggable={false} className="h-auto w-full rotate-[155deg] opacity-80" />
        </ScrollLayer>
        <div className="absolute left-1/2 top-1/2 w-[min(600px,95vw)] -translate-x-1/2 -translate-y-1/2"><ScrollLayer profile="halo" className="aspect-square rounded-full border border-[#637b65]/[0.07]" /></div>
      </div>
      <div className="relative mx-auto w-full max-w-6xl">
        <ScrollLayer as="p" profile="countdown-copy" className="text-xs uppercase leading-6 tracking-[0.12em] text-[rgb(var(--jb-countdown-label))] sm:tracking-[0.2em]">Counting down to our wedding day</ScrollLayer>
        <ScrollLayer as="h2" profile="countdown-copy" phase={0.035} id="jb-invitation-title" className="jb-countdown-names mt-3 text-balance text-[clamp(3rem,8vw,4.5rem)] leading-tight text-[#637b65]">{wedding.couple.display}</ScrollLayer>
        <ScrollLayer as="time" profile="countdown-copy" phase={0.07} dateTime={wedding.date.iso} className="mt-4 block text-balance text-xs leading-6 text-[#616b60] sm:text-sm">{wedding.date.display} · {wedding.venues[0].time}</ScrollLayer>
        <p className="sr-only">Together with our families, we, {wedding.couple.display}, invite you to join us as we begin our married life. Your presence would make our day all the more beautiful.</p>
        <Countdown />
      </div>
    </ScrollScene>
  );
}
