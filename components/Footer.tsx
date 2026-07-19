import Link from "next/link";
import { Facebook, Heart } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";

const footerLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

export default function Footer() {
  return (
    <footer className="bg-[#102e26] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row md:items-end">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Modern Invites home">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-instrumentSerif text-xl italic text-forest">M</span>
              <span className="font-instrumentSerif text-3xl">Modern Invites</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/50">Personalized invitation websites for weddings, debuts, birthdays, and life’s most meaningful celebrations.</p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-9">
            <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-xs font-semibold text-white/60 transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Modern Invites on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 pt-7 text-[0.68rem] text-white/35 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Modern Invites. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Crafted with <Heart className="h-3 w-3 text-champagne-light" fill="currentColor" aria-hidden="true" /> by{" "}
            <Link href="https://www.tuldokdigital.com" target="_blank" rel="noopener noreferrer" className="text-white/55 transition hover:text-white">
              Tuldok Digital Solutions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
