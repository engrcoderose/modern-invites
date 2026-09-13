"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import FloralAccent from "./FloralAccent";
import { faqs } from "../data";

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden border-y border-[#d7dce0] bg-[#edf0f2] px-5 py-20 text-[#624451] sm:px-8 sm:py-28 lg:px-12">
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <Reveal className="relative text-center lg:text-left">
          <p className="text-[10px] uppercase tracking-[.3em] text-[#946879]">For our guests</p>
          <h2 id="faq-title" className="mt-5 font-instrumentSerif text-5xl leading-[1.08] sm:text-6xl">Frequently Asked <span className="font-meaCulpa text-[#946879]">Questions</span></h2>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-8 text-[#756770] lg:mx-0">A few details to help you feel at home in our celebration.</p>
          <div aria-hidden="true" className="relative mx-auto mt-6 h-32 w-36 lg:ml-0 lg:mt-10 lg:h-52 lg:w-52"><FloralAccent kind="blueStem" className="bottom-0 left-0 w-20 -rotate-12 lg:w-32" sizes="128px" /><FloralAccent kind="lilacStem" className="bottom-0 right-0 w-16 rotate-12 lg:w-24" sizes="96px" /></div>
        </Reveal>
        <Reveal className="border-y border-[#c4cbd0] bg-[#fffdf8]/70 px-5 sm:px-8">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`question-${index}`} className="border-b border-[#d6d8d3] last:border-b-0">
                <AccordionTrigger className="gap-3 py-6 text-left font-instrumentSerif text-xl text-[#624451] hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#946879] sm:text-2xl">
                  <span className="flex items-baseline gap-4"><span aria-hidden="true" className="font-sans text-[10px] tracking-[.12em] text-[#946879]">{String(index + 1).padStart(2, "0")}</span><span>{faq.question}</span></span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-8 text-[#756770] sm:pl-8">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
