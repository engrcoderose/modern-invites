"use client";

import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import SectionPetals from "../../jasmin-and-anjo/components/SectionPetals";
import { faqs } from "../data";

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden bg-[#e5eadd]/60 px-5 py-20 text-[#624451] sm:px-8 sm:py-24">
      <SectionPetals />
      <div className="relative mx-auto max-w-4xl">
        <Reveal className="mb-12 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#cba4b6]/40 bg-[#f8edf0]">
            <HelpCircle size={28} strokeWidth={1.3} aria-hidden="true" />
          </div>
          <p className="mt-6 text-[10px] uppercase tracking-[.3em] text-[#946879]">For our guests</p>
          <h2 id="faq-title" className="mt-5 font-meaCulpa text-5xl leading-tight sm:text-7xl">Frequently Asked Questions</h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#756770]">A few details to help you feel at home in our celebration.</p>
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`question-${index}`} className="rounded-xl border border-[#cba4b6]/20 bg-[#fffdf8] px-5 shadow-sm sm:px-7">
                <AccordionTrigger className="gap-4 py-6 text-left font-instrumentSerif text-xl text-[#624451] hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879] sm:text-2xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-8 text-[#756770]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
