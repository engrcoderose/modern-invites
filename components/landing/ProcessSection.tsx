import { FileHeart, MessageCircleHeart, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: FileHeart,
    number: "01",
    title: "Choose your package",
    description: "Select the experience that fits your event, features, and budget.",
  },
  {
    icon: MessageCircleHeart,
    number: "02",
    title: "Share your story",
    description: "Send your photos, event details, preferred colors, music, and inspiration.",
  },
  {
    icon: Send,
    number: "03",
    title: "Review and share",
    description: "Approve your personalized invitation, then send the finished link to your guests.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="A simple collaboration"
          title={<>From your ideas to a <span className="italic text-eucalyptus-dark">finished invitation.</span></>}
          description="You bring the story. We handle the design, details, and setup."
          align="center"
        />

        <ol className="relative mt-16 grid gap-5 before:absolute before:left-[16.6%] before:right-[16.6%] before:top-12 before:hidden before:border-t before:border-dashed before:border-eucalyptus/35 before:content-[''] lg:grid-cols-3 lg:before:block">
          {steps.map(({ icon: Icon, number, title, description }, index) => (
            <li key={number} className="relative">
              <ScrollReveal delay={index * 0.1} className="h-full">
                <div className="h-full rounded-[1.75rem] border border-forest/10 bg-ivory p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white shadow-[0_10px_28px_-14px_rgba(23,61,50,0.8)]">
                      <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="font-instrumentSerif text-3xl italic text-champagne-dark">{number}</span>
                  </div>
                  <h3 className="mt-10 font-instrumentSerif text-3xl text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">{description}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
