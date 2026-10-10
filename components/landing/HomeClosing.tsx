import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";

export default function HomeClosing() {
  return (
    <section className="bg-forest-light px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-16">
        <div className="max-w-3xl"><h2 className="home-heading text-ivory">Tell us about<br />your celebration.</h2><p className="mt-5 max-w-lg text-base leading-7 text-marketing-muted-inverse">Send your date and ideas. We’ll help you get started.</p></div>
        <Link href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 max-w-full items-center justify-center gap-4 self-start rounded-md bg-ivory px-6 py-4 text-sm font-semibold text-forest transition-colors hover:bg-champagne-light focus-visible:outline-ivory lg:shrink-0">Start a conversation <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
