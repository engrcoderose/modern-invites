import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";
import websiteInvitations from "@/public/images/website-invitaions.png";
import readyToPrint from "@/public/images/ready-to-print.png";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

type Product = {
  number: string;
  name: string;
  tagline: string;
  description: string;
  image: StaticImageData;
  features: string[];
  href: string;
};

const products: Product[] = [
  {
    number: "01",
    name: "Website Invitations",
    tagline: "Your entire celebration, beautifully shared online.",
    description: "A personalized invitation website that brings your story, schedule, venue, guest responses, and favorite memories together in one elegant experience.",
    image: websiteInvitations,
    features: ["Shareable custom link", "Interactive event details", "Smart RSVP options"],
    href: "/portfolio",
  },
  {
    number: "02",
    name: "Print-Ready Invitations",
    tagline: "A keepsake your guests can hold onto.",
    description: "Professionally prepared layouts made around your celebration and supplied ready for your preferred printer—without compromising on the details.",
    image: readyToPrint,
    features: ["Personalized layout", "High-resolution files", "Prepared for printing"],
    href: CONTACT_URL,
  },
];

export default function ProductExperiences() {
  return (
    <section id="services" className="scroll-mt-24 bg-ivory px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Choose your experience"
          title={<>Digital convenience. <span className="italic text-eucalyptus-dark">Tangible beauty.</span></>}
          description="Begin with the format that fits your celebration. We take care of the design and prepare everything for you."
        />

        <div className="mt-14 divide-y divide-forest/10 border-y border-forest/10">
          {products.map((product, index) => (
            <article key={product.name} className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-20 lg:py-20">
              <ScrollReveal
                direction={index === 0 ? "left" : "right"}
                className={index === 1 ? "lg:order-2" : ""}
              >
                <div>
                <div className="mb-7 flex items-center gap-4">
                  <span className="font-instrumentSerif text-2xl italic text-champagne-dark">{product.number}</span>
                  <span className="h-px w-12 bg-champagne" />
                </div>
                <h3 className="font-instrumentSerif text-4xl leading-none text-ink sm:text-5xl">{product.name}</h3>
                <p className="mt-5 text-lg font-medium text-forest">{product.tagline}</p>
                <p className="mt-4 max-w-xl text-sm leading-7 text-ink-muted sm:text-base">{product.description}</p>
                <ul className="mt-7 space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-medium text-ink">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-eucalyptus/15 text-forest">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={product.href}
                  target={product.href.startsWith("http") ? "_blank" : undefined}
                  rel={product.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group mt-8 inline-flex items-center gap-2 border-b border-forest pb-1 text-sm font-bold text-forest"
                >
                  {index === 0 ? "Explore website invitations" : "Ask about print-ready designs"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal
                direction={index === 0 ? "right" : "left"}
                delay={0.1}
                className={index === 1 ? "lg:order-1" : ""}
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-white p-5 shadow-[0_24px_70px_-35px_rgba(23,61,50,0.35)] sm:p-9">
                  <div className="absolute inset-0 invitation-grid opacity-35" />
                  <Image
                    src={product.image}
                    alt={`${product.name} preview`}
                    className="relative z-10 h-auto w-full transition duration-700 hover:scale-[1.025]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </ScrollReveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
