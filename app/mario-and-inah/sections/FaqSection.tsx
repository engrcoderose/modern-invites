"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FloralArtwork from "../components/FloralArtwork";
import { faqs } from "../data/guest-information";
import styles from "../styles/invitation.module.css";

export default function FaqSection() {
  return (
    <section id="faq" aria-labelledby="mi-faq-title" className={`${styles.peach} px-6 py-20 sm:px-10 md:py-28 lg:px-16`}>
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <h2 data-reveal="heading" id="mi-faq-title" className={styles.heading}>Frequently Asked Questions</h2>
          <FloralArtwork reveal name="venueLine" className="mx-auto mt-5 h-auto w-56 max-w-full lg:mx-0" sizes="224px" />
        </div>
        <Accordion type="single" collapsible className="min-w-0">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`question-${index}`} data-reveal="text" className="border-[var(--mi-rule)]">
              <AccordionTrigger className={`${styles.serifDetail} gap-4 py-5 text-left text-sm leading-7 hover:text-[var(--mi-muted)] hover:no-underline sm:text-base motion-reduce:[&>svg]:transition-none`}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-7 motion-reduce:animate-none">
                <p>{faq.answer}</p>
                {faq.note && <p className="mt-3 font-medium italic">{faq.note}</p>}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
