import Link from "@/components/landing/MotionLink";
import ScrollReveal from "@/components/landing/ScrollReveal";
import { Facebook, Heart } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";

const footerLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/#packages" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];

export default function Footer() {
  return (
    <footer className="section-lavender border-t border-brand-700/15 px-5 pb-8 pt-16 text-marketing-ink sm:px-6 sm:pt-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 border-b border-brand-700/15 pb-12 md:flex-row md:items-end lg:pb-16">
          <ScrollReveal className="max-w-sm">
            <Link href="/" className="inline-flex min-h-11 items-center gap-3" aria-label="Modern Invites home">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-marketing-paper font-elegant text-xl italic text-brand-700">M</span>
              <span className="font-elegant text-4xl">Modern Invites</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-marketing-muted">Personalized invitation websites for weddings, debuts, birthdays, and life’s most meaningful celebrations.</p>
          </ScrollReveal>

          <ScrollReveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-9">
            <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <Link key={link.label} href={link.href} className="inline-flex min-h-11 min-w-11 items-center justify-center text-xs font-semibold text-marketing-ink hover:text-brand-900">
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Modern Invites on Facebook"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-700/25 text-marketing-ink hover:border-brand-900 hover:text-brand-900"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>

        <ScrollReveal className="flex flex-col justify-between gap-3 pt-7 text-xs leading-6 text-marketing-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Modern Invites. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Crafted with <Heart className="h-3 w-3 text-brand-700" fill="currentColor" aria-hidden="true" /> by{" "}
            <Link href="https://www.tuldokdigital.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-marketing-muted hover:text-marketing-ink">
              Tuldok Digital Solutions
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </footer>
  );
}
