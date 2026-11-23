import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "@/components/landing/MotionLink";
import ScrollReveal from "@/components/landing/ScrollReveal";
import seal from "@/components/landing/assets/hero/modern-invites-seal.webp";
import HeadingReveal from "./HeadingReveal";
import { CONTACT_URL } from "@/lib/site";

export default function ClosingInvitation({ description, label, note }: { description: string; label?: string; note?: ReactNode }) {
  return (
    <section id="inquire" className="scroll-mt-24 bg-brand-100 px-5 pb-20 pt-10 sm:px-6 sm:pb-28 lg:px-8">
      <div className="closing-panel studio-closing relative mx-auto flex max-w-7xl flex-col items-center overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-12 sm:py-24">
        <ScrollReveal direction="scale"><Image src={seal} alt="" sizes="64px" className="mb-7 h-16 w-16 object-contain" /></ScrollReveal>
        <HeadingReveal lines={["Tell us about", <em key="celebration" className="text-brand-800">your celebration.</em>]} className="section-title max-w-4xl text-marketing-ink" />
        {label && <p className="mt-6 text-sm italic text-brand-800">{label}</p>}
        <ScrollReveal as="p" className="mt-7 max-w-xl text-base leading-8 text-marketing-muted">{description}</ScrollReveal>
        <Link href={CONTACT_URL} target="_blank" rel="noopener noreferrer" aria-label="Start a conversation on Facebook (opens in a new tab)" className="mt-9 inline-flex min-h-14 max-w-full items-center justify-center gap-6 rounded-full bg-brand-700 px-8 py-4 text-sm font-medium text-white hover:bg-brand-800 focus-visible:outline-brand-800">Start a conversation <ArrowUpRight className="link-arrow h-5 w-5 shrink-0" aria-hidden="true" /></Link>
        {note && <p className="mt-6 inline-flex items-center gap-2 text-xs leading-6 text-marketing-muted">{note}</p>}
      </div>
    </section>
  );
}
