"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/landing/ScrollReveal";

const questions = [
  {
    question: "How much does a website invitation cost?",
    answer: (
      <p>
        Packages currently range from ₱799 to ₱3,199, depending on the design
        and features you need. See the complete comparison on our{" "}
        <Link href="/pricing" className="font-semibold text-forest underline underline-offset-4">
          pricing page
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

export default function FrequentlyAskedQuestions() {
  return (
    <section id="faq" className="scroll-mt-24 bg-ivory px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <ScrollReveal direction="left">
          <div>
            <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-eucalyptus-dark">Good to know</p>
            <h2 className="font-instrumentSerif text-5xl leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl">
              A few questions, <span className="italic text-eucalyptus-dark">answered.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-ink-muted">
              Still deciding what fits your event? Send us a message and we’ll help you choose.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.08}>
          <Accordion type="single" collapsible className="border-t border-forest/15">
            {questions.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`} className="border-forest/15">
                <AccordionTrigger className="py-6 text-left font-instrumentSerif text-xl font-normal text-ink hover:no-underline sm:text-2xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 text-sm leading-7 text-ink-muted sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
