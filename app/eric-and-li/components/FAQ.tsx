"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ as FAQType } from "../types";
import { HelpCircle } from "lucide-react";

interface FAQProps {
  faqs: FAQType[];
}

export default function FAQ({ faqs }: FAQProps) {
  return (
    <section className="py-20 px-4 bg-[#eae4cc]/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c79d5f] rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl md:text-7xl font-meaCulpa text-[#4e2a0d] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#4e2a0d]/80 font-medium">
            Everything you need to know about our big day
          </p>
          <div className="w-20 h-1 bg-[#c79d5f] mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-md border-none px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-lg font-libreBaskerville text-[#4e2a0d] pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[#4e2a0d]/80 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[#4e2a0d]/80 font-medium">
            Still have questions?{" "}
            <a
              href="#rsvp"
              className="text-[#c79d5f] hover:text-[#8c6b42] font-semibold underline"
            >
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

