"use client";

import Link from "next/link";
import MarketingAccordion from "@/components/landing/MarketingAccordion";
import ScrollReveal from "@/components/landing/ScrollReveal";
import { PRICING_PACKAGES } from "@/lib/pricing";

const questions = [
  {
    question: "How much does a website invitation cost?",
    answer: (
      <p>
        {PRICING_PACKAGES.map((packageDetails) =>
          `${packageDetails.name} is ₱${packageDetails.price}`,
        ).join(", ")}
        . All packages are a one-time payment. See all inclusions in our{" "}
        <Link href="/#pricing-packages" className="font-semibold text-brand-700 underline underline-offset-4">
          package comparison
        </Link>
        .
      </p>
    ),
  },
  {
    question: "How long will my invitation take?",
    answer: (
      <p>
        Most website invitations are completed within 3–7 business days. More
        elaborate custom projects can take longer. Your turnaround begins once
        we receive all required content and materials.
      </p>
    ),
  },
  {
    question: "What do I need to send before you begin?",
    answer: (
      <p>
        We’ll ask for your event details, photos, preferred music, wording,
        motif or color palette, dress code, program, and any special
        instructions. We’ll guide you through the list after booking.
      </p>
    ),
  },
  {
    question: "Can I request revisions?",
    answer: (
      <p>
        Yes. Revision rounds are included according to your selected package,
        and we’ll send a draft for approval before your invitation is launched.
      </p>
    ),
  },
  {
    question: "Do you require a down payment?",
    answer: (
      <p>
        Yes. A 50% non-refundable down payment secures your slot and starts the
        design process. The remaining balance is due when the website is
        completed.
      </p>
    ),
  },
];

export default function FrequentlyAskedQuestions({ variant = "default" }: { variant?: "default" | "home" }) {
  return (
    <section id="faq" className="section-lilac scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal direction="left">
          <div className="mb-12 text-center">
            <h2 className="section-title text-marketing-ink">
              {variant === "home" ? "Common questions" : <>A few questions, <span className="italic text-brand-700">answered.</span></>}
            </h2>
            {variant !== "home" && <p className="mt-7 text-sm text-brand-800">Good to know</p>}
            {variant !== "home" && <p className="mx-auto mt-5 max-w-md text-base leading-7 text-marketing-muted">
              Still deciding what fits your event? Send us a message and we’ll help you choose.
            </p>}
          </div>
        </ScrollReveal>

        <MarketingAccordion items={questions} />
      </div>
    </section>
  );
}
