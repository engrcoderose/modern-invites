import { Plus } from "lucide-react";
import wedding from "../data/wedding-details.json";

export default function FaqSection() {
  return (
    <section id="faq" aria-labelledby="mj-faq-title" className="mj-faq-section px-6 py-20 sm:px-10 sm:py-24">
      <div id="guest-guide" className="mx-auto grid max-w-5xl scroll-mt-24 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div>
          <h2 id="mj-faq-title" className="mj-heading">A few little<br /><em>details.</em></h2>
          <p className="mt-6 text-sm leading-7">Everything you might like to know before joining us.</p>
        </div>
        <div className="mj-faq">
          {wedding.faqs.map((faq) => (
            <details key={faq.question} className="border-b py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                <span className="text-xl">{faq.question}</span>
                <Plus className="mj-plus shrink-0" size={16} aria-hidden="true" />
              </summary>
              <p className="mt-4 pr-5 text-sm leading-7">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
