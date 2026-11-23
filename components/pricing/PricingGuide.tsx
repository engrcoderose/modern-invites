import {
  FileHeart,
  MessageCircleHeart,
  Send,
} from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";
import SectionHeading from "@/components/landing/SectionHeading";
import PackageFinder from "./PackageFinder";

const bookingSteps = [
  {
    icon: MessageCircleHeart,
    number: "01",
    title: "Reserve your slot",
    description:
      "A 50% non-refundable down payment secures your schedule and begins the design process.",
  },
  {
    icon: FileHeart,
    number: "02",
    title: "Send your content",
    description:
      "Share your event details, photos, preferred music, wording, and design inspiration.",
  },
  {
    icon: Send,
    number: "03",
    title: "Approve and launch",
    description:
      "Review the website, use your included revisions, and settle the balance when it is completed.",
  },
];

export default function PricingGuide() {
  return (
    <>
      <PackageFinder />

      <section className="bg-marketing-paper px-5 py-24 text-marketing-ink sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Booking and payment"
            title={
              <>
                Simple from first message to{" "}
                <span className="italic text-brand-700">final link.</span>
              </>
            }
            description="A clear three-step process keeps the project moving and gives you time to review before launch."
            align="center"
            tone="light"
          />

          <ol className="relative mt-16 grid gap-5 before:absolute before:left-[16.6%] before:right-[16.6%] before:top-12 before:hidden before:border-t before:border-dashed before:border-brand-700/15 before:content-[''] lg:grid-cols-3 lg:before:block">
            {bookingSteps.map(
              ({ icon: Icon, number, title, description }, index) => (
                <li key={number} className="relative">
                  <ScrollReveal delay={index * 0.1} className="h-full">
                    <div className="studio-step h-full rounded-[2rem] p-8">
                      <div className="flex items-center justify-between">
                        <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-brand-300 text-brand-700 shadow-lg">
                          <Icon
                            className="h-6 w-6"
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="font-elegant text-3xl italic text-marketing-muted">
                          {number}
                        </span>
                      </div>
                      <h3 className="mt-10 font-elegant text-3xl">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-marketing-muted">
                        {description}
                      </p>
                    </div>
                  </ScrollReveal>
                </li>
              ),
            )}
          </ol>

          <ScrollReveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white bg-white/50 px-6 py-5 text-center text-xs text-marketing-muted sm:flex-row sm:gap-8 sm:text-sm">
              <span>No hidden monthly fees</span>
              <span className="hidden h-1 w-1 rounded-full bg-brand-300 sm:block" />
              <span>Included revisions vary by package</span>
              <span className="hidden h-1 w-1 rounded-full bg-brand-300 sm:block" />
              <span>Turnaround begins after all materials are received</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
