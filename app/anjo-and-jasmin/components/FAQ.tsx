"use client";

import { BrownLineFlower } from "../design-media";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import Reveal from "./motion/Reveal";
import { faqs } from "../data";

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden border-y border-[rgb(var(--aj-line))] bg-[rgb(var(--aj-sand))] px-5 py-20 text-[rgb(var(--aj-ink))] sm:px-8 sm:py-28 lg:px-12">
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <Reveal className="relative text-center lg:text-left">
          <h2 id="faq-title" className="font-instrumentSerif text-5xl leading-[1.08] sm:text-6xl">Frequently Asked <span className="font-meaCulpa text-[rgb(var(--aj-accent-dark))]">Questions</span></h2>
          <Image src={BrownLineFlower} alt="" aria-hidden="true" sizes="(max-width: 1023px) 224px, 288px" className="pointer-events-none mx-auto mt-6 h-auto w-56 max-w-full select-none lg:ml-0 lg:mt-10 lg:w-72" />
        </Reveal>
        <Reveal className="border-y border-[rgb(var(--aj-line))] bg-[rgb(var(--aj-paper))]/70 px-5 sm:px-8">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`question-${index}`} className="border-b border-[rgb(var(--aj-line))]/60 last:border-b-0">
                <AccordionTrigger className="gap-3 py-6 text-left font-instrumentSerif text-xl text-[rgb(var(--aj-ink))] hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--aj-accent))] sm:text-2xl [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-[rgb(var(--aj-accent-dark))] motion-reduce:[&>svg]:transition-none">
                  <span className="flex items-baseline gap-4"><span aria-hidden="true" className="font-sans text-[10px] tracking-[.12em] text-[rgb(var(--aj-accent-dark))]">{String(index + 1).padStart(2, "0")}</span><span>{faq.question}</span></span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-8 text-[rgb(var(--aj-muted))] sm:pl-8">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
