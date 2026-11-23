"use client";

import { useState, type ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import useMarketingReducedMotion from "./useMarketingReducedMotion";

export default function MarketingAccordion({ items }: { items: { question: string; answer: ReactNode }[] }) {
  const [value, setValue] = useState("");
  const reducedMotion = useMarketingReducedMotion();

  return (
    <Accordion.Root type="single" collapsible value={value} onValueChange={setValue} className="space-y-4">
      {items.map((item, index) => {
        const itemValue = `item-${index}`;
        const open = value === itemValue;
        return (
          <Accordion.Item key={item.question} value={itemValue} className="studio-question rounded-3xl px-6 sm:px-8">
            <ScrollReveal>
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex min-h-20 flex-1 items-center justify-between gap-6 py-6 text-left font-elegant text-lg font-normal leading-snug text-marketing-ink hover:text-brand-800 sm:py-7 sm:text-2xl">
                  {item.question}
                  <motion.span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-700/20 text-brand-800" style={{ transition: "none" }} initial={false} animate={{ rotate: open ? 45 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
                    <Plus className="h-4 w-4" strokeWidth={1.25} />
                  </motion.span>
                </Accordion.Trigger>
              </Accordion.Header>
            </ScrollReveal>
            <Accordion.Content forceMount asChild>
              <motion.div style={{ transition: "none" }} initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} inert={!open} aria-hidden={!open} className="overflow-hidden">
                <div className="max-w-2xl pb-8 pr-8 text-sm leading-8 text-marketing-muted sm:text-base">{item.answer}</div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
