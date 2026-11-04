import { ChevronDown } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ScrollLayer from "../components/ScrollLayer";
import { faqs } from "../data/guest-information";

export default function FaqSection() {
  return (
    <section id="faq" aria-labelledby="jb-faq-title" className="scroll-mt-24 border-y border-[rgb(var(--jb-sage))]/20 bg-[#e8eedf] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading id="jb-faq-title" title="Frequently Asked Question" />
        <div className="divide-y divide-[rgb(var(--jb-sage))]/25 border-y border-[rgb(var(--jb-sage))]/25">
          {faqs.map(({ question, answer }, index) => (
            <ScrollLayer as="details" profile="text" staggerIndex={index + 1} key={question} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm leading-7 sm:text-base [&::-webkit-details-marker]:hidden">
                <span>{question}</span>
                <ChevronDown aria-hidden="true" size={20} strokeWidth={1.5} className="shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
              </summary>
              <p className="pb-6 pr-2 text-sm leading-7 sm:pr-10 sm:text-base">{answer}</p>
            </ScrollLayer>
          ))}
        </div>
      </div>
    </section>
  );
}
