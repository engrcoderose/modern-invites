import { CheckCircle2, FileHeart, MessageCircleHeart, Send } from "lucide-react";
import { PRICING_PACKAGES } from "@/lib/pricing";
import ScrollReveal from "@/components/landing/ScrollReveal";
import SectionHeading from "@/components/landing/SectionHeading";

const bookingSteps = [
  {
    icon: MessageCircleHeart,
    number: "01",
    title: "Reserve your slot",
    description: "A 50% non-refundable down payment secures your schedule and begins the design process.",
  },
  {
    icon: FileHeart,
    number: "02",
    title: "Send your content",
    description: "Share your event details, photos, preferred music, wording, and design inspiration.",
  },
  {
    icon: Send,
    number: "03",
    title: "Approve and launch",
    description: "Review the website, use your included revisions, and settle the balance when it is completed.",
  },
];

export default function PricingGuide() {
  return (
    <>
      <section className="bg-ivory px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="A quick way to choose"
            title={<>Find the package that fits <span className="italic text-eucalyptus-dark">your story.</span></>}
            description="Start with the kind of experience you want your guests to have. You can always ask us to help you compare."
          />

          <div className="mt-14 divide-y divide-forest/10 border-y border-forest/10">
            {PRICING_PACKAGES.map((packageDetails, index) => (
              <ScrollReveal key={packageDetails.id} delay={index * 0.06}>
                <article className="grid gap-6 py-9 sm:grid-cols-[0.55fr_1fr_1fr] sm:items-center lg:py-11">
                  <div>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-eucalyptus-dark">Package 0{index + 1}</p>
                    <h3 className="mt-2 font-instrumentSerif text-3xl text-ink sm:text-4xl">{packageDetails.name}</h3>
                  </div>
                  <div>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ink-muted/60">Best for</p>
                    <p className="mt-2 text-sm font-semibold text-forest sm:text-base">{packageDetails.bestFor}</p>
                  </div>
                  <div>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ink-muted/60">Standout experience</p>
                    <p className="mt-2 flex items-start gap-2 text-sm text-ink-muted sm:text-base">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-eucalyptus-dark" aria-hidden="true" />
                      {packageDetails.highlight}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Booking and payment"
            title={<>Simple from first message to <span className="italic text-champagne-light">final link.</span></>}
            description="A clear three-step process keeps the project moving and gives you time to review before launch."
            align="center"
            tone="dark"
          />

          <ol className="relative mt-16 grid gap-5 before:absolute before:left-[16.6%] before:right-[16.6%] before:top-12 before:hidden before:border-t before:border-dashed before:border-white/20 before:content-[''] lg:grid-cols-3 lg:before:block">
            {bookingSteps.map(({ icon: Icon, number, title, description }, index) => (
              <li key={number} className="relative">
                <ScrollReveal delay={index * 0.1} className="h-full">
                  <div className="h-full rounded-[1.75rem] border border-white/10 bg-forest-light p-7 sm:p-9">
                    <div className="flex items-center justify-between">
                      <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-champagne text-forest shadow-lg">
                        <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="font-instrumentSerif text-3xl italic text-white/25">{number}</span>
                    </div>
                    <h3 className="mt-10 font-instrumentSerif text-3xl">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/55">{description}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>

          <ScrollReveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center text-xs text-white/55 sm:flex-row sm:gap-8 sm:text-sm">
              <span>No hidden monthly fees</span>
              <span className="hidden h-1 w-1 rounded-full bg-champagne sm:block" />
              <span>Included revisions vary by package</span>
              <span className="hidden h-1 w-1 rounded-full bg-champagne sm:block" />
              <span>Turnaround begins after all materials are received</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
