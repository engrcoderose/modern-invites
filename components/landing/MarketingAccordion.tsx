"use client";

import { useState, type ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import useMarketingReducedMotion from "./useMarketingReducedMotion";

export default function MarketingAccordion({ items }: { items: { question: string; answer: ReactNode }[] }) {
  const [value, setValue] = useState("");
  const reducedMotion = useMarketingReducedMotion();

  return (
    <Accordion.Root type="single" collapsible value={value} onValueChange={setValue} className="border-t border-forest/15">
      {items.map((item, index) => {
        const itemValue = `item-${index}`;
        const open = value === itemValue;
        return (
          <Accordion.Item key={item.question} value={itemValue} className="border-b border-forest/15">
            <ScrollReveal>
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex flex-1 items-center justify-between gap-4 py-6 text-left font-instrumentSerif text-xl font-normal text-ink sm:text-2xl">
                  {item.question}
                  <motion.span aria-hidden="true" className="shrink-0" style={{ transition: "none" }} initial={false} animate={{ rotate: open ? 180 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
                    <ChevronDown className="h-4 w-4 text-ink-muted" />
                  </motion.span>
                </Accordion.Trigger>
              </Accordion.Header>
            </ScrollReveal>
            <Accordion.Content forceMount asChild>
              <motion.div style={{ transition: "none" }} initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} inert={!open} aria-hidden={!open} className="overflow-hidden">
                <div className="max-w-2xl pb-6 text-sm leading-7 text-ink-muted sm:text-base">{item.answer}</div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
