import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { wedding } from "../data/wedding-data";
import { coupleMonogram } from "../data/design-media";

import TextReveal from "../components/TextReveal";
import ScrollLayer from "../components/ScrollLayer";

export default function Footer() {
  return (
    <footer className="px-5 pb-8 pt-16 text-center sm:px-8">
      <ScrollLayer profile="text">
        <Image src={coupleMonogram} alt="Jaydee and Bea’s pink botanical JB monogram" sizes="(min-width: 640px) 192px, 160px" className="mx-auto h-40 w-40 rounded-full sm:h-48 sm:w-48" />
      </ScrollLayer>
      <TextReveal className="jb-serif mt-5 text-4xl italic">With love, {wedding.couple.display}</TextReveal>
      <TextReveal staggerIndex={1} className="mt-4 text-sm leading-7 text-[#65705e]">Thank you for being a part of our story.<br />We can’t wait to celebrate with you.</TextReveal>
      <TextReveal as="time" staggerIndex={2} dateTime={wedding.date.iso} className="mt-5 block text-xs uppercase tracking-[0.2em]">{wedding.date.display}</TextReveal>
      <ScrollLayer profile="text" staggerIndex={3} className="mx-auto mt-12 flex max-w-6xl items-center justify-center border-t border-[rgb(var(--jb-sage))]/20 pt-6 text-xs text-[#65705e]">
        <a href="#top" className="inline-flex min-h-11 items-center gap-3">Back to top <ArrowUp size={15} aria-hidden="true" /></a>
      </ScrollLayer>
      <p className="mt-2 flex items-center justify-center gap-1 text-xs text-[#526445]">
        Made by <a href="https://www.moderninvites.com" className="inline-flex min-h-11 items-center font-medium underline decoration-[#526445]/40 underline-offset-4 transition-colors hover:text-[#36472e]">Modern Invites</a>
      </p>
    </footer>
  );
}

