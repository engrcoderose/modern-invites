import Image from "next/image";
import { Heart, Leaf } from "lucide-react";

import type { WeddingData } from "../../data/weddingData";
import initials from "../../assets/initials.webp";
import { Container } from "../ui";

type FooterProps = {
  data: Pick<WeddingData, "couple" | "event" | "socialSharing">;
};

const footerLinks = [
  { label: "Our invitation", href: "#invitation" },
  { label: "Gallery", href: "#gallery" },
  { label: "Details", href: "#event-details" },
  { label: "Entourage", href: "#entourage" },
  { label: "RSVP", href: "#rsvp" },
];

export function Footer({ data }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-wedding-line/25 bg-wedding-sage-deep py-14 text-wedding-paper sm:py-18">
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 bottom-0 size-52 rotate-45 stroke-[0.5] text-wedding-paper/10"
      />
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-0 size-56 -rotate-[135deg] stroke-[0.5] text-wedding-paper/10"
      />

      <Container size="wide" className="relative">
        <div className="flex flex-col items-center text-center">
          <div className="size-24 overflow-hidden rounded-full border border-wedding-paper/25 bg-wedding-paper p-1 shadow-wedding-card">
            <Image
              src={initials}
              alt={`${data.couple.groom.firstName} and ${data.couple.bride.firstName} monogram`}
              className="size-full rounded-full object-cover"
              sizes="96px"
            />
          </div>

          <p className="mt-6 font-wedding-script text-5xl leading-none sm:text-6xl">
            {data.couple.groom.firstName} &amp; {data.couple.bride.firstName}
          </p>
          <p className="mt-3 font-sans text-[0.62rem] uppercase tracking-[0.24em] text-wedding-paper/65">
            {data.event.dateDisplay}
          </p>

          <nav
            aria-label="Wedding invitation sections"
            className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
          >
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[0.58rem] uppercase tracking-[0.2em] text-wedding-paper/65 transition hover:text-wedding-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-9 flex items-center gap-3 text-wedding-paper/35">
            <span className="h-px w-12 bg-current" />
            <Heart className="size-3.5 fill-current stroke-[1]" />
            <span className="h-px w-12 bg-current" />
          </div>

          <p className="mt-6 break-all font-wedding-body text-xs tracking-[0.08em] text-wedding-paper/65">
            {data.socialSharing.hashtag}
          </p>
          <p className="mt-4 font-sans text-[0.52rem] uppercase tracking-[0.18em] text-wedding-paper/40">
            Made with love for our family and friends
          </p>
        </div>
      </Container>
    </footer>
  );
}
