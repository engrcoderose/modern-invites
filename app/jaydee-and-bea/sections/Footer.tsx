import { ArrowUp, Flower2 } from "lucide-react";
import { wedding } from "../data/wedding-data";

import TextReveal from "../components/TextReveal";
import ScrollLayer from "../components/ScrollLayer";

export default function Footer() {
  return (
    <footer className="px-5 pb-8 pt-16 text-center sm:px-8">
      <ScrollLayer profile="text"><Flower2 aria-hidden="true" className="mx-auto h-6 w-6 text-[#a88071]" strokeWidth={1} /></ScrollLayer>
      <TextReveal className="jb-serif mt-5 text-4xl italic">With love, {wedding.couple.display}</TextReveal>
      <TextReveal staggerIndex={1} className="mt-4 text-sm leading-7 text-[#65705e]">Thank you for being a part of our story.<br />We can’t wait to celebrate with you.</TextReveal>
      <TextReveal as="time" staggerIndex={2} dateTime={wedding.date.iso} className="mt-5 block text-xs uppercase tracking-[0.2em]">{wedding.date.display}</TextReveal>
      <ScrollLayer profile="text" staggerIndex={3} className="mx-auto mt-12 flex max-w-6xl items-center justify-center border-t border-[rgb(var(--jb-sage))]/20 pt-6 text-xs text-[#65705e]">
        <a href="#top" className="inline-flex min-h-11 items-center gap-3">Back to top <ArrowUp size={15} aria-hidden="true" /></a>
      </ScrollLayer>
    </footer>
  );
}

